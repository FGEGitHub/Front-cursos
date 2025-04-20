import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ModalNuevoProducto from "./modalproducto";
import ModalCompra from "./modalcomprar";
import ModalVenta from "./modalvender";
import ModalFormulario from "./modaleditar";
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
import ModalConfirmarBorrado from './modalborrargeneral'
import ModalConfirmarBorradomovimiento from './modalborrargeneral'



const ControlStock = () => {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [modalOpen2, setModalOpen2] = useState(false);  
   const [registroActual, setRegistroActual] = useState(null);
  const [vistaCompactaProductos, setVistaCompactaProductos] = useState(true);
  const [openCompra, setOpenCompra] = useState(false);
  const [openVenta, setOpenVenta] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [movimientoAEliminar, setMovimientoAEliminar] = useState(null);

  const location = useLocation();


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
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
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
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
  const handleBorrar = async () => {
    if (productoAEliminar) {
      await serviciousuario1.borrarproducto({id:productoAEliminar});
      setModalOpen(false);
      setProductoAEliminar(null);
      traerDatos(); // para refrescar la lista después del borrado
    }
  };
  const handleBorrarMovimiento = async () => {
      if (movimientoAEliminar) {
      await serviciousuario1.borrarmovimiento({id:movimientoAEliminar});
      setModalOpen(false);
      setMovimientoAEliminar(null);
      traerDatos(); // para refrescar la lista después del borrado
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

  const productosFiltrados = productos.filter((p) =>
    p.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      {mostrarTabla === "productos" ? (
        <>
          <h2>Control de Stock</h2>

          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Gestión de Stock
            </Typography>

            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <Button
              variant="contained"
              color="success"
              onClick={() => setModalNuevoProducto(true)}
              style={{ marginBottom: "10px" }}
            >
              + Agregar Producto
            </Button>
     
            <Divider sx={{ mb: 2 }} />

            {productosFiltrados.map((p) => (
              <Card key={p.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6" color="primary">
                      {p.producto}   
                    </Typography>
                    <Typography variant="h6" color="primary">
                    Precio:{p.precioventa} 
                    </Typography>
                  
                    <Typography variant="body2">Categoría: {p.categoria}</Typography>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Costo: ${p.costo}</Typography>
                      <Typography variant="body2">
                        {p.variable1 !== 0 && (
                          <>
                            {p.variable1}: $ {p.costovariable1}
                          </>
                        )}
                      </Typography>
                      <Typography variant="body2">
                        {p.variable2 !== 0 && (
                          <>
                            {p.variable2}: $ {p.costovariable2}
                          </>
                        )}
                      </Typography>
                    </Box>
                    <Typography variant="body2">Porcentaje de inversion: {p.porcentajedeinvercion}%</Typography>
                    
                    <Box display="flex" flexDirection="column" gap={0.5}>
  <Box display="flex" justifyContent="space-between">
    <Typography variant="body1" fontWeight="bold" whiteSpace="nowrap">
      Costo producto:
    </Typography>
    <Typography variant="body1" whiteSpace="nowrap">
      ${p.valorTotal}
    </Typography>
  </Box>

  <Box display="flex" justifyContent="space-between">
    <Typography variant="body1" fontWeight="bold" whiteSpace="nowrap">
      Total comprado:
    </Typography>
    <Typography variant="body1" whiteSpace="nowrap">
      {p.stockcomprado}
    </Typography>
  </Box>

  <Box display="flex" justifyContent="space-between">
    <Typography variant="body1" fontWeight="bold" whiteSpace="nowrap">
      Adic fijo:
    </Typography>
    <Typography variant="body1" whiteSpace="nowrap">
      {p.adicional}
    </Typography>
  </Box>

  <Box display="flex" justifyContent="space-between">
    <Typography variant="body1" fontWeight="bold" whiteSpace="nowrap">
      Costo final:
    </Typography>
    <Typography variant="body1" whiteSpace="nowrap">
      ${p.valortotal2}
    </Typography>
  </Box>
</Box>

                
      <Box textAlign="right">
      <Button
  size="small"
  variant="outlined"
  onClick={() => {
    setProductoAEliminar(p.id);
    setModalOpen(true);
  }}
>
  Borrar
</Button>
                    </Box>
                    <Box textAlign="right">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => abrirModalEditar(p)}
                      >
                        Modificar
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Container>
        </>
      ) : (
        <>
          <Container maxWidth="sm" sx={{ mt: 4 }}>
            {productos && (
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" onClick={() => setOpenCompra(true)}>
                  Agregar Compra
                </Button>
                <Button variant="contained" color="warning" onClick={() => setOpenVenta(true)}>
                  Agregar Venta
                </Button>
              </Stack>
            )}

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
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => abrirModalEditar(m)}
                      >
                        Modificar
                      </Button>
                      <Button
  size="small"
  variant="outlined"
  onClick={() => {
    setMovimientoAEliminar(m.id);
    setModalOpen2(true);
  }}
>
  Borrar
</Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Container>
        </>
      )}
<ModalConfirmarBorrado
  open={modalOpen}
  onClose={() => {
    setModalOpen(false);
    setProductoAEliminar(null);
  }}
  onConfirm={handleBorrar}
/>
<ModalConfirmarBorradomovimiento
  open={modalOpen2}
  onClose={() => {
    setModalOpen2(false);
    setMovimientoAEliminar(null);
  }}
  onConfirm={handleBorrarMovimiento}
/>
      <Dialog open={modalEditarAbierto} onClose={cerrarModalEditar} maxWidth="sm" fullWidth>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <ModalFormulario registro={registroActual} 
          serviciousuario1={serviciousuario1}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModalEditar} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <ModalNuevoProducto
        open={modalNuevoProducto}
        onClose={() => setModalNuevoProducto(false)}
        traer={traerDatos}
        serviciousuario1={serviciousuario1}
      />

      {productos && (
        <>
          <ModalCompra open={openCompra} onClose={() => setOpenCompra(false)} traer={traerDatos} productos={productos} />
          <ModalVenta open={openVenta} onClose={() => setOpenVenta(false)} traer={traerDatos} productos={productos} />
        </>
      )}
    </div>
  );
};

export default ControlStock;
