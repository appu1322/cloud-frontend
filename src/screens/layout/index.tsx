import "./index.scss";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DeleteIcon from '@mui/icons-material/Delete';

import Navbar from "../../components/navbar";
import useScreenSize from "../../hooks/useScreenSize";
import InputFileUpload from "../../components/mui/file-upload";
import TrackUpload from "../../components/track-upload";
import CustomSpeedDial from "../../components/custom-speed-dial";

const Layout = () => {
  const [seletedMenu, setSeletedMenu] = useState("home")
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const location = useLocation();
  const naviagte = useNavigate();
  const screenSize = useScreenSize();

  useEffect(() => {
    const menu = location.pathname.split("/")[1];
    setSeletedMenu(menu);
  }, [location.pathname])

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} onToggleSidebar={setToggleSidebar} />
      <TrackUpload />

      <div className='layout'>
        {
          screenSize.width > 768 ?
            <>
              <div className="sidebar">
                <InputFileUpload multiple fullWidth />

                <ListItemButton sx={{ borderRadius: "30px", marginTop: "20px" }} selected={seletedMenu === "home"} onClick={() => naviagte("/home")}>
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
                <ListItemButton sx={{ borderRadius: "30px" }} selected={seletedMenu === "trash"} onClick={() => naviagte("/trash")}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trash" />
                </ListItemButton>
              </div>
              <div className="content">
                <Outlet />
              </div>
            </>
            :
            <>
              <div className="mobile-sidebar" style={{ width: toggleSidebar ? "100%" : "0%" }}>
                <ListItemButton sx={{ borderRadius: "30px" }} selected={seletedMenu === "home"} onClick={() => {
                  naviagte("/home");
                  setToggleSidebar(false);
                }}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton sx={{ borderRadius: "30px" }} selected={seletedMenu === "activity"} onClick={() => {
                  naviagte("/activity");
                  setToggleSidebar(false);
                }}>
                  <ListItemIcon>
                    <NotificationsNoneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Activity" />
                </ListItemButton>
                <ListItemButton sx={{ borderRadius: "30px" }} selected={seletedMenu === "trash"} onClick={() => {
                  naviagte("/trash");
                  setToggleSidebar(false);
                }}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trash" />
                </ListItemButton>
              </div>

              <div
                className="mobile-layout"
                style={{
                  width: toggleSidebar ? "0%" : "100%",
                  padding: toggleSidebar ? "0px" : undefined,
                  color: toggleSidebar ? "#fff" : undefined
                }}
              >
                <CustomSpeedDial />
                <Outlet />
              </div>
            </>
        }
      </div>


    </>

  )
}

export default Layout