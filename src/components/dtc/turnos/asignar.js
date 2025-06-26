import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import React, { useState } from "react";
import servicioDtc from '../../../services/dtc';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [form, setForm] = useState({});
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const handleClickOpen = () => {
    setForm({ id: props.id, observaciones: "Sin observaciones" });
    setSelectedValue(null);
    setNuevoUsuario(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackendCall = async () => {
    let data = {};
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const usuario = JSON.parse(loggedUserJSON);

    if (nuevoUsuario) {
      data = {
        id: form.id,
        nuevoUsuario: true,
        nombre,
        apellido,
        agendadopor: usuario.usuario,
        usuariodispositivo: "No", // por defecto para nuevos
        observaciones: form.observaciones
      };
    } else {
      if (!selectedValue) return;

      data = {
        id_persona: selectedValue.id,
        id: form.id,
        agendadopor: usuario.usuario,
        usuariodispositivo: selectedValue.usuariodispositivo, // viene desde el backend
        observaciones: form.observaciones
      };
    }

    console.log("Datos enviados al backend:", data);

    if (usuario.nivel === 40 || usuario.nivel === 41) {
      const response = await servicioDtc.agendarturnocadia(data);
      alert(response);
    } else {
      const response = await servicioDtc.agendarturno(data);
      alert(response);
    }

    props.traer();
    handleClose();
  };

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <Tooltip title="Nueva Clase">
        <Button variant="outlined" sx={{ color: "green", borderColor: "green", fontSize: "0.65rem" }} onClick={handleClickOpen}> Agendar </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3><b>Agendar Turno</b></h3>

          {/* Checkbox para usuario nuevo */}
          <FormControlLabel
            control={
              <Checkbox
                checked={nuevoUsuario}
                onChange={(e) => {
                  setNuevoUsuario(e.target.checked);
                  setSelectedValue(null);
                }}
              />
            }
            label="Usuario Nuevo"
          />

          {nuevoUsuario ? (
            <>
              <TextField label="Nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
              <TextField label="Apellido" variant="outlined" value={apellido} onChange={(e) => setApellido(e.target.value)} fullWidth />
            </>
          ) : (
            <Autocomplete
              options={props.chicos} // unificado: psicólogas + chicos
              value={selectedValue}
              onChange={(event, newValue) => setSelectedValue(newValue)}
              getOptionLabel={(option) =>
                `${option.apellido} ${option.nombre} ${option.nombrepsic ? `- se atiende normalmente con ${option.nombrepsic}` : ''}`
              }
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              renderInput={(params) => (
                <TextField {...params} label="Selecciona una opción" variant="outlined" />
              )}
            />
          )}

          <TextField
            label="Observaciones"
            variant="outlined"
            value={form.observaciones}
            onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
            fullWidth
          />

          <DialogActions>
            <Button variant="outlined" color="success" onClick={handleBackendCall}>Asignar turno</Button>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
