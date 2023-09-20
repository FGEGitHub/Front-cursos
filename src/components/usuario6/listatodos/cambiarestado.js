import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioInscripciones from '../../../services/inscripciones'
import Logoesme from '../../../Assets/anuncio.webp';
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
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
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  let params = useParams()
  let id_curso = params.id

  const [rta, setRta] = useState()
  const [mesas, setMesas] = useState()
  const [activo, setActivo] = useState(false)





  const [inscripcion, setInscripcion] = useState({


})


  const handleClickOpen = async () => {
   
    setOpen(true);
    setInscripcion(({

  

      id:props.id,
   
     
  
  
    }))
    setActivo(true)
  }

  const handleClose = () => {
    setMostrarDialogo(false)
    setActivo(false)
    setOpen(false);
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}



  ////
  const handleDeterminar = async (event) => {

    try {

      const rta = await servicioInscripciones.modificarestadodeinscrip(
        inscripcion


      )
      setRta(rta)
      setMostrarDialogo(true)
      props.getClients()

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)
   
  };/////
  const [currency, setCurrency] = React.useState('EUR');

  const islogo = {
    width: "20%",
    height: "20%",
    margin: 0,
    padding: 0,
    display: "flex",

};

  return (

<>       < Tooltip title="Cambiar">
<IconButton>
      <ChangeCircleIcon onClick={handleClickOpen} /></IconButton>
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

      {activo ? <>
        <DialogContent>


       { props.id}
             <h3  style={{ color: 'crimson' }} >Modificar estado  </h3>
            
            
             <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Agregar encargado
                </InputLabel>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Cambiar estado
                 </InputLabel>

<NativeSelect
                     defaultValue={30}
                     onChange={handleChange}
                     inputProps={{
                         name: 'estado',
                         id: 'uncontrolled-native',

                     }}
                 
                 >  
                 <option value={'Inscripta'}> sin definir </option>
                 <option value={'Inscripta'}> Inscripta </option>
                 <option value={'Preasignada'}> Preasignada </option>
           
                
                 </NativeSelect>
               

                 <DialogActions>
                     <Button variant="contained" color="primary"   onClick={handleDeterminar} >Cambiar</Button>

          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
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
