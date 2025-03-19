import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const ModalNuevoProducto = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Producto</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Nombre del Producto" />
        <TextField fullWidth margin="dense" label="Categoría" />
        <TextField fullWidth margin="dense" label="Costo" type="number" />
        <TextField fullWidth margin="dense" label="Transporte" type="number" />
        <TextField fullWidth margin="dense" label="Packaging" type="number" />
        <TextField fullWidth margin="dense" label="Precio de Venta" type="number" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNuevoProducto;
