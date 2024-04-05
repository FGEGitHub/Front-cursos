import React from 'react';
import servicioDtc from '../../../../services/dtc'
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useNavigate, useParams } from "react-router-dom";
import  Acordeon   from '../actividades/acordeon';
import  { useEffect, useState } from "react";
import Asistencia from  '../../usuario2/asistencia/tabla'
//import Casasa from './asist'
const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '800px',
      margin: '0 auto',
    },
  },
}));

const handleFechaSeleccionada = (fecha) => {
  console.log('Fecha seleccionada:', fecha);
};

const LoginForm = () => {
    let params = useParams()
    let id = params.id
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDate, setCurrentDate] = useState('');
  const [actividades, setactividades] = useState()
  const [clasess, setClases] = useState()

  useEffect(() => {
    traer()
    clases()


}, [])
const traer = async () => {
  try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)


          const today = new Date();
          const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

          setCurrentDate(formattedDate);
          const historial = await servicioDtc.traertodaslasactividades({fecha:formattedDate})
          setactividades(historial)
      }

  } catch (error) {

  }

}
  const fechaActual = new Date();
  const clases = async () => {
    try {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON)
  
            const hi = await servicioDtc.clasesdetaller(id)
            setClases(hi)
        }
  
    } catch (error) {
  
    }
  
  }
  return (<>
   
    

{currentDate}
    {currentDate ? <>   <Asistencia fecha={currentDate}
                                    idt={id}/></>:<></>}
    {actividades ? <> <Acordeon
          actividades={actividades}

        
    />  
    

  
    </>:<>cargando</>}


    </>
  );
};

export default LoginForm;

