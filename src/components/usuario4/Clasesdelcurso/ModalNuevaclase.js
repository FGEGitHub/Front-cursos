import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioPersonas from '../../../services/personas'
import servicioTurnos from '../../../services/turnos'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';


export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  const [form, setForm] = useState({
    id_turno:props.id_turno
  })
  const [datos, setDatos] = useState()
  const [activo, setActivo] = useState(false)







  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const handleClickOpen = () => {

    setOpen(true);


  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {

    try {
      event.preventDefault();

      const nov = await servicioTurnos.nuevaclase(form)

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')


    }

    props.traer()

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
      < Tooltip title="Nueva Clase">
        <Button variant="outlined" onClick={handleClickOpen}> Nueva Clase  </Button>

      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

        
            <h3>
              <b> NUEVA CLASE</b></h3>


            <TextField

              onChange={handleChange}
              name="fecha"
              id="date"
              label="Fecha"
              type="date"
              defaultValue="2023-03-01"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />


            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Observaciones"
              name="observaciones"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />

<TextField
              autoFocus
              margin="dense"
              id="name"
              type="number"
              label="Numero de clase"
              name="numero_clase"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <DialogActions>


              <>
              {form.fecha &&form.numero_clase &&form.observaciones ? <> <Button variant="contained" color="primary" onClick={handleDeterminar}> crear </Button></> :  <>Completar los datos</>}
             </>
              <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
            </DialogActions>


        </DialogContent>
      </Dialog>
    </Box >


  );
}