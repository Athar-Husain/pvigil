import { BASE_API_URL } from "../../../Utils/utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const COMPLAINT_API = `${BASE_API_URL}/api/complaints`;

// Register Complaint
// const registerComplaint = async (userData) => {
//   const response = await axios.post(
//     COMPLAINT_API + "/registerComplaint",
//     userData
//   );
//   return response.data;
// };

// const response = await axios.get(API_URL + "getUser", {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
// Registered User Complaint
const registerComplaint = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      COMPLAINT_API + "/registerComplaint",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error register complaint :", error.message);
    throw error;
  }
};

// Annonymous USer Complaint
const anonymousComplaint = async (userData) => {
  try {
    const response = await axios.post(
      COMPLAINT_API + "/anonymousComplaint",
      userData
    );
    return response.data;
  } catch (error) {
    console.log("anonymous Complaint complaint:", error);
    throw error;
  }
};
const upgradeComplaint = async (userData) => {
  try {
    const response = await axios.post(
      COMPLAINT_API + "/upgradeComplaint",
      userData
    );
    return response.data;
  } catch (error) {
    console.log("anonymous Complaint complaint:", error);
    throw error;
  }
};

const updateComplaintByOfficials = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("Officialtoken");
    const response = await axios.patch(
      COMPLAINT_API + "/updateComplaintByOfficials",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(
      "Error in Complaint Service at updateComplaintByOfficials",
      error
    );
    throw error;
  }
};

const searchComplaint = async (complaint_id) => {
  try {
    const response = await axios.get(
      COMPLAINT_API + `/searchComplaint/${complaint_id}`
    );
    return response.data;
  } catch (error) {
    console.log("Searched Complaint Error:", error);
    throw error;
  }
};
const getComplaintById = async () => {
  try {
    const response = await axios.post(COMPLAINT_API + `/getComplaintById`);
    return response.data;
  } catch (error) {
    console.log("GetComplaints By Id Error:", error);
    throw error;
  }
};

// const getComplaints = async (token) => {
//   try {
//     const response = await axios.post(COMPLAINT_API + `/getComplaints`, token, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log("GetComplaints  Error:", error);
//     throw error;
//   }
// };

const getComplaints = async (token) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(COMPLAINT_API + `/getComplaints`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("GetComplaints Error:", error);
    throw error;
  }
};

// getComplaintData
const getComplaintData = async (id) => {
  try {
    // const token = await AsyncStorage.getItem("token");
    const response = await axios.get(COMPLAINT_API + `/getComplaintData/${id}`);
    console.log("get ComplaintData Hitted");
    return response.data;
  } catch (error) {
    console.log("getComplaintData Error:", error);
    throw error;
  }
};

const complaintService = {
  registerComplaint,
  anonymousComplaint,
  searchComplaint,
  getComplaintById,
  getComplaints,
  upgradeComplaint,
  getComplaintData,
  // updateComplaintByOffciails,
  updateComplaintByOfficials,
};

export default complaintService;
