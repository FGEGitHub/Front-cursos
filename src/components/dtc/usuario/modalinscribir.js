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
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import servicioDtc from '../../../services/dtc';

const MyDialog = () => {
  const { id } = useParams();

  const optionKeys = {
    Música: 240,
    Físico: 304,
    Educativo: 306,
    Arte: 265,
    Lúdico: 307,
  };

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedDays, setSelectedDays] = useState({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
  });

  const [optionData, setOptionData] = useState(null);

  const allDays = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const ludicoDays = ['martes', 'jueves', 'viernes'];

  const handleOptionChange = async (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);

    const selectedKey = optionKeys[selected] || null;

    if (selected === 'Lúdico') {
      setSelectedDays((prevDays) =>
        Object.keys(prevDays).reduce((acc, day) => {
          acc[day] = ludicoDays.includes(day) ? prevDays[day] : false;
          return acc;
        }, {})
      );
    }

    try {
      const response = await servicioDtc.obtenerinfodecursos(selectedKey);
      setOptionData(response);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setOptionData(null);
    }
  };

  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleDayChange = (event) => {
    if (selectedOption === 'Lúdico' && !ludicoDays.includes(event.target.name)) {
      return;
    }

    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    const formData = {
      id,
      option: optionKeys[selectedOption] || null,
      number: selectedNumber,
      days: Object.keys(selectedDays).filter((day) => selectedDays[day]),
    };

    await servicioDtc.inscribiracurso(formData);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Inscribir
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Selecciona opciones</DialogTitle>
        <DialogContent>
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

          {/* Mostrar tabla si hay datos */}
          {optionData && optionData.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Día</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Cantidad de Kids</TableCell>
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

          <FormControl fullWidth margin="normal">
            <InputLabel>Selecciona un número</InputLabel>
            <Select value={selectedNumber} onChange={handleNumberChange}>
              {[14, 15, 16].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormGroup>
            {allDays.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={selectedDays[day]}
                    onChange={handleDayChange}
                    name={day}
                    disabled={selectedOption === 'Lúdico' && !ludicoDays.includes(day)}
                  />
                }
                label={day.charAt(0).toUpperCase() + day.slice(1)}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDialog;
