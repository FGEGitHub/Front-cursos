import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioTurnos from '../../../services/turnos'
import servicioPersonas from '../../../services/personas'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Featured from '../../estadisticas/featured/Featured'
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import Logoesme from '../../../Assets/anuncio.webp';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
  const [profesores, setProfesores] = useState()
 
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [activo, setActivo] = useState(false)
  const [rta, setRta] = useState()






  const [inscripcion, setInscripcion] = useState({
    id:props.id
  
  })


  const handleClickOpen = () => {

    setOpen(true);
  };

      //
  const handleClose = () => {
    setMostrarDialogo(false)
    setActivo(false)
    setOpen(false);
    window.location.reload();
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
  
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}
  



  ////
  const handleDeterminar = async (event) => {

   

    const rr = await servicioTurnos.ponerausentes(
        inscripcion


      )
      setRta(rr)
      setMostrarDialogo(true)
      props.getClients()
     
   
    
  };/////
  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */
    const islogo = {
      width: "20%",
      height: "20%",
      margin: 0,
      padding: 0,
      display: "flex",
  
  };

  return (
<>
 < Tooltip title="Modificaciones">
       <Button variant="contained" color='success' onClick={handleClickOpen} style={{minWidth: '150px'}}>  Boton magico que pone ausentes a los sin tomar    </Button>
    
      </Tooltip>
      {!mostrarDialogo ? <>
    
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <Dialog open={open} onClose={handleClose}>

   
        <DialogContent>
 
        <h4>Todas las alumnas que figuren "Sin tomar" pasaran a ser ausentes</h4>
        <p>Esto no modificara los presentes</p>
  
         
 
   
   

                 <DialogActions>
         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Comprendo</Button>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
      
      </Dialog>
    </Box >
    </>:<>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
  <div>
    {"Escuela de mujeres emprendedoras"}
  </div>
  <img style={islogo} src={Logoesme} alt="logo" />
</DialogTitle>
        <DialogContent>
      
          <DialogContentText id="alert-dialog-description">
{rta ? <>{rta}</>:<></> }         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Entendido</Button>
          
           
          
        </DialogActions>
      </Dialog>
      </>}
   </>
  );
}
