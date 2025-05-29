import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { supabase } from '../utils/supabase';
import * as FileSystem from 'expo-file-system';
import { scheduleLocalNotification } from '../utils/notifications';

interface CameraProps {
    onBack: () => void;
    onPhotoTaken: (photoUrl: string, location: any) => void;
    onSuccess?: () => void;
    onFailure?: () => void;
}

export default function Camera({ onBack, onPhotoTaken, onSuccess, onFailure }: CameraProps) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);
    const [uploading, setUploading] = useState(false);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePhoto() {
        if (cameraRef) {
            try {
                setUploading(true);

                // Take photo
                const photo = await cameraRef.takePictureAsync();
                console.log('Photo taken:', photo.uri);

                // Get location
                let location = null;
                try {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    if (status === 'granted') {
                        location = await Location.getCurrentPositionAsync({});
                        console.log('Location captured:', location);
                    } else {
                        console.log('Permission to access location was denied');
                    }
                } catch (error) {
                    console.error('Error getting location:', error);
                }

                // Save to device
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'granted') {
                    const asset = await MediaLibrary.createAssetAsync(photo.uri);
                    const album = await MediaLibrary.getAlbumAsync('Pictures');
                    if (album == null) {
                        await MediaLibrary.createAlbumAsync('Pictures', asset, false);
                    } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    }
                    console.log('Photo saved to Pictures folder');
                } else {
                    console.log('Permission to access media library denied');
                }
                // Create a unique filename for the photo
                const fileName = `photo_${new Date().getTime()}.jpg`;
                const filePath = `photos/${fileName}`;

                console.log('Preparing to upload photo to Supabase storage...');
                // Upload Image to Supabase storage
                try {
                    // Convert the photo URI to a blob
                    const response = await fetch(photo.uri);
                    const blob = await response.blob();

                    // Convert blob to array buffer
                    const arrayBuffer = await new Response(blob).arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);

                    console.log('Converted photo to binary, uploading to Supabase...');

                    // Upload the file to Supabase storage
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('media')
                        .upload(filePath, uint8Array, {
                            contentType: 'image/jpeg',
                            upsert: true
                        });

                    if (uploadError) {
                        console.error('Error uploading to storage:', uploadError);
                        throw new Error(`Storage upload error: ${uploadError.message}`);
                    }

                    console.log('Photo uploaded successfully:', uploadData);
                } catch (uploadException) {
                    console.error('Exception during file upload:', uploadException);
                    throw uploadException;
                }

                // Get the public URL for the uploaded image
                const { data: publicUrlData } = supabase.storage
                    .from('media')
                    .getPublicUrl(filePath);

                const imageUrl = publicUrlData?.publicUrl;
                console.log('Image public URL:', imageUrl);
                // Save metadata to Supabase database
                try {
                    console.log('Attempting to save to Supabase database...');
                    const dataToInsert = {
                        photo_url: imageUrl,
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        timestamp: new Date().toISOString(),
                        location_data: location ? JSON.stringify(location) : null,
                    };

                    console.log('Data to insert:', dataToInsert);

                    const { data: dbData, error: dbError } = await supabase
                        .from('photos')
                        .insert([dataToInsert]);

                    if (dbError) {
                        console.error('Full database error:', dbError);
                        throw new Error(`Database error: ${dbError.message || JSON.stringify(dbError)}`);
                    } console.log('Photo metadata saved to Supabase database:', dbData);

                    // Call success callback if provided
                    if (onSuccess) {
                        onSuccess();
                    }

                    // Show success notification
                    await scheduleLocalNotification(
                        'Photo Uploaded Successfully',
                        `Location: ${location ? `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}` : 'No location data'}`,
                        onSuccess ? 1 : undefined,
                        onFailure ? 0 : undefined
                    );
                } catch (dbException) {
                    console.error('Exception during database operation:', dbException);                    // Show failure notification                    // Call failure callback if provided
                    if (onFailure) {
                        onFailure();
                    }

                    await scheduleLocalNotification(
                        'Upload Failed',
                        `Error: ${dbException.message || 'Unknown error'}`,
                        onSuccess ? 0 : undefined,
                        onFailure ? 1 : undefined
                    );
                    throw dbException;
                }

                // Call the callback function if provided
                if (onPhotoTaken) {
                    onPhotoTaken(imageUrl, location);
                }

            } catch (error) {
                console.error('Error processing photo:', error);
                alert(`Error saving photo: ${error.message}`);
            } finally {
                setUploading(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={(ref) => setCameraRef(ref)}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={onBack}>
                        <Ionicons name="arrow-back" size={32} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={takePhoto}
                        disabled={uploading}
                    >
                        <Ionicons name="camera" size={32} color={uploading ? "#999" : "white"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={32} color="white" />
                    </TouchableOpacity>
                </View>
                {uploading && (
                    <View style={styles.uploadingOverlay}>
                        <Text style={styles.uploadingText}>Uploading...</Text>
                    </View>
                )}
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        marginVertical: 40,
    },
    iconButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 50,
    },
    uploadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadingText: {
        color: 'white',
        fontSize: 18,
    },
});

