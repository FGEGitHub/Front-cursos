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
  TextField,
  MenuItem
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ResumenNegocio = () => {
  const [nombrenegocio, setNombrenegocio] = useState("");
  const [actividad, setActividad] = useState("");
  const [nuevaActividad, setNuevaActividad] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [estado, setEstado] = useState("");
  const [nombre, setNombre] = useState("");
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
          setNombre(data[0].nombre);
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

  const handleGuardar = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      const actividadFinal = actividad === "Nueva" ? nuevaActividad : actividad;

      const nuevoResumen = {
        id: usuario.id,
        materia: nombrenegocio,
        anios: actividadFinal,
        direccion: domicilio,
        estado: estado,
        nombre: nombre
      };

      try {
        await serviciousuario1.updateResumenNegocio(nuevoResumen);
        setOpen(false);
      } catch (error) {
        console.error("Error al guardar cambios del negocio:", error);
      }
    }
  };

  return (
    <Box p={2}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Información del negocio</Typography>
          <Typography variant="h6" gutterBottom>Propietaria {nombre}</Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2"><strong>Nombre del negocio:</strong> {nombrenegocio}</Typography>
          <Typography variant="body2"><strong>Actividad:</strong> {actividad === "Nueva" ? nuevaActividad : actividad}</Typography>
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
            select
            fullWidth
            value={actividad}
            onChange={(e) => setActividad(e.target.value)}
          >
            <MenuItem value="Venta de productos">Venta de productos</MenuItem>
            <MenuItem value="Elaboración y venta de productos">Elaboración y venta de productos</MenuItem>
            <MenuItem value="Prestación de servicios">Prestación de servicios</MenuItem>
            <MenuItem value="Nueva">Nueva</MenuItem>
          </TextField>

          {actividad === "Nueva" && (
            <TextField
              margin="dense"
              label="Especifique nueva actividad"
              fullWidth
              value={nuevaActividad}
              onChange={(e) => setNuevaActividad(e.target.value)}
            />
          )}

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
