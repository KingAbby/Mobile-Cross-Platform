import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import Camera from './Camera';

export default function App() {
  const [uri, setUri] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      handleResponse
    );
  };

  const handleCameraLaunch = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      handleResponse
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to take photos.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
        handleCameraLaunch();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image Picker Error: ', response.error);
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      setUri(imageUri);
    } else {
      console.log.log("No assets found in the message");
    }
  };

  const saveFile = async () => {
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
  },
});