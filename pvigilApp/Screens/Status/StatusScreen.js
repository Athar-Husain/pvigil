// _Created with [AIPRM Prompt "Website Visual Design"](https://www.aiprm.com/prompts/generative/stable-diffusion/1805456555446099968/)_

import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { searchComplaint } from "../../redux/features/complaints/complaintSlice";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StatusScreen = () => {
  const [complaintId, setComplaintId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showComplaint, setShowComplaint] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const complaint = useSelector(
    (state) => state.authComplaint.searchedcomplaint
  );
  const { isLoading } = useSelector((state) => state.authComplaint);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSearch = async () => {
    if (complaintId.length < 10 || complaintId.length > 10) {
      Alert.alert("Should be 10 Digits");
      return;
    }
    // if (complaint.complaint_id === complaintId) {
    //   // Alert.alert("Same ID");
    //   return;
    // }

    try {
      setErrorMessage("");
      setLoading(true);
      await dispatch(searchComplaint(complaintId));
      if (complaint) {
        setLoading(false);
        setShowComplaint(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Complaint ID"
          value={complaintId}
          onChangeText={setComplaintId}
        />
        <TouchableOpacity
          style={styles.searchButtonContainer}
          onPress={handleSearch}
          disabled={loading}
        >
          <LinearGradient
            colors={["#00d4ff", "#0050ff"]} // Replace with your desired gradient colors
            style={styles.searchButtonGradient}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        {showComplaint && (
          <View style={styles.complaintContainer}>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={() => setShowComplaint(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {complaint ? (
              <>
                {complaint.imageURL && (
                  <>
                    <Image
                      source={{ uri: complaint?.imageURL }}
                      style={styles.media}
                      onError={() => console.log("Image failed to load")}
                    />
                  </>
                )}

                {complaint.videoURL && (
                  // <View>
                  <>
                    <Video
                      source={{ uri: complaint?.videoURL }}
                      style={styles.media}
                      shouldPlay={isPlaying}
                      isLooping={true}
                      resizeMode="contain"
                      onError={() => console.log("Video failed to load")}
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
                  </>
                  // </View>
                )}

                <View style={styles.complaintDetails}>
                  <LinearGradient
                    colors={["#e0e0e0", "#f0f0f0"]} // Replace with your desired gradient colors
                    style={styles.complaintDetailsGradient}
                  >
                    <Text style={styles.complaintText}>
                      Complaint ID: {complaint.complaint_id}
                    </Text>
                    <Text style={styles.complaintText}>
                      Landmark: {complaint.landmark}
                    </Text>
                    <Text style={styles.complaintText}>
                      Description: {complaint.description}
                    </Text>
                    <Text style={styles.complaintText}>
                      Status: {complaint.complaint_status}
                    </Text>
                    <Text style={styles.complaintText}>
                      {complaint?.raid && (
                        <>
                          <Text>
                            Action Initiated:
                            {complaint.raid?.nuisance_creator?.action_Initiated}
                          </Text>
                        </>
                      )}
                    </Text>

                    {/* <TouchableOpacity style={styles.viewGoogleMapsLink}>
                    <a href={complaint.glink} target="_blank">
                      <Text>View in Google Maps</Text>
                    </a>
                  </TouchableOpacity> */}

                    <Text>
                      Google Maps Link:{" "}
                      <Text
                        style={styles.linkText}
                        onPress={() => Linking.openURL(complaint.glink)}
                      >
                        View on Google Maps
                      </Text>
                    </Text>
                  </LinearGradient>
                </View>
              </>
            ) : null}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  searchButtonContainer: {
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16,
  },
  searchButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  complaintContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 16,
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
    marginBottom: -20,
  },
  closeButtonText: {
    zIndex: 999,
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
  complaintDetails: {
    marginTop: 8,
  },
  complaintDetailsGradient: {
    borderRadius: 4,
    padding: 8,
  },
  complaintText: {
    marginBottom: 8,
  },
  media: {
    position: "relative",
    width: 300,
    height: 300,
    marginTop: 10,
  },
  playPauseButton: {
    position: "absolute",
    // top: "50%",
    bottom: "50%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 10,
    height: 50,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default StatusScreen;
