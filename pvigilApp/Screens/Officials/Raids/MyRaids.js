import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { getOfficialUser } from "../../../redux/features/officials/officialAuthSlice";
import { getRaids } from "../../../redux/features/officials/RaidsSlice";
// import { getRaids } from "../../../redux/features/raids/raidSlice"; // Import the appropriate action

const MyRaids = () => {
  const dispatch = useDispatch();
  const { officialUser } = useSelector((state) => state.officialAuth);
  const { myRaids, isLoading } = useSelector((state) => state.raid); // Assuming you have a "raid" state slice

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [visibleRaids, setVisibleRaids] = useState(15); // Number of initial visible raids
  const [loadMoreVisible, setLoadMoreVisible] = useState(true); // Show "Load More" button

  const handleViewDetails = (raid) => {
    navigation.navigate("MyRaidData", { raid }); // You need to define "MyRaidData" screen
  };

  useEffect(() => {
    dispatch(getRaids());
  }, []);

  const onRefresh = () => {
    // console.log("Refreshing...");
    setRefreshing(true);

    setTimeout(() => {
      // dispatch(getOfficialUser());
      dispatch(getRaids()); // Dispatch the action to get updated raids data
      setRefreshing(false);
    }, 1000);
  };

  const onLoadMore = () => {
    const newVisibleRaids = visibleRaids + 10; // Load 10 more raids
    if (newVisibleRaids >= myRaids.length) {
      setLoadMoreVisible(false); // Hide "Load More" button if all raids are visible
    }
    setVisibleRaids(newVisibleRaids);
  };

  return (
    <>
      {refreshing && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>🔍</Text>
          <Text style={styles.loadingText}>Searching for fresh content</Text>
          <View style={styles.typingIndicator}>
            <Text style={styles.typingDot}>.</Text>
            <Text style={styles.typingDot}>.</Text>
            <Text style={styles.typingDot}>.</Text>
          </View>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FF6B6B"]}
            tintColor="#FF6B6B"
            title="Pull to refresh"
            titleColor="#FF6B6B"
          />
        }
      >
        <View style={styles.container}>
          {isLoading && (
            <>
              <Text>...Loading</Text>
            </>
          )}
          {myRaids.length === 0 && !refreshing ? (
            <>
              <Text>...loading</Text>
            </>
          ) : (
            <>
              <View>
                {myRaids.slice(0, visibleRaids).map((raid, index) => (
                  <LinearGradient
                    key={raid._id}
                    colors={["#FFE5E5", "#FFD1D1"]}
                    style={styles.complaintCard}
                  >
                    <TouchableOpacity
                      onPress={() => handleViewDetails(raid)}
                      style={styles.detailsContainer}
                    >
                      <View style={styles.indexCircle}>
                        <Text style={styles.indexText}>{index + 1}</Text>
                      </View>

                      <View style={styles.details}>
                        <View style={styles.complaintDetail}>
                          <Text style={styles.complaintLabelText}>Raid ID</Text>
                          <Text style={styles.complaintId}>{raid.raid_id}</Text>
                        </View>
                        {/* <View style={styles.complaintDetail}>
                          <Text style={styles.complaintLabelText}>
                            Action Initialize
                          </Text>

                          <Text style={styles.complaintStatus}>
                            {complaint?.raid?.nuisance_creator
                              .action_Initiated != null
                              ? complaint.raid.nuisance_creator.action_Initiated
                              : "No Action"}
                          </Text>
                        </View> */}
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                ))}
                {loadMoreVisible && (
                  <TouchableOpacity
                    onPress={onLoadMore}
                    style={styles.loadMoreButton}
                  >
                    <Text style={styles.loadMoreButtonText}>Load More</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EFEFEF",
  },
  complaintCard: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    elevation: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  indexCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  indexText: {
    color: "white",
    fontWeight: "bold",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  complaintDetail: {
    flex: 1,
    marginLeft: 10,
  },
  complaintLabelText: {
    color: "#888888",
    marginBottom: 4,
  },
  complaintId: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  complaintStatus: {
    fontWeight: "bold",
    fontSize: 14,
  },
  scrollView: {
    flexGrow: 1,
  },
  loadMoreButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    marginTop: 10,
  },
  loadMoreButtonText: {
    color: "white",
    fontWeight: "bold",
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

export default MyRaids;
