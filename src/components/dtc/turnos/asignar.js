import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';
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
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [form, setForm] = useState({});
  const [usarSegundaLista, setUsarSegundaLista] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [chicos, setChicos] = useState([]);

  const handleSelection = (event) => {
    const selected = props.chicos.find(option => option.id === event.target.value) || null;
    setSelectedValue(selected);
  };
  
  const handleSelection2 = (event, value) => {
    setSelectedValue2(value || null);
  };
  

  const handleClickOpen = () => {
    setForm({ id: props.id,observaciones:"Sin observaciones" });
    setSelectedValue("");
    setSelectedValue2(null);
    setNuevoUsuario(false);
    setUsarSegundaLista(false);
    setChicos(props.chicos || []);
    console.log(props.chicos);
    console.log(props.chicos2);
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
        usuariodispositivo: "No",
        observaciones:form.observaciones
      };
    } else {
      const selected = usarSegundaLista ? selectedValue2 : selectedValue;
      if (!selected) return;
  
      data = {
        id_persona: selected.id, // Enviar solo el ID de la persona
        id: form.id,
        agendadopor: usuario.usuario,
        usuariodispositivo: usarSegundaLista ? "Si" : "No",
        observaciones:form.observaciones
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
        <Button variant="contained" onClick={handleClickOpen}> Agendar </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3> <b> Agendar Turno</b></h3>

          {/* Checkbox para activar la segunda lista */}
          <FormControlLabel
            control={
              <Checkbox
                checked={usarSegundaLista}
                onChange={(e) => {
                  setUsarSegundaLista(e.target.checked);
                  setNuevoUsuario(false);
                  setSelectedValue("");
                  setSelectedValue2(null);
                }}
                disabled={nuevoUsuario}
              />
            }
            label="Es usuario del dispositivo"
          />

          {/* Checkbox para usuario nuevo */}
          <FormControlLabel
            control={
              <Checkbox
                checked={nuevoUsuario}
                onChange={(e) => {
                  setNuevoUsuario(e.target.checked);
                  setUsarSegundaLista(false);
                  setSelectedValue("");
                  setSelectedValue2(null);
                }}
              />
            }
            label="Usuario Nuevo"
          />

          {/* Formulario para usuario nuevo */}
          {nuevoUsuario ? (
            <>
              <TextField label="Nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
              <TextField label="Apellido" variant="outlined" value={apellido} onChange={(e) => setApellido(e.target.value)} fullWidth />
            </>
          ) : (
            <>
              {/* Select en lugar del primer Autocomplete */}
              <Select
  value={selectedValue?.id || ""}
  onChange={handleSelection}
  fullWidth
  displayEmpty
  variant="outlined"
  disabled={usarSegundaLista}
>
  <MenuItem value="" disabled>Selecciona una opción</MenuItem>
  {props.chicos.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.apellido} {option.nombre} {option.nombrepsic && "  -   se atiende normalmente con "+option.nombrepsic}
    </MenuItem>
  ))}
</Select>
              {/* Segundo Autocomplete */}
              <Autocomplete
  options={props.chicos2}
  value={selectedValue2}
  onChange={handleSelection2}
  getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
  isOptionEqualToValue={(option, value) => option.id === value?.id}
  renderInput={(params) => (
    <TextField {...params} label="Selecciona una opción" variant="outlined" />
  )}
  disabled={!usarSegundaLista}
/>
            </>
          )}
<TextField
  label="Observaciones"
  variant="outlined"
  value={form.apellido}
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
