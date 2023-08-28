import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
// import { Video } from 'expo-av';


import cameraImage from '../../assets/icon.png';
import videoImage from '../../assets/icon.png';

export default function App() {
  const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
  const cameraRef = useRef(null);
  const videoPlayer = useRef(null);

  const [complaint, setComplaint] = useState('');

  const handleComplaintSubmit = () => {
    // Handle the complaint submission here (e.g., send it to an API)

    // Show an alert to indicate successful submission
    Alert.alert('Complaint Submitted', 'Thank you for submitting your complaint!', [{ text: 'OK' }]);
    
    // Clear the complaint field
    setComplaint('');
    setImage(null);
    setVideo(null); 
  };

    const handleCameraPress = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Camera Permission Required',
          'Please grant camera permissions to use this feature.',
          [{ text: 'OK' }]
        );
        return;
      }

      const imageResult = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!imageResult.canceled) {
        setImage(imageResult.uri);
      }
    } catch (error) {
      console.log('Camera Error:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };
  






      const handleVideoPress = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please grant camera permissions to use this feature.',
          [{ text: 'OK' }]
        );
        return;
      }

      const videoResult = await cameraRef.current.recordAsync({
        maxDuration: 30, // Set the maximum recording duration to 30 seconds
      });

      if (!videoResult.cancelled) {
        setVideo(videoResult.uri);
      }
    } catch (error) {
      console.log('Camera Error:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };

   const handlePlaybackStatusUpdate = (status) => {
    if (!status.isPlaying) {
      // Video playback has ended, reset the video preview
      videoPlayer.current.setPositionAsync(0);
    }
  };


  


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>PVigil</Text>
      <Text style={styles.subtitle}>Report Election-Related Complaints</Text>
      
       <View style={styles.imageContainer}>
         {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <TouchableOpacity onPress={handleCameraPress} style={styles.cameraButton}>
              {/* <Text style={styles.buttonText}>Capture Live Picture</Text> */}
              <Image source={videoImage} style={styles.image} />
        </TouchableOpacity>
      )}
        {/* video section  */}

         {video ? (
        <View>
          <Text>Video Preview:</Text>
          <Video
            source={{ uri: video }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
          />
          <TouchableOpacity onPress={submitVideo} style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit Video</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.back} />
      )}
      {!video && (
        <TouchableOpacity onPress={handleVideoPress} style={styles.captureButton}>
          <Text style={styles.buttonText}>Record Video</Text>
        </TouchableOpacity>
      )}
      </View>
     
      <TextInput
        style={styles.input}
        placeholder="Enter your complaint"
        value={complaint}
        onChangeText={text => setComplaint(text)}
      />
      <Button
      title="Submit"
      onPress={handleComplaintSubmit}
      style={styles.button}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
    imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap:5,
    marginBottom: 20,
  },
    cameraButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
    videoButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
 
  video: {
    width: 100,
    height: 100,
  },
  // image: {
  //   width: 50,
  //   height: 50,
  //   marginHorizontal: 10,
  // },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'gray',
  },
});
