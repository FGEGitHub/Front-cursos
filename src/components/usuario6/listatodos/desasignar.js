import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioCarnaval from '../../../services/carnavales'
import Tooltip from '@material-ui/core/Tooltip';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';

import { useParams } from "react-router-dom"
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
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
  const [turnos, setTurnos] = useState()
 
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



  const [inscripcion, setInscripcion] = useState({
  })


  const handleClickOpen = async () => {

    setOpen(true);
    setInscripcion(({
      dni: props.dni,
      id_inscripcion: props.id,

    }))
    setActivo(true)
    // traerestadistica()
  }

  const handleClose = () => {
    setMostrarDialogo(false)
    setActivo(false)
    setOpen(false);
  };


  const handleChange = (e) => {

    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
console.log(inscripcion)
    /* if (e.target.name =="mesa"){
      for (let i = 0; i < mesas.length; i++) {
       
        
        if (mesas[i].id == e.target.value ) {
            
          setDisponibilidad(mesas[i].disponibilidad)
        }
      }
    }
     */
 
  }

  ////
  const handleDeterminar = async (event) => {



    const respuesta = await servicioCarnaval.desasignar(
      inscripcion)
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
        <Button variant='outlined' onClick={handleClickOpen} color='error'  > Desasignar <ThumbDownIcon /></Button>
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
                  <Button variant="contained" color="primary" onClick={handleDeterminar} >Aceptar</Button>

                 

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
