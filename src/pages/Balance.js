import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import _ from "lodash";

import Data from "../WalletBalance.json";

export default function BasicGrid() {
  const [notes, setNotes] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getBalance = localStorage.getItem("balance");
    if (getBalance) {
      const parseData = JSON.parse(getBalance);
      let totalBalance = 0;
      parseData?.map((data) => {
        totalBalance += data?.value;
      });
      setTotal(totalBalance);
      setNotes(parseData);
    }
  }, []);

  const fundWallet = () => {
    const data = _.uniqBy(Data, "token");
    setNotes(data);
    localStorage.setItem("balance", JSON.stringify(data));
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Card style={{ padding: 10, textAlign: "center" }}>
            <h3>{total} e₹</h3>
          </Card>
        </Grid>
        <Grid item xs={3}></Grid>
        {notes?.map((data, index) => {
          return (
            <Grid item xs={12}>
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image={data?.img}
                  title="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {data?.token}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        <Grid item xs={6}>
          <center>
            <Button variant="contained" color="success" onClick={fundWallet}>
              Fund Wallet
            </Button>
          </center>
        </Grid>
        <Grid item xs={6}>
          <center>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                localStorage.clear();
                setNotes(null);
              }}
            >
              Empty Wallet
            </Button>
          </center>
        </Grid>
      </Grid>
    </Container>
  );
}
