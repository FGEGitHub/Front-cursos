import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  useState } from "react";
import servicioFisca from '../../../../services/fiscalizacion'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import servicioFide from '../../../../services/fiscalizacion'
import LooksOneIcon from '@mui/icons-material/LooksOne';





export default function ClienteNuevo(props) {
  let params = useParams()
  let id = params.id
  const [activo, setActivo] = useState(false)
    const [escuelas, setEscuelas] = useState()
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})
  const [dato, setDato] = useState({})
  const [escuela, setEscuela] = useState({})
  const [prom, setProm] = useState({})
  const [inscripcion, setInscripcion] = useState({})
  const [turnos, setTurnos] = useState()


  const traerdondevota = async (e) => {

    console.log(e.id)
    const dat = await servicioFide.traerestadisticasdeescuelas({ id1: e.id})
    setDato({ ...dato, ['id_donde_vota']: dat })
    
    setEscuela({ ...escuela, 'id_donde_vota': dat.cantidad_escuela1 })

    setProm({ 'promedio': dat.prom })

  }
  const handleChangedondevota = (e, option) => {
  
    setInscripcion({ ...inscripcion, 'id_donde_vota': option.id })
    traerdondevota(option)
    
  }

 const traer = async () => {
  const turnos = await servicioFisca.traerescuelas()
  setInscripcion({ ...inscripcion, 'id': props.id })
  setEscuelas(turnos)

   setActivo(true)

  }
  
  
  const handleClickOpen = () => {
    setOpen(true);
     traer()
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

    const rta = await servicioFisca.modificardondevota(inscripcion)

     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }
     props.traer()
   
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>


      <Button variant="outlined" onClick={handleClickOpen}>
        Modificar donde vota
      <BorderColorIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>Modificar donde vota </DialogTitle>
        <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <DialogContent>
          <DialogContentText>
          <label>Escuela prioridad 2</label>

<InputLabel variant="standard" htmlFor="uncontrolled-native">
  Escuela 
</InputLabel>
<Autocomplete
  options={escuelas}
  getOptionLabel={(option2) => option2.nombre}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Elegir en que escuela vota"
     name="id_donde_vota"
      variant="outlined"
     
    />
  )}
  autoHighlight
  autoSelect


  onChange ={handleChangedondevota}

  native // Habilita la selección nativa
/>   </DialogContentText>
          <DialogActions>
          <><Button variant="contained" color="primary" onClick={handleDeterminar} type="submit">Enviar</Button></>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
          
         

        </DialogContent>
      
        </Paper>
        
      </Dialog>
      
    </div>
  );
}
