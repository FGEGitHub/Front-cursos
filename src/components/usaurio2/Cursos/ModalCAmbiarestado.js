import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioPersonas from '../../../services/personas'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
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
  
  

  })


  const handleClickOpen = () => {
   
    setOpen(true);
setInscripcion(  {id_cursado:props.id_cursado})
  };

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };





  ////
  const handleDeterminar = async (event) => {
    // event.preventDefault();


    try {

      await servicioPersonas.cambiarestadocursado(
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

    const handleChange = (e) => {
        console.log(inscripcion)
        setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
    }
  return (


    
    
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Cambiar estado">
       
      <PublishedWithChangesIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

   
        <DialogContent>

        <h2>Desinscribir alumna </h2>
  
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                             
                             </InputLabel>
                             <NativeSelect
                                 defaultValue={30}
                                 onChange={handleChange}
                                 inputProps={{
                                     name: 'estado',
                                     id: 'uncontrolled-native',
 
                                 }}
                             >  
                              <option value={'Pendiente'}>Asignar</option>
                  
                             
                        
                                        
                                         <option value='Inscripta'> 'Sacar del curso'</option>
                                     
                              <option value={'Pendiente'}>Asignar</option>
                            
 
                             </NativeSelect>
    
            

          
     <label>Seguro desea desinscribir?<br />
          
       

     </label>
   
               

   
   

                 <DialogActions>
         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Desinscribir</Button>
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
      
      </Dialog>
    </Box >

   
  );
}
