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
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComplaintData } from "../../redux/features/complaint/complaintSlice";
// import { officialUsers } from "../../redux/features/complaint/complaintSlice";
import { getOfficialUsers } from "../../redux/features/officials/officialAuthSlice";

const useStyles = {
  // mediaContainer: {
  //   maxHeight: "90vh", // Set the maximum height for the media container
  //   width: "100%", // Make sure it takes the full width available
  // },
  Container: {
    // height: "120vh",
    // maxHeight: "120vh", // Set the maximum height for the media container
    // width: "100%", // Make sure it takes the full width available
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
  const { complaintDetails } = useSelector((state) => state.authcomplaint);
  const { officialUsers } = useSelector((state) => state.officialAuth);

  console.log("official User in official profile", officialUsers);

  const complaint = complaintDetails || {};

  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const [cachedMedia, setCachedMedia] = useState(null);
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    dispatch(getComplaintData(id));
  }, [dispatch, id]);

  const mediaThumbnail = complaint.imageURL ? (
    <img
      src={complaint.imageURL}
      alt="Complaint Thumbnail"
      style={useStyles.media}
    />
  ) : complaint.videoURL ? (
    <img
      src="/path_to_video_thumbnail.jpg"
      alt="Video Thumbnail"
      style={useStyles.media}
    />
  ) : null;

  // const mediaLabel = complaint.imageURL
  //   ? "See Image"
  //   : complaint.videoURL
  //   ? "Play Video"
  //   : "";

  const mediaContent = complaint.imageURL ? (
    <img
      src={complaint.imageURL}
      alt="Complaint Image"
      style={useStyles.media}
    />
  ) : complaint.videoURL ? (
    <video
      src={complaint.videoURL}
      title="Complaint Video"
      controls
      style={useStyles.media}
    />
  ) : null;

  const mediaLabel = complaint.imageURL
    ? "See Image"
    : complaint.videoURL
    ? "Play Video"
    : "";

  // dispatch(getOfficialUsers());
  const handleAssigned = useCallback((event) => {
    setAssignedTo(event.target.value);
  }, []);

  // Function to open modal with image or video content
  const handleOpenModal = (content) => {
    if (content) {
      setCachedMedia(content);
      setOpenModal(true);
    }
  };

  // Function to close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value);
  }, []);

  const handleExpandClick = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const handleCommentChange = useCallback((event) => {
    setComment(event.target.value);
  }, []);

  const truncatedInfo = complaint.complaint_Info
    ? complaint.complaint_Info.split(" ").slice(0, 30).join(" ")
    : null;

  const shouldTruncate = complaint.complaint_Info
    ? complaint.complaint_Info.split(" ").length > 30
    : null;

  const handleUpdateComplaint = useCallback(() => {
    const upgradedComplaintData = {
      comment,
      status,
      assignedTo,
    };
    console.log("Updating complaint with comment:", upgradedComplaintData);
    // Perform update complaint logic here
  }, [comment, status, assignedTo]);

  return (
    <Card>
      <CardContent style={useStyles.Container}>
        <Grid container spacing={2}>
          {/* {complaint.imageURL && (
            <Grid item xs={12} sm={6}>
              <img
                src={complaint.imageURL}
                alt="Complaint Image"
                style={useStyles.media}
              />
            </Grid>
          )}
          {complaint.videoURL && (
            <Grid item xs={12} sm={6}>
              <video
                src={complaint.videoURL}
                title="Complaint Video"
                controls
                style={useStyles.media}
              />
            </Grid>
          )} */}

          {/* {complaint.imageURL && (
            <Grid item xs={12} sm={6}>
              <img
                src={complaint.imageURL}
                alt="Complaint Image"
                style={useStyles.media}
                onClick={() =>
                  handleOpenModal(
                    <img src={complaint.imageURL} alt="Complaint Image" />
                  )
                }
              />
            </Grid>
          )}
          {complaint.videoURL && (
            <Grid item xs={12} sm={6}>
              <div
                // src={complaint.videoURL}
                title="Complaint Video"
                controls
                style={useStyles.media}
                onClick={() =>
                  handleOpenModal(
                    <video
                      src={complaint.videoURL}
                      title="Complaint Video"
                      controls
                    />
                  )
                }
              />
            </Grid>
          )} */}
          {/* 
          {complaint.imageURL || complaint.videoURL ? (
            <Grid item xs={12} sm={6}>
              <div
                style={useStyles.media}
                onClick={() => handleOpenModal(mediaContent)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  {mediaLabel}
                </div>
              </div>
            </Grid>
          ) : null} */}

          {complaint.imageURL || complaint.videoURL ? (
            <Grid item xs={12} sm={6}>
              <div
                style={useStyles.media}
                onClick={() => handleOpenModal(mediaContent)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  {mediaThumbnail}
                  <div>{mediaLabel}</div>
                </div>
              </div>
            </Grid>
          ) : null}

          {/* <Modal
            open={openModal}
            onClose={handleCloseModal}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              {modalContent}
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          </Modal> */}

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              {cachedMedia}
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          </Modal>

          {/* </Box>  */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Complaint Details</Typography>
            <Divider />
            <Typography variant="body1">
              <strong>Complaint ID:</strong> {complaint.complaint_id}
            </Typography>
            <Typography variant="body1">
              <strong>User:</strong> {complaint.user_email}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {complaint.complaint_status}
            </Typography>
            <Typography variant="body1">
              <strong>Landmark:</strong> {complaint.landmark}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {complaint.description}
            </Typography>
            <Typography variant="body1">
              <strong>Ward No:</strong> {complaint.ward_no}
            </Typography>
            <Typography variant="body1">
              <strong>Google Maps:</strong>{" "}
              <a
                href={complaint.glink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Maps
              </a>
            </Typography>

            <Box mt={2}>
              <Typography variant="body1">
                <strong>Complaint Info:</strong>
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
                    {complaint.complaint_Info}{" "}
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
            <FormControl variant="standard" fullWidth>
              {/* <Box mt={2} display="flex" alignItems="center">
                <Typography variant="body1" mr={2}>
                  <strong>Status:</strong>
                </Typography>
                <Select value={status} onChange={handleChangeStatus}>
                  <MenuItem value="Under Review">Under Review</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Action Initiated">Action Initiated</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </Box> */}
              {/* <Box mt={2} display="flex" alignItems="center">
                <Typography variant="body1" mr={2}>
                  <strong>Assign To:</strong>
                </Typography>
                <Select value={status} onChange={handleChangeStatus}>
                  <MenuItem value="Under Review">1 user ID</MenuItem>
                  <MenuItem value="Approved">2 user ID</MenuItem>
                  <MenuItem value="Action Initiated">3 user ID</MenuItem>
                  <MenuItem value="Rejected">4 user ID</MenuItem>
                  <MenuItem value="Rejected">5 user ID</MenuItem>
                  <MenuItem value="Rejected">6 user ID</MenuItem>
                  <MenuItem value="Rejected">7 user ID</MenuItem>
                </Select>
              </Box> */}

              <Box mt={2} display="flex" alignItems="center">
                <Typography variant="body1" mr={2}>
                  <strong>Assign To:</strong>
                </Typography>
                <FormControl>
                  <InputLabel id="assign-to-label">Select User</InputLabel>
                  <Select
                    labelId="assign-to-label"
                    id="assign-to-select"
                    value={assignedTo}
                    onChange={handleAssigned}
                  >
                    {officialUsers.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.wardNo} -- {user.userId}
                        {/* {`<p>user.-id ${user?._id} </p>`} */}
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
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              style={useStyles.button}
              onClick={handleUpdateComplaint}
            >
              Update Complaint
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ComplaintData;
