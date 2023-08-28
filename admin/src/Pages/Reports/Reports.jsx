import React, { useState, useEffect } from "react";
import { fetchData, SUG_API_URL } from "../../Components/Utils";
import {
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Box,
  Container,
} from "@mui/material";
import avatar from "../../assets/avatarr.png";
// import "./OrderRequest.css";

const Reports = () => {
  const [getReq, setGetReq] = useState([]);
  // console.log(getReq);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const ordersData = await fetchData(`${SUG_API_URL}/getAllOrderRequests`);

      setGetReq(ordersData);
    };
    fetchOrdersData();
  }, []);
  //   console.log(getReq);

  return (
    <>
      <Stack>
        <Typography variant="h4">Suggestions & Reports</Typography>

        <Box>
          {/* {!isLoading && users.length === 0 ? (
              <p>No User found...</p>
            ) : ()
        } */}
          {getReq.length === 0 ? (
            <Container>
              <p>No Reports FOund </p>
            </Container>
          ) : (
            getReq.map((order, idx) => (
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Card sx={{ maxWidth: 300, margin: "1rem " }} key={idx}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      width="100"
                      image={order ? order.image : avatar}
                      // image={avatar}
                      alt="green iguana"
                    />

                    <CardContent align="center">
                      <Typography mt="1rem">
                        Name :{" "}
                        <strong>
                          {order?.first_name} {order?.last_name}
                        </strong>
                      </Typography>

                      <Typography mt="1rem">
                        Phone : <strong>{order?.phone}</strong>
                      </Typography>
                      <Typography mt="1rem">
                        Email : <strong>{order?.user_email}</strong>
                      </Typography>
                      <Typography mt="1rem">
                        Loom Registered Id : <strong>{order?.message}</strong>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Stack>
            ))
          )}
        </Box>
      </Stack>
    </>
  );
};

export default Reports;
