import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {
 
  ListItemButton,
 
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import logo from "../../../Assets/dtcletra.png"
import servicioDtc from '../../../services/dtc'
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import Tooltip from '@mui/material/Tooltip';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import Navbar from '../Navbar'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
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
  const [cumple, setCumple] = useState()
  const [estemes, setEstemes] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    traer()
  }, [])

  const traer = async () => {
    try {
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const historial = await servicioDtc.traercumples({ fecha: formattedDate })

      setCumple(historial[0])
      setEstemes(historial[1])
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  const handleClick = (path) => {
    navigate(path);
  };

  const hanleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload(true);
  }

  const menuItems = [
   
    {
        text: 'Hoy',
        icon: <CalendarTodayIcon color="primary" />,
        path: '/dtc/cocina',
       // tooltip: 'Lista de usuarios del dispositivo'
      },
      
      {
        text: 'Raciones',
        icon: <CalendarTodayIcon color="primary" />,
        path: '/dtc/cocinaraciones',
       // tooltip: 'Lista de usuarios del dispositivo'
      },
      {
        text: 'Asistencias',
        icon: <CalendarTodayIcon color="primary" />,
        path: '/dtc/cocinaraciones',
       // tooltip: 'Lista de usuarios del dispositivo'
      },
      
   /*  {
      text: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Inscripciones
      
      
        </div>
      ),
      icon: <BorderColorIcon color="primary" />,
      path: '/dtc/cocina/inscripciones',
    //  tooltip: 'Detalle de asistencias de usuarios',
    }, */

    {
      text: 'Usuarios',
      icon: <WcTwoToneIcon color="primary" />,
      path: '/dtc/cocina/usuarios',
     // tooltip: 'Lista de usuarios del dispositivo'
    },
  

  
 /*    {
      text: 'Turnos psiq',
      icon: <CalendarMonthIcon color="primary" />,
      path: '/dtc/cocina/turnos',
     // tooltip: 'Agenda de turnos'
    }, */

    {
        text: 'Etapas',
        icon: <ArchitectureIcon color="primary" />,
        path: '/dtc/cargaetapas',
       // tooltip: 'Agenda de turnos'
      },
      {
        text: 'Raciones',
        icon: <EmojiFoodBeverageIcon color="primary" />,
        path: '/dtc/cocinaraciones',
        //tooltip: 'Detalle de asistencias de usuarios'
      },
    
      
  ];
  const islogo = {
    marginTop: '10%',
    width: "70%",
  };

  return (
  <>
    <CssBaseline />

    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.appBar + 2,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            border: 'none',
            zIndex: (theme) => theme.zIndex.appBar + 2,
            background:
              'linear-gradient(180deg, #245d27 0%, #2e7d32 30%, #3f9a44 100%)',
            color: '#fff',
            padding: '18px 14px',
            boxShadow: '8px 0 30px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
          },
        }}
      >
        <Navbar logout={{ hanleLogout }} />

        {/* LOGO */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
            mb: 3,
          }}
        >
          <br />
          <br />
          <br />

          <Box
            sx={{
              width: 86,
              height: 86,
              borderRadius: '26px',
              background: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
              mb: 2,
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: '70%', objectFit: 'contain' }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '.4px',
            }}
          >
            Cocina DTC
          </Typography>

          <Typography
            sx={{
              fontSize: '0.82rem',
              opacity: 0.75,
              mt: 0.5,
            }}
          >
            Panel de administración
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mb: 2 }} />

        {/* MENU */}
        <List
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            pr: 0.5,
            pb: 1,

            '&::-webkit-scrollbar': {
              width: '8px',
            },

            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.22)',
              borderRadius: '999px',
            },
          }}
        >
          {menuItems.map((item) => (
            <Tooltip title={item.tooltip || ''} arrow key={item.text}>
              <ListItemButton
                onClick={() => handleClick(item.path)}
                sx={{
                  borderRadius: '18px',
                  minHeight: 58,
                  mb: 1,
                  px: 2,
                  py: 1,
                  transition: 'all .22s ease',

                  '&:hover': {
                    background: 'rgba(255,255,255,0.14)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 42,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    color: '#fff',
                  }}
                />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

        {/* CUMPLEAÑOS */}
        <Box
          sx={{
            mt: 2,
            borderRadius: '18px',
            p: 1.25,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxHeight: 170,
            overflowY: 'auto',
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1.5,
            }}
          >
            <CalendarTodayIcon sx={{ color: '#ffe082' }} />

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.92rem',
              }}
            >
              Cumpleaños
            </Typography>
          </Box>

          {cumple?.length > 0 ? (
            <>
              {cumple.map((item, index) => (
                <Chip
                  key={index}
                  avatar={
                    <Avatar
                      sx={{
                        background: '#81c784',
                        color: '#1b5e20',
                        width: 24,
                        height: 24,
                        fontSize: '0.75rem',
                      }}
                    >
                      {item.nombre?.charAt(0)}
                    </Avatar>
                  }
                  label={`${item.nombre} ${item.apellido}`}
                  sx={{
                    mb: 1,
                    width: '100%',
                    justifyContent: 'flex-start',
                    background: 'rgba(255,255,255,0.14)',
                    color: '#fff',
                    height: 32,
                    borderRadius: '10px',
                    fontSize: '0.78rem',

                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              ))}
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'rgba(255,255,255,0.78)',
                fontSize: '0.85rem',
              }}
            >
              <SentimentVeryDissatisfiedIcon fontSize="small" />
              Hoy no hay cumpleaños
            </Box>
          )}

          {estemes?.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.8)',
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Este mes
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {estemes.slice(0, 6).map((item, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={`${item.nombre} ${item.apellido}`}
                    sx={{
                      background: 'rgba(255,255,255,0.12)',
                      color: '#fff',
                      borderRadius: '10px',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* CONTENIDO */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, #f8fafc 0%, #eef5f1 100%)',
        }}
      >
        <Toolbar />

        <Box
          sx={{
            background: '#fff',
            borderRadius: '28px',
            p: { xs: 2, md: 4 },
            boxShadow: '0 20px 45px rgba(15,23,42,0.08)',
            minHeight: 'calc(100vh - 120px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  </>
);
}
