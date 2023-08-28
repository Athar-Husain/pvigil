import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginOfficialUser } from "../../../redux/features/officials/officialAuthSlice";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [emailOrUserId, setEmailOrUserId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const { isLoading, isOfficialLoggedIn, isSuccess } = useSelector(
  //   (state) => state.officialAuth
  // );
  // const { officialUser } = useSelector((state) => state.officialAuth);

  const { isLoading, isOfficialLoggedIn, isSuccess, officialUser } =
    useSelector((state) => state.officialAuth);

  const handleLogin = async () => {
    // Validate the fields
    if (!emailOrUserId || !password) {
      alert("All fields are required!");
      return;
    }
    let userData = {
      emailOrUserId,
      password,
    };

    // Dispatch the action to loginOfficialUser with the input values
    try {
      dispatch(loginOfficialUser(userData));
      if (isOfficialLoggedIn && isSuccess && (await officialUser) != null) {
        await navigation.navigate("Official Profile");
      }
    } catch (error) {
      console.log("error in the official login submit", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="shield" size={80} color="#3f51b5" style={styles.icon} />
      <TextInput
        placeholder="Email or User Id"
        autoCapitalize="none"
        style={styles.input}
        value={emailOrUserId}
        onChangeText={setEmailOrUserId}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#3f51b5",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#3f51b5",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
