import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { // toast } from "react-// toastify";
import { toast } from "react-toastify";
import officialAuthService from "./officialAuthService";
// import { showMessage, hideMessage } from "react-native-flash-message";

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
export const registerOfficialUser = createAsyncThunk(
  "auth/registerOfficialUser",
  async (userData, thunkAPI) => {
    try {
      return await officialAuthService.registerOfficialUser(userData);
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
// export const loginOfficialUser = createAsyncThunk(
//   "officialAuth/loginOfficialUser",
//   async (userData, thunkAPI) => {
//     try {
//       return await officialAuthService.loginOfficialUser(userData);
//       console.log("login hitted in the oficial auth ");
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

// get All Users
export const getOfficialUsers = createAsyncThunk(
  "officialAuth/getOfficialUsers",
  async (_, thunkAPI) => {
    try {
      return await officialAuthService.getOfficialUsers();
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
export const getLoginStatus = createAsyncThunk(
  "officialAuth/getLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await officialAuthService.getLoginStatus();
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
export const updateUser = createAsyncThunk(
  "officialAuth/updateOfficialUser",
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
  "officialAuth/sendVerificationEmail",
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
  "officialAuth/verifyUser",
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
  "officialAuth/changePassword",
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
  "officialAuth/forgotPassword",
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
  "officialAuth/resetPassword",
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
  "officialAuth/deleteUser",
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
  "officialAuth/upgradeUser",
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
  "officialAuth/sendLoginCode",
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
  "officialAuth/loginWithCode",
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
      // state.twoFactor = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    // CALC_VERIFIED_USER(state, action) {
    //   const array = [];
    //   state.users.map((user) => {
    //     const { isVerified } = user;
    //     return array.push(isVerified);
    //   });
    //   let count = 0;
    //   array.forEach((item) => {
    //     if (item === true) {
    //       count += 1;
    //     }
    //   });
    //   state.verifiedUsers = count;
    // },
    // CALC_SUSPENDED_USER(state, action) {
    //   const array = [];
    //   state.users.map((user) => {
    //     const { role } = user;
    //     return array.push(role);
    //   });
    //   let count = 0;
    //   array.forEach((item) => {
    //     if (item === "suspended") {
    //       count += 1;
    //     }
    //   });
    //   state.suspendedUsers = count;
    // },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerOfficialUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerOfficialUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // state.officialUser = action.payload;
        toast.success("Registration Successful");
        console.log(action.payload);
      })
      .addCase(registerOfficialUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.officialUser = null;
        toast.error(action.payload);
      })
      // Login User
      // .addCase(loginOfficialUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(loginOfficialUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.isOfficialLoggedIn = true;
      //   state.officialUser = action.payload;
      //   // // toast.success("Login Successful");
      //   // console.log("Official user Login in officialAuthSLice", action.payload);
      // })
      // .addCase(loginOfficialUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.officialUser = null;
      //   // // toast.error(action.payload);
      //   // if (action.payload.includes("New browser")) {
      //   //   state.twoFactor = true;
      //   // }
      // })

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
      })
      .addCase(logoutOfficialUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // // toast.error(action.payload);
      })

      // Get Login Status
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        console.log(action.payload);
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

      // Get User
      .addCase(getOfficialUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOfficialUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOfficialLoggedIn = true;
        state.officialUser = action.payload;
      })
      .addCase(getOfficialUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get User
      .addCase(getOfficialUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOfficialUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.isLoggedIn = true;
        state.officialUsers = action.payload;
        // toast.success("Users Found");
      })
      .addCase(getOfficialUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOfficialLoggedIn = true;
        state.officialUser = action.payload;
        // toast.success("User Updated");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
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
export const selectUsers = (state) => state.officialAuth.officialUsers;

export default officialAuthSlice.reducer;
