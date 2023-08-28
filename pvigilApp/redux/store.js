// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/auth/authSlice";
// import complaintReducer from "./features/complaints/complaintSlice";
// import officialAuthReducer from "./features/officials/officialAuthSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     authComplaint: complaintReducer,
//     officialAuth: officialAuthReducer,
//   },
// });

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import complaintReducer from "./features/complaints/complaintSlice";
import officialAuthReducer from "./features/officials/officialAuthSlice";
import RaidReducer from "./features/officials/RaidsSlice";
import connectivityMiddleware from "./connectivityCheck"; // Adjust the path

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authComplaint: complaintReducer,
    officialAuth: officialAuthReducer,
    raid: RaidReducer,
  },
  middleware: [...getDefaultMiddleware(), connectivityMiddleware],
});
