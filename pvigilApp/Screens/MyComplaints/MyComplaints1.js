import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getComplaints,
  upgradeComplaint,
} from "../../redux/features/complaints/complaintSlice";

const MyComplaints = () => {
  const dispatch = useDispatch();
  const { mycomplaints, isLoading } = useSelector(
    (state) => state.authComplaint
  );
  console.log("my complaints in My complaints screen", mycomplaints);

  useEffect(() => {
    dispatch(getComplaints());
    // dispatch(upgradeComplaint(userData));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <>
          <Text>...Loading</Text>
        </>
      )}
      {mycomplaints.length === 0 ? (
        <View>
          <Text>No COmplaints Found</Text>
        </View>
      ) : (
        <>
          {mycomplaints.map((complaint) => (
            <View style={styles.complaintCard} key={complaint._id}>
              <Text style={styles.complaintId}>
                Complaint ID: {complaint.complaint_id}
              </Text>
              <Text>User: {complaint.user}</Text>
              <Text>Complaint Status: {complaint.complaint_status}</Text>
              <Text>Landmark: {complaint.landmark}</Text>
              <Text>Description: {complaint.description}</Text>

              {complaint.imageURL && (
                <Text>
                  <a href={complaint.imageURL}>Image</a>
                </Text>
              )}

              {complaint.videoURL && (
                <Text>
                  <a href={complaint.videoURL}>View on Google Maps</a>
                </Text>
              )}

              <Text>
                Google Maps Link:{" "}
                <a href={complaint.glink}>View on Google Maps</a>
              </Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  complaintCard: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  complaintId: {
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default MyComplaints;
