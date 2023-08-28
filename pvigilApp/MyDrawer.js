import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  StyleSheet,
  View,
  LogBox,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  // DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  getLoginStatus,
  getUser,
  logout,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import {
  getOfficialLoginStatus,
  getOfficialUser,
  logoutOfficialUser,
  seletIsLoggedIn,
} from "./redux/features/officials/officialAuthSlice";
import { Ionicons } from "@expo/vector-icons";

// Components of the App
import AppForm from "./Screens/Auth/AuthForm";
import MyComplaints from "./Screens/MyComplaints/MyComplaints";
// import AnnonymousComplaint from "./Screens/Complaint/AnnonymousComplaint";
import LoginScreen from "./Screens/Officials/Auth/Login";
import HomeScreen from "./Screens/Home/HomeScreen";
import OfficialProfile from "./Screens/Officials/Profile/OfficialProfile";
// import { logoutOfficialUser } from "./redux/features/officials/officialAuthSlice";
import PlasticRaids from "./Screens/PlasticRaids/PlasticRaids";
import ComplaintScreen1 from "./Screens/Complaint/ComplaintScreen/ComplainScreen";
import ComplaintVideo from "./Screens/Complaint/ComplaintScreen/ComplaintVideo";
import ComplaintCamera from "./Screens/Complaint/ComplaintScreen/ComplaintCamera";
import AssignedComplaints from "./Screens/Officials/AssignedComplaints/AssignedComplaints";
import AssignedComplaintData from "./Screens/Officials/AssignedComplaints/AssignedComplaintData";
import MyAssignedComplaints from "./Screens/Officials/AssignedComplaints/MyAssignedComplaints";
import MyComplaintData from "./Screens/MyComplaints/MyComplaintData";
import StatusScreen from "./Screens/Status/StatusScreen";
import { ProfileScreen } from "./Screens/Profile/ProfileScreen";
import DrawerHeader from "./components/DrawerHeader/DrawerHeader";
import NewRaid from "./Screens/Officials/Raids/NewRaid";
import MyRaids from "./Screens/Officials/Raids/MyRaids";
import MyRaidData from "./Screens/Officials/Raids/MyRaidData";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerButton = () => {
  // dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="ios-menu" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const { isOfficialLoggedIn, officialUser } = useSelector(
    (state) => state.officialAuth
  );

  const handleLogout = () => {
    {
      isOfficialLoggedIn && officialUser != null
        ? dispatch(logoutOfficialUser())
        : dispatch(logout());
    }
    // navigation.navigate("Home");
  };

  const DrawerItemComponent = ({ label, screenName, iconName }) => (
    <DrawerItem
      label={label}
      onPress={() => navigation.navigate(screenName)}
      icon={({ color, size }) => (
        <Ionicons name={iconName} size={size} color={color} />
      )}
    />
  );
  // const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <DrawerHeader />
        </View>
        {/* <DrawerItemList {...props} /> */}
        {isOfficialLoggedIn && officialUser !== null ? (
          <>
            <DrawerItemComponent
              label="Profile"
              screenName="Official Profile"
              iconName="person-outline"
            />
            <DrawerItemComponent
              label="Assigned Complaints"
              screenName="Assigned Complaints"
              iconName="folder-open-outline"
            />
            {/* <Ionicons name="add-circle-outline" size={24} color="black" /> */}
            <DrawerItemComponent
              label="My Raids"
              screenName="My Raids"
              iconName="list-outline"
            />

            <DrawerItemComponent
              label="Make New Raid"
              screenName="New Raid"
              iconName="add-circle-outline"
            />
          </>
        ) : isLoggedIn && user ? (
          <>
            <DrawerItemComponent
              label="Profile"
              screenName="Profile"
              iconName="person-outline"
            />
            <DrawerItemComponent
              label="My Complaints"
              screenName="My Complaints"
              iconName="document-text-outline"
            />
          </>
        ) : (
          <>
            <DrawerItemComponent
              label="Home"
              screenName="Home"
              iconName="home-outline"
            />
            <DrawerItemComponent
              label="Official Login"
              screenName="Official Login"
              iconName="key-outline"
            />
          </>
        )}
        {!isOfficialLoggedIn && officialUser == null && (
          <>
            <DrawerItemComponent
              label="New Complaint"
              screenName="New Complaint"
              iconName="add-outline"
            />
            <DrawerItemComponent
              label="Check Status"
              screenName="Check Status"
              iconName="information-circle-outline"
            />
          </>
        )}
      </DrawerContentScrollView>
      {(isOfficialLoggedIn && officialUser != null) ||
      (isLoggedIn && user != null) ? (
        <TouchableOpacity
          style={styles.logoutButton}
          // Add the onPress handler for logging out here
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const MyDrawer = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const { officialUser } = useSelector((state) => state.officialAuth);

  const isOfficialLoggedIn = useSelector(seletIsLoggedIn);
  // dispatch(getOfficialLoginStatus());

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  useEffect(() => {
    // console.log("officialUser:", officialUser);

    dispatch(getOfficialLoginStatus());
    if (isOfficialLoggedIn && officialUser === null) {
      dispatch(getOfficialUser());
    }
  }, [dispatch, isOfficialLoggedIn, officialUser]);

  // console.log("isOfficialLoggedIn:", isOfficialLoggedIn);

  // useEffect(() => {
  //   dispatch(getLoginStatus());
  //   if (isLoggedIn && user === null) {
  //     dispatch(getUser());
  //   }
  //   dispatch(getOfficialLoginStatus());
  //   if (isOfficialLoggedIn && officialUser === null) {
  //     dispatch(getOfficialUser());
  //   }
  // }, [dispatch, isLoggedIn, user, isOfficialLoggedIn, officialUser]);

  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          // headerTransparent: true,
          headerTitle: "",
          headerLeftContainerStyle: { marginLeft: 10 },
          headerRightContainerStyle: { marginRight: 10 },
          elevation: 0,
          shadowOpacity: 0,
          headerLeft: () => <CustomDrawerButton />,
          // headerTitle: () => false,
          // headerTitle: "TekSoft",
          // headerRight: () => (
          //   <>
          //     <TouchableOpacity
          //       style={styles.signInSignUpButton}
          //       onPress={handleSignInSignUpPress}
          //     >
          //       <Text style={styles.signInSignUpButtonText}>
          //         {isLoggedIn ? "Sign Out" : "Sign In"}
          //       </Text>
          //     </TouchableOpacity>
          //   </>
          // ),
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        {isOfficialLoggedIn && officialUser != null ? (
          <>
            <Drawer.Group>
              <Drawer.Screen
                name="Official Profile"
                component={OfficialProfile}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Assigned Complaints"
                component={OfficialComplainStack}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="folder-open-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />

              <Drawer.Screen
                name="New Raid"
                component={NewRaid}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="list-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="My Raids"
                component={OfficialRaidStack}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="list-outline" size={size} color={color} />
                  ),
                }}
              />
            </Drawer.Group>
          </>
        ) : isLoggedIn && user ? (
          <>
            <Drawer.Group>
              <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="My Complaints"
                component={MyComplaints}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="document-text-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
            </Drawer.Group>
          </>
        ) : (
          <>
            <Drawer.Group>
              <Drawer.Screen
                name="Home"
                component={HomeStack}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Official Login"
                component={LoginScreen}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="key-outline" size={size} color={color} />
                  ),
                }}
              />

              {/* <Stack.Screen name="Official Login 2" component={LoginScreen} /> */}
            </Drawer.Group>
          </>
        )}
        {!isOfficialLoggedIn && officialUser == null && (
          <>
            <Drawer.Screen
              name="New Complaint"
              component={ComplainStack}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="add-outline" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Check Status"
              component={StatusScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons
                    name="information-circle-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </>
  );
};

const ComplainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Complaint Stack" component={ComplaintScreen1} />
      <Stack.Screen name="Complaint Camera" component={ComplaintCamera} />
      <Stack.Screen name="Complaint Video" component={ComplaintVideo} />
    </Stack.Navigator>
  );
};

const OfficialComplainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AssignedComplaints" component={AssignedComplaints} />
      <Stack.Screen
        name="AssignedComplaintData"
        component={AssignedComplaintData}
      />
      {/* <Stack.Screen name="Complaint Video" component={ComplaintVideo} /> */}
    </Stack.Navigator>
  );
};

const OfficialRaidStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyRaids" component={MyRaids} />
      <Stack.Screen name="MyRaidData" component={MyRaidData} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="First Screen" component={HomeScreen} />
      <Stack.Screen name="AppForm" component={AppForm} />
      <Stack.Screen name="Plastic Raids" component={PlasticRaids} />
      {/* <Stack.Screen name="Official Login" component={LoginScreen} /> */}
      {/* <Stack.Screen
        name="AssignedComplaintData"
        component={AssignedComplaintData}
      /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  iconContainer: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#e5e5e5", // Change this to the desired background color
    borderRadius: 10, // Adjust the border radius to make it circular
    padding: 2, // Add padding to create some space around the icon
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
  userbuttonlogged: {
    backgroundColor: "black",
    flex: 1,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 50,
    backgroundColor: "#f6f6f6",
    paddingVertical: 20,
    alignItems: "center", // Center the text horizontally
  },
  logoutButtonText: {
    color: "#2196f3", // Blue color
    fontSize: 16,
    fontWeight: "bold",
  },
});
