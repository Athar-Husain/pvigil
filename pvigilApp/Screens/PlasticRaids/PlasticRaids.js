// plasticRaids.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllRaids } from "../../redux/features/officials/RaidsSlice";

const PlasticRaids = () => {
  const dispatch = useDispatch();
  const { allRaids, isLoading } = useSelector((state) => state.raid);
  // console.log("all raids in the console", allRaids);
  const navigation = useNavigation();
  // const [raids, setRaids] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const animatedValue = new Animated.Value(1);

  useEffect(() => {
    dispatch(getAllRaids());
  }, [dispatch]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const fetchRaidsData = () => {
    dispatch(getAllRaids());
  };

  useEffect(() => {
    fetchRaidsData();
    // setRefreshing(false);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // dispatch(getOfficialUser());
      dispatch(getAllRaids()); // Dispatch the action to get updated raids data
      setRefreshing(false);
    }, 1000);
  };

  const handleRaidPress = () => {
    // Animate the raid box when pressed
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2, // Scale up to 1.2 times
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1, // Scale back to the original size
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      {refreshing ||
        (isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingEmoji}>🔍</Text>
            <Text style={styles.loadingText}>Searching for fresh content</Text>
            <View style={styles.typingIndicator}>
              <Text style={styles.typingDot}>.</Text>
              <Text style={styles.typingDot}>.</Text>
              <Text style={styles.typingDot}>.</Text>
            </View>
          </View>
        ))}

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Add the login button here */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Official Login")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          {allRaids.map((raid) => (
            <Animated.View
              key={raid._id}
              // style={[styles.raidBox, { transform: [{ scale: animatedValue }] }]}
            >
              <View>
                <View style={styles.Cardcontainer}>
                  <View style={styles.raidBox}>
                    {raid.imageURL ? (
                      <Image
                        source={{ uri: raid.imageURL }}
                        style={styles.media}
                      />
                    ) : raid.videoURL ? (
                      <View style={styles.complaintCard}>
                        <Text>Raid Video</Text>
                        <Video
                          source={{ uri: raid.videoURL }}
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
                    ) : null}

                    {/* <View> */}
                    <Text>
                      <View>
                        <Text style={{ fontSize: 10 }}>
                          Action : {raid.action_Initiated}{" "}
                        </Text>

                        {/* <Text>name : {raid?.nuisance_creator?.name} </Text> */}
                        <Text style={{ fontSize: 10 }}>
                          Reason : {raid.reason}{" "}
                        </Text>
                        <ScrollView>
                          <Text style={{ fontSize: 10 }}>
                            Seized Items : {raid.description}
                          </Text>
                        </ScrollView>
                        {/* </View> */}
                      </View>
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // padding: 16,
    paddingVertical: 10,
  },
  raidBox: {
    // width: "45%", // To create two columns, adjust this value as needed
    borderWidth: 1,
    margin: 1,
    minWidth: 150,
    maxWidth: 150,
    minHeight: 200,
    maxHeight: 200,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    // margin: 8,
    backgroundColor: "#f0f0f0", // Add a background color to the boxes
  },
  raidName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Add a color to the raid name
  },
  raidLocation: {
    fontSize: 14,
    color: "#777", // Add a color to the raid location
  },
  loginButton: {
    backgroundColor: "#007BFF", // Add a background color to the login button
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    marginRight: 20,
    alignItems: "center",
    alignSelf: "flex-end", // Align the button to the right
  },
  loginButtonText: {
    fontSize: 16,
    color: "#fff", // Add a color to the login button text
    fontWeight: "bold",
  },
  media: {
    position: "relative",
    width: 120,
    height: 100,
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
  Cardcontainer: {},
  raidCard: {
    margin: 1,
    minWidth: 150,
    maxWidth: 150,
    maxHeight: 200,
    minHeight: 150,
  },
  complaintCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 8,
    // marginBottom: 20,
    elevation: 5,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  loadingText: {
    color: "#333",
    fontSize: 18,
    marginBottom: 5,
  },
  typingIndicator: {
    flexDirection: "row",
  },
  typingDot: {
    fontSize: 24,
    color: "#007AFF",
    marginLeft: 2,
  },
});

export default PlasticRaids;
