import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ModalCompra = ({ open, onClose, productos = [],traer }) => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    fecha: today,
    productoId: "",
    cantidad: "",
    precio: "",
    facturaCompra: "",
    proveedor: ""
  });

  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // Obtener categorías únicas desde los productos
  const categorias = [...new Set(productos.map(p => p.categoria))];
  
  // Filtrar productos por categoría seleccionada
  const productosFiltrados = productos.filter(p => p.categoria === categoriaSeleccionada);
  // 🔁 Actualizar precio cada vez que cambia producto o cantidad
  useEffect(() => {
    const prod = productos.find(p => p.id === form.productoId);
    const cantidad = parseFloat(form.cantidad) || 0;
    const unitario = prod ? parseFloat(prod.valorTotal || 0) : 0;
    setCategoriaSeleccionada(prod?.categoria || "");
    setPrecioUnitario(unitario);
    const total = unitario * cantidad;
    setForm(prev => ({ ...prev, precio: total.toFixed(2) }));
  }, [form.productoId, form.cantidad, productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    const data = {
      tipo_movimiento: form.tipo_movimiento|| "EFECTIVO",
      tipo:"Compra",
      fecha: form.fecha || today,
      productoId: form.productoId,
      cantidad: parseFloat(form.cantidad),
      precio: parseFloat(form.precio),
      facturaCompra: form.facturaCompra || 0,
      proveedor: form.proveedor || 0,
      facturaVenta: 0,
      cliente: 0
    };

    try {
     const rta = await serviciousuario1.enviarMovimiento(data);
     alert(rta)
      onClose();
    } catch (error) {
      console.error("Error al guardar compra:", error);
    }
    traer()
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Compra</DialogTitle>
      <DialogContent>
      <TextField
  fullWidth
  margin="dense"
  label="Producto"
  select
  value={categoriaSeleccionada}
  onChange={(e) => {
    setCategoriaSeleccionada(e.target.value);
    setForm(prev => ({ ...prev, productoId: "" })); // Resetea el producto seleccionado
  }}
>
  {categorias.map((cat, index) => (
    <MenuItem key={index} value={cat}>
      {cat}
    </MenuItem>
  ))}
</TextField>

<TextField
  fullWidth
  margin="dense"
  label="Modelo"
  select
  name="productoId"
  value={form.productoId}
  onChange={handleChange}
  disabled={!categoriaSeleccionada}
>
  {productosFiltrados.map(prod => (
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
<TextField
          fullWidth
          margin="dense"
          label="Medio de pago"
          select
          name="tipo_movimiento"
          value={form.tipo_movimiento}
          onChange={handleChange}
        >
           <MenuItem   value={"EFECTIVO"}>EFECTIVO</MenuItem>
           <MenuItem   value={"MERCADO PAGO"}>MERCADO PAGO</MenuItem>
        <MenuItem   value={"NARANJA X"}>NARANJA X</MenuItem>
        <MenuItem   value={"ADEUDA"}>ADEUDA</MenuItem>
      
        <MenuItem   value={"TRANSFERENCIA BANCARIA"}>TRANSFERENCIA BANCARIA</MenuItem>
        <MenuItem   value={"TARJETA DE CREDITO"}>TARJETA DE CREDITO</MenuItem>
        <MenuItem   value={"OTROS"}>OTROS</MenuItem>
        
        </TextField>
        {/* 💰 Mostrar precio unitario */}
        <TextField
          disabled
          fullWidth
          margin="dense"
          label="Precio unitario"
          type="number"
          value={precioUnitario.toFixed(2)}
        />

        {/* 💵 Mostrar precio total calculado */}
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
          label="Factura Compra"
          name="facturaCompra"
          value={form.facturaCompra}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Proveedor"
          name="proveedor"
          value={form.proveedor}
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

export default ModalCompra;
