import React from 'react';
import servicioDtc from '../../../../services/dtc'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import  { useEffect, useState } from "react";
import Widget from '../../../fiscalizacion/Widget/Widget'
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
         Estadisticas
        </Typography>

       {datos ? <>
             <div className="home">
                
                <Widget  type="Cantidad de presentes del mes: "
                      cantidad={datos[0].presentes_totales}
                    />
                          <Widget  type=" Cantidad de usuarios que concurrieron en el mes:"
                      cantidad={datos[0].presentes_totales_reales}
                    />
                          <Widget  type="Cantidad presentes mes pasado"
                      cantidad={datos[0].presentes_totales_reales_mespasado}
                    />
                          <Widget  type="presentes en la semana"
                      cantidad={datos[0].presentes_totales_semana}
                    />
                           <Widget  type="presentes reales en lasemana"
                      cantidad={datos[0].presentes_totales_reales_semana}
                    />
                          
                    </div>
                    </>:<></>}
      </CardContent>
    </Card>
  );
};

export default CardInformacionDia;
