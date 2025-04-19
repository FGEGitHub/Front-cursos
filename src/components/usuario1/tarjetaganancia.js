import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";
import serviciousuario1 from "../../services/vendedoras";

const GananciaCard = () => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [ganancia, setGanancia] = useState(null);
  const [open, setOpen] = useState(false);
  const [nuevaGanancia, setNuevaGanancia] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUsuarioId(usuario.id);
    }
  }, []);

  const obtenerGanancia = async () => {
    try {
      if (!usuarioId) return;
      const data = await serviciousuario1.traerganancia(usuarioId);
      console.log(data[0].trabajo)
      if(data[0].trabajo != "sin especifica"){
        setGanancia(data[0].trabajo)
      }else{
        setGanancia(0)
      }
      ;
    } catch (error) {
      console.error("Error al obtener ganancia", error);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      obtenerGanancia();
    }
  }, [usuarioId]);

  const handleAbrirDialogo = () => {
    setNuevaGanancia(ganancia);
    setOpen(true);
  };

  const handleGuardarCambio = async () => {
    try {
    const rta=  await serviciousuario1.modificarganancia({
        id: usuarioId,
        ganancia: nuevaGanancia
      });
      alert(rta)
      setGanancia(nuevaGanancia);
      setOpen(false);
    } catch (error) {
      console.error("Error al modificar ganancia", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          margin: "1rem auto",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="body1">
          <strong>Ganancia:</strong> {ganancia}%
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={handleAbrirDialogo}
        >
          Cambiar
        </Button>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cambiar Ganancia</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nueva ganancia"
            type="number"
            fullWidth
            value={nuevaGanancia}
            onChange={(e) => setNuevaGanancia(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleGuardarCambio} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GananciaCard;
