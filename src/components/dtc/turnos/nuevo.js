import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@mui/material';
import React, { useState } from "react";
import serviciodtc from '../../../services/dtc'
export default function ExpedienteForm(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    expediente: "",
    juzgado: "",
    causa: "",
    solicitud: "",
    oficio: "",
    fecha: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const respuesta = await serviciodtc.nuevooficio(form)
    
    
      alert("Realizado");
    } catch (error) {
      alert("Error al enviar, contacta al administrador");
      console.error("Error al enviar el formulario", error);
    }
    setOpen(false);
    setForm('')
    props.traer()
  };

  return (
    <Box>
      <Tooltip title="Nuevo Expediente">
        <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Nuevo Expediente
          </Typography>
          <TextField label="Expediente" name="expediente" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Juzgado" name="juzgado" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Causa" name="causa" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Solicitud" name="solicitud" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="A travez de" name="oficio" fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Fecha" name="fecha" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
 