import { Accuracy } from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import GeoLocation from './GeoLocation';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [showGeoLocation, setShowGeoLocation] = useState(false);
  const [fullLocationData, setFullLocationData] = useState(null);

  const handleLocationUpdate = (newLongitude, newLatitude, locationData) => {
    setLongitude(newLongitude);
    setLatitude(newLatitude);
    setFullLocationData(locationData);
  };

  const handleGetLocation = () => {
    setShowGeoLocation(true);
  };

  const saveFile = async () => {
    if (!fullLocationData) {
      alert('No location data to save!');
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}location_data.txt`;
    const dataToSave = JSON.stringify(fullLocationData, null, 2);

    try {
      await FileSystem.writeAsStringAsync(fileUri, dataToSave, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert('Sharing is not available on this device.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save location data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Abi Andrea Nurpasha - 00000079207</Text>
      <Button
        title="Get Location"
        onPress={handleGetLocation}
      />

      <Button
        title="Save File"
        onPress={saveFile}
      />

      {showGeoLocation ? (
        <GeoLocation onLocationUpdate={handleLocationUpdate} />
      ) : (
        <>
          <Text>Longitude: {longitude}</Text>
          <Text>Latitude: {latitude}</Text>
        </>
      )}

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
