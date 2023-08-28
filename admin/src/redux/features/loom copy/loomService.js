import axios from "axios";
import { BASE_API_URL } from "../../../Components/Utils";

export const LOOM_API_URL = `${BASE_API_URL}/api/looms/`;

// Register loom
const registerLoom = async (userData) => {
  const response = await axios.post(LOOM_API_URL + "registerLoom", userData);
  return response.data;
};

// Update profile
const updateLoom = async (id, userData) => {
  const response = await axios.patch(
    LOOM_API_URL + `updateLoom/${id}`,
    userData
  );
  console.log(userData);
  return response.data;
};

// get single  Loom of User
const getLoomData = async (id) => {
  const response = await axios.get(LOOM_API_URL + `getLoomData/${id}`);
  return response.data;
};

// get Loooms of a user
const getLooms = async (id) => {
  const response = await axios.get(LOOM_API_URL + "getLooms", id);
  return response.data;
};

// search loom
const searchLoom = async (Reg_id) => {
  const response = await axios.get(LOOM_API_URL + `searchLoom/${Reg_id}`);
  return response.data;
};

// search loom
const getAllLooms = async () => {
  const response = await axios.get(LOOM_API_URL + `getAllLooms`);
  return response.data;
};

// upgradeLoom
const upgradeLoom = async (userData) => {
  const response = await axios.post(LOOM_API_URL + "upgradeLoom", userData);

  return response.data.message;
};

const loomService = {
  registerLoom,
  updateLoom,
  getLoomData,
  getLooms,
  searchLoom,
  getAllLooms,
  upgradeLoom,
};

export default loomService;
