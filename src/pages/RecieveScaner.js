import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import QRCode from "qrcode.react";
import SelectCurrency from "../components/SelectCurrency";
import { useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function QRScanner() {
  const [qrCodeData, setQRCodeData] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [notes, setNotes] = useState(null);
  const { token } = useParams();

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        setCameraActive(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const plaintext = atob(token);
    console.log("plaintext", plaintext);
    const notesData = JSON.parse(plaintext);
    setNotes(notesData);
    localStorage.setItem("balance", JSON.stringify(notesData));
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Recieve eRupee</h1>

      <h3 style={{ textAlign: "center" }}> eRupee recieved successfully</h3>
      <Grid container spacing={2}>
        <>
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

          <Grid item xs={12}>
            {cameraActive && (
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    setQRCodeData(result?.text);
                    setCameraActive(false);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                constraints={{ facingMode: "environment" }}
                style={{ width: "100%" }}
              />
            )}
            <h3>{qrCodeData && <p>{qrCodeData}</p>}</h3>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={6} style={{ display: "none" }}>
            {!qrCodeData ? (
              <Button
                variant="contained"
                onClick={openCamera}
                endIcon={<PhotoCamera />}
              >
                Scan QR
              </Button>
            ) : (
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  setQRCodeData(null);
                }}
                endIcon={<DeleteIcon />}
              >
                Reset
              </Button>
            )}
          </Grid>
          <Grid item xs={3}></Grid>
        </>
      </Grid>
    </Container>
  );
}

export default QRScanner;
