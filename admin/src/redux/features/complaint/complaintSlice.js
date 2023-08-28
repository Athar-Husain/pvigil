import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import complaintService from "./complaintService";

const initialState = {
  complaintDetails: null,
  allComplaints: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register Loom
// export const registerLoom = createAsyncThunk(
//   "loom/registerLoom",
//   async (userData, thunkAPI) => {
//     try {
//       return await loomService.registerLoom(userData);
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

// Update loom

// export const updateLoom = createAsyncThunk(
//   "loom/updateLoom",
//   async ({ id, userData }, thunkAPI) => {
//     // console.log(userData);
//     try {
//       return await loomService.updateLoom(id, userData);
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

// get Loom by Id
// export const getLoomData = createAsyncThunk(
//   "loom/getLoomData",
//   async (id, thunkAPI) => {
//     try {
//       return await loomService.getLoomData(id);
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

// get looms
// export const getLooms = createAsyncThunk(
//   "loom/getLooms",
//   async (_id, thunkAPI) => {
//     try {
//       return await loomService.getLooms(_id);
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

// get searched loom
// export const searchLoom = createAsyncThunk(
//   "loom/searchLoom",
//   async (Reg_id, thunkAPI) => {
//     try {
//       return await loomService.searchLoom(Reg_id);
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

export const getAllComplaints = createAsyncThunk(
  "complaint/getAllComplaints",
  async (_, thunkAPI) => {
    try {
      return await complaintService.getAllComplaints();
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

// Upgrade COmplaint
export const upgradeComplaint = createAsyncThunk(
  "complaint/upgradeComplaint",
  async (userData, thunkAPI) => {
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

// update Complaint
export const updateComplaintBySuperAdmin = createAsyncThunk(
  "complaint/updateComplaintBySuperAdmin",
  async (userData, thunkAPI) => {
    try {
      return await complaintService.updateComplaintBySuperAdmin(userData);
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

// getComplaintData
export const getComplaintData = createAsyncThunk(
  "complaint/getComplaintData",
  async (id, thunkAPI) => {
    try {
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

// extra reducers
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
    // CALC_PENDING_LOOMS(state, action) {
    //   const array = [];
    //   state.looms.map((loom) => {
    //     const { loom_status } = loom;
    //     return array.push(loom_status);
    //   });
    //   let count = 0;
    //   array.forEach((item) => {
    //     if (item === "pending") {
    //       count += 1;
    //     }
    //   });
    //   state.pendingLooms = count;
    // },
    // CALC_SUSPENDED_LOOMS(state, action) {
    //   const array = [];
    //   state.looms.map((loom) => {
    //     const { loom_status } = loom;
    //     return array.push(loom_status);
    //   });
    //   let count = 0;
    //   array.forEach((item) => {
    //     if (item === "suspended") {
    //       count += 1;
    //     }
    //   });
    //   state.pendingLooms = count;
    // },
    // CALC_APPROVED_LOOMS(state, action) {
    //   const array = [];
    //   state.looms.map((loom) => {
    //     const { loom_status } = loom;
    //     return array.push(loom_status);
    //   });
    //   let count = 0;
    //   array.forEach((item) => {
    //     if (item === "approved") {
    //       count += 1;
    //     }
    //   });
    //   state.pendingLooms = count;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllComplaints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.isLoggedIn = true;
        state.allComplaints = action.payload;
        // toast.success("User Updated");
      })
      .addCase(getAllComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.allLooms = null;
        state.message = action.payload;
        // toast.error(action.payload);
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
        toast.error(action.payload);
      })

      .addCase(upgradeComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.message = action.payload;
        state.complaintDetails = action.payload;
        toast.success("Complaint Upgraded Succesfully");
      })
      .addCase(upgradeComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateComplaintBySuperAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComplaintBySuperAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.complaintDetails = action.payload;
        toast.success("Complaint Upgraded Successfully");
      })
      .addCase(updateComplaintBySuperAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });

    // upgradeUser
    // .addCase(upgradeLoom.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(upgradeLoom.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.message = action.payload;
    //   toast.success(action.payload);
    // })
    // .addCase(upgradeLoom.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   toast.error(action.payload);
    // });
  },
});

export const {
  COMPLAINT_RESET,
  // CALC_PENDING_LOOMS,
  // CALC_SUSPENDED_LOOMS,
  // CALC_APPROVED_LOOMS,
} = complaintSlice.actions;

export const selectComplaint = (state) => state.authcomplaint.complaint;

export default complaintSlice.reducer;
