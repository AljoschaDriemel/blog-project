import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { ListItemButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { DataContext } from "../../pages/context/Context";


const drawerWidth = 240;

export default function Navbar() {
  const { userData, setUserData } = React.useContext(DataContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
 
    //LOGIN

    const navigate = useNavigate();
    const handleLogin = () => {
      navigate("/login");
    };
    const handleProfile = () => {
      navigate("/profile")
    }
  
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
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
       
        <Drawer
          component="nav"
          sx={{
            /* zIndex: "1", */
            position: "static",
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: "drawerWidth",
              boxSizing: "border-box",
              bgcolor: "#1e88e5",
              
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />

          <List>
            <ListItem>
              <ListItemButton sx={{
                  border: "solid 1px white",
                  boxShadow: 5,
                  borderRadius: 2,
                  justifyContent: "center"
                }}>
                <ListItemIcon sx={{ color: "white", padding: "5px" }}>
                  <DashboardIcon />
                  <ListItemText primary="Dashboard" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton sx={{
                  border: "solid 1px white",
                  boxShadow: 5,
                  borderRadius: 2,
                  justifyContent: "center",
                  
                }}>
                <ListItemIcon sx={{ color: "white", padding: "5px" }}>
                  <AccountBoxIcon />
                  <ListItemText primary="Profile" onClick={handleProfile}/>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>

          <Divider sx={{marginTop: "630px"}} />

          <List sx={{ color: "white", display: "flex" }}>
            <ListItem>
              <ListItemButton
                onClick={handleLogin}
                sx={{
                  border: "solid 1px white",
                  boxShadow: 5,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <LoginIcon />
                  <ListItemText primary="Login" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton sx={{
                  border: "solid 1px white",
                  boxShadow: 5,
                  borderRadius: 2,
                }}>
                <ListItemIcon sx={{ color: "white" }}>
                  <LogoutIcon />
                  <ListItemText primary="Logout" onClick={handleLogout} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
}
