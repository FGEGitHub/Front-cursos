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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
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

  const [turnos, setTurnos] = useState()
  const [mesas, setMesas] = useState()
  const [activo, setActivo] = useState(false)





  const [inscripcion, setInscripcion] = useState({


})


  const handleClickOpen = async () => {
   
    setOpen(true);
    setInscripcion(({

  

      id:props.id,
      nombre:props.nombre,
      circuito:props.circuito,
     
  
  
    }))
    setActivo(true)
  }

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

    try {

      const rta = await servicioFide.modificarestadodeinscrip(
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
       < Tooltip title="Cambiar">
      <ChangeCircleIcon onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>


       { props.id}
             <h3  style={{ color: 'crimson' }} >Modificar estado  </h3>
            
            
             <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Agregar encargado
                </InputLabel>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                 Vegano
                 </InputLabel>

<NativeSelect
                     defaultValue={30}
                     onChange={handleChange}
                     inputProps={{
                         name: 'estado',
                         id: 'uncontrolled-native',

                     }}
                 
                 >  
                 <option value={''}> sin definir </option>
                 <option value={'Pendiente'}> Pendiente </option>
                 <option value={'Rechazado'}> Rechazado </option>
                 <option value={'Contactado'}> contactado(paso 2)</option>
            
                

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
