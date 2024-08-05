import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  InputLabel,
  Typography
} from '@mui/material';
import servicioDtc from '../../../services/dtc';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [activo, setActivo] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    // Cargar usuarios al abrir el modal
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const novedades_aux = await servicioDtc.listachiques();
        setUsuarios(novedades_aux[0]);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  };

  const handleUserChange = (event, value) => {
    if (value) {
      setForm({ ...form, id_usuario: value.id });
    }
  };

  const handleDeterminar = async (event) => {
    try {
      event.preventDefault();
      const mergedJSON = {
        ...form,
   
       
        id_trabajador: props.id_trabajador
      };
      console.log(mergedJSON);
      
      const nov = await servicioDtc.nuevaintervencion(mergedJSON);
      alert(mergedJSON);
    } catch (error) {
      console.error('Error algo sucedió:', error);
    }

    props.traer();
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Nueva ">
        <Button variant="contained" color='success' onClick={handleClickOpen}>Nuevo</Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        <DialogContent>
          <h3><b>Nueva Intervención</b></h3>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Título"
            name="titulo"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            onChange={handleChange}
            name="fecha_carga"
            id="date"
            label="Fecha"
            type="date"
            defaultValue="2024-08-01"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Autocomplete
            options={usuarios}
            getOptionLabel={(option) => `${option.apellido} ${option.nombre}`}
            onChange={handleUserChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccionar Usuario"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />

          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>
                Detalle: {form.detalle ? <>Caracteres: {form.detalle.length} / 1999</> : <>Caracteres: 0 / 1999</>}
              </StyledParagraph>
            </Typography>
          </InputLabel>
          <TextField
            multiline
            rows={4}
            label=""
            variant="outlined"
            onChange={handleChange}
            name="detalle"
            fullWidth
          />

          <DialogActions>
            {form.detalle && form.titulo && form.fecha_carga ? (
              form.detalle.length < 1999 ? (
                <Button variant="contained" color="primary" onClick={handleDeterminar}>crear</Button>
              ) : (
                <Button variant="contained" color="primary" disabled>crear (muchos caracteres {form.detalle.length})</Button>
              )
            ) : (
              <Button variant="contained" color="primary" disabled>crear</Button>
            )}
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
