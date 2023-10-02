import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
  const [profesores, setProfesores] = useState()
  const [porcent, setPorcent] = useState()
  const [categoria, setCategoria] = useState()
  const [activo, setActivo] = useState(false)






  const [inscripcion, setInscripcion] = useState({
    id:props.id
  

  })


  const handleClickOpen = () => {
    traer()
    setOpen(true);
  };

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}
  




const traer = async () => {

 const not = await servicioPersonas.traercoordiandores()

 setProfesores(not)

 setActivo(true)

}
  ////
  const handleDeterminar = async (event) => {
    // event.preventDefault();


    try {

      await servicioPersonas.asignarcoordinador(
        inscripcion


      )
      props.getClients()

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
       < Tooltip title="Cambiar coordinador">
       <Button variant="outlined" onClick={handleClickOpen} style={{minWidth: '150px'}}> Coordinador    </Button>
    
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

   
        <DialogContent>

        <h2>Seleccionar de la lista de Coordinadores </h2>
  
             <h3>Inscripcion a curso  </h3>
            

      
   
                 <br />
                 <label>Asignar Coordinador </label>
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                             
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'id_coordinador',
                                    id: 'uncontrolled-native',

                                }}
                            >  
                             <option value={'Pendiente'}>Asignar</option>
                            {activo ? <>
                            
                              {profesores.map((row) => (
                                       
                                        <option value={row.id}> {row.nombre}</option>

                              ))}
                            
                            </> : <>
                             <option value={'Pendiente'}>Asignar</option></>}
                           

                            </NativeSelect>
   
   
   

                 <DialogActions>
         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
      
      </Dialog>
    </Box >

   
  );
}
