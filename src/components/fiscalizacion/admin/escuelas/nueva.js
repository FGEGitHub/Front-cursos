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
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { Paper } from '@mui/material';


export default function ClienteNuevo(props) {
  let params = useParams()
  const [activo, setActivo] = useState(false)
    const [turnos, setTurnos] = useState()
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})
  const handleChange = (e) =>{
    setForm({  ...form, [e.target.name]: e.target.value }) 
 }



  
  const handleClickOpen = () => {
    setOpen(true);
   
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

     const rta= await servicioFisca.crearescuela(form)
      alert(rta)
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }
     props.getClients()
   
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>


      <Button variant="outlined" onClick={handleClickOpen}>
       Nueva Escuela<DomainAddIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>Nueva escuela</DialogTitle>
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
        Datos de la escuela
          </DialogContentText>
          <form  onSubmit={handleDeterminar}> 
      
         
         
          <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre"
                                name="nombre"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                              
                            />
                    <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Circuito"
                                name="circuito"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                              
                            />
                             <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Observaciones"
                                name="observaciones"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                             
                            />
      
          <DialogActions>
          {form.nombre && form.circuito ? <><Button variant="contained" color="primary"  type="submit">Crear</Button></> : <><h6  style={{color: "red"}} >Completar todos los campos</h6></> } 
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           </form>
         

        </DialogContent>
      
        </Paper>
        
      </Dialog>
      
    </div>
  );
}
