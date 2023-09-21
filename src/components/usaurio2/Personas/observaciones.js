import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioPersonas from '../../../services/personas'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
  let params = useParams()
  let id_curso = params.id
  const [rta, setRta] = useState()
  const [observaciones, setObservaciones] = useState()
 
  const [disponibilidad, setDisponibilidad] = useState('libre')
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [activo, setActivo] = useState(false)


  const islogo = {
    width: "20%",
    height: "20%",
    margin: 0,
    padding: 0,
    display: "flex",

  };

  const traer = async (e) => {

    const mes = await servicioPersonas.traerobservaciones(props.id)
    setObservaciones(mes)
  }

  const [inscripcion, setInscripcion] = useState({


  })


  const handleClickOpen = async () => {

    setOpen(true);
    setInscripcion(({
      id: props.id,
   

    }))
    traer()
    setActivo(true)
  
  }

  const handleClose = () => {
    setMostrarDialogo(false)
    setActivo(false)
    setOpen(false);
  };


  const handleChange = (e) => {

    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
    traer(e.target.value)
    /* if (e.target.name =="mesa"){
      for (let i = 0; i < mesas.length; i++) {
       
        
        if (mesas[i].id == e.target.value ) {
            
          setDisponibilidad(mesas[i].disponibilidad)
        }
      }
    }
     */
    console.log(inscripcion)
  }

  const handleChange2 = (e) => {

    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })

    /* if (e.target.name =="mesa"){
    for (let i = 0; i < mesas.length; i++) {
     
      
      if (mesas[i].id == e.target.value ) {
          
        setDisponibilidad(mesas[i].disponibilidad)
      }
    }
    }
    */
    console.log(inscripcion)
  }


  
  const handleCancelar = async (event) => {



    const respuesta = await servicioPersonas.rechazarinscrip(
      inscripcion

    )
    console.log(respuesta)
setRta(respuesta)
    props.traer()
    setMostrarDialogo(true)
    setActivo(false)

  };/////
  ////
  const handleDeterminar = async (event) => {



    const respuesta = await servicioPersonas.agregarobservacion(
      inscripcion


    )
setRta(respuesta)
    props.traer()
    setMostrarDialogo(true)
    setActivo(false)

  };/////
  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (
    <>
      < Tooltip title="Contactar">
        <Button variant='contained' onClick={handleClickOpen} color='success'  > observaciones </Button>
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
                <DialogTitle>
                    Observaciones
                    </DialogTitle> 
              <DialogContent>
               
              { observaciones ? <>
              {observaciones.map((ob)=>
              <>
                <h5>Fecha: {ob.fecha}</h5>
                 <p> {ob.detalle}</p>
              </>
           



            )}
</>:<></>}


<InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Agregar una observacion(no Borra la/s Actuales)
                </InputLabel>
<TextField

margin="dense"
id="name"
label="Observaciones "
name="observaciones"
onChange={handleChange}
fullWidth
variant="outlined"

/>
                <DialogActions>
                  <Button variant="contained" color="primary" onClick={handleDeterminar} >Inscribir</Button>

          
                  <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                </DialogActions>


              </DialogContent>
            </> : <>Cargando</>}
          </Dialog>
        </Box >
      </> : <>
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
              {rta ? <>{rta}</> : <></>}
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
