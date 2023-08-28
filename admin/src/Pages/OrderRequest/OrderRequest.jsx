import React, { useState, useEffect } from "react";
import { fetchData, REQ_ORDER_API_URL } from "../../Components/Utils";
import {
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Box,
} from "@mui/material";
import "./OrderRequest.css";

const OrderRequest = () => {
  const [getReq, setGetReq] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const ordersData = await fetchData(
        `${REQ_ORDER_API_URL}/getAllOrderRequests`
      );

      setGetReq(ordersData);
    };
    fetchOrdersData();
  }, []);
  // console.log(getReq);

  return (
    <>
      <Stack>
        <Typography variant="h4">All Complaints</Typography>

        <Box>
          {/* {!isLoading && users.length === 0 ? (
              <p>No User found...</p>
            ) : ()
        } */}
          {getReq.length === 0 ? (
            <p>No Complaints Found </p>
          ) : (
            getReq.map((order, idx) => (
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card sx={{ maxWidth: 300, margin: "1rem" }} key={idx}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      width="100"
                      image={order?.loom_Image}
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
                        Loom Registered Id :{" "}
                        <strong>{order?.Registered_id}</strong>
                      </Typography>
                      <Typography mt="1rem">
                        Phone : <strong>{order?.phone}</strong>
                      </Typography>
                      <Typography mt="1rem">
                        Email : <strong>{order?.user_email}</strong>
                      </Typography>
                      <Typography mt="1rem">
                        Message : <strong>{order?.message}</strong>
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

export default OrderRequest;
