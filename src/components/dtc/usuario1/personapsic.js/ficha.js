import React from 'react';
import { Card, CardContent, Typography, Grid,Button } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import servicioDtc from '../../../../services/dtc'
import Modificar from './modificar'
import imagen from "../../../../Assets/fondopsiq.avif"
import Borrarusuaio from "./modalborrarusuario"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import  { useEffect, useState, Fragment } from "react";
const FichaPersona = (props) => {
    let params = useParams()
    let id = params.id
    const [chico, setchico] = useState()
    const [turnos, setTurnos] = useState()
    const [usuario, setUsuario] = useState()
    const [showAllData, setShowAllData] = useState(false);
    const [foto, setfoto] = useState()
    // La función para alternar entre "Ver más" y "Ver menos"
    const toggleShowAllData = () => {
      setShowAllData(!showAllData);
    };
    useEffect(() => {
        traer()



    }, [])

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
                const novedades_aux = await servicioDtc.datosdepersonapsi(id == undefined ? props.id : id)
                setfoto(novedades_aux[1])
                setchico(novedades_aux[0][0])
                setTurnos(novedades_aux[1])
            }

        } catch (error) {

        }

    }

  return (
    <>
    {chico ? <>
    <Card variant="outlined"  sx={{
          cursor: 'pointer',
          backgroundImage:{imagen}       }}>
   {chico && (
                <Fragment>
                  { usuario ? <>
                  {usuario.nivel ==20?<>
               
             
                  </>:<></>}
                  </>:<></>}
                  {/* Agrega más campos adicionales aquí */}
                </Fragment>
              )}
            
      <CardContent>
        <Typography variant="h5" component="div">
          Información de {chico.apellido} {chico.nombre}
        </Typography>
        <Grid container spacing={2}>
         
      
        
 
          <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">DNI:</Typography>
            <Typography>{chico.dni}</Typography>
          </Grid>
            <Typography color="textSecondary">Telefono personal:</Typography>
            <Typography>{chico.telefono}</Typography>
          </Grid>
        
          
        
     
  
  
       
                  <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Primer contacto:</Typography>
            <Typography>{chico.primer_contacto}</Typography>
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
    {chico && (
                <Fragment>
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
       kid={chico.kid}
       hora_merienda={chico.hora_merienda}
       traer ={async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)


                const novedades_aux = await servicioDtc.datosdepersonapsi(id == undefined ? props.id : id)
                setchico(novedades_aux[0][0])
            }

        } catch (error) {

        }

    }}
    
    />
                  { usuario ? <>
                  {usuario.nivel ==20?<>

                    <Borrarusuaio 

                        id ={chico.id}/>
                    
                  </>:<></>}
                  </>:<></>}
                  {/* Agrega más campos adicionales aquí */}
                </Fragment>
              )}
    
    </>:<>Cargando</>}
    {turnos && 
    
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
              <TableCell>Otorgado</TableCell>
                <TableCell>Agendado por</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Presente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {turnos.map((ob, index) => (
            <TableRow key={index}>
              <TableCell>{ob.fecha}- {ob.detalle}</TableCell>
                         <TableCell>{ob.hora}</TableCell>
                                  <TableCell>{ob.agendadopor}</TableCell>
                         
              <TableCell>{ob.estado}</TableCell>
              <TableCell>{ob.presente}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    
    }
    </>
  );
};

export default FichaPersona;
