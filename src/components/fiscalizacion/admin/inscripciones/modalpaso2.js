import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Rating from './rating'

import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';

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
  const [cargandomesas, setCargandomesas] = useState(false)
  const [turnos, setTurnos] = useState()
  const [mesas, setMesas] = useState()
  const [datos, setDatos] = useState()
  const [activo, setActivo] = useState(false)




  const traer = async () => {
    setUsuarioo()
  
   
   const turnos = await servicioFide.traerescuelas()
   setTurnos(turnos)
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({


})
  const traermesas = async (e) => {

    setCargandomesas(false)
   
   const mes = await servicioFide.traermesas(e)
   setMesas(mes)

   setCargandomesas(true)

  

  }
  const traerestadistica = async (e) => {


   
  const dat = await servicioFide.traerestadisticasdeescuelas({id1:props.id_escuela, id2:props.id_escuela2})
   setDatos(dat)

   console.log('dps')
  

  }

  const handleClickOpen = async () => {
    await traer()
   
    setOpen(true);
    setInscripcion(({

      dni: props.dni,

      id_inscripcion:props.id_inscripcion,
     
  
  
    }))
     traerestadistica()
  }

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}
const handleChange2 = (e) => {
  
  setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })

  traermesas(e.target.value)
}


  ////
  const handleDeterminar = async (event) => {

    try {

      await servicioFide.inscribir(
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


 
             <h3>Asignaciona escuela {props.nombre}{props.apellido} </h3>
             { datos ? <>
              Cantidad de mesas  en escuela 1: {datos.cantidad_escuela1}<br/>
              <Rating    
              valor={datos.cantidad_escuela1}
              texto={"Rating cantidad de mesas"}
              />
      
              Cantidad de mesas en escuela 2: {datos.cantidad_escuela2}<br/>
              <Rating    
              valor={datos.cantidad_escuela2}
              texto={"Rating cantidad de mesas"}
              />
             </>:<></>}
          

          DNI:  { props.dni}<br/>
   
           <br/>
          
         <b> 
            Prioridad 1:  { props.escuela1}<br/>
            Prioridad 2:  { props.escuela2}</b> 
            <br/>
     
          

   
   
                 <br />
                 <label>Elegir escuela</label>
                 
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Escuela
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange2}
                                inputProps={{
                                    name: 'id_escuela',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  
                             <option value={'1'}> Elegir</option>
                             {turnos.map((row) => (
                                       
                              <option value={row.id}> {row.nombre}</option>

                    ))}

                            </NativeSelect>
                           
                 
                
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Mesa
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'mesa',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  

                            {cargandomesas ? <>
                             <option value={'1'}> Elegir</option>
                          
                             {mesas.map((row) => (
                                       
                                       <option value={row.id}> {row.numero}</option>
         
                             ))}
                                  </>:<>Cargando</>}
                            </NativeSelect>

             
         
                            <p   onClick={() => window.open('https://wa.me/'+props.telefono)}   > <b>Telefono: {props.telefono}</b> <br/>Click aca apra enviar whatsap<WhatsAppIcon/> </p> 
            <p   onClick={() => window.open('https://wa.me/'+props.telefono2)}   > <b>Telefono 2: {props.telefono2}</b> <br/>Click aca apra enviar whatsap<WhatsAppIcon/> </p> <br/>
               

                 <DialogActions>
                 {inscripcion.fiscal_antes && inscripcion.movilidad && inscripcion.vegano && inscripcion.domicilio && inscripcion.id_escuela && inscripcion.id_escuela2 ? <>         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button></>:<><p style={{ color: 'crimson' }} >COMPLETAR TODOS LOS DATOS(Momentaneamente desactivado)</p></>  }


          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
