
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone';
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import logo from '../../../Assets/dtcletra.png';
import Navbar from '../Navbar';
import servicioDtc from '../../../services/dtc';

const drawerWidth = 290;

export default function MenuIzq2({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [cumple, setCumple] = React.useState([]);
  const [estemes, setEstemes] = React.useState([]);

  React.useEffect(() => {
    traer();
  }, []);

  const traer = async () => {
    try {
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const historial = await servicioDtc.traercumples({ fecha: formattedDate });

      setCumple(historial[0] || []);
      setEstemes(historial[1] || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedNoteAppUser');
    window.location.reload();
  };

  const menuItems = [
    {
      text: 'Inscripciones',
      icon: <ArchitectureIcon />,
      path: '/dtc/usuario1/inscripciones',
    },
    {
      text: 'Actividades',
      icon: <GradingTwoToneIcon />,
      path: '/dtc/usuario1/menu',
    },
    {
      text: 'Mapa',
      icon: <GradingTwoToneIcon />,
      path: '/dtc/usuario1/mapas',
    },
    {
      text: 'Personal',
      icon: <PeopleAltTwoToneIcon />,
      path: '/dtc/usuario1/usuarios',
    },
    {
      text: 'Usuarios',
      icon: <WcTwoToneIcon />,
      path: '/dtc/usuario1/chiques',
    },
    {
      text: 'Trabajo territorial',
      icon: <GradingTwoToneIcon />,
      path: '/dtc/usuario1/asistenciassoc',
    },
    {
      text: 'Talleres, clases, asistencia',
      icon: <ArchitectureIcon />,
      path: '/dtc/usuario1/talleres',
    },
    {
      text: 'Psicólogos',
      icon: <ArchitectureIcon />,
      path: '/dtc/usuario1/psicologos',
    },
    {
      text: 'Personas Psiq',
      icon: <ArchitectureIcon />,
      path: '/dtc/usuario1/personaspsiq',
    },
    {
      text: 'Turnos calendario',
      icon: <PsychologyIcon />,
      path: '/dtc/usuario1/turnos',
    },
    {
      text: 'Todos los turnos',
      icon: <PsychologyIcon />,
      path: '/dtc/usuario1/listatodoslosturnos',
    },
    {
      text: 'Oficios',
      icon: <ArchitectureIcon />,
      path: '/dtc/usuario1/oficios',
    },
    {
      text: 'Asistencias',
      icon: <ArchitectureIcon />,
      path: '/dtc/usuario1/asisencias',
    },
    {
      text: 'Inventario',
      icon: <ArchitectureIcon />,
      path: '/dtc/usuario1/inventario',
    },
  ];

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
          <Navbar logout={{ handleLogout }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
              mb: 3,
            }}
          ><br/><br/><br/>
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
              Inclusión Social
            </Typography>

            <Typography
              sx={{
                fontSize: '0.82rem',
                opacity: 0.75,
                mt: 0.5,
              }}
            >
              Panel de administración DTC
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mb: 2 }} />

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
            {menuItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  sx={{
  borderRadius: '18px',
  minHeight: 58,
  mb: 1,
  px: 2,
  py: 1,
  transition: 'all .22s ease',
  background: active
    ? 'rgba(255,255,255,0.18)'
    : 'transparent',
  border: active
    ? '1px solid rgba(255,255,255,0.18)'
    : '1px solid transparent',
  boxShadow: active
    ? '0 10px 18px rgba(0,0,0,0.12)'
    : 'none',
  '&:hover': {
    background: 'rgba(255,255,255,0.14)',
    transform: 'translateX(4px)',
  },
}}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 42,
                      color: active ? '#d9ffd3' : 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.92rem',
                      fontWeight: active ? 700 : 500,
                      color: '#fff',
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <CakeRoundedIcon sx={{ color: '#ffe082' }} />
              <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>
                Cumpleaños
              </Typography>
            </Box>

            {cumple.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
              </Box>
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

            {estemes.length > 0 && (
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

