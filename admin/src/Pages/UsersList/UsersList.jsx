// App.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaTrashAlt } from "react-icons/fa";
import ChangeRole from "../../Components/ChangeRole/ChangeRole";
import {
  CircularProgress,
  Box,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Button,
  Pagination,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./UsersList.css";
import { Link } from "react-router-dom";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [includeSuspended, setIncludeSuspended] = useState(false);

  const totalUsers = users.length;
  const suspendedUsers = users.filter(
    (user) => user.role === "suspended"
  ).length;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const handleIncludeSuspendedChange = (e) => {
    setIncludeSuspended(e.target.checked);
  };

  const filteredUsers = users.filter((user) => {
    const nameIncludesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const emailIncludesSearch = user.email
      .toLowerCase()
      .includes(search.toLowerCase());

    // Filter by role based on checkbox selection
    if (includeSuspended) {
      return (
        (nameIncludesSearch || emailIncludesSearch) && user.role === "suspended"
      );
    } else {
      return nameIncludesSearch || emailIncludesSearch;
    }
  });

  const convertToCSV = () => {
    const header = ["s/n", "Name", "Email", "Role"];
    const rows = filteredUsers.map((user, index) => [
      index + 1,
      user.name,
      user.email,
      user.role,
    ]);
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  const handleExportCSV = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, includeSuspended, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <section className="user-list">
      <div className="container">
        <Box textAlign="center">
          <Typography variant="h3">All Users</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-around"
          mb={2}
          flexWrap="wrap"
        >
          <Box
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 5,
              flexGrow: 1,
              textAlign: "center",
              backgroundColor: "#007bff", // Change to your desired color for the first box
              color: "#ffffff", // Change to your desired text color for the first box
            }}
          >
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 5,
              flexGrow: 1,
              textAlign: "center",
              backgroundColor: "#17a2b8", // Change to your desired color for the second box
              color: "#ffffff", // Change to your desired text color for the second box
              ml: 2,
            }}
          >
            <Typography variant="h5">Suspended Users</Typography>
            <Typography variant="h4">{suspendedUsers}</Typography>
          </Box>
        </Box>

        {/* Filter and export section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          m={5}
        >
          <div className="--flex-between">
            <TextField
              type="text"
              label="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSuspended}
                onChange={handleIncludeSuspendedChange}
                color="primary"
              />
            }
            label="Suspended Users"
          />

          <FormControl
            variant="outlined"
            size="small"
            style={{ marginRight: "10px" }}
          >
            <InputLabel htmlFor="items-per-page">Items Per Page</InputLabel>
            <Select
              id="items-per-page"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="Items Per Page"
            >
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleExportCSV}>
            Export to CSV
          </Button>
        </Box>

        <div className="table">
          <div className="user-list">
            {isLoading && <CircularProgress />}

            {/* Table */}
            {!isLoading && currentUsers.length === 0 ? (
              <p>No User found...</p>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    style={{ background: "#f9f9f9" }}
                    // className="table-head"
                  >
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Change Role</TableCell>
                      {/* <TableCell>Action</TableCell> */}
                      {/* <TableCell></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentUsers.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell className="table-cell">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell className="table-cell">
                          {user.name}
                        </TableCell>
                        <TableCell className="table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="table-cell">
                          {user.phone}
                        </TableCell>
                        <TableCell className="table-cell">
                          {user.role}
                        </TableCell>
                        <TableCell className="table-cell">
                          <ChangeRole _id={user._id} email={user.email} />
                        </TableCell>
                        {/* <TableCell className="table-cell">
                          <span>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(user._id)}
                            />
                          </span>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <hr />
          </div>
        </div>
      </div>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          className="pagination"
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          size="large"
          showFirstButton
          showLastButton
          siblingCount={2}
          boundaryCount={1}
          hidePrevButton={currentPage === 1}
          hideNextButton={currentPage === pageCount}
        />
      </Box>
    </section>
  );
};

export default UsersList;
