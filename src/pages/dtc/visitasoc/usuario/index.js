


import Asis from '../../../../components/dtc/usuario/ficha'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MenuuCel from '../../../../components/dtc/Navbar'
import Menuizq from '../../../../components/dtc/visitasocial/menuizq'
import Asistencia from '../../../../components/dtc/usuario/asistenciadelusuario'
import Avtvidadchicos from '../../../../components/dtc/usuario1/actividades/actividades1pers'
import {

  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px', // Define el ancho máximo en pantallas más grandes
      margin: '0 auto', // Centra el contenido en pantallas más grandes
    },
    transform: 'scale(0.90)', // Escala al 75%
    transformOrigin: 'center center', // Origen de la transformación en el centro
  },
}));

export default function Paginas() {
  const navigate = useNavigate();
    const theme = useTheme();
    const classes = useStyles();
    const [loginVisible, setLoginvisible] = useState(false)
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
      
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        console.log(loggedUserJSON) 
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          switch (user.nivel) {
            case 21:
             break;
             case 28:
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

    return (
      <>
     <MenuuCel/>
     <Menuizq>
     <br/>
     <br/>
     <br/> <br/>
     <Asis/>
     <Asistencia />
     <Avtvidadchicos />
     <br/>
     <br/>
     <br/>
      </Menuizq>
 </>
   
    );

}