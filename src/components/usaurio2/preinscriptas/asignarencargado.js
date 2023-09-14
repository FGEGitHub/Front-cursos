import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioUsuarios from '../../../services/usuarios'
import ServicioInscripciones from '../../../services/inscripciones'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Logoesme from '../../../Assets/anuncio.webp';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [turnos, setTurnos] = useState()
  const [rta, setRta] = useState()
  const [promedio, setPromedio] = useState(0)
  const [activo, setActivo] = useState(false)


  const islogo = {
    width: "20%",
    height: "20%",
    margin: 0,
    padding: 0,
    display: "flex",

};

  const traer = async () => {
   
  
   
   const turnos = await servicioUsuarios.todoslosencargadosllamados()
   setTurnos(turnos[0])
   
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({


})
 
  

  const handleClickOpen = async () => {
    await traer()  
    setOpen(true);
    setInscripcion(({
  
      id_inscripcion:props.id_inscripcion,
  
    }))
   
  }

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
    setMostrarDialogo(false)
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}


  ////
  const handleDeterminar = async (event) => {

    try {

    const respuesta =  await ServicioInscripciones.asignarencargado(
        inscripcion

      )
      setRta(respuesta)
      setMostrarDialogo(true)
      props.getClients()

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)

  };/////
  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (
<>
     < Tooltip title="Ver inscripcion">
       <Button variant="outlined" onClick={handleClickOpen}>Asignar Llamado<AccessibilityIcon /></Button>
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

        {props.id_inscripcion}
 
             <h3>Seleccionar el encargado   </h3>
             
   
                 <br />
                 <label>Elegir Encargado</label>
                 
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Encargado
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'id_encargado',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  
                             <option value={'1'}> Elegir</option>
                             {turnos.map((row) => (
                                       
                              <option value={row.id}> {row.nombre}-{row.usuario}</option>

                    ))}

                            </NativeSelect>
                           
                 
  
                 <DialogActions>
                 {inscripcion.id_encargado  ? <>         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button></>:<><p style={{ color: 'crimson' }} >COMPLETAR TODOS LOS DATOS(Momentaneamente desactivado)</p></>  }


          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >
   </> :<>
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
