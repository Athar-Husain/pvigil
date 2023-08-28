import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const Header = ({ signedIn, avatarImage }) => {
  const navigation = useNavigation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleMenuPress = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleSignInSignUpPress = () => {
    if (signedIn) {
      // Handle sign out logic
      // You can implement this according to your authentication setup
    } else {
      navigation.navigate("SignIn");
    }
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const menuItems = [
    { title: "Home", screen: "Home" },
    { title: "SignIn", screen: "SignIn" },
    { title: "Status", screen: "StatusScreen" },
    // { title: 'SignIn', screen: 'SignIn' },
    { title: "SignUp", screen: "SignUp" },
    { title: "SignInt", screen: "SignIn" },
    { title: "My Profile", screen: "Profile" },
    // Add more menu items as needed
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress}>
        {/* Hamburger icon image */}
        <Image
          source={require("../../assets/hamburger.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.rightSection}>
        {signedIn && avatarImage ? (
          // Display the image avatar if the user is signed in
          <Image source={avatarImage} style={styles.avatar} />
        ) : (
          // Display the sign in/sign up button if the user is not signed in
          <TouchableOpacity
            style={styles.signInSignUpButton}
            onPress={handleSignInSignUpPress}
          >
            <Text style={styles.signInSignUpButtonText}>
              {signedIn ? "Sign Out" : "Sign In"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {drawerVisible && (
        <View style={styles.drawerContainer}>
          <View style={styles.drawerBackground} />
          <View style={styles.drawerContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleMenuPress}
            >
              {/* <Image source={require('../../assets/close.png')} style={styles.closeIcon} /> */}
              <Image
                source={require("../../assets/icon.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.title}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    position: "relative",
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#f1f1f1",
  },
  icon: {
    width: 24,
    height: 24,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 16,
  },
  signInSignUpButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#2196f3",
  },
  signInSignUpButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  drawerContainer: {
    position: "absolute",
    zIndex: 100,
    width: "80%",
    height: screenHeight,
    left: 0,
    top: 0,
  },
  drawerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.5,
  },
  drawerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#f9f9f9",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: "#aaa",
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuItemText: {
    fontSize: 22,
    color: "#333",
  },
});

export default Header;
