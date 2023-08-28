import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
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

// import "./AllComplaints.css";
import { getAllRaids } from "../../redux/features/officials/RaidsSlice";

const AllRaids = () => {
  const dispatch = useDispatch();
  const { allRaids } = useSelector((state) => state.raid);
  // console.log("all Raids in the RaidsList", allRaids);

  useEffect(() => {
    dispatch(getAllRaids());
  }, [dispatch]);
  const navigate = useNavigate();
  const { page } = useParams();

  // Begin Pagination
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const filteredRaids = allRaids.filter((raid) => {
    const raidIdIncludesFilter = raid.raid_id
      .toLowerCase()
      .includes(filter.toLowerCase());
    return raidIdIncludesFilter;
  });

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    navigate(`/complaints?page=${newPage}`);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentComplaints = filterRaids.slice(startIndex, endIndex);
  const currentRaids = filteredRaids.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredRaids.length / itemsPerPage);

  // End Pagination

  useEffect(() => {
    dispatch(getAllRaids());
  }, [dispatch]);

  return (
    <div className="complaints-page">
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
      <div className="blob blob4" />

      {/* Complaints heading */}
      <Typography variant="h3" gutterBottom className="complaints-heading">
        Raids
      </Typography>

      <div className="complaints-page-content">
        {/* <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
          mt={2}
        >
          <Box
            textAlign="center"
            flexGrow={1}
            p={2}
            border="1px solid #ccc"
            borderRadius={5}
            className="colored-box1"
          >
            <Typography variant="h5">Total Raids</Typography>
          
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
          </Box>
        </Box> */}

        {/* Filter and export section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          m={5}
        >
          <Box
            display="flex"
            alignItems="center"
            backgroundColor="white"
            padding="10"
          >
            <TextField
              label="Filter by Complaint ID"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
            />
          </Box>
          <Box display="flex" alignItems="center">
            {/* <Box display="flex" alignItems="center" ml={2}>
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
            </Box> */}
            {/* <Box display="flex" alignItems="center" ml={2}>
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
            </Box> */}

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

            {/* <Button
              variant="contained"
              color="primary"
              // onClick={handleExportCSV}
            >
              Export as CSV
            </Button> */}
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          {/* ... Table code remains the same ... */}
          <Table>
            <TableHead>
              <TableRow className="tableHead">
                <TableCell>#</TableCell>
                <TableCell>Raid ID</TableCell>
                <TableCell>H Inspedctor ID</TableCell>
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Landmark</TableCell>
                {/* <TableCell>Description</TableCell> */}
                <TableCell>Image</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Google Maps Link</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRaids.map((raid, index) => (
                <TableRow
                  key={raid._id}
                  className={index % 2 === 0 ? "line1" : "line2"}
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{raid.raid_id}</TableCell>
                  <TableCell>{raid.raidBy?.userId}</TableCell>
                  {/* <TableCell>{raid.}</TableCell> */}
                  <TableCell>{raid.landmark}</TableCell>

                  {/* <TableCell>{raid.description}</TableCell> */}

                  <TableCell>
                    {raid.imageURL && (
                      <a
                        href={raid.imageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Image
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {raid.videoURL && (
                      <a
                        href={raid.videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Video
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={raid.glink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </TableCell>
                  <TableCell>
                    <Link to={`/RaidData/${raid._id}`}>
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
          {/* ... Pagination code remains the same ... */}
          <Pagination
            className="pagination"
            // count={pageCount}
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

export default AllRaids;
