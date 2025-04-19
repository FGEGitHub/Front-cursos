import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ModalVenta = ({ open, onClose, productos = [] }) => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    fecha: today,
    productoId: "",
    cantidad: "",
    precio: "",
    facturaVenta: "",
    cliente: ""
  });

  const [precioUnitario, setPrecioUnitario] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔁 Calcular precio automáticamente
  useEffect(() => {
    const prod = productos.find(p => p.id === form.productoId);
    const cantidad = parseFloat(form.cantidad) || 0;
    const unitario = prod ? parseFloat(prod.precio_venta || 0) : 0;

    setPrecioUnitario(unitario);
    const total = unitario * cantidad;
    setForm(prev => ({ ...prev, precio: total.toFixed(2) }));
  }, [form.productoId, form.cantidad, productos]);

  const handleGuardar = async () => {
    const data = {
      tipo_movimiento: "Venta",
      fecha: form.fecha || today,
      productoId: form.productoId,
      cantidad: parseFloat(form.cantidad),
      precio: parseFloat(form.precio),
      facturaVenta: form.facturaVenta || 0,
      cliente: form.cliente || 0,
      facturaCompra: 0,
      proveedor: 0
    };

    try {
      await serviciousuario1.enviarMovimiento(data);
      onClose();
    } catch (error) {
      console.error("Error al guardar venta:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Venta</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Producto *"
          select
          name="productoId"
          value={form.productoId}
          onChange={handleChange}
        >
          {productos.map(prod => (
            <MenuItem key={prod.id} value={prod.id}>{prod.producto}</MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="dense"
          label="Cantidad *"
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
        />

        {/* 💰 Precio unitario */}
        <TextField
          disabled
          fullWidth
          margin="dense"
          label="Precio unitario"
          type="number"
          value={precioUnitario.toFixed(2)}
        />

        {/* 💵 Precio total (calculado) */}
        <TextField
          disabled
          fullWidth
          margin="dense"
          label="Precio total (auto)"
          type="number"
          name="precio"
          value={form.precio}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Fecha"
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Factura Venta"
          name="facturaVenta"
          value={form.facturaVenta}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Cliente"
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleGuardar} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalVenta;
