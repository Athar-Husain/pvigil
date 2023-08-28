import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerOfficialUser } from "../../../redux/features/officials/officialAuthSlice";
import { toast } from "react-toastify";

const CreateOfficial = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
    wardNo: "",
    role: "",
    phone: "", // Add the phone field to the state
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
    wardNo: "",
    role: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Perform validation based on the field name
    switch (name) {
      case "name":
      case "email":
      case "userId":
      case "password":
      case "wardNo":
        errorMessage = value.trim() === "" ? "This field is required" : "";
        break;
      case "phone":
        errorMessage =
          value.length !== 10 ? "Phone number must be 10 digits" : "";
        break;
      case "role":
        errorMessage = value === "" ? "Please select a role" : "";
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [name]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };

  // let errorMessage = "";

  const handleSubmit = () => {
    let hasErrors = false;
    const newFormErrors = { ...formErrors };

    // Check for validation errors
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() === "") {
        newFormErrors[key] = "This field is required";
        hasErrors = true;
      } else {
        newFormErrors[key] = "";
      }
    }

    // Additional validation for phone number
    if (formData.phone.length !== 10) {
      newFormErrors.phone = "Phone number must be 10 digits";
      hasErrors = true;
    }

    // Additional validation for email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newFormErrors.email = "Invalid email format";
      hasErrors = true;
    }

    // Remove spaces from wardNo input
    // const sanitizedWardNo = formData.wardNo.replace(/\s/g, "");
    const processedWardNo = formData.wardNo
      .split(",") // Split by commas
      .map((number) => number.trim()) // Trim each value
      .filter((number) => number !== ""); // Remove empty strings

    if (processedWardNo.length === 0) {
      newFormErrors.wardNo = "Please add at least one Ward number";
      hasErrors = true;
    }

    // If there are errors, set the formErrors state and prevent submission
    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    try {
      // console.log(formData);
      const userData = { ...formData, wardNo: processedWardNo };
      setLoading(true);
      // console.log("user data in the user login", userData);
      dispatch(registerOfficialUser(userData));
      // console.log("User data in the Create Officials", userData);

      setLoading(false);
      // setIsModalOpen(false);
    } catch (error) {
      console.log("error in create Official User", error);
      setLoading(false);
      toast.error(error.meassage);
    }
    // setFormData({
    //   name: "",
    //   email: "",
    //   userId: "",
    //   password: "",
    //   wardNo: "",
    //   role: "",
    //   phone: "", // Add any default value or leave empty
    // });
    setLoading(false);
    setIsModalOpen(false);

    // If there are no errors, proceed with submission
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Create New User
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "24px",
            outline: "none",
            minWidth: "300px",
            maxWidth: "400px",
            borderRadius: "8px",
          }}
        >
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={formErrors.name !== ""}
            helperText={formErrors.name}
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={formErrors.name !== ""}
            helperText={formErrors.name}
          />
          <TextField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            error={formErrors.name !== ""}
            helperText={formErrors.name}
          />
          <TextField
            name="userId"
            label="User ID"
            value={formData.userId}
            onChange={handleChange}
            fullWidth
            error={formErrors.name !== ""}
            helperText={formErrors.name}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={formErrors.name !== ""}
            helperText={formErrors.name}
          />
          <TextField
            name="wardNo"
            label="Ward No"
            value={formData.wardNo}
            onChange={handleChange}
            fullWidth
            error={formErrors.name !== ""}
            helperText={formErrors.name}
          />

          <FormControl fullWidth error={formErrors.role !== ""}>
            <InputLabel>Role</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="SHI">SHI</MenuItem>
              <MenuItem value="JHI">JHI</MenuItem>
            </Select>
            {formErrors.role && <p>{formErrors.role}</p>}
          </FormControl>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateOfficial;
