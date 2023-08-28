import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getRaidData } from "../../redux/features/raids/raidSlice";
import { toast } from "react-toastify";
import { getRaidData } from "../../redux/features/officials/RaidsSlice";

const useStyles = {
  // mediaContainer: {
  //   maxHeight: "90vh", // Set the maximum height for the media container
  //   width: "100%", // Make sure it takes the full width available
  // },

  Container: {
    // background: "linear-gradient(135deg, #e9f2d0, #adf0e9, #a9d5e8)",

    background:
      "linear-gradient(135deg, rgba(233, 242, 208, 0.695203081232493) 0%, rgba(173, 240, 233, 0.7232142857142857) 45%, rgba(169, 213, 232, 0.7876400560224089) 92%)",
  },
  media: {
    height: "90vh", // Set full height for media
    width: "90%", // Remove fixed width to make it responsive
    // objectFit: "cover",
  },
  textarea: {
    width: "100%",
    minHeight: "150px",
    maxHeight: "300px",
    resize: "vertical",
  },
  button: {
    marginTop: "1rem",
  },
};

const RaidData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { raidDetails } = useSelector((state) => state.raid);
  const raid = raidDetails || {};

  console.log("raid in the RaidData", raid);

  // Add your state variables here
  // ...

  const fetchRaidData = useCallback(() => {
    dispatch(getRaidData(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchRaidData();
  }, [fetchRaidData]);

  const mediaContent = raid?.imageURL ? (
    <img src={raid?.imageURL} alt="Complaint_image" style={useStyles.media} />
  ) : raid?.videoURL ? (
    <video
      src={raid?.videoURL}
      title="Complaint_Video"
      controls
      style={useStyles.media}
    />
  ) : null;

  // Add your event handlers and other logic here
  // ...

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {mediaContent && (
            <>
              <Grid item xs={12} sm={6}>
                <div style={useStyles.media}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    {mediaContent}
                  </div>
                </div>
              </Grid>
            </>
          )}

          {/* Raid details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Raid Details</Typography>
            <Divider />
            {/* Render raid details here */}
            <Typography variant="body1">
              <strong>Raid ID : </strong> {raid?.raid_id}
            </Typography>
            <Typography variant="body1">
              <strong>Raider : </strong> {raid?.raidBy?.userId}
            </Typography>

            <Typography variant="body1">
              <strong>Landmark:</strong> {raid?.landmark}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {raid?.description}
            </Typography>
            <Typography variant="body1">
              <strong>Ward No:</strong> {raid?.ward_no}
            </Typography>
            <Typography variant="body1">
              <strong>Google Maps:</strong>{" "}
              <a href={raid?.glink} target="_blank" rel="noopener noreferrer">
                View on Maps
              </a>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RaidData;
