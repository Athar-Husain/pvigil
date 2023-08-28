import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getLoomData } from "../../redux/features/loom/complaintSlice";

const LoomData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loomData, isLoading } = useSelector((state) => state.authloom);

  useEffect(() => {
    // dispatch(getLoomData(id));
  }, [dispatch]);

  return (
    // <Container>
    <Box mb="5rem">
      <Stack direction="row" justifyContent="space-evenly" margin="4rem 0">
        <Paper
          elevation={5}
          sx={{ padding: "1rem 2rem ", borderRadius: "15px" }}
        >
          <Typography variant="h5">Reg_id : {loomData?.Reg_id}</Typography>
        </Paper>
        <Paper
          elevation={5}
          sx={{ padding: "1rem 2rem ", borderRadius: "15px" }}
        >
          <Typography variant="h5">Status : {loomData?.loom_status}</Typography>
        </Paper>
      </Stack>

      <Stack
        direction="row"
        mt="4rem"
        spacing={5}
        justifyContent="space-evenly"
        flexGrow="1"
        flexWrap="wrap"
        width="100%"
      >
        <Paper elevation={2} sx={{ padding: "2rem" }}>
          <small>
            <strong>Manufacturer Details</strong>
          </small>
          <Box>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  width="100"
                  image={loomData?.manufacturer_img}
                  alt="green iguana"
                />
                {/* <CardContent> */}

                <Typography gutterBottom align="center">
                  <small>Manufacturer</small> :
                  <strong> {loomData?.manufacturer_name}</strong>
                </Typography>
                {/* </CardContent> */}
              </CardActionArea>
            </Card>

            <Typography>
              Manufacturer Phone :
              <strong> {loomData?.manufacturer_phone}</strong>
            </Typography>

            <Box>
              <Typography>
                Manufactures Addres : <br />
                <strong>
                  {loomData?.manufacturer_state}, {loomData?.manufacturer_city},{" "}
                  {loomData?.manufacturer_village},{" "}
                  {loomData?.manufacturer_village}, <br />
                  Pin : {loomData?.manufacturer_pincode}
                </strong>
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ padding: "2rem" }}>
          <small>
            <strong>Loom Details</strong>
          </small>

          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="200px"
                image={loomData?.weaver_img}
                alt="green iguana"
              />
              {/* <CardContent> */}

              <Typography gutterBottom align="center">
                <small>Weaver</small> :<strong> {loomData?.weaver_name}</strong>
              </Typography>
              {/* </CardContent> */}
            </CardActionArea>
          </Card>

          <Box>
            <Typography>Loom Type : {loomData?.loom_type}</Typography>
            <Typography>Product Type : {loomData?.product_type}</Typography>
            {/* <Typography>Loom Number : {loomData?.loom_number}</Typography> */}
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ padding: "2rem" }}>
          <small>
            <strong>Marketer Details</strong>
          </small>

          <Box>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  width="200px"
                  image={loomData?.marketer_img}
                  alt="green iguana"
                />
                {/* <CardContent> */}

                <Typography gutterBottom align="center">
                  <small>Marketer</small> :
                  <strong> {loomData?.marketer_name}</strong>
                </Typography>
                {/* </CardContent> */}
              </CardActionArea>
            </Card>

            <Typography>Marketer Mob : {loomData?.marketer_phone}</Typography>

            <Box>
              <Typography>
                Marketers Addres : <br />
                {loomData?.marketer_state}, {loomData?.marketer_city},{" "}
                {loomData?.marketer_village},
                <br />
                Pin : {loomData?.marketer_pincode}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Stack>

      <Stack
        mt="2rem"
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
        gap="4rem"
      >
        <Box>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="100px"
                image={loomData?.loom_type_img}
                alt="green iguana"
              />
              {/* <CardContent> */}

              <Typography gutterBottom align="center">
                <small>Loom Image</small> :
                <strong> {loomData?.loom_type}</strong>
              </Typography>
              {/* </CardContent> */}
            </CardActionArea>
          </Card>
        </Box>
        <Box>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="200px"
                image={loomData?.product_type_img}
                alt="green iguana"
              />
              <Typography gutterBottom align="center">
                <small>Product</small> :
                <strong> {loomData?.product_type}</strong>
              </Typography>
            </CardActionArea>
          </Card>
        </Box>
      </Stack>
    </Box>
    // </Container>
  );
};

export default LoomData;
