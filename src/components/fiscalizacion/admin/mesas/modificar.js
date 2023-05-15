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
import TableRestaurantTwoToneIcon from '@mui/icons-material/TableRestaurantTwoTone';

export default function ClienteNuevo(props) {
  let params = useParams()
  const [activo, setActivo] = useState(false)
    const [escuelas, setEscuelas] = useState()
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})
  const handleChange = (e) =>{
    setForm({  ...form, [e.target.name]: e.target.value }) 
    console.log(form)
 }


 const traer = async () => {
  const turnos = await servicioFisca.traerescuelas()
  setEscuelas(turnos)
   setForm({id:props.id_mesa, numero:props.numero})
   setActivo(true)

  }


  const handleChangedondevota = (e, option) => {
    setForm({  ...form, 'id_escuela':  option.id})
   
  }

  
  const handleClickOpen = () => {
    setOpen(true);
     traer()
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

      await servicioFisca.modificardatosdemesa(form)
 
     
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
        Modificar
      <TableRestaurantTwoToneIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>Modificar mesas </DialogTitle>
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
        Definir cantidad de votantes
          </DialogContentText>
          <form  onSubmit={handleDeterminar}> 
      
         
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Escuela
                 </InputLabel>

                 <Autocomplete
                options={escuelas}
                getOptionLabel={(option) => option.nombre}
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
              />



                 <NativeSelect
                     defaultValue={30}
                     onChange={handleChange}
                     inputProps={{
                         name: 'id_escuela',
                         id: 'uncontrolled-native',

                     }}
                 
                 >  
                  <option value={'1'}> Elegir</option>
                  {escuelas ? <>
                    {escuelas.map((row) => (
                            
                            <option value={row.id}> {row.nombre}</option>
         
                  ))}</>:<></>}
           

                 </NativeSelect>
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Numero "
                    name="numero"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    defaultValue={props.numero}
                />
          <DialogActions>
          {form.numero && form.id_escuela  ? <><Button variant="contained" color="primary"  type="submit">Enviar</Button></> : <><h6  style={{color: "red"}} >Completar todos los campos</h6></> } 
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           </form>
         

        </DialogContent>
      
        </Paper>
        
      </Dialog>
      
    </div>
  );
}
