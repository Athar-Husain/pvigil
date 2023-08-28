import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import * as Yup from "yup"; // Import Yup for validation
import {
  getComplaintData,
  updateComplaintByOfficials,
} from "../../../redux/features/complaints/complaintSlice";

const schema = Yup.object().shape({
  selectedAction: Yup.string().required("Action must be selected"),
  penaltyAmount: Yup.number().when("selectedAction", {
    is: "Penalty Raised",
    then: Yup.number().required("Penalty amount is required"),
  }),
  name: Yup.string().required("Name is required"),
  firm_name: Yup.string().required("Firm Name is required"),
  gstin: Yup.string().required("GSTIN is required"),
  trade_No: Yup.string().required("Trade Number is required"),
  phone: Yup.string().required("Phone is required"),
});

const AssignedComplaintData = () => {
  const route = useRoute();
  const { complaint } = route.params;
  const id = complaint._id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedAction, setSelectedAction] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [comments, setComments] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [newSenseCreator, setNewSenseCreator] = useState({
    name: "",
    firm_name: "",
    gstin: "",
    trade_No: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    selectedAction: "",
    penaltyAmount: "",
    name: "",
    firm_name: "",
    gstin: "",
    trade_No: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(getComplaintData(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching complaint data:", error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const handleFieldChange = (fieldName, value) => {
    setNewSenseCreator((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const resetFormFields = () => {
    setSelectedAction("");
    setPenaltyAmount("");
    setNewSenseCreator({
      name: "",
      firm_name: "",
      gstin: "",
      trade_No: "",
      phone: "",
    });
    setErrors({
      selectedAction: "",
      penaltyAmount: "",
      name: "",
      firm_name: "",
      gstin: "",
      trade_No: "",
      phone: "",
    });
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(
        { selectedAction, penaltyAmount, ...newSenseCreator },
        { abortEarly: false }
      );

      const userData = {
        action_initiated: selectedAction,
        penaltyAmount: penaltyAmount,
        ...newSenseCreator,
        id,
      };

      await dispatch(updateComplaintByOfficials(userData));
      console.log("Complaint updated successfully");

      dispatch(getComplaintData(id));

      resetFormFields();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};

        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        console.error("Error updating complaint:", error);
        // Handle other errors here
      }
    }
  };

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
            <Text style={styles.header}>Assigned Complaints</Text>

            {/* ... Other UI components ... */}

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Name"
                value={newSenseCreator.name}
                onChangeText={(value) => handleFieldChange("name", value)}
                style={styles.input}
              />
              {Boolean(errors.name) && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Firm Name"
                value={newSenseCreator.firm_name}
                onChangeText={(value) => handleFieldChange("firm_name", value)}
                style={styles.input}
              />
              {Boolean(errors.firm_name) && (
                <Text style={styles.errorText}>{errors.firm_name}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter GSTIN"
                value={newSenseCreator.gstin}
                onChangeText={(value) => handleFieldChange("gstin", value)}
                style={styles.input}
              />
              {Boolean(errors.gstin) && (
                <Text style={styles.errorText}>{errors.gstin}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Trade Number"
                value={newSenseCreator.trade_No}
                onChangeText={(value) => handleFieldChange("trade_No", value)}
                style={styles.input}
              />
              {Boolean(errors.trade_No) && (
                <Text style={styles.errorText}>{errors.trade_No}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Phone Number"
                value={newSenseCreator.phone}
                onChangeText={(value) => handleFieldChange("phone", value)}
                style={styles.input}
              />
              {Boolean(errors.phone) && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* ... Other UI components ... */}
          </ScrollView>
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Your styles...
});

export default AssignedComplaintData;
