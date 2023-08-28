import axios from "axios";
import { BASE_API_URL } from "../../../Components/Utils";

const API_URL = `${BASE_API_URL}/api/raids/`;

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
  getRaidData,
  getAllRaids,
};

export default RaidsService;
