import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  CssBaseline,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Mapaleaf from '../mapas/mapaleafed'

const drawerWidth = 240;

const menuItems = [
  { text: 'Inscripciones', path: '/fiscalizacion/administracion/inscripciones' },
  { text: 'Usuarios', path: '/fiscalizacion/administracion/usuarios' },
  { text: 'Mesas', path: '/fiscalizacion/administracion/mesas' },
  { text: 'Escuelas', path: '/fiscalizacion/administracion/escuelas' },
  { text: 'Encargados', path: '/fiscalizacion/administracion/encargados' },
  { text: 'Personas', path: '/fiscalizacion/administracion/personas' },
  { text: 'Aliados', path: '/fiscalizacion/administracion/aliados' },
  { text: 'Suplentes', path: '/fiscalizacion/administracion/suplentes' },
  { text: 'Circuitos', path: '/fiscalizacion/administracion/circuitos' },
];

export default function Cards() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Barra superior opcional */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#3EDB63' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mapa de Fiscalización
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menú lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button component={Link} to={item.path} key={index}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Contenido principal: el mapa */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Toolbar /> {/* Para dar espacio debajo del AppBar */}
        <Mapaleaf/>
      </Box>
    </Box>
  );
}
