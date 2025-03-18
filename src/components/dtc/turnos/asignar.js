import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../services/dtc';
import Tooltip from '@material-ui/core/Tooltip';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import React, { useState } from "react";

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [form, setForm] = useState({});
  const [usarSegundaLista, setUsarSegundaLista] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [chicos, setChicos] = useState([]); 

  const handleSelection = (event, value) => {
    setSelectedValue(value ? { id_persona: value.id, kid: value.kid } : null);
  };

  const handleSelection2 = (event, value) => {
    setSelectedValue2(value ? { id_persona: value.id, kid: value.kid } : null);
  };

  const handleClickOpen = () => {
    setForm({ id: props.id });
    setSelectedValue(null);
    setSelectedValue2(null);
    setNuevoUsuario(false);
    setUsarSegundaLista(false);
    setChicos(props.chicos || []);
  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackendCall = async () => {
    let data = {};

    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const usuario = JSON.parse(loggedUserJSON);
    console.log(usuario)
    if (nuevoUsuario) {
      data = {
        id: form.id,
        nuevoUsuario: true,
        nombre,
        apellido,
        agendadopor:usuario.usuario,
        usuariodispositivo: "No"
      };
    } else {
      const selected = usarSegundaLista ? selectedValue2 : selectedValue;
      if (!selected) return;

      data = {
        ...selected,
        id: form.id,
        agendadopor:usuario.usuario,
        usuariodispositivo: usarSegundaLista ? "Si" : "No"
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
    <Box
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Nueva Clase">
        <Button variant="contained" onClick={handleClickOpen}> Agendar </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3>{props.id} <b> Agendar Turno</b></h3>

          {/* Checkbox para activar la segunda lista */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={usarSegundaLista} 
                onChange={(e) => {
                  setUsarSegundaLista(e.target.checked);
                  setNuevoUsuario(false);
                  setSelectedValue(null);
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
                  setSelectedValue(null);
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
              {/* Primer Autocomplete */}
              <Autocomplete
                options={chicos}
                value={selectedValue}
                onChange={handleSelection}
                getOptionLabel={(option) => option.kid == null ? option.nombre + " " + option.apellido : option.nombre + " " + option.apellido + "  Presente"}
                renderInput={(params) => (
                  <TextField {...params} label="Selecciona una opción" variant="outlined" />
                )}
                disabled={usarSegundaLista}
              />

              {/* Segundo Autocomplete */}
              <Autocomplete
                options={props.chicos2}
                value={selectedValue2}
                onChange={handleSelection2}
                getOptionLabel={(option) => option.kid == null ? option.nombre + " " + option.apellido : option.nombre + " " + option.apellido + "  Presente"}
                renderInput={(params) => (
                  <TextField {...params} label="Selecciona una opción" variant="outlined" />
                )}
                disabled={!usarSegundaLista}
              />
            </>
          )}

          <DialogActions>
            <Button variant="outlined" color="success" onClick={handleBackendCall}>Asignar turno</Button>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
