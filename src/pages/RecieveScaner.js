import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import QRCode from "qrcode.react";
import SelectCurrency from "../components/SelectCurrency";

function QRScanner() {
  const [qrCodeData, setQRCodeData] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [notes, setNotes] = useState(null);

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

  const getSelectedNote = (data) => {
    setNotes(data);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <>
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
          <Grid item xs={6}>
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
