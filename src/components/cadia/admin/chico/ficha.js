import React from 'react';
import { Card, CardContent, Typography, Grid,Button } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import servicioDtc from '../../../../services/dtc'
import Modificar from './modificar'
//import Modalperfil from './modaldeperfil'
import Borrarusuaio from "./modalborrarusuario"
import Vinculos from './modalvinculos'
import Avatar from "@mui/material/Avatar";
import Calendario from './calendario'
import Anadirprof  from './modalanadirprof'
import Anadirhorarios from './asignarhorarios'

import  { useEffect, useState, Fragment } from "react";
const FichaPersona = (props) => {
    let params = useParams()
    let id = params.id
    const [chico, setchico] = useState()
    const [vinculos, setVinculos] = useState()
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
                const novedades_aux = await servicioDtc.datosdechiquecadia(id == undefined ? props.id : id)
                setfoto(novedades_aux[1])
                setchico(novedades_aux[0][0])
                setVinculos(novedades_aux[2])
            }

        } catch (error) {

        }

    }

  return (
    <>
    {chico ? <>
    <Card variant="outlined"  sx={{
          cursor: 'pointer',
backgroundColor:'#b0bec5'        }}>
   {chico && (
                <Fragment>
                  { usuario ? <>
                
                    <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
                <Avatar sx={{ width: 170, height: 200 }}>{foto?<> <img src={`data:image/jpeg;base64,${foto}`} width="170" height="200"/></>:<>Subir foto</>} </Avatar>
              </Grid>   
              {usuario.nivel ==20?<>
            {/*   <Modalperfil 
              id ={chico.id}
              traer={ async () => {
                try {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
        
        
                        const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
                        setfoto(novedades_aux[1])
                        setchico(novedades_aux[0][0])
                        setVinculos(novedades_aux[2])
                    }
        
                } catch (error) {
        
                }
        
            }}/> */}
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
            <Typography color="textSecondary">Fecha de Nacimiento:</Typography>
            <Typography>{chico.fecha_nacimiento}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Domicilio:</Typography>
            <Typography>{chico.domicilio}</Typography>
          </Grid>
          {showAllData ?<>
          <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">DNI:</Typography>
            <Typography>{chico.dni}</Typography>
          </Grid>
            <Typography color="textSecondary">Telefono personal:</Typography>
            <Typography>{chico.telefono}</Typography>
          </Grid>
        
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
            <Typography color="textSecondary">Fecha de Nacimiento:</Typography>
            <Typography>{chico.fecha_nacimiento}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Domicilio:</Typography>
            <Typography>{chico.domicilio}</Typography>
          </Grid>
          </>:<></>}
          {chico && (
                <Fragment>
                 <Button onClick={toggleShowAllData}>
                    {showAllData ? 'Ver menos' : 'Ver más'}
                  </Button>
                  {/* Agrega más campos adicionales aquí */}
                </Fragment>
              )}
          {/* Agrega más campos aquí */}
        </Grid>
      </CardContent>
    </Card>
    {chico && (
                <Fragment>
                  { usuario ? <>
                  {usuario.nivel ==40?<>
                    
                    <Anadirprof 

                        id ={chico.id}/>
                    <Borrarusuaio 

                        id ={chico.id}/>
                        <Anadirhorarios
                         id ={chico.id}/>
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
       direccion={chico.direccion}
       telefono={chico.telefono}
       autorizacion_imagen={chico.autorizacion_imagen}
       fotoc_dni={chico.fotoc_dni}
       fotoc_responsable={chico.fotoc_responsable}
       tel_responsable={chico.tel_responsable}
       fecha_ingreso={chico.fecha_ingreso}
       fecha_fin={chico.fecha_fin}
       aut_retirar={chico.aut_retirar}
       dato_escolar={chico.dato_escolar}
       kid={chico.kid}
       escuela= {chico.escuela}
       grado= {chico.grado}
       fines={chico.fines}
       hora_merienda={chico.hora_merienda}
       traer ={ async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
                const novedades_aux = await servicioDtc.datosdechiquecadia(id == undefined ? props.id : id)
                setfoto(novedades_aux[1])
                setchico(novedades_aux[0][0])
                setVinculos(novedades_aux[2])
            }

        } catch (error) {

        }

    }}
    />
                  </>:<></>}
                  </>:<></>}
                  {/* Agrega más campos adicionales aquí */}
                </Fragment>
              )}
    
    </>:<>Cargando</>}
    <Calendario/>
 
    { vinculos ? <>  {vinculos.length>0 ?<>  {vinculos.map((ob)=><>
              {ob.nombre}, { ob.apellido},  {ob.vinculoo } <br/>
           </> )}  </>:<>Sin vinculos</>}     </>:<></>}
    </>
  );
};

export default FichaPersona;
