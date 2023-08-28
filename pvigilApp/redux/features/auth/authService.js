import AsyncStorage from "@react-native-async-storage/async-storage";
// import {} from "@react-native-async-storage/async-storage";

import { BASE_API_URL } from "../../../Utils/utils";
import axios from "axios";

// const { token } = params;

// import { BASE_API_URL } from "../../../Components/Utils";

export const API_URL = `${BASE_API_URL}/api/users/`;

// Save cookie to AsyncStorage
// const saveCookie = async (token) => {
//   try {
//     await AsyncStorage.setItem("token", token);
//   } catch (error) {
//     console.log("Error saving cookie:", error);
//   }
// };

// Retrieve cookie from AsyncStorage
// const getCookie = async () => {
//   try {
//     const cookie = await AsyncStorage.getItem("token");
//     return cookie;
//   } catch (error) {
//     console.log("Error retrieving cookie:", error);
//     return null;
//   }
// };

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + "register", userData);
    // const token = response.data.token;
    // if (token) {
    //   await AsyncStorage.setItem("token", token);
    // }
    if (response.data.ok) {
      console.log("Registered User");
    }
    return response.data;
  } catch (error) {
    console.log("Error in authService at Register user:", error.message);
    throw error;
  }
};

// const register = async (userData) => {
//   try {
//     const response = await axios.post(API_URL + "register", userData);
//     return response.data;
//   } catch (error) {
//     console.log("Error in authService at Register User:", error.message);

//     // You can choose to handle the error in a way that doesn't crash the app
//     // For example, you can return a specific error code or object.
//     return { error: "Registration failed. Please try again later." };
//   }
// };
// console.log("register USer in authSerive :", register);

// Login User
// const login = async (userData) => {
//   const response = await axios.post(API_URL + "login", userData);
//   return response.data;
// };

// Login User
// const login = async (userData) => {
//   try {
//     const response = await axios.post(API_URL + "login", userData);
//     const setCookieHeaders = response.headers["set-cookie"];
//     console.log("setCookieHeaders console", setCookieHeaders);
//     if (setCookieHeaders) {
//       await SecureStore.setItemAsync("cookies", setCookieHeaders);
//     }
//     return response.data;
//     // console.log("this is cookies", response.data)
//   } catch (error) {
//     console.log("Error logging in:", error);
//     throw error;
//   }
// };

// const login = async (userData) => {
//   try {
//     const response = await axios.post(API_URL + "login", userData);
//     const setCookieHeaders = response.headers["set-cookie"];
//     console.log("cookies from login", setCookieHeaders);
//     if (setCookieHeaders) {
//       await AsyncStorage.setItem("token", setCookieHeaders);
//     }
//     return response.data;
//   } catch (error) {
//     console.log("Error logging in:", error);
//     throw error;
//   }
// };

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
    const token = response.data.token;
    if (token) {
      await AsyncStorage.setItem("token", token);
    }
    return response.data;
  } catch (error) {
    console.log("Error logging in:", error.message);
    throw error;
  }
};
// console.log("login info", login);

const logout = async () => {
  try {
    await AsyncStorage.removeItem("token"); // Remove the token from AsyncStorage
    return "Logout successful";
  } catch (error) {
    console.log("Error in auth service logout:", error.message);
    throw error;
  }
};

// Get USer
const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(API_URL + "getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching user:", error);
    throw error;
  }
};

// console.log("get user", getUser);

// Get Login Status
const getLoginStatus = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(API_URL + "loginStatus", {
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

// Update profile
const updateUser = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.patch(API_URL + "updateUser", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Updating User", error.message);
    throw error;
  }
};

// Send Verification Email
// const sendVerificationEmail = async () => {
//   const response = await axios.post(API_URL + "sendVerificationEmail");
//   return response.data.message;
// };

// Verify User
// const verifyUser = async (verificationToken) => {
//   const response = await axios.patch(
//     `${API_URL}verifyUser/${verificationToken}`
//   );

//   return response.data.message;
// };

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

// Reset Password
// const resetPassword = async (userData, resetToken) => {
//   const response = await axios.patch(
//     `${API_URL}resetPassword/${resetToken}`,
//     userData
//   );

//   return response.data.message;
// };

// fORGOT Password
// const forgotPassword = async (userData) => {
//   const response = await axios.post(API_URL + "forgotPassword", userData);

//   return response.data.message;
// };

// Get Users
// const getUsers = async () => {
//   const response = await axios.get(API_URL + "getUsers");

//   return response.data;
// };

// Delete User
// const deleteUser = async (id) => {
//   const response = await axios.delete(API_URL + id);

//   return response.data.message;
// };

// Upgrade User
// const upgradeUser = async (userData) => {
//   const response = await axios.post(API_URL + "upgradeUser", userData);

//   return response.data.message;
// };

// Send Login Code
// const sendLoginCode = async (email) => {
//   const response = await axios.post(API_URL + `sendLoginCode/${email}`);

//   return response.data.message;
// };

// Login With Code
// const loginWithCode = async (code, email) => {
//   const response = await axios.post(API_URL + `loginWithCode/${email}`, code);

//   return response.data;
// };

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  changePassword,
  // verifyUser,
  // sendVerificationEmail,
  // forgotPassword,
  // resetPassword,
  // getUsers,
  // deleteUser,
  // upgradeUser,
  // sendLoginCode,
  // loginWithCode,
};

export default authService;
