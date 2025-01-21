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
import logo from "../../../Assets/dtcletra.png"
import servicioDtc from '../../../services/dtc'
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
//import logo from "../../Assets/logocuqui.webp";
import Tooltip from '@mui/material/Tooltip';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import Navbar from '../Navbar'
import Dtcito from './bot'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';const drawerWidth = 240;

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
    console.log(formattedDate)
            //  setCurrentDate(formattedDate);
              const historial = await servicioDtc.traercumples({fecha:formattedDate})

    setCumple(historial[0])  
    setEstemes(historial[1])  
    
     
      } catch (error) {
    
      }
    
    }
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
        text: 'Mapas', 
        icon: <GradingTwoToneIcon color="primary" />, 
        path: '/dtc/usuario1/mapas', 
         tooltip: 'Domicilio de los usuarios'
      },
      { 
        text: 'Entregas ', 
        icon: <GradingTwoToneIcon color="primary" />, 
        path: '/dtc/usuario1/entregas', 
         tooltip: 'Domicilio de los usuarios'
      },
        { 
          text: 'Actividades', 
          icon: <GradingTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/menu' , 
         tooltip: 'Asistencia y actividades de hoy'
        },
        { 
          text: 'Personal', 
          icon: <PeopleAltTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/usuarios' , 
         tooltip: 'Usuarios del sistema '
        },
      
        { 
          text: 'Usuarios', 
          icon: <WcTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/chiques' , 
         tooltip: 'Lista de usuarios del dispositivo'
        },
        { 
          text: 'Asistencias sociales', 
          icon: <GradingTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/asistenciassoc' , 
         tooltip: 'Informes de las trabajadoras sociales'
        },
       
        
        { 
          text: 'Talleres,clases,asistencia', 
          icon: <ArchitectureIcon color="primary" />,
          path: '/dtc/usuario1/talleres' , 
         tooltip: 'Clases y asistencia de talleres'
        },
        { 
          text: 'Personas Psiq', 
          icon: <ArchitectureIcon color="primary" />,
          path: '/dtc/usuario1/personaspsiq' , 
         tooltip: 'Lista de personas con tratamiento'
        },
        { 
          text: 'Turnos psiq', 
          icon: <ArchitectureIcon color="primary" />,
          path: '/dtc/usuario1/turnos' , 
         tooltip: 'Agenda de turnos'
        },
        { 
          text: 'Asistencias', 
          icon: <ArchitectureIcon color="primary" />,
          path: '/dtc/usuario1/asisencias' , 
         tooltip: 'Detalle de asistencias de usuarios'
        },
        { 
          text: 'Intervenciones', 
          icon: <ArchitectureIcon color="primary" />,
          path: '/dtc/usuario1/intervenciones' , 
         tooltip: 'Informes'
        },
        { 
          text: 'expediente', 
          icon: <ArchitectureIcon color="primary" />,
          path: '/dtc/usuario1/expedientes' , 
         tooltip: 'Accede a los mapas disponibles'
        },
        { 
          text: 'cumples', 
          icon: <ArchitectureIcon color="primary" />,
          path: '/dtc/usuario1/cumples' , 
         tooltip: 'Accede a los mapas disponibles'
        },
        { 
          text: 'gimnasio', 
          icon: <WcTwoToneIcon color="primary" />, 
          path: '/dtc/usuario1/usuariosgim' , 
         tooltip: 'En proceso carga de usaurios '
        },
      ];
      const islogo = {
        marginTop:'10%',
        width: "70%",                  
        };
    return(
      <>
        
    
    <Box sx={{  display: 'flex' }}>
      <CssBaseline />
      
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor:"#1b5e20",
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"

        color="#37474f"
        anchor="left"
      >
      
        <Navbar
      logout = {{hanleLogout}}/>
        <Toolbar />
        <img style={islogo} src={logo} alt="logo" />  
       
        <Toolbar />
        <Divider />
        
<List sx={{ color: "#fafafa" }}>
  {menuItems.map((item) => (
    <Tooltip title={item.tooltip} arrow key={item.text}>
      <ListItem
        button
        onClick={() => {
          handleClick(item.path);
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    </Tooltip>
  ))}
</List>
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
              <ListItemIcon sx={{color:'white'}}>{item.nombre} {item.apellido} <br/>el dia ({item.fecha_nacimiento})</ListItemIcon>
            
            </ListItem>
          ))}
       
       </>:<></>}
        
        </>:<></>}
        
        <Divider />
       
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1,  p:0,backgroundColor:"#88f78e" }}
      >
        <Toolbar />
      {/*   <AlertaInusual
      cantidadInusual={cantidadInusual} />
        <AlertaAprobaciones
      cantidad={cantidad} /> */}
   
      <div >
        <br/>
    
   { children}
   <Dtcito/>
   </div>
      </Box>
    </Box>
    
   
    </>
  );

}