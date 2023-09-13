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
        { 
          text: 'Cursos', 
          icon: <ApartmentIcon color="primary" />, 
          path: '/administracion/cursos' 
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
      >asdsadsadasdasdsad
      
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