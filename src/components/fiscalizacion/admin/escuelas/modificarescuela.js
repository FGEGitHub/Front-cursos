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
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
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

      const rta = await servicioFide.modificarescuela(
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
      <BorderColorTwoToneIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>


       { props.id}
             <h3  style={{ color: 'crimson' }} >Modificar la escuela {props.nombre} </h3>
            
            
             <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Modificar Nombre 
                </InputLabel>
                <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre"
                                name="nombre"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                defaultValue={props.nombre}
                              
                            />
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Modificar Circuito 
                </InputLabel>
                <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre"
                                name="circuito"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                defaultValue={props.circuito}
                              
                            />
               
               <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre Encargado"
                                name="dato1"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                        
                              
                            />
                               <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="telefono encargado"
                                name="dato2"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                               
                              
                            />
                
                           
                         

                         
               

                 <DialogActions>
                 {inscripcion.nombre  ? <>         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button></>:<><p style={{ color: 'crimson' }} >COMPLETAR TODOS LOS DATOS</p></>  }


          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
