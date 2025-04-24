import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  useTheme
} from "@mui/material";
import serviciousuario1 from "../../../services/vendedoras"; // Asegurate de que esta ruta sea correcta
import Botonagregar from './botonagregar'
const CajaMobile = () => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [resumen, setResumen] = useState([]);
  const [movimientos, setMovimientos] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUsuarioId(usuario.id);
    }
  }, []);

  useEffect(() => {
    if (usuarioId) {
      obtenerCostos();
    }
  }, [usuarioId]);

  const obtenerCostos = async () => {
    try {
      const response = await serviciousuario1.traercaja2(usuarioId);

      // Armar resumen por tipo de movimiento (ej: "Venta", "Compra", etc.)
      const resumenMap = {};

      response.movimientos.forEach((mov) => {
        const tipo = mov.tipo_movimiento;
        let precio = mov.nuevo_precio !== "No" ? mov.nuevo_precio : mov.precio;
        const precioNum = parseFloat(precio) || 0;

        if (!resumenMap[tipo]) resumenMap[tipo] = 0;
        resumenMap[tipo] += precioNum;
      });

      const resumenArray = Object.entries(resumenMap).map(([tipo, saldo]) => ({
        tipo,
        saldo
      }));

      const adaptados = response.movimientos.map((mov) => {
        const precio = mov.nuevo_precio !== "No" ? mov.nuevo_precio : mov.precio;
        const precioNum = parseFloat(precio) || 0;
        return {
          fecha: mov.fecha?.slice(0, 10), // Opcional
          producto: mov.producto,
          tipo: mov.tipo,
          precio: mov.precio,
          nuevo_precio: mov.nuevo_precio,
          salidas: mov.tipo == "Venta" ? mov.cantidad : "-",
          saldo: precioNum
        };
      });

      setResumen(resumenArray);
      setMovimientos(adaptados);
    } catch (error) {
      console.error("Error al traer costos fijos", error);
    }
  };

  return (
    <Box padding={2}>
      <Botonagregar/>
      <Typography variant="h6" gutterBottom>
        Resumen de Caja
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow style={{ backgroundColor: theme.palette.grey[200] }}>
              <TableCell><strong>Tipo de Caja</strong></TableCell>
              <TableCell align="right"><strong>Saldo</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumen.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.tipo}</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  ${item.saldo.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box height={20} />

      <Typography variant="h6" gutterBottom>
        Detalle de Movimientos
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow style={{ backgroundColor: theme.palette.grey[200] }}>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Concepto</strong></TableCell>
              
              <TableCell align="right"><strong>Precio</strong></TableCell>
              <TableCell align="right"><strong>Saldo</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {movimientos.map((mov, idx) => (
    <TableRow key={idx}>
      <TableCell>{mov.fecha}</TableCell>
      <TableCell>{mov.tipo}</TableCell>
      <TableCell>{mov.producto}</TableCell>
    
      <TableCell
        align="right"
        style={{ color: mov.tipo == "Compra" ? "red" : "inherit" }}
      >
        {mov.tipo == "Venta"
          ? mov.nuevo_precio == "No"
            ? mov.precio
            : mov.nuevo_precio
          : mov.precio}
      </TableCell>
      <TableCell align="right">
        ${mov.saldo.toLocaleString()}
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default CajaMobile;
