import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ModalNuevoProducto from "./modalproducto";
import ModalCompra from "./modalcomprar";
import ModalVenta from "./modalvender";
import ModalFormulario from "./modaleditar";
import ModalFormularioProducto from "./modaleditarproducto";
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
  const [modalEditarAbiertoProducto, setModalEditarAbiertoProducto] = useState(false);
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
  
  const abrirModalEditarProducto = (registro) => {
    setRegistroActual(registro);
    setModalEditarAbiertoProducto(true);
  };
  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
    setRegistroActual(null);
  };
  const cerrarModalEditarProducto = () => {
    setModalEditarAbiertoProducto(false); // <-- Esto es lo correcto
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
    

          <Container maxWidth="sm" sx={{ mt: 4 }}>
         
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
                    Precio: ${p.precioventa} 
                    </Typography>
                  
                    <Typography variant="body2">Categoría: {p.categoria}</Typography>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Costo: ${p.costo}</Typography>
                      <Typography variant="body2">
                        {p.variable1 != 0 && (
                          <>
                            {p.variable1}: $ {p.costovariable1}
                          </>
                        )}
                      </Typography>
                      <Typography variant="body2">
                        {p.variable2 != 0 && (
                          <>
                            {p.variable2}: $ {p.costovariable2}
                          </>
                        )}
                      </Typography>
                    </Box>
                    <Typography variant="body2">Porcentaje de participacion: {p.porcentajedeinvercion}%</Typography>
                    
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
                        onClick={() => abrirModalEditarProducto(p)}
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
                <Button variant="contained"  onClick={() => setOpenCompra(true)}>
                  Agregar Compra
                </Button>
                <Button variant="contained" color="success" onClick={() => setOpenVenta(true)}>
                  Agregar Venta
                </Button>
              </Stack>
            )}

{movimientos.map((m) => {
  const isVenta = m.tipo == "Venta";
  const isCompra = m.tipo == "Compra";
  const tieneDescuento = m.nuevo_precio != "No" ;

  const headerStyle = {
    backgroundColor: isVenta ? "#d0f0c0" : isCompra ? "#cfe8fc" : "#f0f0f0",
    padding: "0.5rem 1rem",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  };

  const icono = isVenta ? "💰" : isCompra ? "📦" : "📄";

  return (
    <Card key={m.id} variant="outlined" sx={{ mb: 2 }}>
      <Box style={headerStyle}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          {icono} {m.tipo}: {m.movimiento} - {m.producto}
        </Typography>
      </Box>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2">Fecha: {m.fecha}</Typography>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Cantidad: {m.cantidad}</Typography>
           
          </Box>
          <Box display="flex" justifyContent="space-between">
        
            <Typography variant="body2">Valor uniatrio:{m.precio/m.cantidad}</Typography> 
            <Typography variant="body2">Precio ideal: ${m.precio}</Typography>
          </Box>
          {isVenta && (m.nuevo_precio != "No") && (
            <Typography variant="body2" color="secondary">
              csas
              🏷️ Descuento aplicado: ${m.nuevo_precio}
            </Typography>
          )}

          <Box textAlign="right">
            <Typography variant="body1" fontWeight="bold">
              Total: ${m.nuevo_precio == "No" ? m.precio :m.nuevo_precio}
            </Typography>
          </Box>

          {m.proveedor && (
            <Box sx={{ backgroundColor: "#fff8dc", p: 1, borderRadius: 1 }}>
              <Typography variant="body2">Proveedor: {m.proveedor}</Typography>
            </Box>
          )}

          {m.cliente && (
            <Box sx={{ backgroundColor: "#e6f4ff", p: 1, borderRadius: 1 }}>
              <Typography variant="body2">Cliente: {m.cliente}</Typography>
            </Box>
          )}

          <Box textAlign="right" mt={1}>
            <Button
              size="small"
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={() => abrirModalEditar(m)}
            >
              ✏️ Modificar
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => {
                setMovimientoAEliminar(m.id);
                setModalOpen2(true);
              }}
            >
              🗑️ Borrar
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
})}


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
      <Dialog open={modalEditarAbiertoProducto} onClose={cerrarModalEditarProducto} maxWidth="sm" fullWidth>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
        <ModalFormularioProducto
  open={modalEditarAbiertoProducto}
  onClose={cerrarModalEditarProducto}
  registro={registroActual}
  traerDatos={traerDatos}
/>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModalEditarProducto} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
{productos && 
      <ModalNuevoProducto
      productos={productos}
        open={modalNuevoProducto}
        onClose={() => setModalNuevoProducto(false)}
        traer={traerDatos}
        serviciousuario1={serviciousuario1}
      /> }

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
