import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import logo from "../../Assets/marcas.png";

import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerNav from "../DrawerNav";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';



const Navbar = (props) => {


  const [notificacioness, setNotificacioness] = useState();
  const [user, setUser] = useState(null)
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const islogo = {
    width: "100px",
  };


  const navigate = useNavigate();


  useEffect(() => {
    cantidadnoti()
  }, [])
  const cantidadnoti = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON)
        //  console.log(usuario.cuil_cuit)

        setUser(usuario)

      }

    } catch (error) {

    }
    //
  }
  const handleClick = () => {
    navigate("/login");
  };
  const irNosotros = () => {
    navigate("/usuario/nosotros");
  }
  const irContacto = () => {
    navigate("/usuario/contacto");
  }
  const irAyuda = () => {
    navigate("/usuario/menu");
  }

  const hanleLogout = () => {
    /* console.log('click')
     setUser(null)
     servicioUsuario.setToken(user.token) */

    window.localStorage.removeItem('loggedNoteAppUser')
    navigate('/login')
    // window.location.reload(true);
  }

  const inicio = () => {
    navigate("/usuario/menu");

  }

  const notificaciones = () => {
    navigate("/usuario/notificaciones");
  }

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#Primary" }}>
        <Toolbar>
          {/* <img style={islogo} src={logo} alt="logo" /> */}
          {isMatch ? (
            <>
              <DrawerNav />
            </>
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
               
                {user && <Button onClick={inicio} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Inicio" />
                </Button>}

                <Button onClick={irNosotros} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Nosotros" />
                </Button>
                <Button onClick={irContacto} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Contacto" />
                </Button>
                <Button onClick={irAyuda} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Ayuda" />
                </Button>
                <Button onClick={notificaciones} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label="Notificaciones" />
                  <Badge badgeContent={notificacioness} color="error">
                    <MailIcon color="primary" />
                  </Badge>
                </Button>

              </Tabs>
              {user && <Button onClick={hanleLogout} sx={{ marginLeft: "10px" }} variant="Outlined">
                Cerrar Sesión
              </Button>}


              {!user && <div>    <Button sx={{ marginLeft: "10px" }} variant="Outlined">
                Registrarse
              </Button>
                <Button onClick={handleClick} sx={{ marginLeft: "auto" }} variant="Outlined">
                  Ingresar
                </Button></div>}


            </>
          )}
        </Toolbar>
      </AppBar>

    </React.Fragment>
  );
};

export default Navbar;