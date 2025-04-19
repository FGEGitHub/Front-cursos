import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from "@mui/material";
import serviciousuario1 from "../../services/vendedoras";

const CostosFijos = () => {
  const [costos, setCostos] = useState([]);
  const [open, setOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null); // <-- ID desde localStorage

  const [form, setForm] = useState({
    titulo: "",
    monto: ""
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUsuarioId(usuario.id);
    }
  }, []);

  const obtenerCostos = async () => {
    try {
      if (!usuarioId) return;
      const response = await serviciousuario1.traerstock(usuarioId);
      setCostos(response);
    } catch (error) {
      console.error("Error al traer costos fijos", error);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      obtenerCostos();
    }
  }, [usuarioId]);

  const handleOpenAgregar = () => {
    setForm({ titulo: "", monto: "" });
    setModoEdicion(false);
    setOpen(true);
  };

  const handleOpenEditar = (item) => {
    setForm({ titulo: item.titulo, monto: item.monto });
    setItemEditando(item);
    setModoEdicion(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    try {
      if (modoEdicion && itemEditando) {
        await serviciousuario1.modisficarcostosfijos({
          ...form,
          id: itemEditando.id,
        });
      } else {
        await serviciousuario1.agregarcostofijo({
          ...form,
          usuarioId: usuarioId,
        });
      }
      obtenerCostos();
      setOpen(false);
    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Button variant="contained" color="primary" onClick={handleOpenAgregar}>Agregar Costo Fijo</Button>
      <Grid container spacing={2} marginTop={2}>
        {costos.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card onClick={() => handleOpenEditar(item)} style={{ cursor: "pointer" }}>
              <CardContent>
                <Typography variant="h6">{item.producto}</Typography>
                <Typography variant="body1">Total compras:{item.total_compras}</Typography>

                <Typography variant="body1">Total Ventas{item.total_ventas}</Typography>

                <Typography variant="body1">Stock actual{item.total_compras}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modoEdicion ? "Editar Costo Fijo" : "Agregar Costo Fijo"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            fullWidth
            value={form.titulo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Monto"
            name="monto"
            type="number"
            fullWidth
            value={form.monto}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
          <Button onClick={handleGuardar} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CostosFijos;
