import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { getRaidData } from "../../../redux/features/officials/RaidsSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";

const MyRaidData = () => {
  const route = useRoute();
  const { raid } = route.params;
  let id = raid._id;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [raidUpdated, setRaidUpdated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // const mediaContent = raidDetails?.imageURL ? (
  //   <Image
  //     // src={complaint?.imageURL}
  //     source={{ uri: raidDetails?.imageURL }}
  //     alt="Complaint_image"
  //     // style={useStyles.media}
  //     style={styles.media}
  //   />
  // ) : complaintData?.videoURL ? (
  //   <>
  //     <View style={styles.complaintCard}>
  //       <Text>Raid Video</Text>
  //       <Video
  //         source={{ uri: complaintData?.videoURL }}
  //         style={styles.media}
  //         shouldPlay={isPlaying}
  //         isLooping={true}
  //         resizeMode="contain"
  //       />
  //       <TouchableOpacity
  //         onPress={handlePlayPause}
  //         style={styles.playPauseButton}
  //       >
  //         <MaterialCommunityIcons
  //           name={isPlaying ? "pause" : "play"}
  //           size={32}
  //           color="white"
  //         />
  //       </TouchableOpacity>
  //     </View>
  //     {/* <Video
  //       src={complaint?.videoURL}
  //       title="Complaint_Video"
  //       controls
  //       // style={useStyles.media}
  //       style={styles.media}
  //     /> */}
  //   </>
  // ) : null;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    dispatch(getRaidData(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching raid data:", error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const { raidDetails } = useSelector((state) => state.raid);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Text>...Loading</Text>
      ) : (
        <LinearGradient
          colors={["#FFC3A0", "#FFAFBD"]}
          style={styles.container}
        >
          <ScrollView>
            <Text style={styles.header}>Raid Details</Text>

            <View style={styles.raidCard}>
              <Text style={styles.raidHeader}>Raid Information</Text>

              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Raid ID:</Text>
                <Text style={styles.detailValue}>{raidDetails?.raid_id}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Action Taken:</Text>
                <Text style={styles.detailValue}>
                  {raidDetails?.action_Initiated}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Reason :</Text>
                <Text style={styles.detailValue}>{raidDetails?.reason}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Description :</Text>
                <Text style={styles.detailValue}>
                  {raidDetails?.description}
                </Text>
              </View>

              {raidDetails?.imageURL && raidDetails?.imageURL !== null && (
                <>
                  <View style={styles.complaintCard}>
                    <Text>Raid Image</Text>
                    <Image
                      // src={complaint?.imageURL}
                      source={{ uri: raidDetails?.imageURL }}
                      alt="Raid_image"
                      // style={useStyles.media}
                      style={styles.media}
                    />
                  </View>
                </>
              )}

              {raidDetails?.videoURL && raidDetails.videoURL !== null && (
                <>
                  <View style={styles.complaintCard}>
                    <Text>Raid Video</Text>
                    <Video
                      source={{ uri: raidDetails?.videoURL }}
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
            </View>

            {/* Add other sections as needed */}
          </ScrollView>
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  raidCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 5,
  },
  raidHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
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
});

export default MyRaidData;
