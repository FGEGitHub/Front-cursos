import Box from '@mui/material/Box'; 
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, FormControlLabel, FormControl, Radio, RadioGroup, Typography, InputLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import servicioDtc from '../../../../services/dtc';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useState, Fragment } from "react";
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;



const horariosDisponibles = [
"08:20", "09:00",  "10:20", "11:00", "11:40", "14:00", "14:40", "15:20", "16:00", "16:40", "17:20"
];

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({ fecha: props.fecha, horario: "" });
  const [usuario, setUsuario] = useState();
  const [profesionales, setProfesionales] = useState(false);
  const [idPsicoSeleccionado, setIdPsicoSeleccionado] = useState(null); // Estado para el profesional seleccionado

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Si el usuario selecciona un profesional, lo guardamos
    if (e.target.name === "profesional") {
      setIdPsicoSeleccionado(e.target.value);
    }
  };

  const traerprof = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const user = JSON.parse(loggedUserJSON);
    setUsuario(user);
    if (user.nivel === 40) {
      const nov = await servicioDtc.traerprofesionales();
      setProfesionales(nov[0]);
    } else if (user.nivel === 20 || user.nivel === 23) {
      const nov = await servicioDtc.traerpsicologos();
      setProfesionales(nov[0]);
    }
  };

  const handleClickOpen = () => {
    setForm({ fecha: props.fecha, horario: "" });
    setIdPsicoSeleccionado(null);
    setOpen(true);
    traerprof();
    console.log(props.turnosdeldia);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {
    try {
      event.preventDefault();
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      const user = JSON.parse(loggedUserJSON);
      setUsuario(user);
      const mergedJSON = { ...form, id_psic: user.id };

      if (user.nivel === 41 || user.nivel === 40) {
        const nov = await servicioDtc.agregarturnocadia(mergedJSON);
        alert(nov);
      } else {
        const nov = await servicioDtc.agregarturno(mergedJSON);
        alert(nov);
      }
    } catch (error) {
      console.error(error);
      props.traer(form.fecha);
    }
    props.traer();
    setOpen(false);
  };

  // Filtrar turnos del día según el profesional seleccionado
  const turnosDelProfesional = props.turnosdeldia.filter(turno => turno.id_psico == idPsicoSeleccionado);

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <Tooltip title="Nuevo turno">
        <Button variant="contained" onClick={handleClickOpen}> Nuevo </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3><b>NUEVO TURNO</b></h3>
        
          {usuario && (usuario.nivel === 40 || usuario.nivel === 20 || usuario.nivel === 23) && (
            <>
              <br />
              {profesionales ? (
                <>
                  <InputLabel>Profesional</InputLabel>
                  <FormControl>
                    <RadioGroup name="profesional" onChange={handleChange}>
                      {profesionales.map((row) => (
                        <FormControlLabel key={row.id} value={row.id} control={<Radio />} label={row.nombre} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </>
              ) : (
                <>Cargando...</>
              )}

<InputLabel>Horario</InputLabel>
          <Select
            name="horario"
            value={form.horario}
            onChange={handleChange}
            fullWidth
          >
            {horariosDisponibles.map((horario) => (
              <MenuItem key={horario} value={horario}>{horario}</MenuItem>
            ))}
          </Select>

            </>
          )}

          {/* Mostrar detalles si hay turnos para el profesional seleccionado */}
          {idPsicoSeleccionado && turnosDelProfesional.length > 0 && (
            <div>
              <Typography variant="h6">Turnos que tiene en el dia:</Typography>
              <ul>
                {turnosDelProfesional.map((turno, index) => (
                  <li key={index}>{turno.detalle}</li>
                ))}
              </ul>
            </div>
          )}

          <DialogActions>
            {form.horario ? (
              <Button variant="contained" color="primary" onClick={handleDeterminar}>Crear</Button>
            ) : (
              <>Completar los datos</>
            )}
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
