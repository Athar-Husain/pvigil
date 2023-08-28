// const  = () => {
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";

const MyComplaintData = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [newSenseCreator, setNewSenseCreator] = useState({
    name: "",
    firm_name: "",
    gstin: "",
    trade_No: "",
    phone: "",
  });
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const sampleComplaintDetails = {
    user_email: "user@example.com",
    complaint_status: "Assigned",
    complaint_id: "C12345",
    landmark:
      "Near City Park. A definite article is an article that marks a definite noun phrase. ",
    description: `A definite article is an article that marks a definite noun phrase. Definite articles, such as the English the, are used to refer to a particular member of a group. It may be something that the speaker has already mentioned, or it may be otherwise something uniquely specified.
    
        For example, Sentence 1 uses the definite article and thus, expresses a request for a particular book. In contrast, Sentence 2 uses an indefinite article and thus, conveys that the speaker would be satisfied with any book.
        
        Give me the book.
        Give me a book.
        The definite article can also be used in English to indicate a specific class among other classes:
        
        The cabbage white butterfly lays its eggs on members of the Brassica genus.
        However, recent developments show that definite articles are morphological elements linked to certain noun types due to lexicalization. Under this point of view, definiteness does not play a role in the selection of a definite article more than the lexical entry attached to the article.[clarification needed][1][2]`,
    // Add more fields as needed
  };

  //   const { complaintDetails } = route.params;
  const complaintDetails = sampleComplaintDetails;

  const handleActionChange = (itemValue) => {
    setSelectedAction(itemValue);
  };

  const handleFieldChange = (fieldName, value) => {
    setNewSenseCreator((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#FFC3A0", "#FFAFBD"]} style={styles.container}>
        <ScrollView>
          {/* <View style={styles.container}> */}
          <Text style={styles.header}>My Complaints Data</Text>

          <View style={styles.complaintCard}>
            <Text style={styles.complaintHeader}>Complaint Details</Text>

            <View style={styles.complaintDetailItem}>
              <Text style={styles.detailLabel}>User Email:</Text>
              <Text style={styles.detailValue}>
                {complaintDetails.user_email}
              </Text>
            </View>

            <View style={styles.complaintDetailItem}>
              <Text style={styles.detailLabel}>Complaint Status:</Text>
              <Text style={styles.detailValue}>
                {complaintDetails.complaint_status}
              </Text>
            </View>

            <View style={styles.complaintDetailItem}>
              <Text style={styles.detailLabel}>Complaint ID:</Text>
              <Text style={styles.detailValue}>
                {complaintDetails.complaint_id}
              </Text>
            </View>

            <View style={styles.complaintDetailItem}>
              <Text style={styles.detailLabel}>Landmark:</Text>
              <Text style={styles.detailValue}>
                {complaintDetails.landmark}
              </Text>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionLabel}>Description:</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {showFullDescription
                    ? complaintDetails.description
                    : complaintDetails.description.slice(0, 300) + "..."}
                </Text>
                <TouchableWithoutFeedback onPress={toggleDescription}>
                  <Text style={styles.showMoreLess}>
                    {showFullDescription ? "Show Less" : "Show More"}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            {/* Display more complaint details as needed */}
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
            </View>
          )}
          <View style={styles.complaintCard}>
            {/* <Text style={styles.header}>Assigned Complaints</Text> */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>New Sense Creator Details</Text>
              <TextInput
                placeholder="Name"
                value={newSenseCreator.name}
                onChangeText={(value) => handleFieldChange("name", value)}
                style={styles.input}
              />
              <TextInput
                placeholder="Firm Name"
                value={newSenseCreator.firm_name}
                onChangeText={(value) => handleFieldChange("firm_name", value)}
                style={styles.input}
              />
              <TextInput
                placeholder="GSTIN"
                value={newSenseCreator.gstin}
                onChangeText={(value) => handleFieldChange("gstin", value)}
                style={styles.input}
              />
              <TextInput
                placeholder="Trade Number"
                value={newSenseCreator.trade_No}
                onChangeText={(value) => handleFieldChange("trade_No", value)}
                style={styles.input}
              />
              <TextInput
                placeholder="Phone"
                value={newSenseCreator.phone}
                onChangeText={(value) => handleFieldChange("phone", value)}
                style={styles.input}
              />
            </View>
          </View>

          {/* Add other complaint details here */}
          {/* </View> */}
        </ScrollView>
      </LinearGradient>
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center", // Center-align the text within the element
    alignSelf: "center",
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
    textAlign: "center", // Center-align the text within the element
    alignSelf: "center",
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
});

export default MyComplaintData;
