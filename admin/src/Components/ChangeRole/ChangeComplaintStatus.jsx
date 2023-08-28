import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import {
//   EMAIL_RESET,
//   sendAutomatedEmail,
// } from "../../redux/features/email/emailSlice";
import { getAllComplaints } from "../../redux/features/complaint/complaintSlice";
// import {
//   getAllLooms,
//   // upgradeLoom,
// } from "../../redux/features/loom/complaintSlice";

const ChangeComplaintStatus = ({ _id, email, oldloomStatus }) => {
  const [complaintStatus, setComplaintStatus] = useState("");
  const dispatch = useDispatch();

  // Change User role
  const changeRole = async (e) => {
    e.preventDefault();

    if (!complaintStatus || complaintStatus === oldloomStatus) {
      toast.error("Please select a Complaint Status");
    } else {
      const userData = {
        complaint_status: complaintStatus,
        id: _id,
      };

      // const emailData = {
      //   subject: `Loom Status has Updated to ${complaintStatus}`,
      //   send_to: email,
      //   reply_to: "noreply@nekaaramitra@outlook.com",
      //   template: "changeLoomStatus",
      //   url: "/login",
      // };

      await dispatch(upgradeComplaint(userData));
      // await dispatch(sendAutomatedEmail(emailData));
      await dispatch(getAllComplaints());
      // dispatch(EMAIL_RESET());
    }
  };

  return (
    <div className="sort">
      <form
        className="--flex-start"
        onSubmit={(e) => changeRole(e, _id, complaintStatus)}
      >
        <select
          value={complaintStatus}
          onChange={(e) => setComplaintStatus(e.target.value)}
        >
          <option value="">-- select --</option>
          <option value="pending">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          {/* <option value="block"></option> */}
          {/* <option value="suspended">Suspended</option> */}
        </select>
        <button className="--btn --btn-primary">
          <FaCheck size={15} cursor="pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChangeComplaintStatus;
