import { ActivityIndicator } from 'expo';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, Image, Alert, Linking, TouchableOpacity, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { registerComplaint } from '../../redux/features/complaints/complaintSlice';
// import * as FileSystem from 'expo-file-system';
// import { uploadMedia } from './redux/mediaSlice';

// import videoImage from '../../assets/icon.png';
import videoImage from '../../assets/icon.png';





const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
// const upload_perset = process.env.CLOUDINARY_UPLOAD_PERSET;
const upload_perset = "pivigilperset";
// const img_cloud_path = process.env.CLOUDINARY_IMG_PATH;
const img_cloud_path = "https://api.cloudinary.com/v1_1/pivigil/image/upload";
// const video_cloud_path = process.env.CLOUDINARY_VIDEO_PATH;
const video_cloud_path = "https://api.cloudinary.com/v1_1/pivigil/video/upload";

export default function Home() {
    const dispatch = useDispatch();

    const [description, setDescription] = useState('');
    const [landmark, setLandmark] = useState('');
    const [location, setLocation] = useState(null);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // const [locationError, setLocationError] = useState(false);
    const [complaintImage, setComplaintImage] = useState(null);
    // const [complaintImage1, setComplaintImage1] = useState(null);
    const [complaintVideo, setComplaintVideo] = useState(null);

    useEffect(() => {
        getLocationPermission();
        getMediaPermission();
        checkLocationServices();
    }, []);


    const getLocationPermission = async () => {
        // let { status } = await Location.requestForegroundPermissionsAsync();
        let { status } = await Location.requestForegroundPermissionsAsync({
            accuracy: Location.Accuracy.High,
            // androidAccuracy: Location.Accuracy.High,
        });
        if (status !== 'granted') {
            Alert.alert('Location Permission', 'Please enable location access to capture your current location.');
        } else {
            try {
                let locationData = await Location.getCurrentPositionAsync({});
                setLocation(locationData);
                // let locationData = await Location.getCurrentPositionAsync({
                //   accuracy: Location.Accuracy.High,
                // });
                // setLocation(locationData);

            } catch (error) {
                Alert.alert('Location Error', 'Failed to retrieve your location');
                console.log(error.message);
            }
        }
    };

    const checkLocationServices = async () => {
        const enabled = await Location.hasServicesEnabledAsync();
        setLocationEnabled(enabled);

        if (!enabled) {
            Alert.alert(
                'Location Services Disabled',
                'Please enable location services for the app to work properly.',
                // [
                //   {
                //     text: 'Open Settings',
                //     onPress: openLocationSettings,
                //   },
                // ]
                getLocationPermission()
            );
        }
    };

    const openLocationSettings = () => {
        Linking.openSettings();
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
            base64: false,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setComplaintImage(result.assets[0].uri);
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
            setComplaintVideo(result.assets[0].uri);
        }
    };




    const handleSubmit = async () => {

        if (description.trim() === '') {
            Alert.alert('Missing Information', 'Please enter a description.');
            return;
        }
        if (landmark.trim() === '') {
            Alert.alert('Missing Information', 'Please enter a LandMark.');
            return;
        }

        // if (complaintImage === null && complaintVideo === null) {
        //   Alert.alert('Missing Information', 'Please capture an image or record a video.');
        //   return;
        // }

        if (!locationEnabled) {
            // Alert.alert('Location Error', 'Please enable location services for the app to work properly.');
            getLocationPermission();
            return;
        }

        let imgURL = "";
        let videoURL = "";
        let glink = `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`;




        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Location Permission', 'Please enable location access to capture your current location.');
                return;
            }

            if (location === null) {
                Alert.alert('Location Error', 'Unable to retrieve your current location. Please make sure location services are enabled.');
                getLocationPermission();
                return;
            }

            try {
                // setIsLoading(true)

                // Uploading image to cloudinary 
                if (complaintImage != null) {
                    const formData = new FormData();
                    formData.append('file', { uri: complaintImage, name: 'image.jpg', type: 'image/jpeg' });
                    formData.append("cloud_name", cloud_name);
                    formData.append('upload_preset', upload_perset);

                    const response = await fetch(img_cloud_path, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    imgURL = data.url;
                }


                // Uploading video to cloudinary 
                if (complaintVideo != null) {
                    const videoFormData = new FormData();
                    videoFormData.append('file', { uri: complaintVideo, name: 'video.mp4', type: 'video/mp4' });
                    videoFormData.append("cloud_name", cloud_name);
                    videoFormData.append('upload_preset', upload_perset);

                    const response = await fetch(video_cloud_path, {
                        method: 'POST',
                        body: videoFormData,
                    });
                    const data = await response.json();
                    videoURL = data.url;
                }
            } catch (error) {
                // setIsLoading(false)
                console.log(error.message)
            };




            const userData = {
                imgURL,
                videoURL,
                location,
                description,
                landmark,
                glink,
            };

            console.log("user Data", userData)

            // if (isLoggedIn) {
            //   dispatch(registerComplaint(userData))
            // } else {

            //   dispatch(toannoynimous(userData))
            // }



            // Reset form after submission
            setDescription('');
            setLandmark('');
            setLocation(null);
            setComplaintImage(null);
            setComplaintVideo(null);
            setIsLoading(false)

        } catch (error) {
            // setIsLoading(false)
            Alert.alert('Error', 'Failed to submit the form.');
            console.error(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>


            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter landmark"
                    value={landmark}
                    onChangeText={text => setLandmark(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                />


                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={captureImage} style={styles.cameraButton}>
                        <Image source={videoImage} style={styles.image} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={recordVideo} style={styles.cameraButton}>
                        <Image source={videoImage} style={styles.image} />
                        <Text>(30s max)</Text>
                    </TouchableOpacity>
                </View>


                <Button title="Submit" onPress={handleSubmit} />

                {/* Render the captured image or video */}
                {complaintImage && <Image source={{ uri: complaintImage }} style={styles.media} />}
                {complaintVideo && (
                    <Video
                        source={{ uri: complaintVideo }}
                        style={styles.media}
                        shouldPlay={false}
                        isLooping={true}
                        resizeMode="contain"
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
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
        height: 300,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cameraButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
});
