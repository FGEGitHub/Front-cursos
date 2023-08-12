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

export default function ClienteNuevo(props) {
  let params = useParams()
  let id = params.id
  const [activo, setActivo] = useState(false)
    const [escuelas, setEscuelas] = useState()
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})


  const handleChange = (e) =>{
    console.log(e.target.value)
    setForm({  ...form, [e.target.name]: e.target.value }) 
    console.log(form)
 }


 const traer = async () => {
  const turnos = await servicioFisca.traerescuelas()
  setEscuelas(turnos)
   setForm({id:id, 
    nombre:props.nombre,
    apellido:props.apellido,
    dni:props.dni,
    movilidad:props.movilidad,
    celiaco:props.celiaco,
    vegano:props.vegano,
    telefono:props.telefono,
    telefono2:props.telefono2,
    domicilio:props.direccion

})
   setActivo(true)

  }
  
  
  const handleClickOpen = () => {
    setOpen(true);
     traer()
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

    const rta = await servicioFisca.modificarpersonafisca(form)

     
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
      <BorderColorIcon/>
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

             {/*     <Autocomplete
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
 */}


               
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                 
                    label="Nombre "
                    name="nombre"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    defaultValue={props.nombre}
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                 
                    label="Apellido "
                    name="apelldo"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    defaultValue={props.apellido}
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                 
                    label="DNI "
                    name="dni"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    defaultValue={props.dni}
                />
                   <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                 
                    label="Telefono"
                    name="telefono"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    defaultValue={props.telefono}
                />
                   <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                 
                    label="Telefono 2 "
                    name="telefono2"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    defaultValue={props.telefono2}
                />


<TextField
                    autoFocus
                    margin="dense"
                    id="name"
                 
                    label="Domicilio "
                    name="domicilio"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    defaultValue={props.domicilio}
                />
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                 Vegano
                 </InputLabel>

<NativeSelect
                     defaultValue={30}
                     onChange={handleChange}
                     inputProps={{
                         name: 'vegano',
                         id: 'uncontrolled-native',

                     }}
                 
                 >  
                  <option value={'No'}> Elegir</option>
                  <option value={'Si'}> Si</option>
                  <option value={'No'}> No</option>
                

                 </NativeSelect>

                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                 celiaco
                 </InputLabel>
                 <NativeSelect
                     defaultValue={30}
                     onChange={handleChange}
                     inputProps={{
                         name: 'celiaco',
                         id: 'uncontrolled-native',

                     }}
                 
                 >  
                  <option value={'No'}> Elegir</option>
                  <option value={'Si'}> Si</option>
                  <option value={'No'}> No</option>
                

                 </NativeSelect>

                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                 movilidad
                 </InputLabel>
                 <NativeSelect
                     defaultValue={30}
                     onChange={handleChange}
                     inputProps={{
                         name: 'movilidad',
                         id: 'uncontrolled-native',

                     }}
                 
                 >  
                  <option value={'No'}> Elegir</option>
                  <option value={'Si'}> Si</option>
                  <option value={'No'}> No</option>
                

                 </NativeSelect>
          <DialogActions>
          <><Button variant="contained" color="primary"  type="submit">Enviar</Button></>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           </form>
         

        </DialogContent>
      
        </Paper>
        
      </Dialog>
      
    </div>
  );
}
