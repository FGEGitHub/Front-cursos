import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  useState } from "react";
import servicioFisca from '../../../../services/fiscalizacion'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Paper } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function ClienteNuevo(props) {
  let params = useParams()
  const [activo, setActivo] = useState(false)
    const [turnos, setTurnos] = useState()
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})
  const [cargandomesas, setCargandomesas] = useState(false)
  const [noreg, setNoreg] = useState()
  const [ver1, setVer1] = useState(false)
  const [ver2, setVer2] = useState(false)
  const [ver3, setVer3] = useState(false)
  const handleChange = (e) =>{
    setForm({  ...form, [e.target.name]: e.target.value }) 
    traermesas(e.target.value)
 }


 const traer = async () => {
   

    const datos = await servicioFisca.cargarpresentes()
    console.log(datos)
    setTurnos(datos)
    setNoreg(datos[1])
   setActivo(true)
  

  }

  
  const traermesas = async (e) => {

    setCargandomesas(false)
   
  
    
  

   setCargandomesas(true)

  

  }
  
  const handleClickOpen = () => {
    setOpen(true);
     traer()
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

      await servicioFisca.crearmesa(form)
 
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }
     props.getClients()
   
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
   
  };
  const ver11 = () => {
    setVer1(!ver1);
   
  };

  const ver22 = () => {
    setVer2(!ver2);
   
  };

  const ver33 = () => {
    setVer3(!ver3);
   
  };

  return (
    <div>


      <Button variant="outlined" onClick={handleClickOpen}>
      Ver Presentes<TableRestaurantIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>Resumen final </DialogTitle>
       
        <DialogContent>
          <DialogContentText>
        Datos de la mesa
          </DialogContentText>
    
      
           
          { turnos ? <>
                 Cantidad de presentes: {turnos[0].length} <Button onClick={ver11}>Ver/ocultar <RemoveRedEyeIcon  variant="outlined" color="success" style={{ marginLeft: "auto" }} /></Button> <br/>
                 Cantidad de ausentes: {turnos[1].length} <Button onClick={ver22}>Ver/ocultar<RemoveRedEyeIcon  variant="outlined" color="success" style={{ marginLeft: "auto" }} /></Button><br/>
                 Cantidad de sin marcar: {turnos[2].length} <Button onClick={ver33}>Ver/ocultar <RemoveRedEyeIcon  variant="outlined" color="success" style={{ marginLeft: "auto" }} /> </Button><br/>
                   
                   
                   {ver1? <>
              
                    {turnos[0].map((ob)=><>{ob.dni}  -  {ob.nombre}<br/></>
            )}
                   </>:<></>}
                   
                   
                   {ver2? <>
                    {turnos[1].map((ob)=>
              <>{ob.dni} -  {ob.nombre}<br/></>
            )}
                   </>:<></>}
                   
                   {ver3? <>
                    {turnos[2].map((ob)=>
             <>{ob.dni} -  {ob.nombre}<br/></>
            )}
                   </>:<></>}
                   
                     </>: <>Cargando</>}
       
                 
               
                     
               
                    
      
          <DialogActions>
          {form.id_escuela && form.numero ? <><Button variant="contained" color="primary"  type="submit">Crear</Button></> : <><h6  style={{color: "red"}} >Completar todos los campos</h6></> } 
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
          
         

        </DialogContent>
      
        
        
      </Dialog>
      
    </div>
  );
}
