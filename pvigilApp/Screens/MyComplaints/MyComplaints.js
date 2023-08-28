import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../../redux/features/complaints/complaintSlice";
import { LinearGradient } from "expo-linear-gradient"; // Import the LinearGradient component

const MyComplaints = () => {
  const dispatch = useDispatch();
  const { mycomplaints, isLoading } = useSelector(
    (state) => state.authComplaint
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getComplaints());
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getComplaints());
    setRefreshing(false);
  };

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        {/* {isLoading && (
          <View>
            <Text style={styles.loadingText}>The Page is Loading</Text>
            <Text style={styles.loadingText}>...Loading</Text>
          </View>
        )} */}
        {isLoading && (
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
        {mycomplaints.length === 0 ? (
          <Text style={styles.noComplaintsText}>No Complaints Found</Text>
        ) : (
          mycomplaints.map((complaint, index) => (
            <LinearGradient // Apply the gradient to each complaint card
              key={complaint._id}
              colors={["#FFE5E5", "#FFD1D1"]} // Define your gradient colors
              style={styles.complaintCard}
            >
              <>
                <View style={styles.detailsContainer}>
                  <View style={styles.indexCircle}>
                    <Text style={styles.indexText}>{index + 1}</Text>
                  </View>

                  <View style={styles.details}>
                    <View style={styles.complaintDetail}>
                      <Text style={styles.complaintLabelText}>
                        Complaint ID
                      </Text>
                      <Text style={styles.complaintId}>
                        {complaint.complaint_id}
                      </Text>
                    </View>
                    <View style={styles.complaintDetail}>
                      <Text style={styles.complaintLabelText}>
                        Complaint Status
                      </Text>
                      <Text style={styles.complaintStatus}>
                        {complaint.complaint_status}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            </LinearGradient>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EFEFEF", // Light gray background color
  },
  complaintCard: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    elevation: 2, // Adds a subtle shadow
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
    backgroundColor: "#FF6B6B", // Red circle background
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
    marginLeft: 10, // Add some spacing between detail items
  },
  complaintLabelText: {
    color: "#888888", // Light gray text color
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
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#888888",
  },
  noComplaintsText: {
    marginTop: 20,
    fontSize: 16,
    color: "#888888",
  },
  scrollView: {
    flexGrow: 1,
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

export default MyComplaints;
