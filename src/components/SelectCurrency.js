import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import TwoThousand from "../assets/2000.jpg";

export default function SelectCurrency() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={TwoThousand}
              title="green iguana"
            />
            <CardContent>2000</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
