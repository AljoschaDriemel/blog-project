import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { DataContext } from "../../pages/context/Context";

export default function Navbar2() {
  const { userData, setUserData } = React.useContext(DataContext)
  //LOGIN
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  // LOGOUT
  const handleLogout = async () => {

    const response = await axios.get('/users/logout')

    if (response.data.success) {
       // clear the context
    setUserData(null);
    }
   
    // redirect user to home
    navigate("/login");
    console.log("after logout userDataContext is:", userData);
  };

  return (
    <Box
      sx={{
        height: "93vh",
        float: "left",
        width: "220px",
        backgroundColor: "#3E8CD8",
      }}
    >
      <Divider />
      <Stack
        spacing={2}
        direction="column"
        style={{
          padding: "20px 20px",
          paddingBottom: "25px",
          backgroundColor: "#66A4E0",
        }}
      >
        <Link to="/">
          <Button variant="contained" color="primary" className="w-100" >
            Dashboard
          </Button>
        </Link>
        <Link to="/profile">
          {" "}
          <Button variant="contained" onClick={handleProfile} className="w-100">
            Profile
          </Button>
        </Link>
        <Link to="/admin">
          {" "}
          <Button variant="contained" onClick={handleProfile} className="w-100">
            Admin
          </Button>
        </Link>
      </Stack>
      <Divider />
      <Stack className="w-100" spacing={2} direction="row" style={{ padding: "20px 5px" }}>
        
        <Button  variant="contained" onClick={handleLogin} >
          login
          <LoginIcon />
        </Button>
       {/*  <Divider /> */}
        <Button onClick={handleLogout} variant="contained">
          Logout
          <LogoutIcon />
        </Button>
      </Stack>
    </Box>
  );
}
