import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Box, Button, Modal, TextField, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import servicioDtc from '../../../../services/dtc';
import { useParams } from "react-router-dom";

const categories = [
  { value: 'work', label: 'Trabajo', color: '#1E90FF' },
  { value: 'study', label: 'Estudio', color: '#32CD32' },
  { value: 'personal', label: 'Personal', color: '#FF6347' },
];

const daysOfWeek = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
];

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState({
    titulo: '',
    fecha_inicio: '',
    fecha_fin: '',
    categoria: '',
    daysOfWeek: [],
  });
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const talleres = await servicioDtc.traerhorariosprofesional(id);
      const parsedEvents = talleres.map(event => {
        // Asegúrate de que dias es un array
        console.log('Contenido de dias:', event.dias);
        return { ...event, daysOfWeek: Array.isArray(event.dias) ? event.dias : [] };
      });
      console.log(parsedEvents);
      setEvents(parsedEvents);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };
  
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setEventData(prevState => {
        const newDaysOfWeek = checked
          ? [...prevState.daysOfWeek, parseInt(value)]
          : prevState.daysOfWeek.filter(day => day !== parseInt(value));
        return { ...prevState, daysOfWeek: newDaysOfWeek };
      });
    } else {
      setEventData({
        ...eventData,
        [name]: value,
      });
    }
  };

   const handleAddEvent = async () => {
    try {
      const mergedObj = { ...eventData, id_usuario: id };
      const response = await servicioDtc.agregarhorario(mergedObj);
      setEvents([...events, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding event', error);
    }
  }; 
/*   const handleAddEvent = async () => {
    try {
      const mergedObj = { ...eventData, id_usuario: id, daysOfWeek: JSON.stringify(eventData.daysOfWeek) };
      const response = await servicioDtc.agregarhorario(mergedObj);
      setEvents([...events, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding event', error);
    }
  }; */

  const handleDeleteEvent = async (id) => {
    try {
      await servicioDtc.delete(`/api/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  const renderEvents = (date) => {
    const dayOfWeek = date.getDay(); // Obtiene el día de la semana (0-6)
    const dayEvents = events.filter(event => {
      const fecha_inicio = new Date(event.fecha_inicio);
      const fecha_fin = new Date(event.fecha_fin);
      return fecha_inicio <= date && date <= fecha_fin && event.daysOfWeek.includes(dayOfWeek);
    });
  
    return dayEvents.map(event => (
      <Box
        key={event.id}
        sx={{
          backgroundColor: categories.find(cat => cat.value === event.categoria)?.color || '#ccc',
          padding: '2px',
          margin: '2px 0',
        }}
      >
        {event.title}
        <Button onClick={() => handleDeleteEvent(event.id)}>Eliminar</Button>
      </Box>
    ));
  };
  

  return (
    <Box>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={({ date }) => renderEvents(date)}
      />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar horario
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            fullWidth
            label="Titulo"
            name="titulo"
            value={eventData.titulo}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Inicio"
            type="date"
            name="fecha_inicio"
            value={eventData.fecha_inicio}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Final"
            type="date"
            name="fecha_fin"
            value={eventData.fecha_fin}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            select
            label="Categoria"
            name="categoria"
            value={eventData.categoria}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormGroup>
            {daysOfWeek.map(day => (
              <FormControlLabel
                key={day.value}
                control={
                  <Checkbox
                    value={day.value}
                    checked={eventData.daysOfWeek.includes(day.value)}
                    onChange={handleChange}
                  />
                }
                label={day.label}
              />
            ))}
          </FormGroup>
          <Button variant="contained" color="primary" onClick={handleAddEvent}>
            Agregar horario
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CalendarComponent;
