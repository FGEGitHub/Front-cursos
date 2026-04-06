import React, { useState, useEffect } from 'react';
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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import servicioDtc from '../../../services/dtc';

const MyDialog = (props) => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [optionData, setOptionData] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedDays, setSelectedDays] = useState({});

  // 🔥 Traer todos los cursos al abrir
  useEffect(() => {
    if (open) {
      traerCursos();
    }
  }, [open]);

  const traerCursos = async () => {
    try {
      const res = await servicioDtc.obtenerinfodecursostodos();
      setOptionData(res);
    } catch (error) {
      console.error('Error al traer cursos:', error);
    }
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSelectedOption('');
    setSelectedHour('');
    setSelectedDays({});
    setOpen(false);
  };

  // 🔹 Cursos únicos
  const cursosUnicos = [
    ...new Map(optionData.map(item => [item.id_curso, item])).values()
  ];

  // 🔹 Horas según curso
  const horasDisponibles = [
    ...new Set(
      optionData
        .filter(c => c.id_curso === selectedOption)
        .map(c => c.hora)
    )
  ];

  // 🔹 Días según curso + hora
  const diasDisponibles = optionData
    .filter(c => c.id_curso === selectedOption && c.hora === selectedHour)
    .map(c => c.dia);

  const handleSubmit = async () => {
    const formData = {
      id,
      option: selectedOption, // id_curso
      number: selectedHour,   // hora
      days: Object.keys(selectedDays).filter(d => selectedDays[d]),
    };

    try {
      await servicioDtc.inscribiracurso(formData);
      handleClose();
      props.traer();
    } catch (error) {
      console.error('Error al inscribir:', error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ color: "black", borderColor: "black", fontSize: "0.65rem" }}
        onClick={handleOpen}
      >
        Inscribir
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Inscribir a curso</DialogTitle>

        <DialogContent>

          {/* 🔹 CURSO */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Curso</InputLabel>
            <Select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setSelectedHour('');
                setSelectedDays({});
              }}
            >
              {cursosUnicos.map((curso) => (
                <MenuItem key={curso.id_curso} value={curso.id_curso}>
                  {curso.nombre_curso} - {curso.materia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 🔹 HORA */}
          {selectedOption && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Hora</InputLabel>
              <Select
                value={selectedHour}
                onChange={(e) => {
                  setSelectedHour(e.target.value);
                  setSelectedDays({});
                }}
              >
                {horasDisponibles.map((hora) => (
                  <MenuItem key={hora} value={hora}>
                    {hora}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* 🔹 DÍAS */}
          {selectedHour &&
            diasDisponibles.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={selectedDays[day] || false}
                    onChange={(e) =>
                      setSelectedDays({
                        ...selectedDays,
                        [day]: e.target.checked,
                      })
                    }
                  />
                }
                label={day}
              />
            ))}

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption || !selectedHour}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDialog;