import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  getComplaintData,
  updateComplaintByOfficials,
} from "../../../redux/features/complaints/complaintSlice";
import {
  uploadImage,
  uploadVideo,
  validateLocation,
} from "../../../Utils/helper";
import { showMessage } from "react-native-flash-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AssignedComplaintData = () => {
  const route = useRoute(); // Get the route object

  const { complaint } = route.params;
  // console.log("id of prams", complaint);
  let id = complaint._id;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [raidImage, setRaidImage] = useState(null);
  const [receiptImage, setReceiptImage] = useState(null);
  const [raidVideo, setRaidVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedAction, setSelectedAction] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [newSenseCreator, setNewSenseCreator] = useState({
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

  const [showFullDescription, setShowFullDescription] = useState(false);

  const { isLoading, complaintDetails } = useSelector(
    (state) => state.authComplaint
  );
  // console.log("ComplaintDetails", complaintDetails);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getLocationPermission();
    await getMediaPermission();
    await checkLocationServices();
  };

  useEffect(() => {
    // Fetch complaint data
    dispatch(getComplaintData(id))
      .then(() => {
        // Once data is fetched, set loading to false
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching complaint data:", error);
        setLoading(false); // Set loading to false even in case of an error
      });
  }, [dispatch, id]);

  const complaintData = complaintDetails || {};
  // const complaintData = sampleComplaintDetails || {};
  // console.log("complaint Details", complaintData);
  const handleActionChange = (itemValue) => {
    setSelectedAction(itemValue);
  };

  const handleFieldChange = (fieldName, value) => {
    setNewSenseCreator((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const resetFormFields = () => {
    setSelectedAction("");
    setPenaltyAmount("");
    setSelectedAction("");
    setSelectedReason("");
    setComment("");
    setRaidImage(null);
    setRaidVideo(null);
    setReceiptImage(null);
    setNewSenseCreator({
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
    });
  };

  const checkLocationServices = async () => {
    const enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services Disabled",
        "Please enable location services for the app to work properly."
        // [
        //   {
        //     text: "Open Settings",
        //     onPress: openLocationSettings,
        //   },
        // ]
      );
    }
  };

  const openLocationSettings = () => {
    Linking.openSettings();
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
        // setLocation(locationData);
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
      setRaidImage(result.assets[0].uri);
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
      setRaidVideo(result.assets[0].uri);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const mediaContent = complaintData?.imageURL ? (
    <Image
      // src={complaint?.imageURL}
      source={{ uri: complaintData?.imageURL }}
      alt="Complaint_image"
      // style={useStyles.media}
      style={styles.media}
    />
  ) : complaintData?.videoURL ? (
    <>
      <View style={styles.complaintCard}>
        <Text>Raid Video</Text>
        <Video
          source={{ uri: complaintData?.videoURL }}
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
      {/* <Video
        src={complaint?.videoURL}
        title="Complaint_Video"
        controls
        // style={useStyles.media}
        style={styles.media}
      /> */}
    </>
  ) : null;

  console.log("medi COntent", mediaContent);

  const handleSubmit = async () => {
    const newErrors = { ...errors };
    let isValid = true;

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

    // if (selectedAction === "Penalty Raised" && !penaltyAmount) {
    //   newErrors.penaltyAmount = "Penalty amount is required";
    //   isValid = false;
    // } else {
    //   newErrors.penaltyAmount = "";
    // }

    if (selectedAction !== "Rejected By HI") {
      const nuisanceFields = [
        { field: "name", label: "Name" },
        { field: "firm_name", label: "Firm Name" },
        { field: "gstin", label: "GSTIN" },
        { field: "trade_No", label: "Trade Number" },
        { field: "phone", label: "Phone" },
      ];

      nuisanceFields.forEach(({ field, label }) => {
        if (!newSenseCreator[field]) {
          newErrors[field] = `${label} is required`;
          isValid = false;
        } else {
          newErrors[field] = "";
        }
      });
    }
    if (!isValid) {
      Alert.alert("Missing Info", "Please Fill the Details");
      return;
    }

    // Repeat the above pattern for other fields...

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

    // setLocation(locationData);
    setLoading(true);
    setUploadProgress(0);

    let RimageURL = "";
    let receiptImageURL = "";
    const googleLink = `https://www.google.com/maps/search/?api=1&query=${locationData.coords.latitude},${locationData.coords.longitude}`;
    let RvideoURL = "";
    let Rglink = googleLink;
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

    // if (ward_no !== complaintData.ward_no) {
    //   Alert.alert(
    //     "Location Restriction",
    //     "You are not in the COmplaints Location"
    //   );
    //   setLoading(false);
    //   return;
    // }

    if (raidVideo !== null) {
      try {
        RvideoURL = await uploadVideo(
          raidVideo,
          "complaintActionVideos",
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

    if (raidImage !== null) {
      try {
        RimageURL = await uploadImage(raidImage, "complaintActionImages");
      } catch (error) {
        console.error(error.message);
        setLoading(false);
        return;
      }
    }
    if (receiptImage !== null) {
      try {
        receiptImageURL = await uploadImage(
          receiptImage,
          "complaintActionImages"
        );
      } catch (error) {
        console.error(error.message);
        setLoading(false);
        return;
      }
    }

    const userData = {
      action_initiated: selectedAction,
      penaltyAmount: penaltyAmount,
      name: newSenseCreator.name,
      firm_name: newSenseCreator.firm_name,
      gstin: newSenseCreator.gstin,
      trade_No: newSenseCreator.trade_No,
      phone: newSenseCreator.phone,
      commentByHI: comment,
      selectedReason,
      RimageURL,
      RvideoURL,
      receiptImageURL,
      id,
    };

    if (isValid) {
      try {
        // Dispatch the action to update the complaint
        await dispatch(updateComplaintByOfficials(userData));
        console.log("Complaint updated successfully", userData);

        // Refresh the complaint data after update
        dispatch(getComplaintData(id));

        // setComplaintUpdated(true); // Set the flag to true
        setLoading(false);
        resetFormFields();
      } catch (error) {
        console.error("Error updating complaint:", error);
        // Handle error as needed
        setLoading(false);
        return;
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Text>...Loading</Text>
      ) : (
        <>
          <LinearGradient
            colors={["#FFC3A0", "#FFAFBD"]}
            style={styles.container}
          >
            <ScrollView>
              {/* <View style={styles.container}> */}
              <Text style={styles.header}>Assigned Complaints</Text>

              <View style={styles.complaintCard}>
                <Text style={styles.complaintHeader}>Complaint Details</Text>

                <View style={styles.complaintDetailItem}>
                  <Text style={styles.detailLabel}>User Email:</Text>
                  <Text style={styles.detailValue}>
                    {complaintData?.user_email}
                  </Text>
                </View>

                <View style={styles.complaintDetailItem}>
                  <Text style={styles.detailLabel}>Complaint Status:</Text>
                  <Text style={styles.detailValue}>
                    {complaintData?.complaint_status}
                  </Text>
                </View>

                <View style={styles.complaintDetailItem}>
                  <Text style={styles.detailLabel}>Complaint ID:</Text>
                  <Text style={styles.detailValue}>
                    {complaintData?.complaint_id}
                  </Text>
                </View>
                <View style={styles.complaintDetailItem}>
                  <Text style={styles.detailLabel}>Ward No :</Text>
                  <Text style={styles.detailValue}>
                    {complaintData?.ward_no}
                  </Text>
                </View>
                <View style={styles.complaintDetailItem}>
                  <Text style={styles.detailLabel}>Landmark:</Text>
                  <Text style={styles.detailValue}>
                    {complaintData?.landmark}
                  </Text>
                </View>
                {complaintData?.descriptionByAdmin && (
                  <>
                    <View style={styles.complaintDetailItem}>
                      <Text style={styles.detailLabel}>Comment By Admin:</Text>
                      <Text style={styles.detailValue}>
                        {complaintData?.descriptionByAdmin}
                      </Text>
                    </View>
                  </>
                )}

                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionLabel}>Description:</Text>
                  <View style={styles.descriptionContainer}>
                    {complaintData && complaintData.description && (
                      <Text style={styles.descriptionText}>
                        {showFullDescription
                          ? complaintData?.description
                          : complaintData?.description.slice(0, 300) + "..."}
                      </Text>
                    )}

                    <TouchableWithoutFeedback onPress={toggleDescription}>
                      <Text style={styles.showMoreLess}>
                        {showFullDescription ? "Show Less" : "Show More"}
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                {/* <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionLabel}>Comment BY Admin:</Text>
                  <View style={styles.descriptionContainer}>
                    {complaintData && complaintData.descriptionByAdmin && (
                      <Text style={styles.descriptionText}>
                        {showFullDescription
                          ? complaintData?.descriptionByAdmin
                          : complaintData?.descriptionByAdmin.slice(0, 300) +
                            "..."}
                      </Text>
                    )}

                    <TouchableWithoutFeedback onPress={toggleDescription}>
                      <Text style={styles.showMoreLess}>
                        {showFullDescription ? "Show Less" : "Show More"}
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View> */}

                {complaint?.imageURL && (
                  <>
                    <Image
                      // src={complaint?.imageURL}
                      source={{ uri: complaint.imageURL }}
                      alt="Complaint_image"
                      style={styles.media}
                    />
                  </>
                )}

                {mediaContent && (
                  <>
                    <View>{mediaContent}</View>
                  </>
                )}
              </View>

              {complaintData?.raid ? (
                <>
                  {complaintData?.raid && (
                    <View style={styles.complaintCard}>
                      <Text style={styles.inputHeader}>
                        Nuisance Creator Details
                      </Text>

                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Action Taken :</Text>
                        <Text style={styles.detailValue}>
                          {
                            complaintData.raid?.nuisance_creator
                              ?.action_Initiated
                          }
                        </Text>
                      </View>

                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Name:</Text>
                        <Text style={styles.detailValue}>
                          {complaintData.raid?.nuisance_creator?.name}
                        </Text>
                      </View>

                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Firm Name:</Text>
                        <Text style={styles.detailValue}>
                          {complaintData.raid?.nuisance_creator?.firm_name}
                        </Text>
                      </View>

                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>GSTIN:</Text>
                        <Text style={styles.detailValue}>
                          {complaintData.raid?.nuisance_creator?.gstin}
                        </Text>
                      </View>

                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Trade Number:</Text>
                        <Text style={styles.detailValue}>
                          {complaintData.raid?.nuisance_creator?.trade_No}
                        </Text>
                      </View>

                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>Phone:</Text>
                        <Text style={styles.detailValue}>
                          {complaintData.raid?.nuisance_creator?.phone}
                        </Text>
                      </View>

                      {/* Repeat for other fields... */}
                    </View>
                  )}
                </>
              ) : (
                <>
                  <View style={styles.mediaButtonsContainer}>
                    <TouchableOpacity
                      onPress={captureImage}
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
                          Capture Image
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={recordVideo}
                      style={styles.mediaButton}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="video"
                          size={24}
                          color="white"
                        />
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.mediaButtonText}>
                            Record Video
                          </Text>
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
                      <Picker.Item
                        label="Notice Issued"
                        value="Notice Issued"
                      />
                      <Picker.Item
                        label="Penalty Raised"
                        value="Penalty Raised"
                      />
                      <Picker.Item
                        label="Legal Action Issued"
                        value="Legal Action Issued"
                      />
                      <Picker.Item label="Shop Seized" value="Shop Seized" />
                      <Picker.Item label="Reject" value="Rejected By HI" />
                    </Picker>
                    {Boolean(errors.selectedAction) && (
                      <Text style={styles.errorText}>
                        {errors.selectedAction}
                      </Text>
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
                            style={styles.input}
                            keyboardType="numeric" // Only allow numeric input
                          />
                          {Boolean(errors.penaltyAmount) && (
                            <Text style={styles.errorText}>
                              {errors.penaltyAmount}
                            </Text>
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

                  {selectedAction !== "Rejected By HI" && (
                    <>
                      <View style={styles.dropdownContainer}>
                        <Picker
                          selectedValue={selectedReason}
                          onValueChange={(itemValue) =>
                            setSelectedReason(itemValue)
                          }
                          style={styles.dropdown}
                        >
                          <Picker.Item label="Select Reason" value="" />
                          <Picker.Item
                            label="SUP Violations"
                            value="SUP Violations"
                          />
                          <Picker.Item label="Littering" value="Littering" />
                          <Picker.Item label="Both" value="Both" />
                          <Picker.Item label="Other" value="Other" />
                        </Picker>
                      </View>
                    </>
                  )}

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputHeader}>Comments:</Text>
                    <TextInput
                      placeholder="Enter comments"
                      value={comment}
                      onChangeText={setComment}
                      style={styles.commentinput}
                      multiline // Allow multiple lines for comments
                    />
                  </View>

                  {raidImage && (
                    <>
                      <View style={styles.complaintCard}>
                        <Text>Raid Image</Text>
                        <Image
                          source={{ uri: raidImage }}
                          style={styles.media}
                        />
                      </View>
                    </>
                  )}

                  {raidVideo && (
                    <>
                      <View style={styles.complaintCard}>
                        <Text>Raid Video</Text>
                        <Video
                          source={{ uri: raidVideo }}
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
                    </>
                  )}

                  {selectedAction !== "Rejected By HI" && (
                    <>
                      <View style={styles.complaintCard}>
                        {/* <Text style={styles.header}>Assigned Complaints</Text> */}
                        <View style={styles.inputContainer}>
                          <Text style={styles.inputHeader}>
                            Nuisance Creator Details
                          </Text>
                          <TextInput
                            placeholder="Name"
                            value={newSenseCreator.name}
                            onChangeText={(value) =>
                              handleFieldChange("name", value)
                            }
                            style={styles.input}
                          />
                          {Boolean(errors.name) && (
                            <Text style={styles.errorText}>{errors.name}</Text>
                          )}

                          <TextInput
                            placeholder="Firm Name"
                            value={newSenseCreator.firm_name}
                            onChangeText={(value) =>
                              handleFieldChange("firm_name", value)
                            }
                            style={styles.input}
                          />
                          {Boolean(errors.firm_name) && (
                            <Text style={styles.errorText}>
                              {errors.firm_name}
                            </Text>
                          )}
                          <TextInput
                            placeholder="GSTIN"
                            value={newSenseCreator.gstin}
                            onChangeText={(value) =>
                              handleFieldChange("gstin", value)
                            }
                            style={styles.input}
                          />
                          {Boolean(errors.gstin) && (
                            <Text style={styles.errorText}>{errors.gstin}</Text>
                          )}
                          <TextInput
                            placeholder="Trade Number"
                            value={newSenseCreator.trade_No}
                            onChangeText={(value) =>
                              handleFieldChange("trade_No", value)
                            }
                            style={styles.input}
                          />
                          {Boolean(errors.trade_No) && (
                            <Text style={styles.errorText}>
                              {errors.trade_No}
                            </Text>
                          )}

                          <TextInput
                            placeholder="Phone"
                            value={newSenseCreator.phone}
                            onChangeText={(value) =>
                              handleFieldChange("phone", value)
                            }
                            style={styles.input}
                          />
                          {Boolean(errors.phone) && (
                            <Text style={styles.errorText}>{errors.phone}</Text>
                          )}
                        </View>
                      </View>
                    </>
                  )}

                  {receiptImage && (
                    <>
                      <View style={styles.complaintCard}>
                        <Text>Penalty Receipt Image</Text>
                        <Image
                          source={{ uri: receiptImage }}
                          style={styles.media}
                        />
                      </View>
                    </>
                  )}

                  <TouchableOpacity
                    style={styles.submitButtonContainer}
                    onPress={handleSubmit}
                  >
                    <LinearGradient
                      colors={["#00d4ff", "#0050ff"]}
                      style={styles.ButtonGradient}
                    >
                      <Text style={styles.submitButtonText}>
                        Update Complaint
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </LinearGradient>
        </>
      )}
    </SafeAreaView>
  );
};

export default AssignedComplaintData;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // width: "90%",
    // alignItems: "center",
    width: "100%",
    padding: 10,
    // justifyContent: "center",
    // width: "90%",
  },
  scrollContent: {
    // flexGrow: 1,
    alignItems: "center",
    // alignSelf: "center",
    // paddingVertical: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
  },
  dropdown: {
    height: 50,
    width: "100%",
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  commentinput: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,

    // margin: 5,
    borderTopWidth: 5,
    borderBottomWidth: 5, // Adjust the thickness of the border as needed
    borderBottomColor: "#FFAFBD",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    borderTopWidth: 5,
    borderBottomWidth: 5, // Adjust the thickness of the border as needed
    borderBottomColor: "#FFAFBD", // Use the desired color for the border
  },
  complaintCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 5,
  },
  complaintHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center", // Center-align the text within the element
    alignSelf: "center", // Center the whole element within its container
    marginBottom: 10,
  },
  complaintDetailItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  descriptionContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    // maxHeight: 200,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  showMoreLess: {
    color: "#007AFF", // Change to your desired color
    marginTop: 5,
    textAlign: "right",
  },
  descriptionText: {
    padding: 10,
  },

  //   descriptionContainer: {
  //     height: 100, // Adjust the height as needed
  //     paddingHorizontal: 10,
  //     borderWidth: 1, // Add a border for better visibility
  //     borderColor: "gray", // Use the desired color for the border
  //     borderRadius: 8,
  //     marginBottom: 10,
  //   },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
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
  submitButton: {
    backgroundColor: "#FFAFBD",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  submitButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  ButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  updatedDetailsCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 5,
  },
  updatedDetailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Adjust color to your preference
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#555", // Adjust color to your preference
  },
  detailValue: {
    flex: 1,
    color: "#000", // Adjust color to your preference
  },
});
