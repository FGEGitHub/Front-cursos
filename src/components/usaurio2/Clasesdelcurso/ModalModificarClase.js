import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioTurnos from '../../../services/turnos'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from '@mui/icons-material/Edit';
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
  const [profesores, setProfesores] = useState()
  const [porcent, setPorcent] = useState()
  const [categoria, setCategoria] = useState()
  const [activo, setActivo] = useState(false)






  const [inscripcion, setInscripcion] = useState()


  const handleClickOpen = () => {

    setOpen(true);
    setCategoria({
      id:props.id
    
    })
    setInscripcion({
      id:props.id,
      numero_clase:props.numero_clase,
      observacion:props.observacion,
      fecha:props.fecha
    })
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

      await servicioTurnos.modificarclase(
        inscripcion


      )
      props.traer()

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
       < Tooltip title="Modificar nombre">
       <EditIcon onClick={handleClickOpen}/> 
     
    
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

   
        <DialogContent>

        <h2>Modificar nombre {props.descripcion}</h2>
  
       id: {props.id}<br/>
       Actualmente Fecha : {props.fecha}<br/>
       Actualmmente Detalle : {props.observacion}<br/>
       Actualmmente Numero de Clase :  { props.numero_clase}
      
   
                 <br />
                 <label>Nombre del curso {props.id}</label>
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                             
                            </InputLabel>
     
                          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Numero de clase"
              name="numero_clase"
              defaultValue={props.numero_clase}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />

<TextField
              autoFocus
              margin="dense"
              id="name"
              label="Observacion"
              name="observacion"
              defaultValue={props.observacion}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
      <TextField

onChange={handleChange}
name="fecha"
id="date"
label="Fecha"
type="date"
defaultValue={props.fecha}
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>

   
   

                 <DialogActions>
         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Modificar</Button>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
      
      </Dialog>
    </Box >

   
  );
}
