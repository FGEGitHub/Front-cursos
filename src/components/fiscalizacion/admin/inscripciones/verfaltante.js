import Box from '@mui/material/Box';
import logo from "../../../../Assets/flork.png";
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

  
   
   const dat = await servicioFide.verfaltantesescuelas()
   setDatos(dat)
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({


})

const islogo = {
  width: "130px",                  
  };

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


    
    <div >
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Ver inscripcion">
      <Button variant="contained" onClick={handleClickOpen}>Ver escuelas faltantes<LeaderboardIcon/></Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        {datos ? <>
      {datos.length>0 ? <></>:<><h2>Escuelas Completas</h2></>}</>:<></>}
      {activo ? <>
        <DialogContent>
        {datos.length>0 ? <>
        
        {datos.map((row) => (
                            <>
                            <p>{row.numero}</p> <p>{row.nombre_escuela}</p> <br/>
         </>
                  ))}
</>:<><img style={islogo} src={logo} alt="logo" />  </>}


</DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   </div>
  );
}
