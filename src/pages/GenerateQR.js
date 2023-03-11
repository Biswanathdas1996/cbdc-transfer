import React from "react";
import QRCode from "qrcode.react";

function Home() {
  return (
    <div>
      <QRCode
        value={` This would generate a QR code with a size of 256 pixels, using the highest
        error correction level ("H"), with a white background and black
        foreground. You can experiment with these props to get the desired
        appearance for your QR code.`}
        size={256}
        level={"H"}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
      />
    </div>
  );
}

export default Home;
