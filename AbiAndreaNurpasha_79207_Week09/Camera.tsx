import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Camera({ onBack }) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);

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
            const photo = await cameraRef.takePictureAsync();
            console.log('Photo taken:', photo.uri);

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
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={(ref) => setCameraRef(ref)}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={onBack}>
                        <Ionicons name="arrow-back" size={32} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
                        <Ionicons name="camera" size={32} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={32} color="white" />
                    </TouchableOpacity>
                </View>
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
});

