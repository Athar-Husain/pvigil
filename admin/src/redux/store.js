import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import complaintReducer from "./features/complaint/complaintSlice";
import officialAuthReducer from "./features/officials/officialAuthSlice";
import RaidReducer from "./features/officials/RaidsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authComplaint: complaintReducer,
    officialAuth: officialAuthReducer,
    raid: RaidReducer,
  },
});
