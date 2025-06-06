import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Checkbox, FormControlLabel, Typography
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ModalVenta = ({ open, onClose, productos = [], traer }) => {
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
  const [aplicarDescuento, setAplicarDescuento] = useState(false);
  const [nuevoValor, setNuevoValor] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [stockDisponible, setStockDisponible] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    const precioOriginal = parseFloat(form.precio);
    const nuevoPrecio = aplicarDescuento ? parseFloat(nuevoValor) : precioOriginal;
    const descuentoTotal = aplicarDescuento ? precioOriginal - nuevoPrecio : 0;

    const data = {
      tipo: "Venta",
      fecha: form.fecha || today,
      tipo_movimiento: form.tipo_movimiento || "EFECTIVO",
      productoId: form.productoId,
      cantidad: parseFloat(form.cantidad),
      precio: precioOriginal, // 🔒 el original
      facturaVenta: form.facturaVenta || 0,
      cliente: form.cliente || 0,
      facturaCompra: 0,
      proveedor: 0,
      nuevovalor: aplicarDescuento ? nuevoPrecio : null,
      descuento: aplicarDescuento ? descuentoTotal : 0,
      precioFinal: nuevoPrecio
    };
    try {
 const rta= await serviciousuario1.enviarMovimiento(data);
 alert(rta)
    onClose();
    } catch (error) {
      console.error("Error al guardar venta:", error);
    }
    traer();
  };

  useEffect(() => {
    const prod = productos.find(p => p.id === form.productoId);
    const cantidad = parseFloat(form.cantidad) || 0;
    const unitario = prod ? parseFloat(prod.precioventa || 0) : 0;
    
    if (prod) {
      const comprado = parseFloat(prod.stockcomprado || 0);
      const vendido = parseFloat(prod.stockvendido || 0);
      const disponible = comprado - vendido;
      setStockDisponible(disponible);
    } else {
      setStockDisponible(0);
    }
  
    setCategoriaSeleccionada(prod?.categoria || "");
    setPrecioUnitario(unitario);
    const total = unitario * cantidad;
    setForm(prev => ({ ...prev, precio: total.toFixed(2) }));
  }, [form.productoId, form.cantidad, productos]);

  const descuentoTotal = aplicarDescuento && nuevoValor
    ? (parseFloat(form.precio) - parseFloat(nuevoValor)).toFixed(2)
    : 0;

  const porcentajeDescuento = aplicarDescuento && nuevoValor
    ? ((descuentoTotal / parseFloat(form.precio)) * 100).toFixed(2)
    : 0;

  const guardarDeshabilitado = aplicarDescuento && (!nuevoValor || isNaN(nuevoValor));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Venta</DialogTitle>
      <DialogContent>
       {/* Selección de categoría */}
<TextField
  fullWidth
  margin="dense"
  label="Producto"
  select
  value={categoriaSeleccionada}
  onChange={(e) => {
    setCategoriaSeleccionada(e.target.value);
    setForm(prev => ({ ...prev, productoId: "" })); // Limpiar selección previa
  }}
>
  {[...new Set(productos.map(p => p.categoria))].map((cat, idx) => (
    <MenuItem key={idx} value={cat}>{cat}</MenuItem>
  ))}
</TextField>

{/* Selección de producto según categoría */}
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
  {productos
    .filter(p => p.categoria === categoriaSeleccionada)
    .map(prod => (
      <MenuItem key={prod.id} value={prod.id}>{prod.producto}</MenuItem>
    ))}
</TextField>

{stockDisponible && "Stock:" + stockDisponible}
<TextField
  fullWidth
  margin="dense"
  label={`Cantidad * (máx: ${stockDisponible})`}
  type="number"
  name="cantidad"
  value={form.cantidad}
  onChange={handleChange}
  inputProps={{ min: 1, max: stockDisponible }}
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

        <TextField
          disabled
          fullWidth
          margin="dense"
          label="Precio unitario"
          type="number"
          value={precioUnitario.toFixed(2)}
        />

        <TextField
          disabled
          fullWidth
          margin="dense"
          label="Precio total (auto)"
          type="number"
          name="precio"
          value={form.cantidad *precioUnitario}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={aplicarDescuento}
              onChange={() => {
                setAplicarDescuento(prev => !prev);
                setNuevoValor(""); // Limpiar campo al alternar
              }}
            />
          }
          label="Aplicar descuento"
        />

        {aplicarDescuento && (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Nuevo valor con descuento *"
              type="number"
              value={nuevoValor}
              onChange={(e) => setNuevoValor(e.target.value)}
            />

            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Descuento aplicado: ${descuentoTotal} ({porcentajeDescuento}%)
            </Typography>
          </>
        )}

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
        

        {form.cantidad && <> {form.cantidad<= stockDisponible ? <>
          <Button
          onClick={handleGuardar}
          color="primary"
          disabled={guardarDeshabilitado}
        >
          Guardar
        </Button>
        </>:<>
        <Button
          onClick={handleGuardar}
          color="primary"
          disabled        >
        cantidad supera stock
        </Button></>}</>}
   
      </DialogActions>
    </Dialog>
  );
};

export default ModalVenta;
