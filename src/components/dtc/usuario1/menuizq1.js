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
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
//import logo from "../../Assets/logocuqui.webp";
import Navbar from '../Navbar'
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
const drawerWidth = 240;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b2dfdb',
    },
    secondary: {
      main: '#b2dfdb',
    },
  },
});
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
        { 
          text: 'Menu', 
          icon: <GradingTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/menu' 
        },
        { 
          text: 'Usuarios', 
          icon: <PeopleAltTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/usuarios' 
        },
        { 
          text: 'Chiques', 
          icon: <WcTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/chiques' 
        },
        { 
          text: 'personal', 
          icon: <EngineeringTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/personal' 
        },
      ];
      const islogo = {
        width: "100%",                  
        };

    return(
      <>
         <ThemeProvider theme={darkTheme}>
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
        color="orange"
        anchor="left"
      >asdsadsadasdasdsad
      
        <Navbar
      logout = {{hanleLogout}}/>
        <Toolbar />
       {/*  <img style={islogo} src={logo} alt="logo" />  */}
        Logo
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
    </ThemeProvider>
   
    </>
  );

}