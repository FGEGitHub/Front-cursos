import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';
import DialogActions from '@mui/material/DialogActions';
import servicioDtc from '../../../../services/dtc';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

const etapasPorProyecto = {
  'sector logística del Dispositivo': [
    'Acondicionamiento del Espacio',
    'Mantenimientos',
    'Gimnasio',
    'Limpieza'
  ],
  'EL DTC HACIA EL FUTURO 2024': [
    'Ninguna',
    'Refuerzo de Higiene personal para los usuarios',
    'Fin de año',
    'Dia de la primavera y del estudiante',
    'Dia de las infancias',
    'Dia del amigo',
    'CUMPLEAÑOS',
    'Colación Saludable',
    'Desayuno/Merienda'
  ],
  'Atenciones Terapéuticas y Asesoramiento': [
    'Asesoramiento',
    'Intervenciones'
  ],
  'INTERVENCIONES EN INSTITUCIONES EDUCATIVAS': [
    'Intervenciones en Instituciones Educativas'
  ],
  'proyecto vital: adolescentes capacitados': [
    'Prevención del suicidio: personas capacitadas',
    'ESI: personas capacitadas',
    'Una construcción identitaria: adolescentes capacitados'
  ],
  'Territorio: Jornadas de Prevención 2024': [
    'Charlas Prevención de Consumos Problemáticos',
    'Jornada de Prevención de Consumos Problemáticos, Deporte y Recreación',
    'Jornadas en centros Educativos',
    'Cuadrangular Deportivo'
  ],
  'ESCUCHAR A QUIEN ESCUCHA': [
    'Escucha a quien escucha: encuentros realizados',
    'Ateneo clínicos: casos atendidos',
    'Jornada Institucional: cantidad de jornadas',
    'Asambleas internas: cantidad de asambleas'
  ],
  'FECHAS DE VISIBILIZACIÓN': [
    'Día internacional de personas con discapacidad',
    'Dia mundial de la Salud Mental: octubre',
    'Prevención del suicidio: 10 de septiembre',
    'Jornada de ESI: mes de agosto',
    'Dia mundial de la salud: 7 de Abril'
  ]
};

export default function SelectTextFields(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'proyecto') {
      setProyectoSeleccionado(e.target.value);
    }
  };

  const handleClickOpen = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
   // const usuario = JSON.parse(loggedUserJSON);
   setForm({ id_usuario: "usuario.id" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {
      const nov = await servicioDtc.nuevaetapacadia(form);
      alert(nov);
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio');
    }
    props.traer();
    setOpen(false);
  };

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '125ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Nueva">
        <Button variant="outlined" onClick={handleClickOpen}> Nuevo </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
        <DialogContent>
          <h3>
            <b> Nueva etapa</b>
          </h3>
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>
                Proyecto
              </StyledParagraph>
            </Typography>
          </InputLabel>
          <NativeSelect
            defaultValue={props.kid}
            onChange={handleChange}
            inputProps={{
              name: 'proyecto',
              id: 'uncontrolled-native',
            }}
            sx={{ width: 250 }}
          >
            <option value={'Sin determinar'}>Elegir</option>
            {Object.keys(etapasPorProyecto).map((proyecto, index) => (
              <option key={index} value={proyecto}>{proyecto}</option>
            ))}
          </NativeSelect>
          <br /><br /><br />
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>
                Etapa
              </StyledParagraph>
            </Typography>
          </InputLabel>
          <NativeSelect
            defaultValue={props.kid}
            onChange={handleChange}
            inputProps={{
              name: 'etapa',
              id: 'uncontrolled-native',
            }}
            sx={{ width: 250 }}
          >
            <option value={'Sin determinar'}>Elegir</option>
            {(etapasPorProyecto[proyectoSeleccionado] || []).map((etapa, index) => (
              <option key={index} value={etapa}>{etapa}</option>
            ))}
          </NativeSelect>
          <br /><br /><br />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titulo"
            name="titulo"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>
                EXPEDIENTE
              </StyledParagraph>
            </Typography>
          </InputLabel>
          <NativeSelect
            defaultValue={props.kid}
            onChange={handleChange}
            inputProps={{
              name: 'expediente',
              id: 'uncontrolled-native',
            }}
            sx={{ width: 250 }}
          >
            <option value={'Sin determinar'}>Elegir</option>
            <option value={'Si'}>Si</option>
            <option value={'No'}>No</option>
          </NativeSelect>
          <br /><br /><br />
          <TextField
            onChange={handleChange}
            name="fecha"
            id="date"
            label="Fecha"
            type="date"
            defaultValue={"07-09-2024"}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            <Typography variant="p" component="div" color="black">
              <StyledParagraph>
                Detalle:
              </StyledParagraph>
            </Typography>
          </InputLabel>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            onChange={handleChange}
            name="descripcion"
            fullWidth
          />
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleDeterminar}>crear</Button>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
