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
  const [nombre, setNombre] = useState(null)
  const [notificacioness, setNotificacioness] = useState();
  const [usuario, setUsuario] = useState(null)

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
        setUsuario(usuario)

      }

    } catch (error) {

    }
    //
  }
  const handleClick = () => {
    navigate("/");
  };
  const iraMenu = () => {
    navigate("/");
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