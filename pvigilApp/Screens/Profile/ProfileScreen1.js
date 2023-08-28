import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  updateUser,
  selectUser,
  logout,
} from "../../redux/features/auth/authSlice";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
// import { Loader, Notification } from '../../components/import';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const { isLoading, user } = useSelector((state) => state.auth);
  // console.log(user)

  // useEffect(() => {
  //   dispatch(getUser());
  // }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Rest of the code...

  const handleInputChange = (field, value) => {
    // Update the user state with the new input values
  };

  const saveProfile = async () => {
    // Save profile logic here
  };

  const [profilePicUri, setProfilePicUri] = useState(null);

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Corrected the property name to "cancelled"
      setProfilePicUri(result.assets[0].uri); // Use "result.assets[0].uri" for the selected image URI
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      let userData = {};
    } catch (error) {
      console.error("error in the User Profile Screen", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>

      {isLoading && (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
      {/* {!user?.isVerified && <Notification />} */}

      <View style={styles.profileSection}>
        <View style={styles.profile}>
          {!isLoading && user && (
            <>
              <View style={styles.profilePhoto}>
                <TouchableOpacity onPress={handleChoosePhoto}>
                  {profilePicUri ? (
                    <Image
                      source={{ uri: profilePicUri }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Text style={styles.selectImageText}>Select Image</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.emailContainer}>
                <Text style={styles.emailLabel}>Email</Text>
                <Text style={styles.emailText}>{user?.email || ""}</Text>
              </View>

              <TextInput
                style={styles.input}
                value={user?.name || ""}
                onChangeText={(text) => handleInputChange("name", text)}
              />

              <TextInput
                style={styles.input}
                value={user?.phone || ""}
                onChangeText={(text) => handleInputChange("phone", text)}
              />

              {/* <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.submitButtonContainer}
                onPress={handleSubmit}
              >
                <LinearGradient
                  colors={["#00d4ff", "#0050ff"]}
                  style={styles.ButtonGradient}
                >
                  <Text style={styles.submitButtonText}>Update Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#2196f3",
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  profileSection: {
    width: "80%",
    alignItems: "center",
  },
  profile: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  submitButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  ButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  // profilePhoto: {
  //   marginBottom: 20,
  // },
  profilePhoto: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#cccccc",
  },
  selectImageText: {
    fontSize: 18,
    color: "#777777",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: width - 60,
    backgroundColor: "#f9f9f9",
  },
  emailContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  emailLabel: {
    color: "#777777",
    fontSize: 16,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
