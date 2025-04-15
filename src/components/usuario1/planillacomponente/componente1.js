import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ModalNuevoProducto from "./modalproducto";
import ModalNuevoMovimiento from "./modalproducto";
import ModalFormulario from "./ModalFormulario";
import serviciousuario1 from "../../../services/vendedoras";
import { useLocation } from "react-router-dom";

const ControlStock = () => {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false);
  const [modalNuevoMovimiento, setModalNuevoMovimiento] = useState(false);
  const [registroActual, setRegistroActual] = useState(null);
  const [vistaCompactaProductos, setVistaCompactaProductos] = useState(true);
  const [vistaCompactaMovimientos, setVistaCompactaMovimientos] = useState(true);
  
  const location = useLocation();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      serviciousuario1.traerproductos(usuario.id).then((data) => {
        setProductos(data);
      });
      serviciousuario1.traermovimientos(usuario.id).then((data) => {
        setMovimientos(data);
      });
    }
  }, []);
  const traerDatos = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      serviciousuario1.traerproductos(usuario.id).then((data) => {
        setProductos(data);
      });
      serviciousuario1.traermovimientos(usuario.id).then((data) => {
        setMovimientos(data);
      });
    }
  };
  const abrirModalEditar = (registro) => {
    setRegistroActual(registro);
    setModalEditarAbierto(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
    setRegistroActual(null);
  };

  const mostrarTabla = location.pathname.includes("movimientos") ? "movimientos" : "productos";

  return (
    <div>
      <h2>Control de Stock</h2>
{/* 
      <Button variant="contained" color="primary" href="/usuario1/productos" style={{ marginRight: "10px" }}>
        Ver Productos
      </Button>
      <Button variant="contained" color="secondary" href="/usuario1/movimientos">
        Ver Movimientos
      </Button> */}

      {mostrarTabla == "productos" ? (
       <div>
       <h3>Lista de Productos</h3>
       <Button variant="contained" color="success" onClick={() => setModalNuevoProducto(true)} style={{ marginBottom: "10px" }}>
         + Agregar Producto
       </Button>
       <Button onClick={() => setVistaCompactaProductos(!vistaCompactaProductos)} style={{ marginLeft: "10px" , color:"green"}}>
         {vistaCompactaProductos ? "Ver todos los campos" : "Vista compacta"}
       </Button>
     
       <table border="1">
         <thead>
           <tr>
             <th>Producto</th>
             {vistaCompactaProductos ? null : <th>Categoría</th>}
             <th>Costo</th>
             {vistaCompactaProductos ? null : <>
               <th>Transporte</th>
               <th>Packaging</th>
             </>}
             <th>Precio Venta</th>
             <th>Ganancia</th>
             {vistaCompactaProductos ? null : <th>Ganancia %</th>}
             <th>Acciones</th>
           </tr>
         </thead>
         <tbody>
           {productos.map((p) => (
             <tr key={p.id}>
               <td>{p.producto}</td>
               {vistaCompactaProductos ? null : <td>{p.categoria}</td>}
               <td>${p.costo}</td>
               {vistaCompactaProductos ? null : <>
                 <td>${p.transporte}</td>
                 <td>${p.packaging}</td>
               </>}
               <td>${p.precioVenta}</td>
               <td>${p.ganancia}</td>
               {vistaCompactaProductos ? null : <td>{p.gananciaPorcentaje}%</td>}
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
  <Button onClick={() => setVistaCompactaMovimientos(!vistaCompactaMovimientos)} style={{ marginLeft: "10px", color:"green" }}>
    {vistaCompactaMovimientos ? "Ver todos los campos" : "Vista compacta"}
  </Button>

  <table border="1">
    <thead>
      <tr>
        <th>Fecha</th>
        {vistaCompactaMovimientos ? null : <>
          <th>Movimiento</th>
          <th>Factura Compra</th>
          <th>Factura Venta</th>
          <th>Proveedor</th>
          <th>Cliente</th>
        </>}
        <th>Producto</th>
        <th>Cantidad</th>
        {vistaCompactaMovimientos ? null : <th>Precio</th>}
        <th>Total</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {movimientos.map((m) => (
        <tr key={m.id}>
          <td>{m.fecha}</td>
          {vistaCompactaMovimientos ? null : <>
            <td>{m.movimiento}</td>
            <td>{m.facturaCompra || "-"}</td>
            <td>{m.facturaVenta || "-"}</td>
            <td>{m.proveedor || "-"}</td>
            <td>{m.cliente || "-"}</td>
          </>}
          <td>{m.producto}</td>
          <td>{m.cantidad}</td>
          {vistaCompactaMovimientos ? null : <td>${m.precio}</td>}
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

      <Dialog open={modalEditarAbierto} onClose={cerrarModalEditar} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Registro</DialogTitle>
        <DialogContent>
          <ModalFormulario registro={registroActual} />
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModalEditar} color="secondary">Cerrar</Button>
        </DialogActions>
      </Dialog>

      <ModalNuevoProducto open={modalNuevoProducto} onClose={() => setModalNuevoProducto(false)} 
        traer={traerDatos} // Aquí pasas la función como prop
        />
      <ModalNuevoMovimiento open={modalNuevoMovimiento} onClose={() => setModalNuevoMovimiento(false)} 
           traer={traerDatos} // Aquí pasas la función como prop
           />
    </div>
  );
};

export default ControlStock;
