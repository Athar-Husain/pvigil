import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import Toast from "react-native-toast-message";

import { showMessage, hideMessage } from "react-native-flash-message";
import { Alert } from "react-native";
import authService from "./authService";

const initialState = {
  isLoggedIn: false,
  user: null,
  twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  verifiedUsers: 0,
  suspendedUsers: 0,
};

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
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

// Login User
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
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

// Logout User
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Login Status
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus();
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

// Get User
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// console.log("get user info in AuthSlice", getUser)

// Update User
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
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

// change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.changePassword(userData);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        // toast.success("Registration Successful");
        Alert.alert("Succesfull", "User Resgistered Succesfully");
        // console.log(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        // toast.success("Registration Successful");
        // toast.error(action.payload);
        // Alert.alert('Oopss', action.payload);
      })
      // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        // Toast.show({
        //   type: "success",
        //   text1: "Suucesfull",
        //   text2: "LoggedIn Succesfully",
        //   visibilityTime: 3000, // Duration in milliseconds
        //   position: "top",
        // });
        // showFlashMessage("success", "Success", "Action completed successfully!", 3000, "top");

        showMessage({
          message: "Succesfull",
          description: "Logged In Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        // toast.success("Login Successful");
        // Alert.alert("Succesfull", "LoggedIn Succesfully");
        // console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        // toast.error(action.payload);
        // Alert.alert('Oopss', action.payload);
        // if (action.payload.includes("New browser")) {
        //   state.twoFactor = true;
        // }
        // showFlashMessage("danger", "Error", "An error occurred!", 3000, "top");
        showMessage({
          message: "Error in Login",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
        });
      })

      // Logout User
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        showMessage({
          message: "Log Out",
          description: action.payload,
          type: "danger",
          duration: 9000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        // toast.success(action.payload);
        // Toast.show({
        //   type: "success",
        //   text1: "Suucesfull",
        //   text2: "LoggedIn Succesfully",
        //   visibilityTime: 3000, // Duration in milliseconds
        // });
        // Alert.alert(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        // Toast.show({
        //   type: "error",
        //   text1: "Rejected",
        //   text2: action.payload,
        //   visibilityTime: 3000, // Duration in milliseconds
        // });
        showMessage({
          message: "Error in Login",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
        });
        // Alert.alert(action.payload);
      })

      // Get Login Status
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        console.log("getLoginStatus in auth slice ", action.payload);
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

      // Get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log("getUser Rejected in get", action.payload);
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        // toast.success("User Updated");
        Alert.alert("User Updated");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        Alert.alert(action.payload);
      })

      // change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
        Alert.alert(action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        Alert.alert(action.payload);
      });
  },
});

export const { RESET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
