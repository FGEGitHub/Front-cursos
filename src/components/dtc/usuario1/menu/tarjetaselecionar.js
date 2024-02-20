import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CardSeleccionFecha = ({ onFechaSeleccionada }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const handleIrActividades = () => {
    // Lógica para navegar a la página de actividades con la fecha seleccionada
    if (fechaSeleccionada) {
      console.log('Ir a actividades con fecha:', fechaSeleccionada);
      onFechaSeleccionada(new Date(fechaSeleccionada));
    }
  };

  return (
    <Card style={{ width: 'calc(33.33% - 16px)', margin: '8px' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Seleccionar Fecha
        </Typography>
        <TextField
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          fullWidth
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleIrActividades} color="primary">
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSeleccionFecha;
