import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// const { windowWidth } = Dimensions.get("window").width;
// const { windowHeight } = Dimensions.get("window").height;

const ComplaintScreen1 = () => {
  const navigation = useNavigation();

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
  };
  // const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logo.png")} // Replace with actual image path
          style={styles.logo}
        />
      </View>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigateToPage("Complaint Camera")}
      >
        <Image
          source={require("../../../assets/Camera_Image.jpg")} // Replace with actual image path
          style={[
            styles.image,
            // { width: windowWidth * 0.8, height: windowHeight * 0.3 },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigateToPage("Complaint Video")}
      >
        <Image
          source={require("../../../assets/video_image.jpg")} // Replace with actual image path
          style={[
            styles.image,
            // { width: windowWidth * 0.8, height: windowHeight * 0.3 },
          ]}
        />
      </TouchableOpacity>

      <Text style={styles.footerText}>Super Free City</Text>
      <Text style={styles.footerText}>All Rights Reserved</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    // width: windowWidth * 0.6,
    // width: 200,
    height: 250,
    // height: windowWidth * 0.6,
    resizeMode: "contain",
  },
  imageContainer: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
  image: {
    borderRadius: 10,
    height: "100%",
    width: "100%",
  },
  footerText: {
    marginTop: 10,
    fontSize: 12,
    color: "#555",
  },
});

export default ComplaintScreen1;
