import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import servicioDtc from '../../../services/dtc';

const MyDialog = (props) => {
  const { id } = useParams();

  const optionKeys = {
    Música: 240,
    Físico: 304,
    Educativo: 306,
    Arte: 265,
    Lúdico: 307,
    Educativo2: 308,
    Merienda: 309,
  };

  const physicalSubcategories = {
    "Fútbol Masculino": { horarios: ["15:30"], dias: ["lunes", "miércoles", "viernes"] },
    "Fútbol Femenino": { horarios: ["16:30"], dias: ["lunes", "miércoles", "viernes"] },
    "Gimnasio": { horarios: ["14:30"], dias: ["lunes", "martes", "miércoles", "jueves", "viernes"] },
    "Vóley Masculino": { horarios: ["15:30"], dias: ["martes", "jueves"] },
    "Vóley Femenino": { horarios: ["16:30"], dias: ["martes", "jueves"] },
  };

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedDays, setSelectedDays] = useState({});
  const [optionData, setOptionData] = useState(null);

  const allDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

  const handleOptionChange = async (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setSelectedSubOption('');
    setSelectedHour('');
    setSelectedDays({});

    const selectedKey = optionKeys[selected] || null;
    if (selectedKey) {
      try {
        const response = await servicioDtc.obtenerinfodecursos(selectedKey);
        setOptionData(response);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setOptionData(null);
      }
    }
  };

  const handleSubOptionChange = (event) => {
    const selectedSub = event.target.value;
    setSelectedSubOption(selectedSub);
    setSelectedHour('');
    setSelectedDays({});

    // Preseleccionar los días permitidos
    const subcategory = physicalSubcategories[selectedSub] || {};
    const preselectedDays = subcategory.dias?.reduce((acc, day) => {
      acc[day] = false;
      return acc;
    }, {}) || {};

    setSelectedDays(preselectedDays);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    const formData = {
      id,
      option: optionKeys[selectedOption] || null,
      subOption: selectedSubOption,
      hour: selectedHour,
      days: Object.keys(selectedDays).filter((day) => selectedDays[day]),
    };

    await servicioDtc.inscribiracurso(formData);
    setOpen(false);
    props.traer();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Inscribir
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Selecciona opciones</DialogTitle>
        <DialogContent>
          {/* Opción principal */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Selecciona una opción</InputLabel>
            <Select value={selectedOption} onChange={handleOptionChange}>
              {Object.keys(optionKeys).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Subcategoría si es "Físico 304" */}
          {selectedOption === "Físico" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Selecciona una subcategoría</InputLabel>
              <Select value={selectedSubOption} onChange={handleSubOptionChange}>
                {Object.keys(physicalSubcategories).map((subOption) => (
                  <MenuItem key={subOption} value={subOption}>
                    {subOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Selección de horario si hay subcategoría */}
          {selectedSubOption && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Selecciona un horario</InputLabel>
              <Select value={selectedHour} onChange={handleHourChange}>
                {physicalSubcategories[selectedSubOption]?.horarios.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Selección de días */}
          {selectedSubOption && (
            <FormGroup>
              {allDays.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={selectedDays[day] || false}
                      onChange={handleDayChange}
                      name={day}
                      disabled={!physicalSubcategories[selectedSubOption]?.dias.includes(day)}
                    />
                  }
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                />
              ))}
            </FormGroup>
          )}

          {/* Tabla de datos si hay información */}
          {optionData && optionData.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Día</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Cantidad Inscriptos</TableCell>
                    <TableCell>Nombres</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {optionData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.dia}</TableCell>
                      <TableCell>{row.hora}</TableCell>
                      <TableCell>{row.cantidad_kids}</TableCell>
                      <TableCell>{row.nombres_kids}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!selectedSubOption || !selectedHour}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDialog;
