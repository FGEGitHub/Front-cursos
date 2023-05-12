import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioPersonas from '../../../../services/personas'
import servicioFisca from '../../../../services/fiscalizacion'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  const [form, setForm] = useState()
  const [datos, setDatos] = useState()
  const [activo, setActivo] = useState(false)




  const traer = async () => {
  
  // const nov = await servicioPersonas.datosdepersona(props.id)
  
   setForm({
    id_asignacion:props.id,
   

})


   setActivo(true)

  } 



  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
}


  const handleClickOpen = () => {

    setOpen(true);
    traer()
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {

    try {
    event.preventDefault();
      
    const nov = await servicioFisca.confirmaciondellamado(form)

    } catch (error) {
        console.error(error);
        console.log('Error algo sucedio')


    }
    props.traer()
    

    setOpen(false);
};

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
       < Tooltip title="Atender">
      <PhoneForwardedSharpIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

        {activo ? <>
         
           <h3>
              <b> Contactar a {props.nombre}</b></h3>
             
               
   
   
                 <br />
                <b> <p>Detalle:{props.nombre}</p> </b>   
                 <label   >Telefono: {props.telefono}</label> <WhatsAppIcon  onClick={() => window.open('https://wa.me/'+props.telefono)}  /> <br/>
                 
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              Contestacion del llamado 
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'confirmacion',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'Rechazado'}>Elegir</option>
                             <option value={'Contactada esperando respuesta'}>Contactada esperando respuesta</option>
                                <option value={'Confirmado'}>Confirmado</option>
                                <option value={'Rechazado'}>Rechazado</option>

                            </NativeSelect>


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
   
                 <><Button variant="contained" color="primary" onClick={handleDeterminar}> Contestar </Button></>  
                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                </DialogActions>
        
                </>:<>Cargando...</>}
        </DialogContent>
      </Dialog>
    </Box >

   
  );
}