import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioTurnos from '../../../services/turnos'
import { useParams } from "react-router-dom"
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';





export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  const [form, setForm] = useState({
    id_turno:props.id_turno
  })
  const [datos, setDatos] = useState()

  const [activo, setActivo] = useState(false)

  let params = useParams()
  let id = params.id

  const traer = async () => {
  
     const not = await servicioTurnos.traerclase(id)
     setDatos(not[0])
     console.log(not)
     setForm({
        id:id,
        observacion:not[0][0]['observacion'],
        fecha:not[0][0]['fecha'],
        numero_clase:not[0][0]['numero_clase'],
     
     })
    
     setActivo(true)
    
    }



  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const handleClickOpen = () => {

    setOpen(true);
traer()

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {

    try {
      event.preventDefault();

      const nov = await servicioTurnos.modificarunaclase(form)
      alert(nov)
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')


    }


    setOpen(false);
  };

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

<Button variant='contained' onClick={handleClickOpen}> Modificar </Button>
<div className="body__Page">
            <div className="container__article">
    
               
                
            </div>
        </div>






     {/* <  Tooltip title="Nueva Clase">
        <Button variant="outlined" onClick={handleClickOpen}> Nueva Clase  </Button>

      </Tooltip> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

        
            <h3>
              <b> Modificar</b></h3>
          <label>**Los datos q no agregues no se modificaran</label>
          <br/>
              {datos ? <>
            <TextField

              onChange={handleChange}
              name="fecha"
              id="date"
              label="Fecha"
              type="date"
              defaultValue={datos.fecha}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />


            <TextField
               defaultValue={datos.observacion}
              margin="dense"
              id="name"
              label="Observaciones"
              name="observacion"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />

<TextField
              defaultValue={datos.numero_clase}
              margin="dense"
              id="name"
              type="number"
              label="Numero de clase"
              name="numero_clase"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />


</>:<></>}
            <DialogActions>


              <>
           <Button variant="contained" color="primary" onClick={handleDeterminar}> crear </Button>
             </>
              <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
            </DialogActions>


        </DialogContent>
      </Dialog>
    </Box >


  );
}