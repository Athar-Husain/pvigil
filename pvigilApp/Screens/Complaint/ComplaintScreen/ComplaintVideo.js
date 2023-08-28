// import { ActivityIndicator } from "expo";
import { ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
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
import { showMessage, hideMessage } from "react-native-flash-message";
// import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
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
import {
  selectIsLoggedIn,
  selectUser,
} from "../../../redux/features/auth/authSlice";
import { uploadVideo, validateLocation } from "../../../Utils/helper";

export default function ComplaintVideo() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [landmark, setLandmark] = useState("");
  const [location, setLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [complaintVideo, setComplaintVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getLocationPermission();
    await getMediaPermission();
    await checkLocationServices();
  };

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
      return;
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
    }
  };

  const checkLocationServices = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    setLocationEnabled(enabled);

    if (!enabled) {
      Alert.alert(
        "Location Services Disabled",
        "Please enable location services for the app to work properly."[
          {
            text: "Open Settings",
            onPress: openLocationSettings,
          }
        ]
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

  const recordVideo = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Please enable camera access to record videos."
      );
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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSubmit = async () => {
    try {
      if (description.trim() === "" || landmark.trim() === "") {
        Alert.alert(
          "Missing Information",
          "Please enter both description and landmark."
        );
        return;
      }

      if (!complaintVideo) {
        Alert.alert("Missing Media", "Please record a video.");
        return;
      }

      const locationStatus = await Location.getForegroundPermissionsAsync();
      if (locationStatus.status !== "granted") {
        showMessage({
          message: "Location Error",
          description: "Failed to retrieve your location!",
          type: "warning",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        return;
      }

      let locationData;
      try {
        locationData = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
      } catch (error) {
        showMessage({
          message: "Location Error",
          description: "Failed to retrieve your location!",
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        console.error("Failed to retrieve your location", error.message);
        return;
      }

      setLocation(locationData);
      setLoading(true);
      setUploadProgress(0);

      const googleLink = `https://www.google.com/maps/search/?api=1&query=${locationData.coords.latitude},${locationData.coords.longitude}`;
      let videoURL = "";
      let glink = googleLink;
      let ward_no = "";

      const locationValidationResult = await validateLocation(
        locationData.coords.latitude,
        locationData.coords.longitude
      );

      if (!locationValidationResult.success) {
        Alert.alert("Location Restriction", locationValidationResult.message);
        setLoading(false);
        return;
      }

      ward_no = locationValidationResult.wardNo;

      if (complaintVideo) {
        try {
          videoURL = await uploadVideo(
            complaintVideo,
            "complaintVideos",
            (progress) => {
              setUploadProgress(progress); // Update the upload progress
            }
          );
        } catch (error) {
          console.error(error.message);
          setLoading(false);
          return;
        }
      }

      const userData = {
        videoURL,
        location: locationData,
        description,
        landmark,
        glink,
        ward_no,
      };

      if (isLoggedIn && user) {
        dispatch(registerComplaint(userData));
      } else {
        dispatch(anonymousComplaint(userData));
      }

      setDescription("");
      setLandmark("");
      setComplaintVideo(null);
      setLoading(false);
      setUploadProgress(0);

      // Success message or navigation to another screen
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "Failed to submit the form.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isLoading || loading ? (
        <>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
            <Text>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <Text>{`Vedio Uploading : ${uploadProgress}`}%</Text>
              )}
            </Text>
          </View>
        </>
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
            <TouchableOpacity onPress={recordVideo} style={styles.cameraButton}>
              <MaterialCommunityIcons
                name="video"
                size={50}
                color="black" /* style={styles.icon} */
              />
              <Text>Video</Text>
              <Text style={styles.helperText}>(30s max)</Text>
            </TouchableOpacity>
          </View>

          <Button title="Submit" onPress={handleSubmit} />

          {complaintVideo && (
            <View>
              <Video
                source={{ uri: complaintVideo }}
                style={styles.media}
                shouldPlay={isPlaying}
                isLooping={true}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={handlePlayPause}
                style={styles.playPauseButton}
              >
                <MaterialCommunityIcons
                  name={isPlaying ? "pause" : "play"}
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
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
    position: "relative",
    width: 300,
    height: 300,
    marginTop: 10,
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    // bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 10,
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
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  progressText: {
    marginRight: 10,
  },
});
