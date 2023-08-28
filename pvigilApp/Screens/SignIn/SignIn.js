import React, { useEffect, useState } from "react";
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
} from "react-native";
import {
  RESET,
  login,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const navigate = useNavigate();

  // const { isLoading, isLoggedIn, isSuccess } = useSelector(
  //   (state) => state.auth
  // );
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const user = useSelector(selectUser);

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // const { isOfficialLoggedIn, officialUser } = useSelector(
  //   (state) => state.officialAuth
  // );

  const handleSignIn = async () => {
    // Perform sign in logic here
    if (!email || !password) {
      Alert.alert("All fields are required");
      return;
    }
    try {
      const userData = {
        email,
        password,
      };

      console.log("hitted login");
      dispatch(login(userData));
      if (isLoggedIn && user != null) {
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.log("error in the login submit", error.message);
    }
  };
  // useEffect(() => {
  //   if (isSuccess && isLoggedIn) {
  //     navigation.navigate("Profile");
  //   }

  //   dispatch(RESET());
  // }, [isLoggedIn, isSuccess, dispatch, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {/* <Button title="Sign In" onPress={handleSignIn} /> */}

        <TouchableOpacity
          style={styles.submitButtonContainer}
          // onPress={handleSearch}
          onPress={handleSignIn}
        >
          <LinearGradient
            colors={["#00d4ff", "#0050ff"]} // Replace with your desired gradient colors
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => navigation.navigate("SignInWithOTP")}>
          <Text style={styles.linkText}>Sign In with Email and OTP</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  linkText: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  submitButtonContainer: {
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16,
  },
  submitButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
