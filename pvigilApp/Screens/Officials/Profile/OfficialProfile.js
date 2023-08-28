import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import {
  getOfficialUser,
  updateOfficialUser,
} from "../../../redux/features/officials/officialAuthSlice";
import { uploadImage } from "../../../Utils/helper";

const OfficialProfile = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getOfficialUser());
  // }, []);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [photoURI, setPhotoURI] = useState(null); // This is moved here

  const { officialUser, isLoading } = useSelector(
    (state) => state.officialAuth
  );
  // console.log("official User in official profile ", officialUser);

  // Handler for toggling the modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const {OfficialUser } from
  // Sample initial state, replace this with actual user data from the backend
  // const [user, setUser] = useState({
  //   name: "John Doe",
  //   user_Id: "john123",
  //   email: "johndoe@example.com",
  //   ward_No: ["23", "45"],
  //   password: "********", // Password field can be hidden with "********"
  //   phone: "9876543210",
  //   photo: "https://i.ibb.co/4pDNDk1/avatar.png",
  //   role: "official",
  // });

  const user = officialUser || {};
  // console.log("user in ");

  // State for editable fields
  const [editableFields, setEditableFields] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    photo: user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setEditableFields({ ...editableFields, photo: selectedImage.uri });
      console.log("phot ", editableFields.photo);
      setPhotoURI(selectedImage.uri);
    }
  };

  // Handler for updating profile
  const handleUpdateProfile = async () => {
    // Update the user's profile in the backend using API call with editableFields data
    // You can dispatch an action to update the user data in Redux or use other state management
    let photoURL = "";
    try {
      if (photoURI !== null) {
        try {
          photoURL = await uploadImage(photoURI, "OfficialProfileImages");
        } catch (error) {
          console.error(error.message);
          setLoading(false);
          return;
        }
      }

      let userData = {
        name: editableFields.name,
        phone: editableFields.phone,
        photo: photoURL,
      };

      dispatch(updateOfficialUser(userData));
      toggleModal();

      // console.log("USer data in official Profile", userData);
    } catch (error) {
      console.error("Error in the OfficialProfile", error.message);
    }
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.container}
    >
      {/* <View style={styles.container}></View> */}
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.photo} source={{ uri: user.photo }} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>Role: {user.role}</Text>
        </View>
        <TouchableOpacity style={styles.editIcon} onPress={toggleModal}>
          <FontAwesome name="edit" size={30} color="black" />
          <Text style={{ fontSize: 6, justifyContent: "center" }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{user.email}</Text>
          </View>

          {/* Rest of the user information display (same as previous implementation) */}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>User Id:</Text>
            <Text style={styles.info}>{user.userId}</Text>
          </View>
          {/* Rest of the user information display (same as previous implementation) */}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ward Number:</Text>
            {/* Use the join() method to display ward_No as comma-separated list */}
            {/* <Text style={styles.info}>
              {user.wardNo ? user.wardNo.join(", ") : ""}
            </Text> */}
            <Text style={styles.info}>{user.wardNo}</Text>
          </View>
          {/* Rest of the user information display (same as previous implementation) */}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.info}>{user.phone}</Text>
          </View>
          {/* Rest of the user information display (same as previous implementation) */}
        </View>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          {/* <ScrollView > */}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <View style={styles.imageContainer}>
              <Text style={styles.label}>Photo:</Text>
              <View style={styles.imageRow}>
                <Image
                  style={styles.userPhoto}
                  source={{ uri: editableFields.photo }}
                />
                <TouchableOpacity
                  style={styles.editPhotoButton}
                  onPress={pickImage}
                >
                  <Entypo name="edit" size={40} color="blue" />
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.input}
              value={editableFields.name}
              onChangeText={(text) =>
                setEditableFields({ ...editableFields, name: text })
              }
            />

            <TextInput
              style={styles.input}
              value={editableFields.phone}
              onChangeText={(text) => {
                if (text.length <= 10) {
                  setEditableFields({ ...editableFields, phone: text });
                }
              }}
              keyboardType="numeric"
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.updateButtonText}>Save Changes</Text>
            </TouchableOpacity>
            {/* </TouchableOpacity> */}
          </View>
          {/* </ScrollView> */}
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    // justifyContent: "center", // Center content vertically
    // alignItems: "center", // Center content horizontally
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  editIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  editPhotoButton: {
    position: "absolute",
    top: 5,
    // left: 110,
    right: 0,
  },

  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  userPhoto: {
    width: 150,
    height: 150,
    // zIndex: 1,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 16,
    // color: "black",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 2,
    marginBottom: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  info: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#3f51b5",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    color: "#555",
  },
  updateButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#3f51b5",
    borderRadius: 5,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OfficialProfile;
