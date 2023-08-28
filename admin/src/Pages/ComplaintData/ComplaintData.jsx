import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getComplaintData,
  updateComplaintBySuperAdmin,
} from "../../redux/features/complaint/complaintSlice";
// import { officialUsers } from "../../redux/features/complaint/complaintSlice";
// import { getOfficialUsers } from "../../redux/features/officials/officialAuthSlice";
import { toast } from "react-toastify";

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

const ComplaintData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { complaintDetails } = useSelector((state) => state.authcomplaint);
  const { complaintDetails } = useSelector((state) => state.authComplaint);
  // console.log("complaint Details in complaintData", complaintDetails);
  const { officialUsers } = useSelector((state) => state.officialAuth);

  // console.log("official User in official profile", officialUsers);

  const complaint = complaintDetails || {};

  const [complaintStatus, setComplaintStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const fetchComplaintData = useCallback(() => {
    dispatch(getComplaintData(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchComplaintData();
  }, [fetchComplaintData]);

  const mediaContent = complaint?.imageURL ? (
    <img
      src={complaint?.imageURL}
      alt="Complaint_image"
      style={useStyles.media}
    />
  ) : complaint?.videoURL ? (
    <video
      src={complaint?.videoURL}
      title="Complaint_Video"
      controls
      style={useStyles.media}
    />
  ) : null;

  // console.log("media COntent", mediaContent);

  const handleAssigned = useCallback((event) => {
    setAssignedTo(event.target.value);
  }, []);

  const handleChangeStatus = useCallback((event) => {
    setComplaintStatus(event.target.value);
  }, []);

  const handleExpandClick = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const handleCommentChange = useCallback((event) => {
    setComment(event.target.value);
  }, []);

  const truncatedInfo = complaint.descriptionByAdmin
    ? complaint.descriptionByAdmin.split(" ").slice(0, 30).join(" ")
    : null;

  const shouldTruncate = complaint.descriptionByAdmin
    ? complaint.descriptionByAdmin.split(" ").length > 30
    : null;

  const handleUpdateComplaint = async () => {
    let complaint_status = complaintStatus;

    if (complaint.assignedTo?._id === assignedTo) {
      // Compare _id of assigned users
      toast.error("Please select a different user");
      return;
    }

    const userData = {
      complaint_status,
      assignedTo,
      comment,
      id: complaint._id,
    };

    try {
      // Dispatch the action to update the complaint
      await dispatch(updateComplaintBySuperAdmin(userData));

      // Fetch the updated complaint data after the update
      await fetchComplaintData();
    } catch (error) {
      // Handle any errors that occur during the update process
      console.error("Error updating complaint:", error);
      toast.error("An error occurred while updating the complaint");
    }
  };

  return (
    <Card>
      <CardContent style={useStyles.Container}>
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
          {/* </Box>  */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Complaint Details</Typography>
            <Divider />
            <Typography variant="body1">
              <strong>Complaint ID:</strong> {complaint?.complaint_id}
            </Typography>
            <Typography variant="body1">
              <strong>User:</strong> {complaint?.user_email}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {complaint?.complaint_status}
            </Typography>
            <Typography variant="body1">
              <strong>Assigned To:</strong> {complaint?.assignedTo?.userId}
            </Typography>
            <Typography variant="body1">
              <strong>Landmark:</strong> {complaint?.landmark}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {complaint?.description}
            </Typography>
            <Typography variant="body1">
              <strong>Ward No:</strong> {complaint?.ward_no}
            </Typography>
            <Typography variant="body1">
              <strong>Google Maps:</strong>{" "}
              <a
                href={complaint?.glink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Maps
              </a>
            </Typography>

            {complaint.descriptionByAdmin !== "" && (
              <Box mt={2}>
                <Typography variant="body1">
                  <strong>Description by Admin :</strong>
                </Typography>
                <Typography variant="body1">
                  {shouldTruncate && !expanded ? (
                    <>
                      {truncatedInfo}...{" "}
                      <span
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={handleExpandClick}
                      >
                        Read More
                      </span>
                    </>
                  ) : (
                    <>
                      {complaint.descriptionByAdmin}{" "}
                      {expanded && (
                        <span
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={handleExpandClick}
                        >
                          Show Less
                        </span>
                      )}
                    </>
                  )}
                </Typography>
              </Box>
            )}
            <Divider />

            {!complaint?.assignedTo && (
              <>
                <Box mt={2} display="flex" alignItems="center">
                  <Typography variant="body1" mr={2}>
                    <strong>Complaint Status:</strong>
                  </Typography>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel
                      id="complaint-status-label"
                      sx={{
                        color: "#333",
                        fontSize: "14px",
                        marginBottom: "4px",
                      }}
                    >
                      Select Status
                    </InputLabel>
                    <Select
                      labelId="complaint-status-label"
                      id="complaint-status-select"
                      value={complaintStatus}
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value="Assigned">Assigned</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                      <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box mt={2} display="flex" alignItems="center">
                  <Typography variant="body1" mr={2}>
                    <strong>Assign To:</strong>
                  </Typography>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="assign-to-label">Select User</InputLabel>
                    <Select
                      labelId="assign-to-label"
                      id="assign-to-select"
                      value={assignedTo}
                      onChange={handleAssigned}
                    >
                      {officialUsers.map((user) => (
                        <MenuItem key={user._id} value={user._id}>
                          {user.wardNo?.join(", ")} -- {user.userId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <Typography variant="body1">
                    <strong>Comment:</strong>
                  </Typography>
                  <TextareaAutosize
                    rows={4}
                    placeholder="Enter your comment..."
                    style={useStyles.textarea}
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  style={useStyles.button}
                  onClick={handleUpdateComplaint}
                >
                  Update Complaint
                </Button>
              </>
            )}

            <Grid item xs={12} sm={6} mt={4}>
              <Typography variant="h6">Raid Information</Typography>
              <Divider />

              <div>
                {/* ... */}
                <Typography variant="body1">
                  <strong>Nuisance Creator Details</strong>
                </Typography>
                {complaint.raid?.nuisance_creator && (
                  <div>
                    <Typography variant="body1">
                      <strong>Name:</strong>{" "}
                      {complaint.raid?.nuisance_creator.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Firm Name:</strong>{" "}
                      {complaint.raid?.nuisance_creator.firm_name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Action Initiated:</strong>{" "}
                      {complaint.raid?.nuisance_creator.action_Initiated}
                    </Typography>
                    <Typography variant="body1">
                      <strong>GSTIN:</strong>{" "}
                      {complaint.raid?.nuisance_creator.gstin}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Trade No:</strong>{" "}
                      {complaint.raid?.nuisance_creator.trade_No}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Phone:</strong>{" "}
                      {complaint.raid?.nuisance_creator.phone}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Amount:</strong>{" "}
                      {complaint.raid?.nuisance_creator.amount}
                    </Typography>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ComplaintData;
