import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../services/fiscalizacion'
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
import Autocomplete from '@mui/material/Autocomplete';
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
  const [escuelaporcubrir, setEscuelaporcubrir] = useState()
const [disponibilidad, setDisponibilidad] = useState('libre')
  const [mesas, setMesas] = useState()
  const [datos, setDatos] = useState()
  const [promedio, setPromedio] = useState(0)
  const [activo, setActivo] = useState(false)




  const traer = async () => {
    setUsuarioo()
  
   
   const turnos = await servicioFide.traerescuelas2()
   setTurnos(turnos[0])
   setEscuelaporcubrir(turnos[1])
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({


})
  const traermesas = async (e) => {

    setCargandomesas(false)
   
   const mes = await servicioFide.traermesas(e)
   console.log(mes)
   setMesas(mes)

   setCargandomesas(true)

  

  }
  const traerestadistica = async (e) => {


   
  const dat = await servicioFide.traerestadisticasdeescuelas({id1:props.id_escuela, id2:props.id_escuela2})
   setDatos(dat)
   setPromedio(dat.prom)
   console.log('dps')
  

  }

  const handleClickOpen = async () => {
    await traer()  
    setOpen(true);
    setInscripcion(({
      dni: props.dni,
      id_inscripcion:props.id_inscripcion,
  
    }))
    // traerestadistica()
  }

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };

  
  const handleChange = (e) => {
    console.log('handleChange')
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })

if (e.target.name =="mesa"){
  for (let i = 0; i < mesas.length; i++) {
   
    
    if (mesas[i].id == e.target.value ) {
        
      setDisponibilidad(mesas[i].disponibilidad)
    }
  }
}

   console.log(inscripcion) 
}

const handleChangeid_escuela = (e, option) => {
  

  traermesas( option.id )
  setInscripcion({ ...inscripcion, 'id_escuela': option.id  })



}
const handleChangedondevota = (e, option) => {
  

 
  setInscripcion({ ...inscripcion, 'id_donde_vota': option.id  })



}

  ////
  const handleDeterminar = async (event) => {

    try {

    const respuesta =  await servicioFide.asignarmesaafiscal(
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
       < Tooltip title="Contactar">
      <ContactPhoneIcon color='success' variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
      {props.observaciones ? <><h4 style={{ color: 'crimson' }} >Observaciones: {props.observaciones}</h4></>:<>Sin observaciones</>} 
      {activo ? <>
        <DialogContent>
        

 
             <h3>Asignacion a curso a {props.nombre} {props.apellido} </h3>
             DNI:  { props.dni}<br/>
             <h4>Fecha inscripcion: {props.fecha} </h4>
             <h4><HowToVoteIcon/>Ha seleccionado como prioridad 1  {props.nombrecurso1}</h4>
           
             <h4><HowToVoteIcon/>Ha seleccionado como prioridad 2  {props.nombrecurso2}</h4>


   
        
     

            <br/>

                 <br />
                 <label>Elegir  Curso</label>
                 <br />
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Mesa
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'mesa',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  

<option value={132}>Elaboración de mesa de dulces para eventos</option>
                                <option value={133}>Maquillaje y peinado para eventos</option>
                                <option value={134}>Diseño de lenceria femenina</option>
                                <option value={135}>Textiles y accesorios para el verano</option>
                                <option value={136}>Refacción integral para el hogar</option>
                          
                            
                                       
                                      
                          
                                
                            </NativeSelect>
              
                           
                 
                
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Mesa
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'mesa',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  

                            {cargandomesas ? <>
                             <option value={'1'}> Elegir</option>
                          
                             {mesas.map((row) => (
                                       
                                       <option value={row.id}> {row.numero} - {row.disponibilidad}</option>
         
                             ))}
                                  </>:<>Cargando</>}
                            </NativeSelect>

             
         
                            <p   onClick={() => window.open('https://wa.me/+549'+props.telefono)}   > <b>Telefono: {props.telefono}</b> <br/>Click aca apra enviar whatsap<WhatsAppIcon/> </p> 
            <p   onClick={() => window.open('https://wa.me/+549'+props.telefono2)}   > <b>Telefono 2: {props.telefono2}</b> <br/>Click aca apra enviar whatsap<WhatsAppIcon/> </p> <br/>
          

                 <DialogActions>
             <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button>


          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
