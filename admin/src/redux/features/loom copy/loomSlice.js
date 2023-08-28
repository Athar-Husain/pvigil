import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import loomService from "./loomService";

const initialState = {
  // twoFactor: false,

  loomData: null,
  allLooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  pendingLooms: 0,
  approvedLooms: 0,
  suspendedLooms: 0,
  // rjectedLooms: 0,
};

// Register Loom
export const registerLoom = createAsyncThunk(
  "loom/registerLoom",
  async (userData, thunkAPI) => {
    try {
      return await loomService.registerLoom(userData);
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

// Update loom

export const updateLoom = createAsyncThunk(
  "loom/updateLoom",
  async ({ id, userData }, thunkAPI) => {
    // console.log(userData);
    try {
      return await loomService.updateLoom(id, userData);
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

// get Loom by Id
export const getLoomData = createAsyncThunk(
  "loom/getLoomData",
  async (id, thunkAPI) => {
    try {
      return await loomService.getLoomData(id);
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

// get looms
export const getLooms = createAsyncThunk(
  "loom/getLooms",
  async (_id, thunkAPI) => {
    try {
      return await loomService.getLooms(_id);
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

// get searched loom
export const searchLoom = createAsyncThunk(
  "loom/searchLoom",
  async (Reg_id, thunkAPI) => {
    try {
      return await loomService.searchLoom(Reg_id);
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

export const getAllLooms = createAsyncThunk(
  "loom/getAllLooms",
  async (_, thunkAPI) => {
    try {
      return await loomService.getAllLooms();
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

// upgradeLoom
export const upgradeLoom = createAsyncThunk(
  "auth/upgradeUser",
  async (userData, thunkAPI) => {
    try {
      return await loomService.upgradeLoom(userData);
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
const loomSlice = createSlice({
  name: "loom",
  initialState,
  reducers: {
    LOOM_RESET(state) {
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
      // Register Loom
      .addCase(registerLoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerLoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.message = "";
        state.loom = action.payload;
        toast.success("Loom Registered Successfully");
        console.log(action.payload);
      })
      .addCase(registerLoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.loom = null;
        toast.error(action.payload);
      })

      // updateLoom
      .addCase(updateLoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.loom = action.payload;
        state.isSuccess = true;
        // console.log(state.loom);
        toast.success("User Updated");
      })
      .addCase(updateLoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getLoomData
      .addCase(getLoomData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoomData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.loomData = action.payload;
        // toast.success("User Updated");
      })
      .addCase(getLoomData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loom = null;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getLooms

      .addCase(getLooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.isLoggedIn = true;
        state.looms = action.payload;
        // toast.success("User Updated");
      })
      .addCase(getLooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.looms = null;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(searchLoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchLoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.isLoggedIn = true;
        state.searchedloom = action.payload;
        toast.success("Loom Found");
      })
      .addCase(searchLoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.searchedloom = null;
        state.message = action.payload;
        toast.error("Loom Not Found, Please Check Reg Id");
      })

      .addCase(getAllLooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.isLoggedIn = true;
        state.allLooms = action.payload;
        // toast.success("User Updated");
      })
      .addCase(getAllLooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.allLooms = null;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // upgradeUser
      .addCase(upgradeLoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeLoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(upgradeLoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  LOOM_RESET,
  // CALC_PENDING_LOOMS,
  // CALC_SUSPENDED_LOOMS,
  // CALC_APPROVED_LOOMS,
} = loomSlice.actions;

export const selectLoom = (state) => state.authloom.loom;

export default loomSlice.reducer;
