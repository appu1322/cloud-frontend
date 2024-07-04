import "./index.scss";
import { Button, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SaveIcon from '@mui/icons-material/Save';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import InputFileUpload from "../../components/mui/file-upload";
import TrackUpload from "../../components/track-upload";

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
            </>
            :
            <>
              <div className="mobile-sidebar" style={{ width: toggleSidebar ? "100%" : "0%" }}>
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

              <div
                className="mobile-layout"
                style={{
                  width: toggleSidebar ? "0%" : "100%",
                  padding: toggleSidebar ? "0px" : undefined,
                  color: toggleSidebar ? "#fff" : undefined
                }}
              >
                <Outlet />
              </div>
            </>
        }
      </div>


    </>

  )
}

export default Layout