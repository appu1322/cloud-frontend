import "./index.scss";
import { Button, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SaveIcon from '@mui/icons-material/Save';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";

const Layout = () => {
  const [seletedMenu, setSeletedMenu] = useState("home")
  const location = useLocation();
  const naviagte = useNavigate();

  useEffect(() => {
    const menu = location.pathname.split("/")[1];
    setSeletedMenu(menu);
  }, [location.pathname])

  return (
    <>
      <Navbar />

      <div className='layout'>
        <div className="sidebar">
          <Button className="new-btn" variant="outlined" fullWidth>New</Button>

          <ListItemButton sx={{ borderRadius: "30px" }} selected={seletedMenu === "home"} onClick={() => naviagte("/home")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: "30px" }} selected={seletedMenu === "activity"} onClick={() => naviagte("/activity")}>
            <ListItemIcon>
              <NotificationsNoneIcon />
            </ListItemIcon>
            <ListItemText primary="Activity" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: "30px" }} selected={seletedMenu === "my-drive"} onClick={() => naviagte("/my-drive")}>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="My Drive" />
          </ListItemButton>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>

  )
}

export default Layout