import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import servicioDtc from '../../../services/dtc'
import Modificar from './modificar'
import  { useEffect, useState, Fragment } from "react";
const FichaPersona = ({ datosPersona }) => {
    let params = useParams()
    let id = params.id
    const [chico, setchico] = useState()
    useEffect(() => {
        traer()



    }, [])

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)


                const novedades_aux = await servicioDtc.datosdechique(id)
                setchico(novedades_aux[0][0])
            }

        } catch (error) {

        }

    }
  return (
    <>
    {chico ? <>
    <Card variant="outlined"  sx={{
          cursor: 'pointer',
          background: '#e0e0b2',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Información de {chico.apellido} {chico.nombre}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Primer contacto:</Typography>
            <Typography>{chico.primer_contacto}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Primer ingreso:</Typography>
            <Typography>{chico.primer_ingreso}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Admision:</Typography>
            <Typography>{chico.admision}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">DNI:</Typography>
            <Typography>{chico.dni}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Telefono personal:</Typography>
            <Typography>{chico.telefono}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Autorizacion de imagen:</Typography>
            <Typography>{chico.autorizacion_imagen}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Fotocopia de dni:</Typography>
            <Typography>{chico.fotoc_dni}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Fotocopia dni  Responsable:</Typography>
            <Typography>{chico.fotoc_responsable}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Telefono Responsable:</Typography>
            <Typography>{chico.tel_responsable}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Visita social:</Typography>
            <Typography>{chico.visita_social}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Egreso:</Typography>
            <Typography>{chico.egreso}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Autorizadoa  retirar:</Typography>
            <Typography>{chico.aut_retirar}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Dato  escolar:</Typography>
            <Typography>{chico.dato_escolar}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Hora de la merienda:</Typography>
            <Typography>{chico.hora_merienda}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Fecha de Nacimiento:</Typography>
            <Typography>{chico.fecha_nacimiento}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Domicilio:</Typography>
            <Typography>{chico.domicilio}</Typography>
          </Grid>
          
          {/* Agrega más campos aquí */}
        </Grid>
      </CardContent>
    </Card>
    <Modificar 
    id ={chico.id}
    nombre={chico.nombre}
    apellido={chico.apellido}
       fecha_nacimiento={chico.fecha_nacimiento}
       observaciones={chico.observaciones}
       primer_contacto={chico.primer_contacto}
       primer_ingreso={chico.primer_ingreso}
       admision={chico.admision}
       dni={chico.dni}
       domicilio={chico.domicilio}
       telefono={chico.telefono}
       autorizacion_imagen={chico.autorizacion_imagen}
       fotoc_dni={chico.fotoc_dni}
       fotoc_responsable={chico.fotoc_responsable}
       tel_responsable={chico.tel_responsable}
       visita_social={chico.visita_social}
       egreso={chico.egreso}
       aut_retirar={chico.aut_retirar}
       dato_escolar={chico.dato_escolar}
       hora_merienda={chico.hora_merienda}
       traer ={async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)


                const novedades_aux = await servicioDtc.datosdechique(id)
                setchico(novedades_aux[0][0])
            }

        } catch (error) {

        }

    }}
    
    />
    </>:<>Cargando</>}
    </>
  );
};

export default FichaPersona;
