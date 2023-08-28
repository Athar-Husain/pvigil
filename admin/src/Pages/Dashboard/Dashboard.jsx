import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Box, Typography } from "@mui/material";
import {
  Group as UsersIcon,
  PostAdd as ComplaintsIcon,
  People as OfficialsIcon,
  Alarm as RaidsIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getOfficialUsers());
  // }, []);

  return (
    <div className="dashboard_page">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} lg={3}>
          <Link to="/Users">
            <Button
              variant="contained"
              sx={{
                backgroundImage: "linear-gradient(45deg, #f50057, #d500f9)",
                color: "white",
                fontSize: "1.5rem",
                minWidth: "200px",
                minHeight: "200px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UsersIcon sx={{ fontSize: 80, marginBottom: "0.5rem" }} />
              <Typography variant="h6">Users</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link to="/Complaints">
            <Button
              variant="contained"
              sx={{
                backgroundImage: "linear-gradient(45deg, #2979ff, #448aff)",
                color: "white",
                fontSize: "1.5rem",
                minWidth: "200px",
                minHeight: "200px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ComplaintsIcon sx={{ fontSize: 80, marginBottom: "0.5rem" }} />
              <Typography variant="h6">Complaints</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link to="/Officials">
            <Button
              variant="contained"
              sx={{
                backgroundImage: "linear-gradient(45deg, #00bfa5, #1de9b6)",
                color: "white",
                fontSize: "1.5rem",
                minWidth: "200px",
                minHeight: "200px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <OfficialsIcon sx={{ fontSize: 80, marginBottom: "0.5rem" }} />
              <Typography variant="h6">Officials</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Link to="/Raids">
            <Button
              variant="contained"
              sx={{
                backgroundImage: "linear-gradient(45deg, #651fff, #7c4dff)",
                color: "white",
                fontSize: "1.5rem",
                minWidth: "200px",
                minHeight: "200px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RaidsIcon sx={{ fontSize: 80, marginBottom: "0.5rem" }} />
              <Typography variant="h6">Raids</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
