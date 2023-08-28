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
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
// import KmlParser from "kml-parser";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { XMLHttpRequest } from "react-native";
import {
  uploadImage,
  uploadVideo,
  validateLocation,
} from "../../../Utils/helper";
import { registerRaid } from "../../../redux/features/officials/RaidsSlice";

export default function NewRaid() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [landmark, setLandmark] = useState("");
  const [location, setLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [nuisanceCreator, setNuisanceCreator] = useState({
    name: "",
    firm_name: "",
    gstin: "",
    trade_No: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    firm_name: "",
    gstin: "",
    trade_No: "",
    phone: "",
    penaltyAmount: "",
    selectedAction: "",
  });

  const [complaintImage, setComplaintImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [complaintVideo, setComplaintVideo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getLocationPermission();
    await getMediaPermission();
    await checkLocationServices();
  };

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

  const handleFieldChange = (fieldName, value) => {
    setNuisanceCreator((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
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

  const captureImage = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Please enable camera access to capture images."
      );
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

  const handleActionChange = (itemValue) => {
    setSelectedAction(itemValue);
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

  const handleSubmit = async () => {
    try {
      if (description.trim() === "") {
        Alert.alert("Missing Information", "Please enter a description.");
        return;
      }
      if (landmark.trim() === "") {
        Alert.alert("Missing Information", "Please enter a LandMark.");
        return;
      }

      if (complaintImage === null && complaintVideo === null) {
        Alert.alert(
          "Missing Media",
          "Please capture an image or record a video."
        );
        return;
      }

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

      let imageURL = "";
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
        videoURL,
        imageURL,
        location: locationData,
        description,
        landmark,
        glink,
        ward_no,
      };

      console.log("user data in the New Raid", userData);
      // dispatch(registerRaid(userData));

      dispatch(registerRaid(userData));
      // Alert.alert()

      setDescription("");
      setLandmark("");
      setComplaintVideo(null);
      setComplaintImage(null);
      setLoading(false);
      setUploadProgress(0);
    } catch (error) {
      showMessage({
        message: "Error",
        description: "Failed to register Raid!",
        type: "danger",
        duration: 3000,
        position: "top",
        style: { justifyContent: "center", alignItems: "center" },
      });
      console.error("Failed to register Raid", error.message);
      return;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
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
              onPress={captureImage}
              style={styles.cameraButton}
            >
              {/* <Image source={videoImage} style={styles.image} /> */}
              <MaterialCommunityIcons
                name="camera"
                size={20}
                style={styles.icon}
              />
              <Text>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={recordVideo} style={styles.cameraButton}>
              {/* <Image source={videoImage} style={styles.image} /> */}
              <MaterialCommunityIcons
                name="video"
                size={30}
                color="black" /* style={styles.icon} */
              />
              {/* <MaterialCommunityIcons name="video-vintage" size={50} color="black" /> */}
              <Text>Video</Text>
              <Text style={styles.helperText}>(30s max)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedAction}
              onValueChange={handleActionChange}
              style={styles.dropdown}
            >
              <Picker.Item label="Select Action" value="" />
              <Picker.Item label="Notice Issued" value="Notice Issued" />
              <Picker.Item label="Penalty Raised" value="Penalty Raised" />
              <Picker.Item
                label="Legal Action Issued"
                value="Legal Action Issued"
              />
              <Picker.Item label="Shop Seized" value="Shop Seized" />
              <Picker.Item label="Reject" value="Rejected By HI" />
            </Picker>
            {Boolean(errors.selectedAction) && (
              <Text style={styles.errorText}>{errors.selectedAction}</Text>
            )}
          </View>

          {selectedAction === "Penalty Raised" && (
            <View style={styles.inputContainer}>
              {/* here add the symbol ₹ or icon  */}
              {/* <Text>₹</Text> */}
              <TextInput
                placeholder="Enter Penalty Amount ₹"
                value={penaltyAmount}
                onChangeText={setPenaltyAmount}
                style={styles.input}
                keyboardType="numeric" // Only allow numeric input
              />
              {Boolean(errors.penaltyAmount) && (
                <Text style={styles.errorText}>{errors.penaltyAmount}</Text>
              )}
            </View>
          )}

          <View style={styles.complaintCard}>
            {/* <Text style={styles.header}>Assigned Complaints</Text> */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>Nuisance Creator Details</Text>
              <TextInput
                placeholder="Name"
                value={nuisanceCreator.name}
                onChangeText={(value) => handleFieldChange("name", value)}
                style={styles.input}
              />
              {Boolean(errors.name) && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <TextInput
                placeholder="Firm Name"
                value={nuisanceCreator.firm_name}
                onChangeText={(value) => handleFieldChange("firm_name", value)}
                style={styles.input}
              />
              {Boolean(errors.firm_name) && (
                <Text style={styles.errorText}>{errors.firm_name}</Text>
              )}
              <TextInput
                placeholder="GSTIN"
                value={nuisanceCreator.gstin}
                onChangeText={(value) => handleFieldChange("gstin", value)}
                style={styles.input}
              />
              {Boolean(errors.gstin) && (
                <Text style={styles.errorText}>{errors.gstin}</Text>
              )}
              <TextInput
                placeholder="Trade Number"
                value={nuisanceCreator.trade_No}
                onChangeText={(value) => handleFieldChange("trade_No", value)}
                style={styles.input}
              />
              {Boolean(errors.trade_No) && (
                <Text style={styles.errorText}>{errors.trade_No}</Text>
              )}

              <TextInput
                placeholder="Phone"
                value={nuisanceCreator.phone}
                onChangeText={(value) => handleFieldChange("phone", value)}
                style={styles.input}
              />
              {Boolean(errors.phone) && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>
          </View>

          <Button title="Submit" onPress={handleSubmit} />

          {complaintImage && (
            <Image source={{ uri: complaintImage }} style={styles.media} />
          )}
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
});
