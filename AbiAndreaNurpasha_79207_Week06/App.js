import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';

export default function App() {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');

  const handleChangeMyName = (value) => {
    setName(value);
  }

  const handleChangeMyNim = (value) => {
    setNim(value);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.previewText}>{name || 'Nama'} - {nim || 'Nim'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Input Name'
          label="Name"
          value={name}
          onChangeText={handleChangeMyName}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Input NIM'
          label="NIM"
          value={nim}
          onChangeText={handleChangeMyNim}
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  previewText: {
    fontSize: 18,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    width: '100%',
  }
});
