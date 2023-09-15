import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioCursos from '../../../services/Cursos'
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

  const traer = async (e) => {

    const mes = await servicioCursos.traerturnos(e)
    setTurnos(mes)
  }

  const [inscripcion, setInscripcion] = useState({


  })


  const handleClickOpen = async () => {

    setOpen(true);
    setInscripcion(({
      dni: props.dni,
      id_inscripcion: props.id_inscripcion,

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



    const respuesta = await servicioCursos.rechazarinscrip(
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



    const respuesta = await servicioCursos.asignarcurso(
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
        <Button variant='contained' onClick={handleClickOpen} color='success'  > Llamar <ContactPhoneIcon /></Button>
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
            {props.observaciones ? <><h4 style={{ color: 'crimson' }} >Observaciones: {props.observaciones}</h4></> : <>Sin observaciones</>}
            {activo ? <>
              <DialogContent>



                <h3>Asignacion a curso a {props.nombre} {props.apellido} </h3>
                DNI:  {props.dni}<br />

                <h5><CheckCircleOutlineIcon />Ha seleccionado como prioridad 1: <h3 style={{ color: 'green' }}>{props.nombrecurso1}</h3></h5>

                <h5><CheckCircleOutlineIcon />Ha seleccionado como prioridad 2: <h4 style={{ color: 'green' }}>{props.nombrecurso2}</h4></h5>





                <br />
                <label>Elegir  Curso</label>
                <br />
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Curso
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  onChange={handleChange}
                  inputProps={{
                    name: 'mesa',
                    id: 'uncontrolled-native',

                  }}

                >
                  <option value={0}>Elegir</option>
                  <option value={132}>Elaboración de mesa de dulces para eventos</option>
                  <option value={133}>Maquillaje y peinado para eventos</option>
                  <option value={134}>Diseño de lenceria femenina</option>
                  <option value={135}>Textiles y accesorios para el verano</option>
                  <option value={136}>Refacción integral para el hogar</option>






                </NativeSelect>


                {turnos ? <>

                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Turno
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    onChange={handleChange2}

                    inputProps={{
                      name: 'id_turno',
                      id: 'uncontrolled-native',

                    }}

                  >


                    <option value={'1'}> Elegir</option>

                    {turnos.map((row) => (

                      <option value={row.id}> {row.descripcion} - {row.disponibles} cupos disponibles</option>

                    ))}

                  </NativeSelect>

                </> : <></>}

                <p onClick={() => window.open('https://wa.me/+549' + props.telefono)}   > <b>Telefono: {props.telefono}</b> <br />Click aca apra enviar whatsap<WhatsAppIcon /> </p>
                <p onClick={() => window.open('https://wa.me/+549' + props.telefono2)}   > <b>Telefono 2: {props.telefono2}</b> <br />Click aca apra enviar whatsap<WhatsAppIcon /> </p> <br />

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

                  <Button variant="contained" color="error" onClick={handleCancelar} >Rechazar inscripcion</Button>
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
