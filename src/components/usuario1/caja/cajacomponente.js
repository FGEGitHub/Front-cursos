import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Grid, Button, Table, TableBody, TableCell, TableHead, TableRow, Collapse
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras";

const ControlDeCaja = () => {
  const [costos, setCostos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [tarjetasAbiertas, setTarjetasAbiertas] = useState({});

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUsuarioId(usuario.id);
    }
  }, []);

  const obtenerCostos = async () => {
    try {
      if (!usuarioId) return;
      const response = await serviciousuario1.traercaja(usuarioId);
      setCostos(response);
    } catch (error) {
      console.error("Error al traer costos fijos", error);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      obtenerCostos();
    }
  }, [usuarioId]);

  const toggleTarjeta = (categoriaNombre) => {
    setTarjetasAbiertas(prev => ({
      ...prev,
      [categoriaNombre]: !prev[categoriaNombre]
    }));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Grid container spacing={2} marginTop={2}>
        {costos.map((categoria) => (
          <Grid item xs={12} sm={6} md={4} key={categoria.categoria}>
            <Card style={{ cursor: "pointer" }}>
              <CardContent onClick={() => toggleTarjeta(categoria.categoria)}>
                <Typography variant="h6">{categoria.categoria}</Typography>
              </CardContent>

              <Collapse in={tarjetasAbiertas[categoria.categoria]}>
                <CardContent>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Monto</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(categoria.detalles || []).map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.producto}</TableCell>
                          <TableCell>{item.tipo}</TableCell>
                          <TableCell>{item.cantidad}</TableCell>
                          <TableCell
                            style={{
                              color: item.tipo === "Venta" ? "green" : "red",
                              fontWeight: "bold"
                            }}
                          >
                            ${item.monto}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Button
                    onClick={() => toggleTarjeta(categoria.categoria)}
                    size="small"
                    color="secondary"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Cerrar
                  </Button>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ControlDeCaja;
