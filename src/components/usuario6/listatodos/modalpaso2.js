import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioturnos from '../../../services/turnos'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Logoesme from '../../../Assets/anuncio.webp';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Paper, CircularProgress, Typography,  } from '@mui/material';
import servicioTurnos from '../../../services/turnos';
import styled from 'styled-components';
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

const styles = {
  paperr: {
      cursor: 'pointer',
      background: '#ffffff',
      color: '#bdbdbd',
      border: '1px dashed #ccc',
      padding: 10,
      width: '100%',
      maxWidth: 600,
      margin: '20px auto', // Margen superior e inferior de 20px, centrado horizontalmente
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      alignItems: 'start',
      fontSize: '16px',
  },}
const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;
export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [rta, setRta] = useState()
  const [turnos, setTurnos] = useState()
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
});
  const [disponibilidad, setDisponibilidad] = useState(0)
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [activo, setActivo] = useState(false)
  const [cohortes, setCohorte] = useState();

  const islogo = {
    width: "20%",
    height: "20%",
    margin: 0,
    padding: 0,
    display: "flex",

  };

  useEffect(() => {

    getCursos();
   
}, []);

  const [inscripcion, setInscripcion] = useState({


  })

  const getCursos = async (e) => {
    
    const clientss = await servicioTurnos.traerturnosparainscri();

    setCohorte(clientss)
   




};
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
   
  
  }

  const handleChange2 = (e) => {

    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })

    if (e.target.name =="id_turno"){
      console.log('si')
      for (let i = 0; i < turnos.length; i++) {
       
       
        if (turnos[i].id == e.target.value ) {
            
          setDisponibilidad(turnos[i].disponibles)
        }
      }
    }
  }

  const handleNocontesta = async (event) => {



    const respuesta = await servicioturnos.nocontesta(
      inscripcion

    )
    console.log(respuesta)
setRta(respuesta)
    props.traer()
    setMostrarDialogo(true)
    setActivo(false)

  };/////
  
  const mensajeenviado = async (event) => {



    const respuesta = await servicioturnos.mensajeenviado(
      inscripcion

    )
    console.log(respuesta)
setRta(respuesta)
    props.traer()
    setMostrarDialogo(true)
    setActivo(false)

  };/////
  const handleCancelar = async (event) => {



    const respuesta = await servicioturnos.rechazarinscrip(
      inscripcion

    )
    console.log(respuesta)
setRta(respuesta)
    props.traer()
    setMostrarDialogo(true)
    setActivo(false)

  };/////
  const handleCambiarhorario = async (event) => {



    const respuesta = await servicioturnos.cambiarhorario(
      inscripcion

    )
    console.log(respuesta)
setRta(respuesta)
    props.traer()
    setMostrarDialogo(true)
    setActivo(false)

  };/////
  ////
  const handleCheckboxChange = (option) => (event) => {
    setOptions({ ...options, [option]: event.target.checked });
};
  const handleDeterminar = async (event) => {

    const enviar = { ...inscripcion,...options };

    const respuesta = await servicioturnos.asignarcursonuevo(
      {id:props.id, id_turno:inscripcion.id_turno}


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
        <Button variant='outlined' onClick={handleClickOpen} color='success'  > Gestionar <ContactPhoneIcon /></Button>
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



                <h3>Asignacion a curso a {props.nombre} {props.apellido} </h3>
                DNI:  {props.dni}<br />

                <h5><CheckCircleOutlineIcon />Ha seleccionado los cursos: </h5>
                <ol>
   Agregadoa  curso {props.descripcion }
</ol>
                        <FormControlLabel
                            control={<Checkbox checked={options.option2} onChange={handleCheckboxChange('option2')} />}
                            label="Quiere otro curso "
                        /><br />

                




                <br />
                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Seleccionar prioridad 1
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'id_turno',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                 {cohortes ? <>
                             <option value={'1'}> Elegir</option>
                          
                             {cohortes.map((row) => (
                                       
                                       <option value={row.id}> {row.descripcion} </option>
         
                             ))}
                                  </>:<>Cargando</>}
                            </NativeSelect>
                <br />
            




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
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button variant="contained" color="success" onClick={mensajeenviado} >Mensaje enviado</Button>
               
                <Button variant="contained" color="primary" onClick={handleDeterminar} >Confirmar</Button>

                  <Button variant="contained" color="error" onClick={handleCancelar} >Rechazar</Button>
                  <Button variant="contained" color="warning" onClick={handleNocontesta} >No contesta</Button>
            
                  <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
</ButtonGroup>
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
