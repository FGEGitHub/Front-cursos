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
import ListItem from '@mui/material/ListItem';
import servicioDtc from '../../services/dtc'
import MenuIcon from "@mui/icons-material/Menu";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
const pages = [
  "Inicio",
  "actividades",
  
  ,
  "Cerrar Sesión"];
const pagesdeslogueado = [
  "Iniciar sesion ",
  "Nosotros",
  
  "Contacto",
  ]

const DrawerNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cumple, setCumple] = useState()
  const [estemes, setEstemes] = useState()
  const [usuario, setUsuario] = useState(null)

  const navigate = useNavigate();
  useEffect(() => {
    traer()



}, [])
  const traer = async () => {
    try {
       
  
  
            const today = new Date();
            const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  console.log(formattedDate)
          //  setCurrentDate(formattedDate);
            const historial = await servicioDtc.traercumples({fecha:formattedDate})

  setCumple(historial[0])  
  setEstemes(historial[1])  
  
   
    } catch (error) {
  
    }
  
  }

  const handleClick = () => {
    navigate("/encargados/cursos");
  };
  const iraMenu = () => {
    navigate("/dtc/usuario2/asistencia");
  };
  const irNosotros = () => {
    navigate("/usuario/nosotros");
  }
  const irContacto = () => {
    navigate("/usuario/contacto");
  }
  const iaActividades = () => {
    navigate("/dtc/actividades");
  }
  const nomb = () => {
    navigate("/usuario/datosPers");
  };
  const notif = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    navigate("/dtc/login")

  };


  const hanleLogout = () => {
    /* console.log('click')
     setUser(null)
     servicioUsuario.setToken(user.token) 
        //  navigate('/login')
     */
   
    
     window.localStorage.removeItem('loggedNoteAppUser')
     navigate("/dtc/login")

   } 



  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    switch (rowIndex) {
      case 0:
        iraMenu()
        break;

      case 1:
        iaActividades()
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

          {usuario ? <>
            <List>
              {pages.map((page, index) => (
                <ListItemButton key={index}>
                  <ListItemIcon>
                    <ListItemText onClick={() => CutomButtonsRenderer(page, index)} >  {page}  </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))} </List>
          </> : <>
            <List>
              {pagesdeslogueado.map((page, index) => (
                <ListItemButton key={index}>
                  <ListItemIcon>
                    <ListItemText onClick={() => CutomButtonsRendererdesloqueado(page, index)} >  {page}  </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))} </List></>
          }

{cumple ? <>
       { cumple.length>0? <>
        {cumple.map((item) => (
            <ListItem 
             
            >
              
              HOY HAY CUMPLE
              <p sx={{color:'white'}}>{item.nombre}  {item.apellido} </p>
            
            </ListItem>
          ))}
       
       </>:<><p sx={{color:'white'}}>Hoy no hay cumples <SentimentVeryDissatisfiedIcon/> </p></>}
        
        </>:<></>}
        {estemes ? <>
       { estemes.length>0? <>
       Cumples este mes
        {estemes.map((item) => (
            <ListItem 
             
            >
              <ListItemIcon sx={{color:'black'}}>{item.nombre} {item.apellido} <br/>el dia ({item.fecha_nacimiento})</ListItemIcon>
            
            </ListItem>
          ))}
       
       </>:<></>}
        
        </>:<></>}

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