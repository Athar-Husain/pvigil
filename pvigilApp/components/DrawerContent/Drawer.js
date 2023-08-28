import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const HomeScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Home Screen</Text>
  </View>
);

const AboutScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>About Screen</Text>
  </View>
);

const TasksScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Tasks Screen</Text>
  </View>
);

const ComplaintsScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Complaints Screen</Text>
  </View>
);

const Drawer = () => {
  const drawer = useRef(null);
  const navigation = useNavigation();
  console.log("navigation console", navigation);

  //   const navigateToScreen = (screenName) => {
  //     navigation.navigate(screenName);
  //     drawer.current.closeDrawer();
  //   };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>Navigation Drawer</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button title="About" onPress={() => navigation.navigate("About")} />
      <Button title="Tasks" onPress={() => navigation.navigate("Tasks")} />
      <Button
        title="Complaints"
        onPress={() => navigation.navigate("ComplaintsScreen")}
      />
    </View>
  );

  return (
    <NavigationContainer>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={navigationView}
      >
        <View style={styles.container}>
          <Text style={styles.paragraph}>Content Area</Text>
          <Text style={styles.paragraph}>
            Swipe from the side or press the button below to see the drawer!
          </Text>
          <Button
            title="Open Drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </View>
      </DrawerLayoutAndroid>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screenText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Drawer;
