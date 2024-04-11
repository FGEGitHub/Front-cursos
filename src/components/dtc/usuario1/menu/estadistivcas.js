import React from 'react';
import servicioDtc from '../../../../services/dtc'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import  { useEffect, useState } from "react";

const CardInformacionDia = (props) => {
    const [datos, setDatos] = useState()
  // Puedes personalizar este avatar o icono según tus necesidades
  useEffect(() => {
    traer()



}, [])
  const icono = <Avatar>A</Avatar>;

  const handleIrActividades = () => {
    // Lógica para navegar a la página de actividades
    console.log('Ir a actividades');
  };

const traer = async () => {
  try {
     


          const today = new Date();
          const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

        //  setCurrentDate(formattedDate);
          const historial = await servicioDtc.traerestadisticas(formattedDate)
setDatos(historial)   

  } catch (error) {

  }

}
  return (
    <Card sx={{
      cursor: 'pointer',
      background: '#eceff1',
    
  
    }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
         Ir al dia de hoy
        </Typography>
z
       {datos ? <>
    
        Cantidad de presentes del mes: {datos[0].length}<br/>
        Cantidad de usuarios que concurrieron en el mes: {datos[1].length}
       </>:<></>}
      </CardContent>
    </Card>
  );
};

export default CardInformacionDia;
