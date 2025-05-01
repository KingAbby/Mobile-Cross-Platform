import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useState, useEffect } from 'react';
import Camera from './Camera';

export default function App() {
  const [imageUri, setImageUri] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === 'granted');
    })();
  }, []);

  const openImagePicker = async () => {
    if (!hasMediaPermission) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
        return;
      }
      setHasMediaPermission(true);
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      console.log('Selected image from gallery:', selectedImageUri);
    }
  };

  const saveFile = async () => {
    alert('Coming Soon!');
    const path = RNFS.DownloadDirectoryPath + '/test.txt';
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
      .then((res) => {
        console.log('Success create file. Check your download folder');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (showCamera) {
    return <Camera onBack={() => setShowCamera(false)} />;
  }

  return (
    <View style={styles.container}>
      <Text>Abi Andrea Nurpasha - 00000079207</Text>
      <Button title="Open Camera" onPress={() => setShowCamera(true)} />
      <Button title="Open Gallery" onPress={openImagePicker} />
      <Button title="Create File" onPress={saveFile} />

      {imageUri ? (
        <View style={styles.imageContainer}>
          <Text>Selected Image:</Text>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      ) : null}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});