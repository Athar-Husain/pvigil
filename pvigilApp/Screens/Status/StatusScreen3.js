import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

const StatusScreen = () => {
  const [complaintNumber, setComplaintNumber] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");

  const dispatch = useDispatch();

  const handleComplaintNumberChange = (text) => {
    setComplaintNumber(text);
  };

  const handleViewComplaintDetails = (complaintNumber) => {
    if (complaintNumber) {
      try {
        dispatch(searchComplaint(complaintNumber));
        // console.log("complaints number from status screen ", complaintNumber);
      } catch (error) {
        console.log("error in the Search Staus Screen in handle Submit", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Complaint Number"
        // value={complaintNumber}
        onChangeText={handleComplaintNumberChange}
      />
      <Button
        title="Submit"
        onPress={() => handleViewComplaintDetails(complaintNumber)}
      />

      {complaintDetails ? (
        <View>
          {/* Display the fetched complaint details */}
          <Text>{complaintDetails}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  complaintContainer: {
    marginTop: 20,
  },
});

export default StatusScreen;
