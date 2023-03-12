import React from "react";
import QRCode from "qrcode.react";

function Home() {
  return (
    <center>
      <h1>Scan and Pay</h1>

      <QRCode
        value={`0XFT563280594738IJ90`}
        size={300}
        level={"H"}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
      />
      <h3>0Xfr563280594738ij90</h3>
    </center>
  );
}

export default Home;
