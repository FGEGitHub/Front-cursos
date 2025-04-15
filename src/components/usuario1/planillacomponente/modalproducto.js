import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ModalNuevoProducto = ({ open, onClose,traer }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    costo: "",
    transporte: "",
    packaging: "",
    precioVenta: "",
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
  
    try {
       const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                  if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON)
                    const rta =  await serviciousuario1.crearnuevoproducto({ ...producto, usuarioId: usuario.id });
alert(rta)
traer()        
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
        <TextField fullWidth margin="dense" label="Precio de Venta" name="precioVenta" type="number" value={producto.precioVenta} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleGuardar} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNuevoProducto;
