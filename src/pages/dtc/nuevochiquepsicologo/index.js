import Asis from '../../../components/dtc/usuario1/chiques/formularionuevo';
import { useNavigate } from "react-router-dom";
import MEnupc from '../../../components/dtc/usuario1/turnos/menunizq';
import MenuuCel from '../../../components/dtc/Navbar';
import React, { useEffect, useState } from "react";

import {
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px', 
      margin: '0 auto', 
    },
    transform: 'scale(0.90)', 
    transformOrigin: 'center center', 
  },
}));

export default function Paginas() {
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = useStyles();
  const [loginVisible, setLoginvisible] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

   useEffect(() => {
        
          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
          console.log(loggedUserJSON) 
          if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            switch (user.nivel) {
              case 21:
               break;
               case 24:
                break;
             //   navigate('/')
             
             
              default:
              
                  window.localStorage.removeItem('loggedNoteAppUser')
                  navigate("/dtc/login")
                break;
            }
          }else{
            
            navigate('/dtc/login')
                window.localStorage.removeItem('loggedNoteAppUser')
                alert('usuario no autorizado')
          }
          setLoginvisible(true)
        }, [])
  

  const contenido = (
    <>
      <br />
      <br />
      <br />
      <Asis />
      <br />
      <br />
      <br />
    </>
  );

  return isMobile ? (
    <>
      <MenuuCel />
      {contenido}
    </>
  ) : (
    <MEnupc>{contenido}</MEnupc>
  );
}
