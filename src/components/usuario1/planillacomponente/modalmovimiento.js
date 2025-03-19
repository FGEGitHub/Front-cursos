import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";

const ModalNuevoMovimiento = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Movimiento</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Fecha" type="date" />
        <TextField fullWidth margin="dense" label="Movimiento" select>
          <MenuItem value="Compra">Compra</MenuItem>
          <MenuItem value="Venta">Venta</MenuItem>
        </TextField>
        <TextField fullWidth margin="dense" label="Factura Compra" />
        <TextField fullWidth margin="dense" label="Factura Venta" />
        <TextField fullWidth margin="dense" label="Proveedor" />
        <TextField fullWidth margin="dense" label="Cliente" />
        <TextField fullWidth margin="dense" label="Producto" />
        <TextField fullWidth margin="dense" label="Cantidad" type="number" />
        <TextField fullWidth margin="dense" label="Precio" type="number" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNuevoMovimiento;
