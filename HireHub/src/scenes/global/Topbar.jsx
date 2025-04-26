import { Box, IconButton, useTheme, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import AuthContext from "../../context/AuthContext"; // ✅ Import AuthContext
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // ✅ Logout Icon

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useContext(AuthContext); // ✅ Get logout function
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleLogout = () => {
    logout(); // ✅ Clear auth state
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS & LOGOUT */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => navigate("/job-notification")}>
            <NotificationsOutlinedIcon />
        </IconButton>

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>

        {/* ✅ Logout Button */}
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          startIcon={<ExitToAppIcon />}
          sx={{ ml: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
