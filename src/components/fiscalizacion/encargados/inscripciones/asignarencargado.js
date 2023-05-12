import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Rating from './rating'
import LooksOneIcon from '@mui/icons-material/LooksOne';
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
  const [usuarioo, setUsuarioo] = useState()
  const [cargandomesas, setCargandomesas] = useState(false)
  const [turnos, setTurnos] = useState()
  const [mesas, setMesas] = useState()
  const [datos, setDatos] = useState()
  const [promedio, setPromedio] = useState(0)
  const [activo, setActivo] = useState(false)




  const traer = async () => {
    setUsuarioo()
  
   
   const turnos = await servicioFide.traerencargados()
   setTurnos(turnos)
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
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}


  ////
  const handleDeterminar = async (event) => {

    try {

    const respuesta =  await servicioFide.asignarencargado(
        inscripcion


      )
      alert(respuesta)
      props.traer()

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)
    setOpen(false);
  };/////
  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (


    
    
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Ver inscripcion">
       <AccessibilityIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
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
                                       
                              <option value={row.id}> {row.nombre}</option>

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

   
  );
}
