import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
  const [form, setForm] = useState({ id_cursado: props.id_cursado })

  //const [activo, setActivo] = useState(false)




/*   const traer = async () => {
    
   const nov = await servicioNovedades.leer(props.id)

  await setNovedad(nov)

   setActivo(true)

  } */



  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
}


  const handleClickOpen = () => {
   
    setOpen(true);

    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {

    try {
    event.preventDefault();
      
    const respuesta = await servicioEncargados.confirmarllamado(form)

    } catch (error) {
        console.error(error);
        console.log('Error algo sucedio')


    }


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

        
         
           <h3>
              <b>  Asunto: {props.nombre_curso} </b></h3>
             
               
   
   
                 <br />
                <b> <p>Detalle:{props.apellido} {props.nombre}</p> </b>   
                 <label>Telefono: {props.tel}</label><br/>
                 <label>Telefono: {props.tel2}</label>
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                              Contestacion del llamado 
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'estado',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'C.U.I.L.'}>Elegir</option>
                                <option value={'aceptado'}>Confirmado</option>
                                <option value={'rechazado'}>Rechazado</option>

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