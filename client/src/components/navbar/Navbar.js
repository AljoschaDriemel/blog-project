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

const drawerWidth = 240;

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
      
        <CssBaseline />
        
        <Drawer
          component="nav"
          sx={{
            zIndex: "-1",
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
                  <ListItemText primary="Profile" />
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
                  <ListItemText primary="Logout" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
}
