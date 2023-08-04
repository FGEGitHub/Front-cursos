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
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
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

  
    console.log(props.id)
   const dat = await servicioFide.verobservaciones(props.id)
   console.log(dat)
   setDatos(dat)
   setInscripcion({id:props.id})
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

    const handleDeterminar = async (event) => {
      try {
  
       const rt = await servicioFide.enviarobservacionnueva(
          inscripcion
  
        )
      
        alert(rt)
      } catch (error) {
        console.error(error);
        console.log('Error algo sucedio')
  
      }
      setActivo(false)
      setOpen(false);
    };/////
  return (


    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Ver inscripcion">
      <Button variant="contained" onClick={handleClickOpen}>Observaciones</Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>
            {datos.length > 0 ? <>
        {datos.map((ob)=>
         <p>    {ob.detalle} <br/></p>
            )}
</>:<>No hay observaciones</>}


</DialogContent>
        </>: <>Cargando</>}
        <br/>
        <h>Agregar Observacion nueva:</h>
(no se borrara las anteriores)
        <TextField
        
        margin="dense"
        id="name"
        label="Detalle"
        name="detalle"
        onChange={handleChange}
        fullWidth
        variant="standard"
        fontFamily="Montserrat"
      />
            <Button variant="outlined"   onClick={handleDeterminar}>Agregar</Button>
      <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>
      </Dialog>


      


    </Box >

   </div>
  );
}
