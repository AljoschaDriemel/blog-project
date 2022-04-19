import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

export default function Navbar2() {
  //LOGIN
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile")
  }


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
      <Stack spacing={2} direction="column" style={{padding: "20px 20px",  paddingBottom:"25px" ,backgroundColor:"#66A4E0",}}>
        <Button variant="contained" color="primary">
          Dashboard
        </Button>
        <Button variant="contained" onClick={handleProfile}>Profile</Button>
      </Stack>
      <Divider />
      <Stack spacing={2} direction="row" style={{ padding: "20px 5px" ,  }}>
        <Divider />
        <Button variant="contained" onClick={handleLogin} >
          login
          <LoginIcon />
        </Button>
        <Button variant="contained">
          <LogoutIcon />
        </Button>
      </Stack>
    </Box>
  );
}
