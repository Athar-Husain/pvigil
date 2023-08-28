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
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
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
  const [receiptImage, setReceiptImage] = useState(null);

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
        "Please enable location services for the app to work properly.",
        [
          {
            text: "Open Settings",
            onPress: openLocationSettings,
          },
        ]
      );
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

  const captureReceiptImage = async () => {
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
      setReceiptImage(result.assets[0].uri);
    }
  };

  const resetFormFields = () => {
    setSelectedAction("");
    setPenaltyAmount("");
    setNuisanceCreator({
      name: "",
      firm_name: "",
      gstin: "",
      trade_No: "",
      phone: "",
    });
    setErrors({
      name: "",
      firm_name: "",
      gstin: "",
      trade_No: "",
      phone: "",
      penaltyAmount: "",
      selectedAction: "",
      receiptImage: "",
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSubmit = async () => {
    const newErrors = { ...errors };
    let isValid = true;

    try {
      if (landmark.trim() === "") {
        Alert.alert("Missing Information", "Please enter a LandMark.");
        return;
      }
      if (description.trim() === "") {
        Alert.alert("Missing Information", "Please enter a description.");
        return;
      }

      if (complaintImage === null && complaintVideo === null) {
        Alert.alert(
          "Missing Media",
          "Please capture an image or record a video."
        );
        return;
      }

      if (selectedAction === "") {
        newErrors.selectedAction = "Action must be selected";
        isValid = false;
      } else {
        newErrors.selectedAction = "";
      }

      if (selectedAction === "Penalty Raised" && !penaltyAmount) {
        newErrors.penaltyAmount = "Penalty amount is required";
        isValid = false;
      } else {
        newErrors.penaltyAmount = "";
      }
      if (selectedAction === "Penalty Raised" && receiptImage === null) {
        newErrors.receiptImage = "Take Image of Receipt";
        isValid = false;
      } else {
        newErrors.receiptImage = "";
      }

      if (!nuisanceCreator.name) {
        newErrors.name = "Name is required";
        isValid = false;
      } else {
        newErrors.name = "";
      }

      if (!nuisanceCreator.firm_name) {
        newErrors.firm_name = "Firm Name is required";
        isValid = false;
      } else {
        newErrors.firm_name = "";
      }
      if (!nuisanceCreator.gstin) {
        newErrors.gstin = "GTIN Name is required";
        isValid = false;
      } else {
        newErrors.gstin = "";
      }
      if (!nuisanceCreator.trade_No) {
        newErrors.trade_No = "Trade Number is required";
        isValid = false;
      } else {
        newErrors.trade_No = "";
      }
      setErrors(newErrors);

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

      let imageURL = "";
      const googleLink = `https://www.google.com/maps/search/?api=1&query=${locationData.coords.latitude},${locationData.coords.longitude}`;
      let videoURL = "";
      let glink = googleLink;
      let ward_no = "";
      let receiptImageURL = "";

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

      if (complaintVideo !== null) {
        try {
          videoURL = await uploadVideo(
            complaintVideo,
            "raidVideos",
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

      if (receiptImage !== null) {
        try {
          receiptImageURL = await uploadImage(receiptImage, "RaidActionImages");
        } catch (error) {
          console.error(error.message);
          setLoading(false);
          return;
        }
      }

      const userData = {
        landmark,
        description,
        videoURL,
        ward_no,
        location: locationData,
        imageURL,
        videoURL,
        glink,
        reason: selectedReason,
        action_Initiated: selectedAction,
        // action_Initiated: selectedReason,
        amount: penaltyAmount,
        receiptImageURL,
        nuisance_creator: nuisanceCreator,

        // nuisance_creator
      };

      // ... (rest of the code)

      if (isValid) {
        try {
          dispatch(registerRaid(userData));
          console.log("user data in the New Raid", userData);

          setDescription("");
          setLandmark("");
          setComplaintVideo(null);
          setComplaintImage(null);
          setLoading(false);
          resetFormFields();
          setUploadProgress(0);
        } catch (error) {
          setLoading(false);
          console.error("error in the Register raid", error.message);
          return;
        }
      }
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
      setLoading(false);
      return;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loading || loading ? (
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

          <View style={styles.mediaButtonsContainer}>
            <TouchableOpacity onPress={captureImage} style={styles.mediaButton}>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <MaterialCommunityIcons name="camera" size={24} color="white" />
                <Text style={styles.mediaButtonText}>Capture Image</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={recordVideo} style={styles.mediaButton}>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <MaterialCommunityIcons name="video" size={24} color="white" />
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text style={styles.mediaButtonText}>Record Video</Text>
                  <Text style={styles.helperText}>(30s max)</Text>
                </View>
              </View>
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
              <Picker.Item label="Shop Seize" value="Shop Seized" />
              {/* <Picker.Item label="Reject" value="Rejected By HI" /> */}
            </Picker>
            {Boolean(errors.selectedAction) && (
              <Text style={styles.errorText}>{errors.selectedAction}</Text>
            )}
          </View>

          {selectedAction === "Penalty Raised" && (
            <>
              <View style={{ flexDirection: "row" }}>
                <View>
                  {/* here add the symbol ₹ or icon  */}
                  {/* <Text>₹</Text> */}
                  <TextInput
                    placeholder="Enter Penalty Amount ₹"
                    value={penaltyAmount}
                    onChangeText={setPenaltyAmount}
                    style={styles.penaltyinput}
                    keyboardType="numeric" // Only allow numeric input
                  />
                  {Boolean(errors.penaltyAmount) && (
                    <Text style={styles.errorText}>{errors.penaltyAmount}</Text>
                  )}
                </View>

                <View>
                  <View style={styles.mediaButtonsContainer}>
                    <TouchableOpacity
                      onPress={captureReceiptImage}
                      style={styles.mediaButton}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="camera"
                          size={24}
                          color="white"
                        />
                        <Text style={styles.mediaButtonText}>
                          Image of Receipt
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}

          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedReason}
              onValueChange={(itemValue) => setSelectedReason(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="Select Reason" value="" />
              <Picker.Item label="SUP Violations" value="SUP Violations" />
              <Picker.Item label="Littering" value="Littering" />
              <Picker.Item label="Both" value="Both" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <View style={styles.complaintCard}>
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

          {receiptImage && (
            <Image source={{ uri: receiptImage }} style={styles.media} />
          )}
          {complaintImage && (
            <Image source={{ uri: complaintImage }} style={styles.media} />
          )}
          {complaintVideo && (
            <View style={styles.complaintCard}>
              <Text>Raid Video</Text>
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

          <TouchableOpacity
            style={styles.submitButtonContainer}
            disabled={loading}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={["#00d4ff", "#0050ff"]} // Replace with your desired gradient colors
              style={styles.submitButtonGradient}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* <Button title="Submit" onPress={handleSubmit} /> */}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#f0f0f0", // Background color for the container
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "white", // Background color for the component
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "black", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff", // Input field background color
  },
  penaltyinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 10,
    backgroundColor: "#fff",
    margin: 2,
  },
  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#0050ff",
    backgroundColor: "#90CAF9",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  mediaButtonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  media: {
    width: 300,
    height: 300,
    marginTop: 10,
    paddingHorizontal: 10,
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
  icon: {
    marginBottom: 5,
  },
  helperText: {
    fontSize: 10,
    color: "white",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    paddingHorizontal: 10,
    color: "gray",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  submitButtonContainer: {
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16,
    paddingVertical: 10,
  },
  submitButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
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
  // ... (other styles)
});
