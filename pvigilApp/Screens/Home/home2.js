import { Camera } from 'expo-camera';
import React, { useRef } from 'react';
import { Button, View } from 'react-native';


const CameraScreen = () => {
    const cameraRef = useRef(null);

    const handleCapture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo); // Handle the captured image
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back} // Set the desired camera type (front or back)
                ref={cameraRef}
            />
            <Button title="Capture" onPress={handleCapture} />
        </View>
    );
};

export default CameraScreen;