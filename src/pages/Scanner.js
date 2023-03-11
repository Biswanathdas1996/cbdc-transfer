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

  const [generatedQRData, setGeneratedQRData] = useState(null);

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

  const generateQR = () => {
    console.log("--notes-->", notes);
    console.log("---qrCodeData->", qrCodeData);

    const combineDta = JSON.stringify(notes) + "SPL" + qrCodeData;
    console.log("---combineDta->", combineDta);
    const encryptedData = btoa(combineDta);
    setGeneratedQRData(encryptedData);
  };

  const getSelectedNote = (data) => {
    setNotes(data);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {generatedQRData ? (
          <Grid item xs={12} style={{ padding: 10, margin: 10 }}>
            <center>
              <QRCode
                value={generatedQRData}
                size={256}
                level={"H"}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
              />
            </center>
          </Grid>
        ) : (
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
            <Grid item xs={12}>
              <SelectCurrency getSelectedNote={getSelectedNote} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={generateQR}>
                Generate QR
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default QRScanner;
