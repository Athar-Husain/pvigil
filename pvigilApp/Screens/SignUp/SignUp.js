import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { RESET, register } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient"; // Import the LinearGradient component

const { width } = Dimensions.get("window");

export default function SignUp({ scrollView }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const scrollView = useRef(null);

  const { isLoading, isSuccess, isError } = useSelector((state) => state.auth);

  const handleSignUp = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("All fields are required");
      return;
    }

    setLoading(true);
    const userData = {
      name,
      email,
      password,
    };
    // try {
    //   await dispatch(register(userData));

    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.log("Error in the Signup at handleSignUp", error.message);
    //   showMessage({
    //     message: "Error",
    //     description: `"Error in the Signup at handleSignUp", ${error.message}`,
    //     type: "danger",
    //     duration: 3000,
    //     position: "top",
    //     style: { justifyContent: "center", alignItems: "center" },
    //   });
    // }

    try {
      const response = await dispatch(register(userData));
      if (response && !response.error) {
        // Navigate to the "AppForm" screen and scroll to the "Login" tab
        navigation.navigate("AppForm");
        Alert.alert(
          "Successful",
          `Registered Successfully Please Login (Sign-In)`
          // [
          //   {
          //     text: "OK",
          //     style: "cancel",
          //   },
          // ],
          // { cancelable: true }
        );

        // Check if scrollView is valid before calling scrollTo
        if (scrollView && scrollView.current) {
          scrollView.current.scrollTo({ x: 0 });
        }

        console.log("user data in Sign Up", userData);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setLoading(false);
      } else {
        setLoading(false);
        console.log("Registration failed:", response.error);
      }

      setLoading(false);
    } catch (error) {
      // Handle unexpected errors
      console.log("An unexpected error occurred:", error.message);
      showMessage({
        message: "Error",
        description: `"Error in the Signup at handleSignUp", ${error.message}`,
        type: "danger",
        duration: 3000,
        position: "top",
        style: { justifyContent: "center", alignItems: "center" },
      });
    }
  };

  return (
    <ScrollView>
      {isLoading || loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prevData) => ({ ...prevData, name: text }))
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            autoCapitalize="none"
            onChangeText={(text) =>
              setFormData((prevData) => ({ ...prevData, email: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) =>
              setFormData((prevData) => ({ ...prevData, password: text }))
            }
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData((prevData) => ({
                ...prevData,
                confirmPassword: text,
              }))
            }
            secureTextEntry
          />

          {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
          <TouchableOpacity
            style={styles.searchButtonContainer}
            // onPress={handleSearch}
            onPress={handleSignUp}
          >
            <LinearGradient
              colors={["#00d4ff", "#0050ff"]} // Replace with your desired gradient colors
              style={styles.searchButtonGradient}
            >
              <Text style={styles.searchButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.linkText}>Already have an account? Sign In</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10, // Add some vertical padding for better spacing
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white", // Add white background to input fields
  },
  linkText: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
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
    fontSize: 16,
  },
});
