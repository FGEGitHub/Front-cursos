import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioPersonas from '../../../services/personas'
import servicioCursos from '../../../services/Cursos'

import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Featured from '../../estadisticas/featured/Featured'
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
const currencies = [
  {
    value: 'CBU',
    label: 'CBU N°1',
  },
  {
    value: 'CBU',
    label: 'CBU N°2',
  },


  
];

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [usuarioo, setUsuarioo] = useState()
  const [porcent, setPorcent] = useState()
  const [turnos, setTurnos] = useState()
  const [categoria, setCategoria] = useState()
  const [activo, setActivo] = useState(false)




  const traer = async () => {
    setUsuarioo()
   const not = await servicioPersonas.datosusuarioporid(props.dni_usuario)

   setUsuarioo(not[0])
   setCategoria(not[2])
   setPorcent(not[1]) 
   
   const turnos = await servicioCursos.traerlosturnos({id:id_curso})
   setTurnos(turnos)
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({

    dni: props.id_usuario,
    id_curso:id_curso,
    id_inscripcion:props.id_inscripcion

  })


  const handleClickOpen = () => {
    traer()
    setOpen(true);
  };

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}
  
  ////
  const handleDeterminar = async (event) => {
    // event.preventDefault();


    try {

      await servicioPersonas.inscribir(
        inscripcion


      )
      props.getClients()

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)
    setOpen(false);
  };/////
  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (


    
    
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Ver inscripcion">
      <BorderColorIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>

        <h2>Categoria {categoria}</h2>
       { props.id_inscripcion}
             <h3>Inscripcion a curso {usuarioo.nombre} </h3>
            

           Prioridad 1:  {usuarioo.prioridad1}<br/>
           Prioridad 2:  {usuarioo.prioridad2}<br/>

         <b> actualmente {usuarioo.anotado !== undefined ? <> anotada en curso {usuarioo.anotado} </>:<> no anotada</>}</b> 
             <Featured
            porcentaje={porcent}
            titulo="Porcentaje de la categoria"

          />
     <label>Hijos:{usuarioo.hijos} <br />
          
            trabajo:{usuarioo.trabaja} <br />
            {usuarioo.trabaja === "Si" ? <> {usuarioo.tipot}</>:<></>} 

     </label>
   
                 <br />
                 <label>inscripcion a curso?</label>
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Dato adicional
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'accion',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'Pendiente'}>Pendiente</option>
                                <option value={'Aceptar'}>Aceptar</option>
                                <option value={'Rechazar'}>Rechazar</option>

                            </NativeSelect>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               curso
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'id_turno',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >   {turnos.map((row) => (
                                       
                              <option value={row.id}> {row.descripcion}</option>

                    ))}

                            </NativeSelect>
   
   

                 <DialogActions>
         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
