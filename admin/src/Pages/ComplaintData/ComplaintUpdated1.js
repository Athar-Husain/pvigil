import React, { useState, useEffect } from "react";
import {
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
import { getComplaintData } from "../../redux/features/complaint/complaintSlice";
import axios from "axios";

const useStyles = {
  // Styles for media and other components if needed
};

const ComplaintData = () => {
  // Your existing code for ComplaintData component
};

const ComplaintDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { complaintDetails } = useSelector((state) => state.authcomplaint);

  useEffect(() => {
    // Fetch complaint details for the specific complaint id
    dispatch(getComplaintData(id));
  }, [dispatch, id]);

  const complaint = complaintDetails || {};
  const [status, setStatus] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [officialUsers, setOfficialUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of official users from the backend
    const fetchOfficialUsers = async () => {
      try {
        const response = await axios.get("/api/official-users"); // Replace with your backend API endpoint for fetching official users
        setOfficialUsers(response.data);
      } catch (error) {
        console.error("Error fetching official users:", error);
      }
    };

    fetchOfficialUsers();
  }, []);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const truncatedInfo = complaint.complaint_Info
    ? complaint.complaint_Info.split(" ").slice(0, 30).join(" ")
    : null;

  const shouldTruncate = complaint.complaint_Info
    ? complaint.complaint_Info.split(" ").length > 30
    : null;

  const handleUpdateComplaint = () => {
    // Perform update complaint logic here
    console.log("Updating complaint with comment:", comment);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {/* Existing code for media */}
          {/* ... */}
          {/* End of existing code for media */}

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Complaint Details</Typography>
            <Divider />
            {/* Existing code for complaint details */}
            {/* ... */}
            {/* End of existing code for complaint details */}

            {/* Assign To */}
            <Box mt={2} display="flex" alignItems="center">
              <Typography variant="body1" mr={2}>
                <strong>Assign To:</strong>
              </Typography>
              <FormControl>
                <InputLabel id="assign-to-label">Select User</InputLabel>
                <Select
                  labelId="assign-to-label"
                  id="assign-to-select"
                  value={status}
                  onChange={handleChangeStatus}
                >
                  {officialUsers.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.wardNo} - {user.userId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* End of Assign To */}

            {/* Existing code for Comment */}
            {/* ... */}
            {/* End of existing code for Comment */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ComplaintDetails;
