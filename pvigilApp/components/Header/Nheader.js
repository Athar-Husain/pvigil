import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Image, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

export default function Home() {
  const [description, setDescription] = useState('');
  const [complaintNumber, setComplaintNumber] = useState('');
  const [location, setLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    getLocationPermission();
    getMediaPermission();
    checkLocationServices();
  }, []);

  const checkLocationServices = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    setLocationEnabled(enabled);
  };

  const openLocationSettings = () => {
    Linking.openSettings();
  };

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location Permission', 'Please enable location access to capture your current location.');
    } else {
      try {
        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);
      } catch (error) {
        Alert.alert('Location Error', 'Failed to retrieve Your location');
        console.log(error)
      }
    }
  };

  const getMediaPermission = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Media Library Permission', 'Please enable media access to capture images or videos.');
    }
  };

  const captureImage = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Camera Permission', 'Please enable camera access to capture images.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const recordVideo = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Camera Permission', 'Please enable camera access to record videos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      videoMaxDuration: 30,
    });

    if (!result.canceled) {
      setVideo(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (description.trim() === '') {
      Alert.alert('Missing Information', 'Please enter a description.');
      return;
    }

    if (image === null && video === null) {
      Alert.alert('Missing Information', 'Please capture an image or record a video.');
      return;
    }

    if (!locationEnabled) {
      Alert.alert(
        'Location Error',
        'Please enable location services for the app to work properly.',
      );
      return;
    }

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location Permission', 'Please enable location access to capture your current location.');
        return;
      }

      //   const locationData = await Location.getCurrentPositionAsync({});

      let locationData = await Location.getCurrentPositionAsync({});
      try {
        if (locationData === null) {
          Alert.alert(
            'Location Error',
            'Unable to retrieve your current location. Please make sure location services are enabled.',
          );
          //   return;
        } else {
          // Rest of the form submission logic...
          // Perform form submission logic here
          setLocation(locationData);


          const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${locationData.coords.latitude},${locationData.coords.longitude}`;

          // Open Google Maps
          // Linking.openURL(googleMapsLink);



          console.log('link :', googleMapsLink)
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

        }
      } catch (error) {
        Alert.alert('Location Error', 'Failed to retrieve Your location');
        console.log(error)
      }




    } catch (error) {
      Alert.alert('Location Error', 'Failed to retrieve your location.');
      console.error(error);
    }
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
