import axios from "axios";
import { REQ_ORDER_API_URL, SUG_API_URL } from "../../../Components/Utils";

// Get getAllOrderRequests
const getAllOrderRequests = async () => {
  const response = await axios.get(REQ_ORDER_API_URL + "/getAllOrderRequests");

  return response.data;
};

// Get getRequestSuggestion
const getRequestSuggestion = async () => {
  const response = await axios.get(SUG_API_URL + "/getRequestSuggestion");

  return response.data;
};

const suggestionComplaint = {
  getAllOrderRequests,
  getRequestSuggestion,
};

export default suggestionComplaint;

//   export default authService;
