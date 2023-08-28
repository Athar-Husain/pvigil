import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams, useNavigate } from "react-router-dom";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  makeStyles,
  TextField,
  PaginationItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { getAllComplaints } from "../../redux/features/complaint/complaintSlice";
import "./AllComplaints.css";
import { getOfficialUsers } from "../../redux/features/officials/officialAuthSlice";

const AllComplaints = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get location
  // const history = useHistory();
  const navigate = useNavigate();
  const { page } = useParams();

  const { allComplaints } = useSelector((state) => state.authComplaint);

  console.log("all complaints in complaints screen ", allComplaints);

  // Begin Pagination
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [includeAnonymous, setIncludeAnonymous] = useState(false);
  const [excludeAnonymous, setExcludeAnonymous] = useState(false);
  const [filterAssigned, setFilterAssigned] = useState(false);
  const [filterNotAssigned, setFilterNotAssigned] = useState(false);
  const [filterRejected, setFilterRejected] = useState(false);

  const handleFilterAssignedChange = () => {
    setFilterAssigned(!filterAssigned);
    setFilterNotAssigned(false);
    setFilterRejected(false);
  };

  const handleFilterNotAssignedChange = () => {
    setFilterAssigned(false);
    setFilterNotAssigned(!filterNotAssigned);
    setFilterRejected(false);
  };

  const handleFilterRejectedChange = () => {
    setFilterAssigned(false);
    setFilterNotAssigned(false);
    setFilterRejected(!filterRejected);
  };

  useEffect(() => {
    // Fetch complaints only if the array is empty
    if (!allComplaints.length) {
      dispatch(getAllComplaints());
    }

    // Restore itemsPerPage from history state if available
    if (location.state && location.state.itemsPerPage) {
      setItemsPerPage(location.state.itemsPerPage);
    }

    setCurrentPage(parseInt(page) || 1);
  }, [dispatch, page, allComplaints, location.state]);

  const handleIncludeAnonymousChange = (e) => {
    setIncludeAnonymous(e.target.checked);
    setExcludeAnonymous(false);
  };

  const handleExcludeAnonymousChange = (e) => {
    setExcludeAnonymous(e.target.checked);
    setIncludeAnonymous(false);
  };

  // const filteredComplaints = allComplaints.filter((complaint) => {
  //   const complaintIdIncludesFilter = complaint.complaint_id
  //     .toLowerCase()
  //     .includes(filter.toLowerCase());

  //   if (includeAnonymous) {
  //     return (
  //       complaintIdIncludesFilter &&
  //       complaint.user_email?.toLowerCase().includes("anonymous")
  //     );
  //   } else if (excludeAnonymous) {
  //     return (
  //       complaintIdIncludesFilter &&
  //       !complaint.user_email?.toLowerCase().includes("anonymous")
  //     );
  //   } else {
  //     return complaintIdIncludesFilter;
  //   }
  // });

  const filteredComplaints = allComplaints.filter((complaint) => {
    const complaintIdIncludesFilter = complaint.complaint_id
      .toLowerCase()
      .includes(filter.toLowerCase());

    const statusMatchesFilter =
      (!filterAssigned && !filterNotAssigned && !filterRejected) || // Display all complaints if none of the filter checkboxes are selected
      (filterAssigned && complaint.complaint_status === "Assigned") ||
      (filterNotAssigned && complaint.complaint_status === "Not Assigned") ||
      (filterRejected && complaint.complaint_status === "Rejected");

    if (includeAnonymous) {
      return (
        complaintIdIncludesFilter &&
        complaint.user_email?.toLowerCase().includes("anonymous") &&
        statusMatchesFilter
      );
    } else if (excludeAnonymous) {
      return (
        complaintIdIncludesFilter &&
        !complaint.user_email?.toLowerCase().includes("anonymous") &&
        statusMatchesFilter
      );
    } else {
      return complaintIdIncludesFilter && statusMatchesFilter;
    }
  });

  // const convertToCSV = () => {
  //   const header = [
  //     "Complaint ID",
  //     "User Email",
  //     "Status",
  //     "Landmark",
  //     "Description",
  //     "Image",
  //     "Video",
  //     "Google Maps Link",
  //   ];
  //   const rows = allComplaints.map((complaint) => [
  //     complaint.complaint_id,
  //     complaint.user_email,
  //     complaint.complaint_status,
  //     complaint.landmark,
  //     complaint.description,
  //     complaint.imageURL,
  //     complaint.videoURL,
  //     complaint.glink,
  //   ]);
  //   const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   return url;
  // };

  const convertToCSV = () => {
    const header = [
      "Complaint ID",
      "User Email",
      "Status",
      "Landmark",
      "Description",
      "Image",
      "Video",
      "Google Maps Link",
    ];
    const rows = filteredComplaints.map((complaint) => [
      complaint.complaint_id,
      complaint.user_email,
      complaint.complaint_status,
      complaint.landmark,
      complaint.description,
      complaint.imageURL,
      complaint.videoURL,
      complaint.glink,
    ]);
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const handleExportCSV = () => {
    const csvURL = convertToCSV();
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = "complaints.csv";
    link.click();
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    navigate(`/complaints?page=${newPage}`);
  };

  const handleViewDetails = (complaintId) => {
    // Store the current itemsPerPage value in localStorage
    localStorage.setItem("itemsPerPage", itemsPerPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  useEffect(() => {
    // Retrieve itemsPerPage from localStorage or use the default value (20)
    const storedItemsPerPage = localStorage.getItem("itemsPerPage");
    const initialItemsPerPage = storedItemsPerPage
      ? parseInt(storedItemsPerPage)
      : 20;

    setItemsPerPage(initialItemsPerPage);
    setCurrentPage(1);
  }, [filter]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredComplaints.length / itemsPerPage);

  const assignedComplaints = filteredComplaints.filter(
    (complaint) => complaint.complaint_status === "Assigned"
  ).length;

  const notAssignedComplaints = filteredComplaints.filter(
    (complaint) => complaint.complaint_status === "Not Assigned"
  ).length;

  const rejectedComplaints = filteredComplaints.filter(
    (complaint) => complaint.complaint_status === "Rejected"
  ).length;

  const totalComplaints = allComplaints.length;

  const anonymousComplaints = filteredComplaints.filter((complaint) =>
    complaint.user_email?.toLowerCase().includes("anonymous")
  ).length;

  const registeredComplaints = filteredComplaints.filter(
    (complaint) => !complaint.user_email?.toLowerCase().includes("anonymous")
  ).length;

  // End Pagination

  // useEffect(() => {
  //   dispatch(getAllComplaints());
  //   setCurrentPage(parseInt(page) || 1);
  // }, [dispatch, page]);

  return (
    <div className="complaints-page">
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
      <div className="blob blob4" />

      {/* Complaints heading */}
      <Box justifyContent="center">
        <Typography
          variant="h4"
          justifyContent="center"
          alignSelf="center"
          gutterBottom
        >
          Complaints
        </Typography>
      </Box>

      <div className="complaints-page-content">
        {/* Statistics boxes */}

        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
          mt={2}
          paddingBottom={2}
        >
          <Box
            textAlign="center"
            flexGrow={1}
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            className="colored-box1"
          >
            <Typography variant="h5">Total Complaints</Typography>
            <Typography variant="h4">{totalComplaints}</Typography>
          </Box>
          <Box
            textAlign="center"
            flexGrow={1}
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            ml={2}
            className="colored-box2"
          >
            <Typography variant="h5">Anonymous Complaints</Typography>
            <Typography variant="h4">{anonymousComplaints}</Typography>
          </Box>
          <Box
            textAlign="center"
            flexGrow={1}
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            ml={2}
            className="colored-box3"
          >
            <Typography variant="h5">Registered Complaints</Typography>
            <Typography variant="h4">{registeredComplaints}</Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
          mt={2}
          paddingBottom={2}
        >
          <Box
            textAlign="center"
            flexGrow={1}
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            ml={2}
            className="custom-box"
            style={{ backgroundColor: "#FFAB91" }} // Light orange
          >
            <Typography variant="h5" className="custom-heading">
              Not Assigned
            </Typography>
            <Typography variant="h4" className="custom-count">
              {notAssignedComplaints}
            </Typography>
          </Box>
          <Box
            flexGrow={1}
            textAlign="center"
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            ml={2}
            className="custom-box"
            style={{ backgroundColor: "#8BC34A" }} // Light green
          >
            <Typography variant="h5" className="custom-heading">
              Assigned Complaints
            </Typography>
            <Typography variant="h4" className="custom-count">
              {assignedComplaints}
            </Typography>
          </Box>
          <Box
            textAlign="center"
            flexGrow={1}
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            ml={2}
            className="custom-box"
            style={{ backgroundColor: "#CE93D8" }} // Light purple
          >
            <Typography variant="h5" className="custom-heading">
              Rejected Complaints
            </Typography>
            <Typography variant="h4" className="custom-count">
              {rejectedComplaints}
            </Typography>
          </Box>
        </Box>

        {/* Filter and export section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <TextField
              label="Filter by Complaint ID"
              // type="numeric"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
            />
          </Box>

          <Box
            textAlign="center"
            // flexGrow={1}
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            ml={2}
            className="colored-box4"
          >
            <Typography variant="h6">Filter by Status</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterAssigned}
                  onChange={handleFilterAssignedChange}
                  color="primary"
                />
              }
              label="Assigned"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterNotAssigned}
                  onChange={handleFilterNotAssignedChange}
                  color="primary"
                />
              }
              label="Not Assigned"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterRejected}
                  onChange={handleFilterRejectedChange}
                  color="primary"
                />
              }
              label="Rejected"
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" ml={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeAnonymous}
                    onChange={handleIncludeAnonymousChange}
                    color="primary"
                  />
                }
                label="Anonymous Users"
              />
            </Box>
            <Box display="flex" alignItems="center" ml={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={excludeAnonymous}
                    onChange={handleExcludeAnonymousChange}
                    color="primary"
                  />
                }
                label="Registered Users"
              />
            </Box>

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

            <Button
              variant="contained"
              color="primary"
              onClick={handleExportCSV}
            >
              Export as CSV
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="tableHead">
                <TableCell>#</TableCell>
                <TableCell>Complaint ID</TableCell>
                <TableCell>User Email</TableCell>
                {/* Change "User" to "User Email" */}
                <TableCell>Status</TableCell>
                <TableCell>Landmark</TableCell>
                {/* <TableCell>Description</TableCell> */}
                <TableCell>Assigned To</TableCell>

                <TableCell>Image</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Google Maps Link</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentComplaints.map((complaint, index) => (
                <TableRow
                  key={complaint._id}
                  className={index % 2 === 0 ? "line1" : "line2"}
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{complaint.complaint_id}</TableCell>
                  <TableCell>{complaint.user_email}</TableCell>
                  {/* Change to "user_email" */}
                  <TableCell>{complaint.complaint_status}</TableCell>
                  <TableCell>{complaint.landmark}</TableCell>
                  <TableCell>{complaint.assignedTo?.userId}</TableCell>
                  {/* <TableCell>{complaint.assignedTo?.email}</TableCell> */}
                  <TableCell>
                    {complaint.imageURL && (
                      <a
                        href={complaint.imageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Image
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {complaint.videoURL && (
                      <a
                        href={complaint.videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Video
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={complaint.glink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/ComplaintData/${complaint._id}`}
                      onClick={() => handleViewDetails(complaint._id)}
                      // to={`/ComplaintData/${complaint._id}`}
                    >
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
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
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/complaints?page=${item.page}`}
                {...item}
              />
            )}
          />
        </Box>
      </div>
    </div>
  );
};

export default AllComplaints;
