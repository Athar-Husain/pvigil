// import { ActivityIndicator } from "expo";
// import { ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  Linking,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { showMessage, hideMessage } from "react-native-flash-message";
// import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import { Asset } from "expo";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
// import KmlParser from "kml-parser";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  anonymousComplaint,
  registerComplaint,
} from "../../../redux/features/complaints/complaintSlice";
// import kmlData from "../../Utils/KML_Ballari_City.kml";
// Import XMLHttpRequest

import { BASE_API_URL } from "../../../Utils/utils";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../../redux/features/auth/authSlice";
import { uploadImage } from "../../../Utils/helper";

export default function ComplaintCamera() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [landmark, setLandmark] = useState("");
  const [location, setLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  // const [issLoading, setIssLoading] = useState(false);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // const [locationError, setLocationError] = useState(false);
  const [complaintImage, setComplaintImage] = useState(null);
  const [showComplaintImage, setShowComplaintImage] = useState(null);
  //   const [complaintVideo, setComplaintVideo] = useState(null);

  // useEffect(() => {
  //   getLocationPermission();
  //   getMediaPermission();
  //   checkLocationServices();
  //   // Location;
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getLocationPermission();
    // await getMediaPermission();
    await checkLocationServices();
    // handleLocationCheck();
  };

  // useEffect(() => {
  //   // Check if location is not null before dispatching
  //   if (location !== null) {
  //     handleSubmit();
  //   }
  // }, [location]);

  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.authComplaint
  );

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync({
      accuracy: Location.Accuracy.High,
    });

    if (status !== "granted") {
      Alert.alert(
        "Location Permission",
        "Please enable location access to capture your current location."
      );
      return; // Added return statement to handle permission not granted
    }

    try {
      let locationData = await Location.getCurrentPositionAsync({});
      if (locationData && locationData.coords) {
        setLocation(locationData);
      } else {
        Alert.alert("Location Error", "Failed to retrieve your location");
        showMessage({
          message: "Location Error",
          description: "Failed to retrieve your location!",
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        return;
      }
    } catch (error) {
      // Alert.alert("Location Error", "Failed to retrieve your location");
      showMessage({
        message: "Location Error",
        description: "Failed to retrieve your location!",
        type: "danger",
        duration: 3000,
        position: "top",
        style: { justifyContent: "center", alignItems: "center" },
      });
      console.log(error.message);
      return;
    }
  };

  const checkLocationServices = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    setLocationEnabled(enabled);

    if (!enabled) {
      Alert.alert(
        "Location Services Disabled",
        "Please enable location services for the app to work properly."
        // [
        //   {
        //     text: 'Open Settings',
        //     onPress: openLocationSettings,
        //   },
        // ]
      );
      // getLocationPermission();
    }
  };

  const openLocationSettings = () => {
    Linking.openSettings();
  };

  const getMediaPermission = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Media Library Permission",
        "Please enable media access to capture images or videos."
      );
    }
  };

  const captureMedia = async (type) => {
    let { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== "granted") {
      showMessage({
        message: "Permission Denied",
        description: "Please grant permission to access media.",
        type: "danger",
      });
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: false,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setMedia(result.assets[0].uri);
      setComplaintImage(result.assets[0].uri);
      setShowComplaintImage(result.assets[0].uri);
      setMediaType(type);
    }
  };
  // console.log("Complaint image in the capture media", complaintImage);

  const handleMediaUpload = async (formData, mediaType) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          console.log(`Upload progress for ${mediaType}: ${percentCompleted}%`);
          // Here, you can update the progress in your state or any other UI element
        }
      });

      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data.url);
        } else {
          reject(new Error("Failed to upload media"));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Failed to upload media"));
      };

      xhr.open(
        "POST",
        mediaType === "image" ? img_cloud_path : video_cloud_path
      );
      xhr.send(formData);
    });
  };

  const handleSubmit = async () => {
    if (description.trim() === "" || landmark.trim() === "") {
      showMessage({
        message: "Missing Information",
        description: "Please fill in all fields.",
        type: "danger",
      });
      return;
    }
    if (!complaintImage) {
      showMessage({
        message: "Missing Media",
        description: "Please capture an image.",
        type: "danger",
      });
      return;
    }
    // setLoading(true);

    const locationStatus = await Location.getForegroundPermissionsAsync();

    if (locationStatus.status !== "granted") {
      // Alert.alert("Location Error", "Location permission is not granted.");
      showMessage({
        message: "Location Error",
        description: "Failed to retrieve your location!",
        type: "warning",
        duration: 3000,
        position: "top",
        style: { justifyContent: "center", alignItems: "center" },
      });
      // setLoading(false);
      return;
    }

    try {
      let locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Set high accuracy
      });

      // let locationData = await Location.getCurrentPositionAsync({
      //   accuracy: Location.Accuracy.BestForNavigation, // Highest accuracy
      //   maximumAge: 1000, // Maximum age of cached location in milliseconds
      //   timeout: 10000, // Maximum time to wait for location in milliseconds
      // });
      if (!locationData || !locationData.coords) {
        // setLocation(locationData);
        Alert.alert(
          "Location Error",
          "Unable to retrieve your current location. Please make sure location services are enabled second."
        );
        return;
      }
      setLocation(locationData);
    } catch (error) {
      Alert.alert("Location Error", "Failed to retrieve your location");
      showMessage({
        message: "Location Error",
        description: "Failed to retrieve your location!",
        type: "danger",
        duration: 3000,
        position: "top",
        style: { justifyContent: "center", alignItems: "center" },
      });
      console.log(error.message);
      // setLoading(false);
      return;
    }
    setLoading(true);

    let imageURL = "";
    let videoURL = "";
    let glink = "";
    let ward_no = "";

    try {
      if (location != null) {
        let googleLink = `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`;
        // 76.92144279999999,15.1393932
        // let googleLink = `https://www.google.com/maps/search/?api=1&query=${76.92144279999999},${15.1393932}`;
        glink = googleLink;
      }

      try {
        const response = await fetch(
          `${BASE_API_URL}/api/location/validate-location`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }),
          }
        );

        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to validate location");
        }

        const data = await response.json();

        console.log("data in location api", data.wardNo);

        if (!data.isInsideCityLimits) {
          // The user is outside the city limits
          Alert.alert(
            "Location Restriction",
            "Please use this app within the city limits."
          );
          setLoading(false);
          return;
        } else {
          ward_no = data.wardNo;
        }
      } catch (error) {
        setLoading(false);
        console.log("Error in api location", error);
        return;
      }

      if (complaintImage !== null) {
        try {
          imageURL = await uploadImage(complaintImage, "complaintsImages");
        } catch (error) {
          console.error(error.message);
          setLoading(false);
          return;
        }
      }

      const userData = {
        imageURL,
        // complaintImage,
        location,
        description,
        landmark,
        glink,
        ward_no,
      };

      {
        isLoggedIn && user
          ? dispatch(registerComplaint(userData))
          : dispatch(anonymousComplaint(userData));
      }

      console.log("user data in Complaint Camera", userData);

      // Reset form after submission
      setDescription("");
      setLandmark("");
      // setLocation(null);
      setMedia(null);
      setLoading(false);
      setComplaintImage(null);
      setShowComplaintImage(null);

      // showing succesfully submited the form
    } catch (error) {
      setLoading(false);
      showMessage({
        message: "Error",
        description: "Failed to submit the form.",
        type: "danger",
      });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isLoading || loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
          {uploadProgress > 0 && (
            <View style={styles.uploadProgressContainer}>
              <Text style={styles.uploadProgressText}>
                Uploading: {uploadProgress}%
              </Text>
            </View>
          )}
        </View>
      ) : (
        // <ActivityIndicator />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter landmark"
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              // onPress={captureImage}
              onPress={() => captureMedia("image")}
              style={styles.cameraButton}
            >
              {/* <Image source={videoImage} style={styles.image} /> */}
              <MaterialCommunityIcons
                name="camera"
                size={50}
                color="#007bff"
                // style={styles.icon}
              />
              <Text style={styles.cameraButtonText}>Capture Image</Text>
            </TouchableOpacity>
          </View>

          {showComplaintImage && (
            <LinearGradient
              colors={["#e0e0e0", "#f0f0f0"]}
              style={styles.mediaContainer}
            >
              {/* {mediaType === "image" && ( */}
              <Image
                source={{ uri: showComplaintImage }}
                style={styles.media}
              />
              {/* )} */}
            </LinearGradient>
          )}

          {uploadProgress > 0 && (
            <View style={styles.uploadProgressContainer}>
              <Text style={styles.uploadProgressText}>
                Uploading: {uploadProgress}%
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cameraButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  helperText: {
    fontSize: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold", // Added fontWeight for bold text
    // fontSize: 5,
    textAlign: "center",
    marginTop: 5,
  },
  cameraButtonText: {
    color: "black",
    textAlign: "center",
    marginTop: 2,
  },
  mediaContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  uploadProgressContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  uploadProgressText: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
