import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_API_URL } from "../../../Utils/utils";

const API_URL = `${BASE_API_URL}/api/officialUsers/`;

const loginOfficialUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + "loginOfficialUser", userData);
    const token = response.data.token;
    // console.log("login hitted in the Token", token);
    // console.log("login hitted in the slice", userData);
    if (token) {
      await AsyncStorage.setItem("Officialtoken", token);
    }
    return response.data;
  } catch (error) {
    console.log("Error logging in OfficialAuthService:", error.message);
    throw error;
  }
};
// console.log("loginofficials info", loginOfficialUser);

const logoutOfficialUser = async () => {
  try {
    await AsyncStorage.removeItem("Officialtoken"); // Remove the token from AsyncStorage
    return "Logout successful";
  } catch (error) {
    console.log("Error in auth service logout:", error.message);
    throw error;
  }
};

const getOfficialLoginStatus = async () => {
  try {
    const token = await AsyncStorage.getItem("Officialtoken");
    const response = await axios.get(API_URL + "officialLoginStatus", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching Login Status:", error);
    throw error;
  }
};

// Get user profile
const getOfficialUser = async () => {
  const token = await AsyncStorage.getItem("Officialtoken");
  const response = await axios.get(API_URL + "getOfficialUser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("token in the getOfficialUser officialAuthService", token);
  return response.data;
};

// Update profile
const updateOfficialUser = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("Officialtoken");
    const response = await axios.patch(
      API_URL + "updateOfficialUser",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error updating official user:", error.message);
    throw error;
  }
};

// Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

// fORGOT Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

// Get Users
const getOfficialUsers = async () => {
  const response = await axios.get(API_URL + "getOfficialUsers");

  return response.data;
};

// Delete User
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

// Upgrade User
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + "upgradeUser", userData);

  return response.data.message;
};

// Send Login Code
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);

  return response.data.message;
};

// Login With Code
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, code);

  return response.data;
};

const officialAuthService = {
  loginOfficialUser,
  logoutOfficialUser,
  getOfficialUser,
  updateOfficialUser,
  getOfficialLoginStatus,
};

export default officialAuthService;
