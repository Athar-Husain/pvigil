import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Image, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

export default function App() {
  const [description, setDescription] = useState('');
  const [complaintNumber, setComplaintNumber] = useState('');
  const [location, setLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    getLocation();
    checkLocationServices();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        throw new Error('Location permission denied');
      }

      const currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert('Location Error', 'Unable to retrieve your current location. Please make sure location services are enabled.');
      console.log(error);
    }
  };

  const checkLocationServices = async () => {
    const hasLocationServicesEnabled = await Location.hasServicesEnabledAsync();
    setLocationEnabled(hasLocationServicesEnabled);

    if (!hasLocationServicesEnabled) {
      Alert.alert(
        'Location Services',
        'Please enable location services for the app to work properly.',
        [
          { text: 'OK', onPress: () => openLocationSettings() }
        ]
      );
    }
  };

  const openLocationSettings = () => {
    Linking.openSettings();
  };

  const captureImage = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Camera Permission', 'Please enable camera access to capture images.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const recordVideo = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Camera Permission', 'Please enable camera access to record videos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      videoMaxDuration: 30,
    });

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  const handleSubmit = () => {
    // Form validation logic

    // Check if location services are enabled
    if (!locationEnabled) {
      Alert.alert(
        'Location Error',
        'Please enable location services for the app to work properly.',
      );
      return;
    }

    // Check if location is available
    if (!location) {
      setLocationError(true);
      Alert.alert(
        'Location Error',
        'Unable to retrieve your current location. Please make sure location services are enabled.',
      );
      return;
    }

    // Rest of the form submission logic...
         // Perform form submission logic here
    console.log('Form submitted!');
    console.log('Description:', description);
    console.log('Location:', location);
    console.log('Image:', image);
    console.log('Video:', video);

    // Reset form after submission
    setDescription('');
    setLocation(null);
    setImage(null);
    setVideo(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Button title="Capture Image" onPress={captureImage} />
      <Button title="Record Video (30s max)" onPress={recordVideo} />
      <Button title="Submit" onPress={handleSubmit} />

      {/* Render the captured image or video */}
      {image && <Image source={{ uri: image }} style={styles.media} />}
      {video && (
        <Video
          source={{ uri: video }}
          style={styles.media}
          shouldPlay={false}
          isLooping={false}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  media: {
    width: 300,
    height: 200,
    marginTop: 10,
  },
});
