import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import QRCode from "qrcode.react";
import SelectCurrency from "../components/SelectCurrency";
import _ from "lodash";

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

    const getCurrentBalance = localStorage.getItem("balance");
    const parseGetCurrentBalance = JSON.parse(getCurrentBalance);
    const remainingBalance = parseGetCurrentBalance?.filter((data, index) => {
      const findNote = notes.find((val) => val?.token == data?.token);
      if (!findNote) {
        return data;
      }
    });
    const data = _.uniqBy(remainingBalance, "token");
    localStorage.setItem("balance", JSON.stringify(data));
    const combineDta = JSON.stringify(notes);

    const encryptedData = btoa(combineDta);
    const recievedURL = `https://cbdc.netlify.app/#/recieve/${encryptedData}`;
    console.log(recievedURL);
    setGeneratedQRData(recievedURL);
  };

  const getSelectedNote = (data) => {
    setNotes(data);
  };
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Pay eRupee</h1>
      <Grid container spacing={2}>
        {generatedQRData ? (
          <Grid item xs={12} style={{ padding: 10, margin: 10 }}>
            <center>
              <QRCode
                value={generatedQRData}
                size={300}
                level={"H"}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
              />

              <p>
                <a href={generatedQRData}>Reciever Link</a>
              </p>
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
              <h3 style={{ textAlign: "center" }}>
                {qrCodeData && <b>{qrCodeData}</b>}
              </h3>
            </Grid>

            <Grid item xs={12}>
              <center>
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
              </center>
            </Grid>

            <Grid item xs={12}>
              <SelectCurrency getSelectedNote={getSelectedNote} />
            </Grid>
            <Grid item xs={12}>
              <center>
                <Button
                  variant="contained"
                  color="success"
                  onClick={generateQR}
                >
                  Generate QR
                </Button>
              </center>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default QRScanner;
