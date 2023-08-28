// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from 'react-toastify';
// import { Alert, Text } from "react-native";
// import { showMessage, hideMessage } from "react-native-flash-message";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import RaidsService from "./RaidsService";

const initialState = {
  raidDetails: null,
  allRaids: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register Complaint

export const getAllRaids = createAsyncThunk(
  "raids/getRaids",
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
        toast.error(action.payload);
        // showMessage({
        //   message: "Error in getRaidData",
        //   description: action.payload,
        //   type: "danger",
        //   duration: 3000,
        //   position: "top",
        //   style: { justifyContent: "center", alignItems: "center" },
        // });
      })
      // getComplaintData
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
        toast.error(action.payload);
        // showMessage({
        //   message: "Error in getRaidData",
        //   description: action.payload,
        //   type: "danger",
        //   duration: 3000,
        //   position: "top",
        //   style: { justifyContent: "center", alignItems: "center" },
        // });
      });
  },
});

export const { RAID_RESET } = raidSlice.actions;

export const selectedRaid = (state) => state.raid;

export default raidSlice.reducer;
