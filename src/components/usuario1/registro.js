import * as React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import servicioAdministracion from '../../services/administracion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Ingresos() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nivel: "1", // predefinido
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {
      await servicioAdministracion.registronivel3(usuario);
      // Redirigir inmediatamente después del registro exitoso
      navigate('/emprendedoras/login');
    } catch (error) {
      console.error("Error al registrar:", error);
      navigate('/emprendedoras/login');
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Agregar Usuario 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <TextField
              autoFocus
              margin="dense"
              label="Usuario"
              name="usuario"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
       
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Mail"
              name="mail"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <Button
              onClick={handleDeterminar}
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Enviar
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
