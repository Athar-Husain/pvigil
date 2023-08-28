import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from 'react-toastify';
import { Alert, Text } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";

import complaintService from "./complaintService";

const initialState = {
  complaintDetails: null,
  complaint: null,
  mycomplaints: [],
  searchedcomplaint: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register Complaint
export const registerComplaint = createAsyncThunk(
  "complaint/registerComplaint",
  async (userData, thunkAPI) => {
    try {
      return await complaintService.registerComplaint(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const anonymousComplaint = createAsyncThunk(
  "complaint/anonymousComplaint",
  async (userData, thunkAPI) => {
    try {
      return await complaintService.anonymousComplaint(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchComplaint = createAsyncThunk(
  "complaint/searchComplaint",
  async (complaint_id, thunkAPI) => {
    try {
      return await complaintService.searchComplaint(complaint_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get Complaint by Id
// export const getComplaintById = createAsyncThunk(
//   "Complaint/getComplaintById",
//   async (id, thunkAPI) => {
//     try {
//       return await complaintService.getComplaintById(id);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// get COmplaints
export const getComplaints = createAsyncThunk(
  "complaints/getComplaints",
  async (_id, thunkAPI) => {
    try {
      return await complaintService.getComplaints(_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const upgradeComplaint = createAsyncThunk(
  "complaints/upgradeComplaint",
  async (_id, thunkAPI) => {
    try {
      return await complaintService.upgradeComplaint(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const getComplaints = createAsyncThunk(
//   "complaints/getComplaints",
//   async (_, thunkAPI) => {
//     try {
//       const token = // Retrieve the token from your authentication state or storage
//       return await complaintService.getComplaints(token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const getComplaintData = createAsyncThunk(
  "complaint/getComplaintData",
  async (id, thunkAPI) => {
    try {
      console.log("getComplaint Data hitted in complaitSlice file");
      return await complaintService.getComplaintData(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateComplaintByOfficials = createAsyncThunk(
  "complaint/updateComplaintByOfficials",
  async (userData, thunkAPI) => {
    try {
      console.log("getComplaint Data hitted in complaitSlice file");
      return await complaintService.updateComplaintByOfficials(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    COMPLAINT_RESET(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Complaint
      .addCase(registerComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.complaint = action.payload;
        // toast.success("Complaint Resgistered Succesfully");
        showMessage({
          message: "Succesfull",
          description: "Complaint Resgistered Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        Alert.alert("Succesfull", "Complaint Resgistered Succesfully");
      })
      .addCase(registerComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.complaint = null;
        // toast.error(action.payload)
        Alert.alert(action.payload);
      })
      // Register Anonymous Complaint
      .addCase(anonymousComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(anonymousComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.complaint = action.payload;
        // toast.success("Complaint Resgistered Succesfully");

        showMessage({
          message: "Succesfull",
          description: "Complaint Resgistered Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });

        Alert.alert(
          "Anonymously Complaint Resgistered",
          `Please note this complaint Id to track the Complaint : ${state.complaint.complaint_id}`
        );
      })
      .addCase(anonymousComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.complaint = null;
        // toast.error(action.payload)
        Alert.alert(action.payload);
      })
      // Search  Complaint
      .addCase(searchComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.searchedcomplaint = action.payload;
        showMessage({
          message: "Succesfull",
          description: "Complaint Found!",
          type: "success",
          duration: 1000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      .addCase(searchComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.searchedcomplaint = null;
        // toast.error(action.payload)
        showMessage({
          message: "Error",
          description: action.payload,
          type: "warning",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        Alert.alert(action.payload);
      })
      // Get   Complaint By ID
      .addCase(getComplaints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.mycomplaints = action.payload;
        // state.complaint = action.payload;
        // toast.success("Complaint Resgistered Succesfully");
        // Alert.alert(
        //   "Succesfull",
        //   "Complaint Resgistered Succesfully"
        // );
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.mycomplaints = null;
        // toast.error(action.payload)
        // Alert.alert(action.payload);
        console.log("getComplaints in complaintslice", action.payload);
      })
      .addCase(upgradeComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.complaint = action.payload;
        // toast.success("Complaint Resgistered Succesfully");

        showMessage({
          message: "Succesfull",
          description: "Complaint upgraded Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });

        // Alert.alert(
        //   "Anonymously Complaint Resgistered",
        //   `Please note this complaint Id to track the Complaint : ${state.complaint.complaint_id}`
        // );
      })
      .addCase(upgradeComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.complaint = null;
        // toast.error(action.payload)
        // Alert.alert(action.payload);
        showMessage({
          message: "Error in Upgrade Complaint",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      // getComplaintData
      .addCase(getComplaintData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComplaintData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.complaintDetails = action.payload; // Update the complaintDetails state here
      })
      .addCase(getComplaintData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.complaintDetails = null;
        // toast.error(action.payload);
        showMessage({
          message: "Error in getComplaintData",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      .addCase(updateComplaintByOfficials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComplaintByOfficials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.complaintDetails = action.payload; // Update the complaintDetails state here
        showMessage({
          message: "Success",
          description: "Complaint Updated Sucessfully",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      .addCase(updateComplaintByOfficials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.complaintDetails = null;
        // toast.error(action.payload);
        showMessage({
          message: "Error in updateComplaintByOfficials",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      });
  },
});

export const { COMPLAINT_RESET } = complaintSlice.actions;

export const selectComplaint = (state) => state.authComplaint.complaint;
// export const selectComplaint = (state) => state.authcomplaint.complaint;

export default complaintSlice.reducer;
