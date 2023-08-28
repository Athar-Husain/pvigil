import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/features/auth/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import { uploadImage } from "../../Utils/helper";

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [editableFields, setEditableFields] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    photo: user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png",
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      setPhoto(selectedImage.uri);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      let PhotoURL = "";

      setLoading(true);
      if (photo !== null) {
        try {
          PhotoURL = await uploadImage(photo, "USerProfileImages");
        } catch (error) {
          console.error(error.message);
          setLoading(false);
          return;
        }
      }

      let userData = {
        name: editableFields.name,
        phone: editableFields.phone,
        photo: PhotoURL,
      };

      dispatch(updateUser(userData));
      toggleModal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in the ProfileScreen", error.message);
      return;
    }
  };

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.container}
    >
      {isLoading && (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
      {loading && (
        <View>
          <Text>...Loading</Text>
        </View>
      )}
      <View style={styles.profileContainer}>
        <Image style={styles.photo} source={{ uri: user.photo }} />
        <Text style={styles.name}>{user.email}</Text>
      </View>
      <TouchableOpacity style={styles.editbtn} onPress={toggleModal}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="edit" size={30} color="#333" />
          <Text style={styles.editText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{user.name}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.info}>{user.phone}</Text>
        </View>

        {/* Rest of the user information display (same as previous implementation) */}
      </View>
      {/* <View style={{ flexDirection: "column" }}> */}

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
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
            style={styles.submitButtonContainer}
            onPress={handleUpdateProfile}
          >
            <LinearGradient
              colors={["#00d4ff", "#0050ff"]}
              style={styles.ButtonGradient}
            >
              <Text style={styles.submitButtonText}>Update Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  editbtn: {
    position: "absolute",
    top: 60,
    right: 70,
    flexDirection: "row",
    alignItems: "center",
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
  editText: {
    fontSize: 6,
    marginLeft: 5,
    color: "#333",
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
    color: "#333",
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
    borderRadius: 75,
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
});

// export default ProfileScreen;
