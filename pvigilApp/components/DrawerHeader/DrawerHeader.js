import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import PivigilLogo from "../../assets/logo.png";

const DrawerHeader = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const { isOfficialLoggedIn, officialUser } = useSelector(
    (state) => state.officialAuth
  );

  const headerImageUri = isOfficialLoggedIn
    ? officialUser?.photo ||
      "https://res.cloudinary.com/pivigil/image/upload/v1693041819/279172721_298706779112326_1223444549427464028_n.jpg_v9bxa3.jpg"
    : isLoggedIn
    ? user?.photo ||
      "https://res.cloudinary.com/pivigil/image/upload/v1693041819/279172721_298706779112326_1223444549427464028_n.jpg_v9bxa3.jpg"
    : "https://res.cloudinary.com/pivigil/image/upload/v1693041819/279172721_298706779112326_1223444549427464028_n.jpg_v9bxa3.jpg";
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.headerText}>
          {isOfficialLoggedIn && officialUser != null
            ? officialUser?.name
            : isLoggedIn && user
            ? user?.name
            : "Pivigil App"}
        </Text>
        <Text style={styles.subHeaderText}>
          {isOfficialLoggedIn && officialUser != null
            ? officialUser?.email
            : isLoggedIn && user
            ? user?.email
            : "Ballari City Corporation"}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: headerImageUri }} style={styles.headerImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0", // Light gray background
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden", // Clip the gradient overflow
  },
  leftContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333", // Dark text color
  },
  subHeaderText: {
    fontSize: 14,
    color: "#666", // Medium text color
  },
  rightContainer: {
    // marginLeft: 20,
    width: 90,
    height: 90,
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 80,
    height: 70,
    borderRadius: 50,
    borderColor: "#f0f0f0", // Match background color
    borderWidth: 2,
  },
});

export default DrawerHeader;
