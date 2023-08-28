import axios from "axios";
import { BASE_API_URL } from "../../../Components/Utils";

const API_URL = `${BASE_API_URL}/api/officialUsers/`;

// Register User
const registerOfficialUser = async (userData) => {
  const response = await axios.post(API_URL + "registerOfficialUser", userData);
  return response.data;
};

// Login User
const loginOfficialUser = async (userData) => {
  const response = await axios.post(API_URL + "loginOfficialUser", userData);
  return response.data;
};

// Logout User
const logoutOfficialUser = async () => {
  const response = await axios.get(API_URL + "logoutOfficialUser");
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

// Get user profile
const getOfficialUser = async () => {
  const response = await axios.get(API_URL + "getOfficialUser");
  return response.data;
};

// Update profile
const updateOfficialUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateOfficialUser", userData);
  return response.data;
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
  registerOfficialUser,
  loginOfficialUser,
  logoutOfficialUser,
  getLoginStatus,
  getOfficialUser,
  updateOfficialUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getOfficialUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
};

export default officialAuthService;
