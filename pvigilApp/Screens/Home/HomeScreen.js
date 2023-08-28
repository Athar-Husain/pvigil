import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createStackNavigator } from "@react-navigation/stack";
import AppForm from "../Auth/AuthForm";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
    </Stack.Navigator>
  );
};

export default function App() {
  const navigation = useNavigation();

  StackNavigator();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>P Vigil</Text> */}
      <Text style={styles.subheading}>A Digital partner</Text>
      <Text style={styles.miniheading}>To Make Ballari</Text>
      <Text style={styles.heading}>Super Free City</Text>

      <Image
        source={require("../../assets/logo.png")} //  logo image path
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        //   onPress={}
        onPress={() => navigation.navigate("AppForm")}
      >
        <LinearGradient
          colors={["#8B0000", "#FF6347"]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Public Vigilant</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("New Complaint")}
      >
        <LinearGradient
          colors={["#8B0000", "#FF6347"]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Anonymous Vigilant</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Plastic Raids")}
      >
        <LinearGradient
          colors={["#8B0000", "#FF6347"]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Plastic Raids</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.initiativeText}>An Initiative by</Text>
      <Text style={styles.corporationText}>City Corporation Ballari</Text>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  miniheading: {
    fontSize: 22,
    color: "#666",
    marginBottom: 1,
    textAlign: "center",
  },

  subheading: {
    fontSize: 15,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  marqueeContainer: {
    width: "100%",
    height: 30,
    marginTop: 10,
    overflow: "hidden",
  },
  logo: {
    height: 200,
    marginBottom: 30,
  },
  button: {
    marginBottom: 8,
    width: windowWidth * 0.7,
  },
  gradientButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  horizontalLine: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: windowWidth * 0.7,
    marginVertical: 10,
  },
  initiativeText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  corporationText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
