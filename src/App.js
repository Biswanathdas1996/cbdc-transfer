import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GenerateQR from "./pages/GenerateQR";
import RetailShopWalletQR from "./pages/RetailShopWalletQR";
import Scanner from "./pages/Scanner";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/retail" element={<RetailShopWalletQR />} />
      <Route exact path="/generate-qr" element={<GenerateQR />} />
      <Route exact path="/scanner" element={<Scanner />} />
    </Routes>
  );
}

export default App;
