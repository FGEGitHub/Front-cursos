import React from 'react';
import servicioDtc from '../../../../services/dtc'
import Grafico from './grafica'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import  { useEffect, useState } from "react";
import Widget from '../../../fiscalizacion/Widget/Widget'
const nombresDiasSemana = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado'
];
const CardInformacionDia = (props) => {
    const [datos, setDatos] = useState()
    const fechaActual = new Date();

    // Obtener el día de la semana (0 = domingo, 6 = sábado)
    const diaSemana = fechaActual.getDay();
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
          const historial = await servicioDtc.traerestadisticas({fecha:formattedDate})
setDatos(historial)   
console.log(historial[0].semana)
  } catch (error) {

  }

}
  return (    <>
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
                
                <Widget  type="Asistencias tomadas en el mes: "
                      cantidad={datos[0].presentes_totales}
                    />
                          <Widget  type=" Cantidad de usuarios que concurrieron en el mes:"
                      cantidad={datos[0].presentes_totales_reales}
                    />
                                 <Widget  type="Cantidad de usuarios que concurrieron en el mes pasado:"
                      cantidad={datos[0].presentes_totales_reales_mespasado}
                    />
                          
             
                   
                          
                    </div>
                    <div className="home">
                    <Widget  type="Asistencias en la semana"
                      cantidad={datos[0].presentes_totales_semana}
                    /> {nombresDiasSemana[diaSemana]}
                                <Widget  type={"presentes semana pasada hasta el "+nombresDiasSemana[diaSemana]}
                      cantidad={datos[0].pres_Semanapasada}
                    />
                           <Widget  type="Usuarios en la semana"
                      cantidad={datos[0].presentes_totales_reales_semana}
                    />
                              <Widget  type={"Usuarios en la semana pasada hasta el  "+nombresDiasSemana[diaSemana]}
                      cantidad={datos[0].pres_Semanal_real_semanapasada}
                    />

                    </div>
                    </>:<></>}
      </CardContent>
    </Card>
    {datos? <>
    <Grafico
    semana={datos[0].semana}
    semanapasada={datos[0].semanapasada}/></>:<></>}
</>
  );
};

export default CardInformacionDia;
