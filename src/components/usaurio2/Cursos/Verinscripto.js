import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioPersonas from '../../../services/personas'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Featured from '../../estadisticas/featured/Featured'
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

  const [usuarioo, setUsuarioo] = useState()
  const [porcent, setPorcent] = useState()
  const [activo, setActivo] = useState(false)




  const traer = async () => {

   const not = await servicioPersonas.datosusuarioporid(props.id_usuario)
   setUsuarioo(not[0][0])
console.log(not[0])
setPorcent(not[1])
   setActivo(true)

  }
  const preba = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'))
  const usuario = preba.usuario

  const [inscripcion, setInscripcion] = useState({

    usuario: usuario,
    id:props.id


  })


  const handleClickOpen = () => {
    traer()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  
  ////
  const handleDeterminar = async (event) => {
    // event.preventDefault();


    try {

      await servicioPersonas.inscribir(
        inscripcion


      )


    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }

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
       < Tooltip title="Ver inscripcion">
      <BorderColorIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>

        
        
             <h3>Inscripcion a curso </h3>
           
             <Featured
            porcentaje={porcent}
            titulo="Requisitos"

          />
     <label>Hijos:{usuarioo.hijos} <br />
            Años:{usuarioo.anios} <br />
            trabajo:{usuarioo.trabajo} <br />
     </label>
   
                 <br />
                 <label>inscripcion a curso?</label>
                
   
   
   

                 <DialogActions>
         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
