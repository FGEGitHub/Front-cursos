import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ModalNuevoProducto from "./modalproducto";
import ModalCompra from "./modalcomprar";
import ModalVenta from "./modalvender";
import ModalFormulario from "./ModalFormulario";
import serviciousuario1 from "../../../services/vendedoras";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  
  Stack,
  Box,
  Container,
  Divider,
} from "@mui/material";

const ControlStock = () => {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false);
  const [modalNuevoMovimiento, setModalNuevoMovimiento] = useState(false);
  const [registroActual, setRegistroActual] = useState(null);
  const [vistaCompactaProductos, setVistaCompactaProductos] = useState(true);
  const [openCompra, setOpenCompra] = useState(false);
  const [openVenta, setOpenVenta] = useState(false);  
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
          {mostrarTabla == "productos" ? <>
      <h2>Control de Stock</h2>
{/* 
      <Button variant="contained" color="primary" href="/usuario1/productos" style={{ marginRight: "10px" }}>
        Ver Productos
      </Button>
      <Button variant="contained" color="secondary" href="/usuario1/movimientos">
        Ver Movimientos
      </Button> */}
       <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Gestión de Stock
      </Typography>
     
       <Button variant="contained" color="success" onClick={() => setModalNuevoProducto(true)} style={{ marginBottom: "10px" }}>
         + Agregar Producto
       </Button>
       <Button onClick={() => setVistaCompactaProductos(!vistaCompactaProductos)} style={{ marginLeft: "10px" , color:"green"}}>
         {vistaCompactaProductos ? "Ver todos los campos" : "Vista compacta"}
       </Button>
      <Divider sx={{ mb: 2 }} />

      {/* Vista de productos */}
      {productos.map((p) => (
        <Card key={p.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="h6" color="primary">{p.producto}</Typography>
              <Typography variant="body2">Categoría: {p.categoria}</Typography>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Costo: ${p.costo}</Typography>
                <Typography variant="body2">{p.variable1 !=0 && <> {p.variable1}:$ {p.costovariable1}</>     }</Typography>
                <Typography variant="body2">{p.variable2 !=0 && <> {p.variable2}: ${p.costovariable2}</>     }</Typography>              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">Precio: ${p.precio_venta}</Typography>
                <Typography variant="body1" color="success.main">
  Ganancia: ${((p.precio_venta || 0) - ((p.costo || 0) - (p.costovariable1 || 0) - (p.costovariable2 || 0))).toFixed(2)} (
    {(
  (
    (
      (Number(p.costo ?? 0) + Number(p.costovariable1 ?? 0) + Number(p.costovariable2 ?? 0)) /
      (Number(p.precio_venta ?? 1)) // ponemos 1 para evitar división por cero
    ) * 100
  ) || 0
).toFixed(2)}
%

    
  )
</Typography>
              </Box>

              <Box textAlign="right">
                <Button size="small" variant="outlined" onClick={() => abrirModalEditar(p)}>
                  Modificar
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))} </Container>
</>:<>  <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Vista de movimientos */}

      { productos &&
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={() => setOpenCompra(true)}>
          Agregar Compra
        </Button>
        <Button variant="contained" color="warning" onClick={() => setOpenVenta(true)}>
          Agregar Venta
        </Button>
      </Stack>
  }

      {movimientos.map((m) => (
        <Card key={m.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="subtitle1" color="primary">
                {m.movimiento} - {m.producto}
              </Typography>
              <Typography variant="body2">Fecha: {m.fecha}</Typography>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Cantidad: {m.cantidad}</Typography>
                <Typography variant="body2">Precio: ${m.precio}</Typography>
              </Box>

              <Typography variant="body1" fontWeight="bold">
                Total: ${m.totalFacturado}
              </Typography>

              <Typography variant="body2">Proveedor: {m.proveedor || "-"}</Typography>
              <Typography variant="body2">Cliente: {m.cliente || "-"}</Typography>

              <Box textAlign="right">
                <Button size="small" variant="outlined" onClick={() => abrirModalEditar(m)}>
                  Modificar
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Container>
    </>}

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
        serviciousuario1={serviciousuario1}
        />
        { productos && <>
        <ModalCompra open={openCompra} onClose={() => setOpenCompra(false)} 
              traer={traerDatos}
              productos={productos}/>
        <ModalVenta open={openVenta} onClose={() => setOpenVenta(false)}
            traer={traerDatos}
            productos={productos} /> </> }
    </div>
  );
};

export default ControlStock;
