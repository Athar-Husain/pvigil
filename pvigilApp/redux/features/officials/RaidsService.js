import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_API_URL } from "../../../Utils/utils";

const API_URL = `${BASE_API_URL}/api/raids/`;

const registerRaid = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("Officialtoken");
    const response = await axios.post(API_URL + "registerRaid", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Register Raid :", error.message);
    throw error;
  }
};

const getRaids = async () => {
  try {
    const token = await AsyncStorage.getItem("Officialtoken");
    const response = await axios.get(API_URL + "getRaids", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Login Status:", error);
    throw error;
  }
};

const getAllRaids = async () => {
  try {
    // const token = await AsyncStorage.getItem("Officialtoken");
    const response = await axios.get(API_URL + "getAllRaids");
    return response.data;
  } catch (error) {
    console.error("Error fetching Login Status:", error);
    throw error;
  }
};

const getRaidData = async (id) => {
  try {
    const response = await axios.get(API_URL + `getRaidData/${id}`);
    console.log("get getRaidData Hitted");
    return response.data;
  } catch (error) {
    console.error("getComplaintData Error:", error);
    throw error;
  }
};

const RaidsService = {
  registerRaid,
  getRaidData,
  getRaids,
  getAllRaids,
};

export default RaidsService;
