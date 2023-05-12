import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import React, { useEffect, useState, Fragment } from "react";
import HelpIcon from '@mui/icons-material/Help';
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [usuarioo, setUsuarioo] = useState()

  const [datos, setDatos] = useState()

  const [activo, setActivo] = useState(false)




  const traer = async () => {

  
   
   const dat = await servicioFide.estadisticas1()
   setDatos(dat)
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({


})



  const handleClickOpen = async () => {
    await traer()
    setOpen(true);
   
  }

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}




  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (


    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Ver info ayuda">
      <Button variant="outlined" onClick={handleClickOpen}>Ayuda <HelpIcon/></Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>
          <h3>Referencia de cada paso </h3>
        <label>
        <b>Paso 1: Inscripciones cargadas por link o por aliados.</b> Se Requiere llamar y completar datos(Donde vota, elegir que escuela desea fiscalizar, segunda opcion alternatva de escuela, si es vegano, si tiene mobilidad, etc)<br/>
    
      
 
        <b>Paso 2: Fiscales  contactados.</b> Asignar la escuela y la mesa en la que va a fiscalizar, al seleccionar al iscripto/a se da una informacion y valoracion de las escuelas que eligio <br/>


        <b> Paso 3: Fiscales ya confirmados, asignados a una mesa.</b> El administrador debe confirmar cuando realicen las capacitaciones<br/>
        <b> Paso 4: Fiscales que ya pasaron por la capacitacion</b> <br/>
      </label>



</DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   </div>
  );
}
