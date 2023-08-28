import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Admin, Resource, CustomRoutes, Authenticated } from "react-admin";
import { BASE_API_URL } from "./Components/Utils";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import OfficialsIcon from "@mui/icons-material/GroupAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ComplaintsIcon from "@mui/icons-material/PostAdd";
import ReportsIcon from "@mui/icons-material/Report";
import UsersIcon from "@mui/icons-material/Group";

import { Dashboard, AllComplaints, UsersList } from "./Pages/import";
import AuthProvider from "./Container/Auth";
import ComplaintData from "./Pages/ComplaintData/ComplaintData";
import { useDispatch } from "react-redux";
import { getOfficialUsers } from "./redux/features/officials/officialAuthSlice";
import OfficialUserList from "./Pages/Officials/OfficialUserList/OfficialUserList";
import RaidData from "./Pages/Raids/RaidData";
import AllRaids from "./Pages/Raids/RaidsList";

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfficialUsers());
  }, []);

  return (
    <div className="app-container">
      <ToastContainer />

      <Admin dataProvider={BASE_API_URL} authProvider={AuthProvider}>
        <Resource
          name="Dashboard"
          path="/"
          icon={DashboardIcon}
          list={
            <Authenticated>
              <Dashboard />
            </Authenticated>
          }
        />
        <Resource
          name="Users"
          icon={UsersIcon}
          list={
            <Authenticated>
              <UsersList />
            </Authenticated>
          }
        />
        <Resource
          name="Complaints"
          icon={ComplaintsIcon}
          list={
            <Authenticated>
              <AllComplaints />
            </Authenticated>
          }
        />
        <Resource
          name="Officials"
          icon={OfficialsIcon}
          list={
            <Authenticated>
              <OfficialUserList />
            </Authenticated>
          }
        />
        <Resource
          name="Raids"
          icon={ReportsIcon}
          list={
            <Authenticated>
              <AllRaids />
            </Authenticated>
          }
        />
        <CustomRoutes>
          <Route
            path="/ComplaintData/:id"
            element={
              <Authenticated>
                <ComplaintData />
              </Authenticated>
            }
          />
          <Route
            path="/RaidData/:id"
            element={
              <Authenticated>
                <RaidData />
              </Authenticated>
            }
          />
        </CustomRoutes>
      </Admin>
    </div>
  );
};

export default App;
