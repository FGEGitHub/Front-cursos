import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import Face3Icon from '@mui/icons-material/Face3';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GetAppIcon from '@mui/icons-material/GetApp';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useEffect } from "react";
import logo from "../../Assets/logoesme.webp";
import Navbar from '../Navbar'
import GradeIcon from '@mui/icons-material/Grade';
import AppsIcon from '@mui/icons-material/Apps';
const drawerWidth = 240;
export default function MenuIzq2 ({children}) {
    const navigate = useNavigate();
  


    const handleClick = (path) => {
        
        navigate(path);
      }; 
    

       const hanleLogout = () => {
       /* console.log('click')
        setUser(null)
        servicioUsuario.setToken(user.token) */
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload(true);
      } 
    const menuItems = [
 /*      { 
        text: 'Carnavales', 
        icon: <CelebrationIcon color="error" />, 
        path: '/administracion/inscripcionescarnavales' 
      },
      { 
        text: 'Llamados carnavales', 
        icon: <PhoneForwardedIcon color="error" />, 
        path: '/administracion/llamadoscarnaval' 
      }, 
        { 
          text: 'Cursos', 
          icon: <ApartmentIcon color="primary" />, 
          path: '/administracion/cursos' 
        },*/
        { 
          text: 'Turnos (Cohortes)', 
          icon: <AppsIcon color="primary" />, 
          path: '/administracion/turnos' 
        },
        { 
          text: 'Preasignadas', 
          icon: <GradeIcon color="primary" />, 
          path: '/administracion/preinscriptas' 
        },
        { 
          text: 'Personas', 
          icon: <Face3Icon color="primary" />, 
          path: '/administracion/personas' 
        },
        { 
          text: 'Inscripciones', 
          icon: <HistoryEduIcon color="primary" />, 
          path: '/administracion/inscripciones' 
        },
        { 
          text: 'Gestion de usuarios', 
          icon: <PeopleAltIcon color="primary" />, 
          path: '/administracion/usuarios' 
        },
     /*    { 
          text: 'Carga de inscripciones', 
          icon: <GetAppIcon color="primary" />, 
          path: '/administracion/cargarinscripciones' 
        }, */
        { 
          text: 'Call center', 
          icon: <PhoneForwardedIcon color="green" />, 
          path: '/administracion/callcenter' 
        },
        { 
          text: 'Cursado completos', 
          icon: <BadgeIcon color="primary" />, 
          path: '/administracion/cursadocompleto' 
        },
        { 
          text: 'Resumen Contactos', 
          icon: <PermPhoneMsgIcon color="primary" />, 
          path: '/administracion/contacto' 
        },
        { 
          text: 'Egresadxs', 
          icon: <SchoolIcon color="primary" />, 
          path: '/administracion/egresadxs' 
        },
     
      ];
      const islogo = {
        width: "100%",                  
        };

    return(
      <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      
        <Navbar
      logout = {{hanleLogout}}/>
        <Toolbar />
        <img style={islogo} src={logo} alt="logo" /> 
        
        <Toolbar />
        <Divider />
        <List>
        {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => {
                handleClick(item.path)
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
        <Divider />
       
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      {/*   <AlertaInusual
      cantidadInusual={cantidadInusual} />
        <AlertaAprobaciones
      cantidad={cantidad} /> */}
   { children}
      </Box>
    </Box>

   
    </>
  );

}