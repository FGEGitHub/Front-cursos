import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logocoalicion.png";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
  Box
} from "@mui/material";
import DrawerNav from "./DrawerNav";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
      }
    };
    traer();
  }, []);

  const handleClick = () => {
    navigate("/login");
  };

  const hanleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    navigate("/fiscalizacion/login");
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#3EDB63", // ✅ Color fijo vibrante
          boxShadow: 3
        }}
      >
        <Toolbar>
          <Box component="img" src={logo} alt="logo" sx={{ width: 130 }} />
          {isMatch ? (
            <DrawerNav />
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="" />
              </Tabs>

              {user ? (
                <Button
                  onClick={hanleLogout}
                  variant="contained"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: "#ffffff",
                    color: "#3EDB63",
                    '&:hover': {
                      backgroundColor: "#f0f0f0"
                    }
                  }}
                >
                  Cerrar sesión
                </Button>
              ) : (
                <Button
                  onClick={handleClick}
                  variant="contained"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: "#ffffff",
                    color: "#3EDB63",
                    '&:hover': {
                      backgroundColor: "#f0f0f0"
                    }
                  }}
                >
                  Iniciar sesión
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
