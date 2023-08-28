import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { // toast } from "react-// toastify";
import officialAuthService from "./officialAuthService";
import { showMessage, hideMessage } from "react-native-flash-message";

const initialState = {
  isOfficialLoggedIn: false,
  officialUser: null,
  officialUsers: [],
  //   twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User
// export const register = createAsyncThunk(
//   "auth/register",
//   async (userData, thunkAPI) => {
//     try {
//       return await officialAuthService.registerOfficialUser(userData);
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

// Login User
export const loginOfficialUser = createAsyncThunk(
  "officialAuth/loginOfficialUser",
  async (userData, thunkAPI) => {
    try {
      return await officialAuthService.loginOfficialUser(userData);
      console.log("login hitted in the oficial auth ");
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
export const logoutOfficialUser = createAsyncThunk(
  "auth/logoutOfficialUser",
  async (_, thunkAPI) => {
    try {
      return await officialAuthService.logoutOfficialUser();
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
export const getOfficialUser = createAsyncThunk(
  "auth/getOfficialUser",
  async (_, thunkAPI) => {
    try {
      return await officialAuthService.getOfficialUser();
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

// Get Login Status
export const getOfficialLoginStatus = createAsyncThunk(
  "auth/getOfficialLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await officialAuthService.getOfficialLoginStatus();
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

// Update User
// export const updateOfficialUser = createAsyncThunk(
//   "auth/updateOfficialUser",
//   async (userData, thunkAPI) => {
//     try {
//       console.log("User data in slice at updateOfficialUser", userData);
//       return await officialAuthService.updateOfficialUser(userData);
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

export const updateOfficialUser = createAsyncThunk(
  "auth/updateOfficialUser",
  async (userData, thunkAPI) => {
    try {
      return await officialAuthService.updateOfficialUser(userData);
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

// send Verification Email
export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (_, thunkAPI) => {
    try {
      return await officialAuthService.sendVerificationEmail();
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

// verify User
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (verificationToken, thunkAPI) => {
    try {
      return await officialAuthService.verifyUser(verificationToken);
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
      return await officialAuthService.changePassword(userData);
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

// forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, thunkAPI) => {
    try {
      return await officialAuthService.forgotPassword(userData);
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

// resetPassword
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userData, resetToken }, thunkAPI) => {
    try {
      return await officialAuthService.resetPassword(userData, resetToken);
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

// getUsers
// export const getUsers = createAsyncThunk(
//   "auth/getUsers",
//   async (_, thunkAPI) => {
//     try {
//       return await officialAuthService.getUsers();
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

// deleteUser
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await officialAuthService.deleteUser(id);
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
// upgradeUser
export const upgradeUser = createAsyncThunk(
  "auth/upgradeUser",
  async (userData, thunkAPI) => {
    try {
      return await officialAuthService.upgradeUser(userData);
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
// sendLoginCode
export const sendLoginCode = createAsyncThunk(
  "auth/sendLoginCode",
  async (email, thunkAPI) => {
    try {
      return await officialAuthService.sendLoginCode(email);
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
// loginWithCode
export const loginWithCode = createAsyncThunk(
  "auth/loginWithCode",
  async ({ code, email }, thunkAPI) => {
    try {
      return await officialAuthService.loginWithCode(code, email);
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

const officialAuthSlice = createSlice({
  name: "officialAuth",
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
      // .addCase(register.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(register.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.isLoggedIn = true;
      //   state.officialUser = action.payload;
      //   // // toast.success("Registration Successful");
      //   console.log(action.payload);
      // })
      // .addCase(register.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.officialUser = null;
      //   // // toast.error(action.payload);
      // })
      // Login User
      .addCase(loginOfficialUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginOfficialUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOfficialLoggedIn = true;
        state.officialUser = action.payload;
        // // toast.success("Login Successful");
        // console.log("Official user Login in officialAuthSLice", action.payload);
        showMessage({
          message: "Succesfull",
          description: "Logged In Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      .addCase(loginOfficialUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isOfficialLoggedIn = false;
        state.message = action.payload;
        state.officialUser = null;
        // // toast.error(action.payload);
        // if (action.payload.includes("New browser")) {
        //   state.twoFactor = true;
        // }
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // Logout User
      .addCase(logoutOfficialUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutOfficialUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOfficialLoggedIn = false;
        state.officialUser = null;
        // // toast.success(action.payload);
        showMessage({
          message: "Succesfull",
          description: "Logged Out Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      .addCase(logoutOfficialUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // // Get Login Status
      .addCase(getOfficialLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOfficialLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOfficialLoggedIn = action.payload;
        console.log("getOfficialLoginStatus in slice", action.payload);
        // showMessage({
        //   message: "Succesfull",
        //   description: "Logged In True!",
        //   type: "success",
        //   duration: 1000,
        //   position: "top",
        //   style: { justifyContent: "center", alignItems: "center" },
        // });
      })
      .addCase(getOfficialLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.isOfficialLoggedIn = false;
        state.message = action.payload;
        // console.log(action.payload);
        showMessage({
          message: "Error in Login Status",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // Get User
      .addCase(getOfficialUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOfficialUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.officialUser = action.payload;
        showMessage({
          message: "Succesfull",
          description: "User Found Succesfully!",
          type: "success",
          duration: 1000,
          position: "top",
          style: {
            justifyContent: "center",
            alignItems: "center",
            height: 5,
          },
        });
      })
      .addCase(getOfficialUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        showMessage({
          message: "Error in get Official User",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
        // toast.error(action.payload);
      })

      // Update user
      .addCase(updateOfficialUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOfficialUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.officialUser = action.payload;
        // toast.success("User Updated");
        showMessage({
          message: "Succesfull",
          description: "User Updated Succesfully!",
          type: "success",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })
      .addCase(updateOfficialUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // send Verification Email
      .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // verify User
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
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
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // getUsers
      // .addCase(getUsers.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getUsers.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.users = action.payload;
      // })
      // .addCase(getUsers.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   // toast.error(action.payload);
      //   showMessage({
      //     message: "Error",
      //     description: action.payload,
      //     type: "danger",
      //     duration: 3000,
      //     position: "top",
      //     style: { justifyContent: "center", alignItems: "center" },
      //   });
      // })

      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // upgradeUser
      .addCase(upgradeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
      })
      .addCase(upgradeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // send Login Code
      .addCase(sendLoginCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendLoginCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        showMessage({
          message: "Error",
          description: action.payload,
          type: "danger",
          duration: 3000,
          position: "top",
          style: { justifyContent: "center", alignItems: "center" },
        });
      })

      // loginWithCode
      .addCase(loginWithCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.twoFactor = false;
        state.user = action.payload;
        // toast.success(action.payload);
      })
      .addCase(loginWithCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
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

    // loginWithGoogle
    // .addCase(loginWithGoogle.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(loginWithGoogle.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isLoggedIn = true;
    //   state.user = action.payload;
    //   // toast.success("Login Successful");
    // })
    // .addCase(loginWithGoogle.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   state.user = null;
    //   // toast.error(action.payload);
    // });
  },
});

// export const {} = authSlice.actions;
export const { RESET, CALC_VERIFIED_USER, CALC_SUSPENDED_USER } =
  officialAuthSlice.actions;
export const seletIsLoggedIn = (state) => state.officialAuth.isOfficialLoggedIn;

export const selectUser = (state) => state.officialAuth.officialUser;

export default officialAuthSlice.reducer;
