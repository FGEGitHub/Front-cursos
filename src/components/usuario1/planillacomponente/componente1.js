import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ModalNuevoProducto from "./modalproducto";
import ModalNuevoMovimiento from "./modalproducto";
import ModalFormulario from "./ModalFormulario";

const productosIniciales = [
  { id: 1, nombre: "Producto A", categoria: "Categoría 1", costo: 100, transporte: 10, packaging: 5, precioVenta: 150, ganancia: 35, gananciaPorcentaje: 23.3 },
  { id: 2, nombre: "Producto B", categoria: "Categoría 2", costo: 200, transporte: 15, packaging: 10, precioVenta: 280, ganancia: 55, gananciaPorcentaje: 19.6 },
];

const movimientosIniciales = [
  { id: 1, fecha: "2024-03-18", movimiento: "Compra", facturaCompra: "123", proveedor: "Proveedor X", producto: "Producto A", cantidad: 10, precio: 150, totalFacturado: 1500 },
  { id: 2, fecha: "2024-03-19", movimiento: "Venta", facturaVenta: "456", cliente: "Cliente Y", producto: "Producto B", cantidad: 5, precio: 280, totalFacturado: 1400 },
];

const ControlStock = () => {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState("productos"); // 'productos' o 'movimientos'
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false);
  const [modalNuevoMovimiento, setModalNuevoMovimiento] = useState(false);
  const [registroActual, setRegistroActual] = useState(null);

  useEffect(() => {
    setProductos(productosIniciales);
    setMovimientos(movimientosIniciales);
  }, []);

  const abrirModalEditar = (registro) => {
    setRegistroActual(registro);
    setModalEditarAbierto(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
    setRegistroActual(null);
  };

  return (
    <div>
      <h2>Control de Stock</h2>

      <Button variant="contained" color="primary" onClick={() => setMostrarTabla("productos")} style={{ marginRight: "10px" }}>
        Ver Productos
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setMostrarTabla("movimientos")}>
        Ver Movimientos
      </Button>

      {mostrarTabla === "productos" ? (
        <div>
          <h3>Lista de Productos</h3>
          <Button variant="contained" color="success" onClick={() => setModalNuevoProducto(true)} style={{ marginBottom: "10px" }}>
            + Agregar Producto
          </Button>
          <table border="1">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Costo</th>
                <th>Transporte</th>
                <th>Packaging</th>
                <th>Precio Venta</th>
                <th>Ganancia</th>
                <th>Ganancia %</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${p.costo}</td>
                  <td>${p.transporte}</td>
                  <td>${p.packaging}</td>
                  <td>${p.precioVenta}</td>
                  <td>${p.ganancia}</td>
                  <td>{p.gananciaPorcentaje}%</td>
                  <td>
                    <Button variant="outlined" color="primary" onClick={() => abrirModalEditar(p)}>Modificar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>Movimientos de Stock</h3>
          <Button variant="contained" color="success" onClick={() => setModalNuevoMovimiento(true)} style={{ marginBottom: "10px" }}>
            + Agregar Movimiento
          </Button>
          <table border="1">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Movimiento</th>
                <th>Factura Compra</th>
                <th>Factura Venta</th>
                <th>Proveedor</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((m) => (
                <tr key={m.id}>
                  <td>{m.fecha}</td>
                  <td>{m.movimiento}</td>
                  <td>{m.facturaCompra || "-"}</td>
                  <td>{m.facturaVenta || "-"}</td>
                  <td>{m.proveedor || "-"}</td>
                  <td>{m.cliente || "-"}</td>
                  <td>{m.producto}</td>
                  <td>{m.cantidad}</td>
                  <td>${m.precio}</td>
                  <td>${m.totalFacturado}</td>
                  <td>
                    <Button variant="outlined" color="primary" onClick={() => abrirModalEditar(m)}>Modificar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para editar productos o movimientos */}
      <Dialog open={modalEditarAbierto} onClose={cerrarModalEditar} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Registro</DialogTitle>
        <DialogContent>
          <ModalFormulario registro={registroActual} />
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModalEditar} color="secondary">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para agregar un nuevo producto */}
      <ModalNuevoProducto open={modalNuevoProducto} onClose={() => setModalNuevoProducto(false)} />

      {/* Modal para agregar un nuevo movimiento */}
      <ModalNuevoMovimiento open={modalNuevoMovimiento} onClose={() => setModalNuevoMovimiento(false)} />
    </div>
  );
};

export default ControlStock;
