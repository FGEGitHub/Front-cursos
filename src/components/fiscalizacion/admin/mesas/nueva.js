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
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
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


 const traer = async () => {
   
   
   const turnos = await servicioFisca.traerescuelas()
   console.log(turnos)
   setTurnos(turnos)
   setActivo(true)
  

  }

  

  
  const handleClickOpen = () => {
    setOpen(true);
     traer()
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

      await servicioFisca.crearmesa(form)
 
     
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
       Nueva Mesa<TableRestaurantIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>Mesa Nueva </DialogTitle>
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
        Datos de la mesa
          </DialogContentText>
          <form  onSubmit={handleDeterminar}> 
      
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
                 
                    
                     {activo ? <>
                    {turnos.map((row) => (
                                       
                              <option value={row.id}> {row.nombre}</option>

                    ))}
                     </>: <>Cargando</>}
               
                    </NativeSelect>
                    <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Numero de mesa"
                                name="numero"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                               
                            />
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Numero de referencia
                            </InputLabel>
      
          <DialogActions>
          {form.id_escuela && form.numero ? <><Button variant="contained" color="primary"  type="submit">Crear</Button></> : <><h6  style={{color: "red"}} >Completar todos los campos</h6></> } 
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           </form>
         

        </DialogContent>
      
        </Paper>
        
      </Dialog>
      
    </div>
  );
}
