import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  TextareaAutosize,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComplaintData } from "../../redux/features/complaint/complaintSlice";

const useStyles = {
  media: {
    height: "80vh",
    width: "500px",
    objectFit: "cover",
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
  const [status, setStatus] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const { complaintDetails } = useSelector((state) => state.authcomplaint);

  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log("params id", id);
  // const { complaintData } = useSelector(
  //   (state) => state.authcomplaint.complaint
  // );

  // console.log(first)

  useEffect(() => {
    dispatch(getComplaintData(id));
  }, []);

  console.log("Complaint Data", complaintDetails);

  const complaint = complaintDetails;

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // const truncatedInfo = complaint.complaint_Info
  //   ? complaint.complaint_Info.split(" ").slice(0, 30).join(" ")
  //   : null;
  // const shouldTruncate = complaint.complaint_Info
  //   ? complaint.complaint_Info.split(" ").length > 30
  //   : false;

  const handleUpdateComplaint = () => {
    // Perform update complaint logic here
    console.log(
      "Updating complaint with comment:",
      comment,
      "and status:",
      status
    );
    // You can dispatch an action to update the complaint status and add the comment here.
  };

  return (
    <>this</>
    // <Card>
    //   <CardContent>
    //     <Grid container spacing={2}>
    //       {complaint.imageURL && (
    //         <Grid item xs={12} sm={6}>
    //           <img
    //             src={complaint.imageURL}
    //             alt="Complaint Image"
    //             style={useStyles.media}
    //           />
    //         </Grid>
    //       )}
    //       {complaint.videoURL && (
    //         <Grid item xs={12} sm={6}>
    //           <video
    //             src={complaint.videoURL}
    //             title="Complaint Video"
    //             controls
    //             style={useStyles.media}
    //           />
    //         </Grid>
    //       )}
    //       <Grid item xs={12} sm={6}>
    //         <Typography variant="h6">Complaint Details</Typography>
    //         <Divider />
    //         <Typography variant="body1">
    //           <strong>Complaint ID:</strong> {complaint.complaint_id}
    //         </Typography>
    //         <Typography variant="body1">
    //           <strong>User:</strong> {complaint.user}
    //         </Typography>
    //         <Typography variant="body1">
    //           <strong>Status:</strong> {complaint.complaint_status}
    //         </Typography>
    //         <Typography variant="body1">
    //           <strong>Landmark:</strong> {complaint.landmark}
    //         </Typography>
    //         <Typography variant="body1">
    //           <strong>Description:</strong> {complaint.description}
    //         </Typography>
    //         <Typography variant="body1">
    //           <strong>Google Maps:</strong>{" "}
    //           <a
    //             href={complaint.glink}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             View on Maps
    //           </a>
    //         </Typography>

    //         <Box mt={2}>
    //           {complaint.complaint_Info && (
    //             <>
    //               <Typography variant="body1">
    //                 <strong>Complaint Info:</strong>
    //               </Typography>
    //               <Typography variant="body1">
    //                 {shouldTruncate && !expanded ? (
    //                   <>
    //                     {truncatedInfo}...{" "}
    //                     <span
    //                       style={{ cursor: "pointer", color: "blue" }}
    //                       onClick={handleExpandClick}
    //                     >
    //                       Read More
    //                     </span>
    //                   </>
    //                 ) : (
    //                   <>
    //                     {complaint.complaint_Info}{" "}
    //                     {expanded && (
    //                       <span
    //                         style={{ cursor: "pointer", color: "blue" }}
    //                         onClick={handleExpandClick}
    //                       >
    //                         Show Less
    //                       </span>
    //                     )}
    //                   </>
    //                 )}
    //               </Typography>
    //             </>
    //           )}
    //           {!complaint.complaint_Info && (
    //             <Typography variant="body1">
    //               No complaint info available.
    //             </Typography>
    //           )}
    //         </Box>
    //         <FormControl variant="standard" fullWidth>
    //           <Box mt={2} display="flex" alignItems="center">
    //             <Typography variant="body1" mr={2}>
    //               <strong>Status:</strong>
    //             </Typography>
    //             <Select value={status} onChange={handleChangeStatus}>
    //               <MenuItem value="pending">Pending</MenuItem>
    //               <MenuItem value="under review">Under Review</MenuItem>
    //               <MenuItem value="approved">Approved</MenuItem>
    //               <MenuItem value="rejected">Rejected</MenuItem>
    //             </Select>
    //           </Box>
    //           <Box mt={2}>
    //             <Typography variant="body1">
    //               <strong>Comment:</strong>
    //             </Typography>
    //             <TextareaAutosize
    //               rows={4}
    //               placeholder="Enter your comment..."
    //               style={useStyles.textarea}
    //               value={comment}
    //               onChange={handleCommentChange}
    //             />
    //           </Box>
    //         </FormControl>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           style={useStyles.button}
    //           onClick={handleUpdateComplaint}
    //         >
    //           Update Complaint
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </CardContent>
    // </Card>
  );
};

export default ComplaintData;
