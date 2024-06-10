



import Menuizq from '../../../../components/dtc/usuario1/menuizq1'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../../components/dtc/usuario/ficha'
import React, { useEffect, useState } from "react";
import MenuuCel from '../../../../components/dtc/usuario1/menuresp'
import Listalegajos from '../../../../components/dtc/usuario/listalegajos'
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
  const [usuario, setUsuario] = useState()
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    traer()

  }, [])
  const traer = async () => {

    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
    
      setUsuario(user)
   
      switch (user.nivel) {
        case 20:
          break;
        //   navigate('/')
        case 21:
          break;
          case 25:
            break;
        default:

          window.localStorage.removeItem('loggedNoteAppUser')
          navigate("/dtc/login")
          break;
      }
    } else {

      navigate('/dtc/login')
      window.localStorage.removeItem('loggedNoteAppUser')
      alert('usuario no autorizado')
    }
    setLoginvisible(true)

  }

  return (
    <>
    <div sx={{          backgroundImage: 'linear-gradient(90deg, #9775fa 0%, #69db7c 0%, #3bc9db 99%, #ec8c69 100%, #f783ac 100%, #ffa94d 100%, #ed6ea0 100%)',
}}>
      {usuario ? <>
        {usuario.nivel == "20" ? <>
          {isMatch ?
            <>
              <div className={classes.container}>
                <MenuuCel texto="Usuarios" />
                <Login />
                <Asistencia/>
                <Avtvidadchicos />
                <Listalegajos />
              </div>
            </> : <>
              <Menuizq>
                <Login />
                <Asistencia/>
                <Avtvidadchicos />
                <Listalegajos />
              </Menuizq></>}</> : 
              <>     <Login /> <Avtvidadchicos /> </>}</> : 
              <>54558585  {usuario}</>}
              </div>
    </>

  );

}