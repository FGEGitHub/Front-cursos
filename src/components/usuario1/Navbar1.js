import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerNav from "./drawer";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';

const Navbar = (props) => {
  const [notificacioness, setNotificacioness] = useState();
  const [user, setUser] = useState(null)
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const islogo = { width: "100px" };
  const navigate = useNavigate();

  useEffect(() => {
    cantidadnoti()
  }, [])

  const cantidadnoti = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON)
        setUser(usuario)
      }
    } catch (error) {}
  }

  const handleClick = () => navigate("/login");
  const irNosotros = () => navigate("/usuario/nosotros");
  const irContacto = () => navigate("/usuario/contacto");
  const irAyuda = () => navigate("/");
  const irProductos = () => navigate("/productos");
  const irMovimientos = () => navigate("/movimientos");
  const irStock = () => navigate("/stock");
  const irCaja = () => navigate("/caja");

  const hanleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    navigate('/login')
  }

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#Primary" }}>
        <Toolbar>
          {isMatch ? (
            <DrawerNav />
          ) : (
            <>
              <Typography variant="h6" sx={{ my: 2 }}>
                Menu alumna
              </Typography>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="Secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {user && <Button onClick={irProductos} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Productos" />
                </Button>}
                {user && <Button onClick={irMovimientos} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Movimientos" />
                </Button>}
                {user && <Button onClick={irStock} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Stock" />
                </Button>}
                {user && <Button onClick={irCaja} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Caja" />
                </Button>}
             
              </Tabs>
              {user && <Button onClick={hanleLogout} sx={{ marginLeft: "10px" }} variant="Outlined">
                Cerrar Sesión
              </Button>}
              {!user && <div>
                <Button sx={{ marginLeft: "10px" }} variant="Outlined">
                  Registrarse
                </Button>
                <Button onClick={handleClick} sx={{ marginLeft: "auto" }} variant="Outlined">
                  Ingresar
                </Button>
              </div>}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
