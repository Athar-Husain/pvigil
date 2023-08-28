import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintData } from "../../redux/features/complaint/complaintSlice";
import { useParams } from "react-router-dom";

const ComplaintData = () => {
  const dispatch = useDispatch();
  const complaintDetails = useSelector(
    (state) => state.complaint.complaintDetails
  );
  const { id } = useParams();
  console.log("complaint data in complaint data file", complaintDetails);

  // Fetch the complaint data when the component mounts
  useEffect(() => {
    // const complaintId = "2307180004"; // Replace this with the actual complaint ID you want to fetch
    dispatch(getComplaintData(id));
  }, [dispatch]);

  return (
    <div>
      {complaintDetails ? (
        <div>
          <h2>Complaint Data:</h2>
          <p>Complaint ID: {complaintDetails.complaint_id}</p>
          <p>Complaint Status: {complaintDetails.complaint_status}</p>
          {/* Add more details here based on the structure of the complaint data */}
        </div>
      ) : (
        <p>Loading complaint data...</p>
      )}
    </div>
  );
};

export default ComplaintData;
