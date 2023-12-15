import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";


import MenuIcon from "@mui/icons-material/Menu";
const pages = [
  "Inicio",
  ,
  "Cerrar Sesión"];
const pagesdeslogueado = [
  "Iniciar sesion ",
  "Nosotros",
  
  "Contacto",
  ]

const DrawerNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [usuario, setUsuario] = useState(null)

  const navigate = useNavigate();


  const handleClick = () => {
    navigate("/encargados/cursos");
  };
  const iraMenu = () => {
    navigate("/encargados/cursos");
  };
  const irNosotros = () => {
    navigate("/usuario/nosotros");
  }
  const irContacto = () => {
    navigate("/usuario/contacto");
  }
  const irAyuda = () => {
    navigate("/");
  }
  const nomb = () => {
    navigate("/usuario/datosPers");
  };
  const notif = () => {
    navigate("/usuario/notificaciones");
  };


  const hanleLogout = () => {
    /* console.log('click')
     setUser(null)
     servicioUsuario.setToken(user.token) 
        //  navigate('/login')
     */
   
    
     window.localStorage.removeItem('loggedNoteAppUser')
     navigate("/")

   } 



  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    switch (rowIndex) {
      case 0:
        iraMenu()
        break;

      case 1:
        hanleLogout()
        break;
      case 2:
        hanleLogout()
        break;
      case 2:
        irContacto()
        break;
        case 3:
          notif()
          break;
          case 4:
            hanleLogout()
            break;
          

    }
  }
    function CutomButtonsRendererdesloqueado(dataIndex, rowIndex, data, onClick) {
      switch (rowIndex) {
        case 0:
          handleClick()
          break;

        case 1:
          hanleLogout()
          break;
        case 2:
          hanleLogout()
          break;
        case 2:
          irContacto()
          break;
    


      }
    }

    const inicio = () => {
      navigate("/");

    }

    const notificaciones = () => {
      navigate("/usuario/notificaciones");
    }

    
    return (
      <React.Fragment>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >

          



        </Drawer>
        <IconButton
          sx={{ color: "white", marginLeft: "auto" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon color="white" />
        </IconButton>
      </React.Fragment>
    );
  };

export default DrawerNav;