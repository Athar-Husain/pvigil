import axios from "axios";
// import { BASE_API_URL } from "../../../Components/Utils";
import { COMPLAINT_API } from "../../../Components/Utils";

// export const LOOM_API_URL = `${BASE_API_URL}/api/looms/`;

// get single  Loom of User
// const getLoomData = async (id) => {
//   const response = await axios.get(LOOM_API_URL + `getLoomData/${id}`);
//   return response.data;
// };

// search loom
const getAllComplaints = async () => {
  console.log("getALL COmplaints Hitted");
  const response = await axios.get(COMPLAINT_API + `getAllComplaints`);
  return response.data;
};

// getComplaintData
const getComplaintData = async (id) => {
  const response = await axios.get(COMPLAINT_API + `getComplaintData/${id}`);
  console.log("getComplaintData Hitted");
  return response.data;
};

// upgradeComplaint
const upgradeComplaint = async (userData) => {
  const response = await axios.post(
    COMPLAINT_API + "upgradeComplaint",
    userData
  );

  return response.data.message;
};

// upgradeComplaint
const updateComplaintBySuperAdmin = async (userData) => {
  const response = await axios.patch(
    COMPLAINT_API + "updateComplaintBySuperAdmin",
    userData
  );

  return response.data.message;
};

const complaintService = {
  getAllComplaints,
  upgradeComplaint,
  getComplaintData,
  updateComplaintBySuperAdmin,
};

export default complaintService;
