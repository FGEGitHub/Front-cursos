import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ResumenNegocio = () => {
  const [nombrenegocio, setNombrenegocio] = useState("");
  const [actividad, setActividad] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [estado, setEstado] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        try {
          const data = await serviciousuario1.getResumenNegocio(usuario.id);
          setNombrenegocio(data[0].materia);
          setActividad(data[0].anios);
          setDomicilio(data[0].direccion);
          setEstado(data[0].estado || "Activo");
        } catch (error) {
          console.error("Error al traer resumen del negocio:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGuardar = () => {
    // Acá podrías agregar la lógica para enviar los datos modificados al backend
    setOpen(false);
  };

  return (
    <Box p={2}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información del negocio
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2"><strong>Nombre del negocio:</strong> {nombrenegocio}</Typography>
          <Typography variant="body2"><strong>Actividad:</strong> {actividad}</Typography>
          <Typography variant="body2"><strong>Domicilio:</strong> {domicilio}</Typography>
          <Typography variant="body2"><strong>Estado:</strong> {estado}</Typography>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleOpen}>Modificar</Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modificar Información</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre del negocio"
            fullWidth
            value={nombrenegocio}
            onChange={(e) => setNombrenegocio(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Actividad"
            fullWidth
            value={actividad}
            onChange={(e) => setActividad(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Domicilio"
            fullWidth
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Estado"
            fullWidth
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleGuardar} variant="contained" color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResumenNegocio;
