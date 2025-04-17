import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Divider
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ModalNuevoProducto = ({ open, onClose, traer }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    costo: "",
    transporte: "",
    packaging: "",
    precioVenta: "",
  });

  const [totalCosto, setTotalCosto] = useState(0);
  const [ganancia, setGanancia] = useState(0);
  const [gananciaPorcentaje, setGananciaPorcentaje] = useState(0);

  useEffect(() => {
    const c = parseFloat(producto.costo) || 0;
    const t = parseFloat(producto.transporte) || 0;
    const p = parseFloat(producto.packaging) || 0;
    const pv = parseFloat(producto.precioVenta) || 0;

    const total = c + t + p;
    const gan = pv - total;
    const ganPct = total > 0 ? ((gan / total) * 100).toFixed(2) : 0;

    setTotalCosto(total);
    setGanancia(gan > 0 ? gan : 0);
    setGananciaPorcentaje(gan > 0 ? ganPct : 0);
  }, [producto]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        const rta = await serviciousuario1.crearnuevoproducto({
          ...producto,
          usuarioId: usuario.id,
        });
        alert(rta);
        traer();
      }
      onClose();
    } catch (error) {
      console.error("Error al crear el producto", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Producto</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Nombre del Producto" name="nombre" value={producto.nombre} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Categoría" name="categoria" value={producto.categoria} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Costo" name="costo" type="number" value={producto.costo} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Transporte" name="transporte" type="number" value={producto.transporte} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Packaging" name="packaging" type="number" value={producto.packaging} onChange={handleChange} />
        
        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">Costo total (suma):</Typography>
          <Typography variant="subtitle1" color="text.primary">${totalCosto.toFixed(2)}</Typography>
        </Box>

        <TextField fullWidth margin="dense" label="Precio de Venta" name="precioVenta" type="number" value={producto.precioVenta} onChange={handleChange} />

        {producto.precioVenta && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">Ganancia estimada:</Typography>
            <Typography variant="subtitle2" color={ganancia > 0 ? "success.main" : "error.main"}>
              ${ganancia.toFixed(2)} ({gananciaPorcentaje}%)
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleGuardar} color="primary" variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNuevoProducto;
