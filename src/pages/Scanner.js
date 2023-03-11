import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

function QRScanner() {
  const [qrCodeData, setQRCodeData] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setQRCodeData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

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

  return (
    <div>
      {qrCodeData && <p>{qrCodeData}</p>}
      {!qrCodeData && <button onClick={openCamera}>Open camera</button>}
      {cameraActive && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}

export default QRScanner;
