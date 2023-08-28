import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from 'react-toastify';
import { Alert, Text } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";

import RaidsService from "./RaidsService";

const initialState = {
  allRaids: [],
  raidDetails: null,
  myRaids: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register Complaint
export const registerRaid = createAsyncThunk(
  "raids/registerRaid",
  async (userData, thunkAPI) => {
    try {
      return await RaidsService.registerRaid(userData);
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

export const getRaids = createAsyncThunk(
  "raids/getRaids",
  async (_id, thunkAPI) => {
    try {
      return await RaidsService.getRaids(_id);
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

export const getRaidData = createAsyncThunk(
  "raids/getRaidData",
  async (id, thunkAPI) => {
    try {
      console.log("getComplaint Data hitted in complaitSlice file");
      return await RaidsService.getRaidData(id);
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

export const getAllRaids = createAsyncThunk(
  "raids/getAllRaids",
  async (_, thunkAPI) => {
    try {
      console.log("getAllRaids hitted in the slice");
      return await RaidsService.getAllRaids();
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

const raidSlice = createSlice({
  name: "raids",
  initialState,
  reducers: {
    RAID_RESET(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Complaint
      .addCase(registerRaid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerRaid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.complaint = action.payload;
        // toast.success("Complaint Resgistered Succesfully");
        showMessage({
          message: "Succesfull",
          description: "Raid Resgistered Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        Alert.alert("Succesfull", "Raid Resgistered Succesfully");
      })
      .addCase(registerRaid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.complaint = null;
        // toast.error(action.payload)
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        Alert.alert(action.payload);
      })

      // getComplaintData
      .addCase(getRaidData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRaidData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.raidDetails = action.payload; // Update the complaintDetails state here
      })
      .addCase(getRaidData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.raidDetails = null;
        // toast.error(action.payload);
        showMessage({
          message: "Error in getRaidData",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      // getComplaintData
      .addCase(getRaids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRaids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myRaids = action.payload; // Update the complaintDetails state here
      })
      .addCase(getRaids.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.myRaids = null;
        // toast.error(action.payload);
        showMessage({
          message: "Error in getRaidData",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      .addCase(getAllRaids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRaids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allRaids = action.payload; // Update the complaintDetails state here
        // toast.error("");
      })
      .addCase(getAllRaids.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.allRaids = null;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      });
  },
});

export const { RAID_RESET } = raidSlice.actions;

export const selectRaid = (state) => state.raid;

export default raidSlice.reducer;
