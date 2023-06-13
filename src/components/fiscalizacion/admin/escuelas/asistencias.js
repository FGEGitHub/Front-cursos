import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import Face6Icon from '@mui/icons-material/Face6';
import Tooltip from '@material-ui/core/Tooltip';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import React, { useEffect, useState, Fragment } from "react";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useParams } from "react-router-dom"


export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [usuarioo, setUsuarioo] = useState()

  const [datos, setDatos] = useState()

  const [activo, setActivo] = useState(false)




  const traer = async () => {

  
   
   const dat = await servicioFide.traerasistenciasporescuela()
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
       < Tooltip title="Ver inscripcion">
      <Button variant="contained" onClick={handleClickOpen}>Ver asistencias<Face6Icon/></Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>
          {datos.map( (row)=>(<><p>{row.nombre}</p> <p>Cantidad de mesas:{row.cantidad_mesas} ( {row.cantidad_supl} Suplentes) </p>  <p>presentes:{row.presentes}</p><p>ausentes:{row.ausentes}</p><p>Sin determinar:{row.sd}</p><br/> </>)  )}
   



</DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   </div>
  );
}
