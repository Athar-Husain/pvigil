import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers, upgradeUser } from "../../redux/features/auth/authSlice";
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from "../../redux/features/email/emailSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import "./ChangeRole.css"; // Import your custom CSS file for ChangeRole component (if needed)

const ChangeRole = ({ _id, email }) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();

  // Change User role
  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error("Please select a role");
    } else {
      const userData = {
        role: userRole,
        id: _id,
      };

      const emailData = {
        subject: "Account Role Changed - Nekaaramitra",
        send_to: email,
        reply_to: "noreply@Nekaaramitra@outlook.com",
        template: "changeRole",
        url: "/login",
      };

      await dispatch(upgradeUser(userData));
      await dispatch(sendAutomatedEmail(emailData));
      await dispatch(getUsers());
      dispatch(EMAIL_RESET());
    }
  };

  return (
    <div className="change-role-container">
      <form className="change-role-form" onSubmit={changeRole}>
        <FormControl variant="outlined" className="role-select">
          <InputLabel htmlFor="user-role">Role</InputLabel>
          <Select
            id="user-role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="">
              <em>-- select --</em>
            </MenuItem>
            <MenuItem value="subscriber">Subscriber</MenuItem>
            {/* <MenuItem value="author">Author</MenuItem> */}
            {/* <MenuItem value="admin">Admin</MenuItem> */}
            <MenuItem value="suspended">Suspended</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="confirm-button"
          startIcon={<FaCheck size={15} />}
        />
      </form>
    </div>
  );
};

export default ChangeRole;
