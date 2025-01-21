import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import servicioDtc from '../../../services/dtc'
const MyDialog = () => {
  const { id } = useParams(); // Obtener el id de los parámetros de la URL

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

  const allDays = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const ludicoDays = ['martes', 'jueves', 'viernes'];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    // Si se elige "Lúdico", deselecciona los días no permitidos
    if (event.target.value === 'Lúdico') {
      setSelectedDays((prevDays) =>
        Object.keys(prevDays).reduce((acc, day) => {
          acc[day] = ludicoDays.includes(day) ? prevDays[day] : false;
          return acc;
        }, {})
      );
    }
  };

  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleDayChange = (event) => {
    if (selectedOption === 'Lúdico' && !ludicoDays.includes(event.target.name)) {
      return; // Evita seleccionar días no permitidos para la opción Lúdico
    }

    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    const formData = {
      id, // ID obtenido de los params
      option: selectedOption,
      optionKey: optionKeys[selectedOption] || null, // Obtener el valor clave de la opción seleccionada
      number: selectedNumber,
      days: Object.keys(selectedDays).filter((day) => selectedDays[day]), // Solo los días seleccionados
    };
  
    console.log('Datos enviados:', formData);
    await  servicioDtc.inscribiracurso(formData)
    // Aquí puedes enviar `formData` a tu API con fetch o axios
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Abrir diálogo
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Selecciona opciones</DialogTitle>
        <DialogContent>
          {/* Primer desplegable */}
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

          {/* Segundo desplegable */}
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

          {/* Checkbox para los días de la semana */}
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
