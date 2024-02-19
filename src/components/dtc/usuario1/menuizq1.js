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
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
//import logo from "../../Assets/logocuqui.webp";
import Navbar from '../Navbar'
import GradeIcon from '@mui/icons-material/Grade';

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
          icon: <ApartmentIcon color="primary" />, 
          path: '/dtc/usuario1/menu' 
        },
        { 
          text: 'Usuarios', 
          icon: <ApartmentIcon color="primary" />, 
          path: '/dtc/usuario1/usuarios' 
        },
        { 
          text: 'Chiques', 
          icon: <ApartmentIcon color="primary" />, 
          path: '/dtc/usuario1/chiques' 
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