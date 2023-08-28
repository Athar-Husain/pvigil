import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Image, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';

export default function AboutScreen() {
  const [description, setDescription] = useState('');
  const [complaintNumber, setComplaintNumber] = useState('');
  const [location, setLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

   const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        throw new Error('Location permission denied');
      }

      const currentLocation = await Location.getCurrentPositionAsync();
      // setLocation(currentLocation);
    } catch (error) {
      Alert.alert('Location Error', 'Unable to retrieve your current location. Please make sure location services are enabled.');
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  useEffect(() => {
    getLocationPermission();
    getMediaPermission();
    getLocation();
    checkLocationServices();
    checkLocationPermission();
  }, []);


  const checkLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      setLocationError(true);
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    setLocation(locationData);
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

  const handlePermissionResult = ({ status }) => {
    if (status === 'granted') {
      setLocationEnabled(true);
      startLocationUpdates();
    } else {
      Alert.alert(
        'Location Services',
        'Location permission was not granted. The form submission cannot be completed without location access.'
      );
    }
  };

    const startLocationUpdates = async () => {
    try {
      await Location.startForegroundServiceAsync();

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (location) => {
          // Handle the updated location data here
          setLocation(location)
        }
      );
    } catch (error) {
      Alert.alert('Location Error', 'Failed to start location updates.');
      console.log(error);
    }
  };

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location Permission', 'Please enable location access to capture your current location.');
    }
  };

  const getMediaPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Media Library Permission', 'Please enable media access to capture images or videos.');
    }
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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

    const { status } = await Location.getBackgroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Location Permission",
        "Please enable location access to capture your current Location"
      );
      return;
    }

    const hasLocationServicesEnabled = await Location.hasServicesEnabledAsync();
    if (!hasLocationServicesEnabled) {
      Alert.alert(
        'Location Services',
        "Please enable location services for the app to work properly",
         [
        { text: 'OK', onPress: () => openLocationSettings() }
      ]
      );
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    setLocation(locationData);

    if (location === null) {
      Alert.alert(
        "Location Error",
        "unable to retrieve your current location. Please make sure location services are enabled"
      );
      return;
    }

    //  if (!locationEnabled) {
    //   Alert.alert(
    //     'Location Error',
    //     'Please enable location services for the app to work properly.',
    //   );
    //   return;
    // }
    //  if (locationError) {
    //   Alert.alert(
    //     'Location Error',
    //     'Please enable location services for the app to work properly.',
    //     [
    //       { text: 'OK', onPress: () => openLocationSettings() }
    //     ]
    //   );
    //   return;
    // }

    // if (!location) {
    //   setLocationError(true);
    //   return;
    // }

    // if (location === null) {
    //   Alert.alert('Location Error', 'Unable to retrieve your current location.  Please make sure location services are enabled',
      
    //   );
    //   getLocationPermission();
    //   return;
    // }

     // Submit the form and get the complaint number from the server
    const complaintNumberFromServer = 'ABC123'; // Replace with the actual complaint number from the server

    setComplaintNumber(complaintNumberFromServer);

    Alert.alert(
      'Form Submitted',
      `Thank you for your submission! Your complaint number is ${complaintNumberFromServer}`,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]
    );



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
    // flex: 1,
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
