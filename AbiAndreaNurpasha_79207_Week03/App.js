import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import Counter from './component/Counter';
import Profile from './component/Profile';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [passedName, setPassedName] = useState('');
  const [passedCount, setPassedCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  const handlePassValue = () => {
    setShowProfile(true);
    setModalVisible(true);
    setPassedName(name);
    setPassedCount(count);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.mainDisplay}>Halo namaku, {showProfile ? passedName : '...'} </Text>
      <Text style={styles.mainDisplay}>Umur ku, {showProfile ? passedCount : '...'} Tahun</Text>

      {/* Update Data Box */}
      <View style={styles.previewSection}>
        <Text style={styles.previewTitle}>Update Data:</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Input your name here'
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.previewText}>Current Age: {count}</Text>
      </View>


      <Counter
        value={count}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />

      <Button title='Pass Value' onPress={handlePassValue} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Profile name={passedName} age={passedCount} />
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainDisplay: {
    fontSize: 20,
    margin: 5,
    fontWeight: 'bold',
  },

  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    padding: 10,
    margin: 10,
  },

  //Update Data Box
  previewSection: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'lightblue',
  },

  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  previewText: {
    fontSize: 16,
    margin: 10,
    color: 'black',
  },

  //Modal Section
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: 'lightblue',
    padding: 30,
    gap: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});