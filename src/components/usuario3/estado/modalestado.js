import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioPersonas from '../../../services/personas'
import servicioEncargados from '../../../services/encargados'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';


export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  const [form, setForm] = useState()
  const [datos, setDatos] = useState()
  const [activo, setActivo] = useState(false)



  
  


  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
}


  const handleClickOpen = () => {

    setOpen(true);
    setForm({
   
        id_cursado:props.id_cursado,
        observaciones:'Cursando'
    
    })

    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {

    try {
    event.preventDefault();
      
   await servicioEncargados.cambiarestadocurado(form)

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
   
      <Button variant="contained" onClick={handleClickOpen} >CAMBIAR</Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

           <h3>
              <b> Cambiar estado del cursado</b></h3>
             
               
   
   
             
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              Contestacion del llamado 
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'observaciones',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'Sin determinar'}>Sin determinar</option>
                             <option value={'Finalizado'}>Finalizado</option>
                                <option value={'Libre'}>Libre</option>
                           

                            </NativeSelect>


   
                 <DialogActions>
   
                 <><Button variant="contained" color="primary" onClick={handleDeterminar}> Contestar </Button></>  
                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                </DialogActions>
        
            
        </DialogContent>
      </Dialog>
    </Box >

   
  );
}