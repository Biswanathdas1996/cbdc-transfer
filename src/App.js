import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import GenerateQR from "./pages/GenerateQR";
import RetailShopWalletQR from "./pages/RetailShopWalletQR";
import Scanner from "./pages/Scanner";
import Balance from "./pages/Balance";
import RecieveScaner from "./pages/RecieveScaner";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import QrCode2Icon from "@mui/icons-material/QrCode2";

function App() {
  return (
    <>
      {" "}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/retail" element={<RetailShopWalletQR />} />
        <Route exact path="/generate-qr" element={<GenerateQR />} />
        <Route exact path="/scanner" element={<Scanner />} />
        <Route exact path="/balance" element={<Balance />} />
        <Route exact path="/recieve/:token" element={<RecieveScaner />} />
      </Routes>
      <LabelBottomNavigation />
      <div style={{ marginBottom: 80 }}></div>
    </>
  );
}

export default App;

function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, width: "100%" }} elevation={3}>
      <center>
        <BottomNavigation value={value} onChange={handleChange}>
          <NavLink to="/scanner" exact activeClassName="active">
            <BottomNavigationAction
              label="Send"
              value="recents"
              // onClick={() => history.push("/scanner")}
              icon={<SendToMobileIcon />}
            />
          </NavLink>
          <NavLink to="/recieve" exact activeClassName="active">
            <BottomNavigationAction
              label="Recieve"
              value="favorites"
              // onClick={() => history.push("/recieve")}
              icon={<AddToHomeScreenIcon />}
            />
          </NavLink>
          <NavLink to="/retail" exact activeClassName="active">
            <BottomNavigationAction
              label="Reatil"
              value="nearby"
              // onClick={() => history.push("/retail")}
              icon={<QrCode2Icon />}
            />
          </NavLink>
          <NavLink to="/balance" exact activeClassName="active">
            <BottomNavigationAction
              label="Balance"
              value="folder"
              // onClick={() => history.push("/balance")}
              icon={<FolderIcon />}
            />
          </NavLink>
        </BottomNavigation>
      </center>
    </Paper>
  );
}
