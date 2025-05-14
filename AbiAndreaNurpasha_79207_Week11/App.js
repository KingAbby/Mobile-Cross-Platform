import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import Camera from './components/Camera';
import GeoLocation from './components/GeoLocation';

export default function App() {
  const [imageUri, setImageUri] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [showGeoLocation, setShowGeoLocation] = useState(false);
  const [fullLocationData, setFullLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === 'granted');
      fetchPhotos();
    })();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      alert('Could not load photos from database');
    } finally {
      setLoading(false);
    }
  };

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

      // Get location when image is picked
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude.toString());
          setLongitude(location.coords.longitude.toString());
          setFullLocationData(location);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  };

  const handlePhotoTaken = async (photoUrl, location) => {
    setShowCamera(false);
    fetchPhotos();
    if (location) {
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
      setFullLocationData(location);
    }
  };

  const handleLocationUpdate = (newLongitude, newLatitude, locationData) => {
    setLongitude(newLongitude.toString());
    setLatitude(newLatitude.toString());
    setFullLocationData(locationData);
  };

  const handleGetLocation = () => {
    setShowGeoLocation(true);
  };

  const saveLocationFile = async () => {
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

  if (showCamera) {
    return <Camera onBack={() => setShowCamera(false)} onPhotoTaken={handlePhotoTaken} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Abi Andrea Nurpasha - 00000079207</Text>

        <View style={styles.buttonSection}>
          <Button title="Open Camera" onPress={() => setShowCamera(true)} />
          <Button title="Open Gallery" onPress={openImagePicker} />
          <Button title="Get Location" onPress={handleGetLocation} />
          <Button title="Save Location Data" onPress={saveLocationFile} disabled={!fullLocationData} />
        </View>

        {showGeoLocation ? (
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Current Location</Text>
            <GeoLocation onLocationUpdate={handleLocationUpdate} />
          </View>
        ) : (
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Location Data</Text>
            <Text>Longitude: {longitude || 'Not available'}</Text>
            <Text>Latitude: {latitude || 'Not available'}</Text>
          </View>
        )}

        {imageUri ? (
          <View style={styles.imageContainer}>
            <Text style={styles.sectionTitle}>Selected Image from Gallery:</Text>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        ) : null}

        <View style={styles.photosContainer}>
          <Text style={styles.sectionTitle}>Photos from Supabase:</Text>
          {loading ? (
            <Text>Loading photos...</Text>
          ) : photos.length > 0 ? (
            photos.map(photo => (
              <View key={photo.id} style={styles.photoItem}>
                <Image source={{ uri: photo.photo_url }} style={styles.image} />
                <View style={styles.photoDetails}>
                  <Text>Latitude: {photo.latitude || 'N/A'}</Text>
                  <Text>Longitude: {photo.longitude || 'N/A'}</Text>
                  <Text>Taken: {new Date(photo.timestamp).toLocaleString()}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>No photos found</Text>
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 50,
  },
  buttonSection: {
    marginVertical: 15,
    gap: 10,
  },
  locationSection: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  photosContainer: {
    marginVertical: 20,
  },
  photoItem: {
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  photoDetails: {
    marginTop: 10,
  },
});