import React from "react";
import QRCode from "qrcode.react";

function Home() {
  return (
    <div>
      <QRCode
        value={`0Xfr563280594738ij90`}
        size={256}
        level={"H"}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
      />
    </div>
  );
}

export default Home;
