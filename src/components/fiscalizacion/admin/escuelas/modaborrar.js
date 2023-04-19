import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const [activo, setActivo] = useState(false)




  const traer = async () => {
    setUsuarioo()
  
   
   const turnos = await servicioFide.traerescuelasymesas(props.id)
   setTurnos(turnos[0])
   setMesas(turnos[1])
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({


})


  const handleClickOpen = async () => {
    await traer()
    setOpen(true);
    setInscripcion(({

  

      id:props.id,
     
  
  
    }))
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
  if( e.target.value==="Si"){
    setCargandomesas(true)
  }else{
    setCargandomesas(false)
  }
}

  ////
  const handleDeterminar = async (event) => {

    try {

      const rta = await servicioFide.borrarescuela(
        inscripcion


      )
      alert(rta)
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
       < Tooltip title="Borrar Mesa">
      <DeleteIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>


       { props.id}
             <h3  style={{ color: 'crimson' }} >ATENCION: Borrar la escuela {props.nombre} </h3>
            
                  <p>la misma cuenta con las mesas:  {mesas.map((row) => (
                                     row.numero  
                                     
                             ))}</p>
   
   
                 <br />
               

                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿Deseas asignar esas mesas a otra escuela?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange2}
                    inputProps={{
                        name: 'decision',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>
                    {cargandomesas ? <>

                <label>Elegir a que escuela asignar las mesas de la escuela borrada. </label>
                
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Escuela
                 </InputLabel>
                 <NativeSelect
                     defaultValue={30}
                     onChange={handleChange}
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
                           
                         

                            </>:<></>}
               

                 <DialogActions>
                 {inscripcion.decision ? <>         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button></>:<><p style={{ color: 'crimson' }} >COMPLETAR TODOS LOS DATOS</p></>  }


          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
