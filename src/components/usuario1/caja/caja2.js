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
import serviciousuario1 from "../../../services/vendedoras";
import Botonagregar from "./botonagregar";

const CajaMobile = () => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [resumen, setResumen] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
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
  useEffect(() => {
    const movimientosFiltrados = movimientos.filter((mov) => {
      if (filtroFecha) {
        return mov.fecha === filtroFecha;
      } else if (filtroMes) {
        return mov.fecha.startsWith(filtroMes);
      }
      return true;
    });
  
    const resumenMap = {};
    movimientosFiltrados.forEach((mov) => {
      const tipo = mov.tipo;
      const saldo = mov.saldo || 0;
  
      if (!resumenMap[tipo]) resumenMap[tipo] = 0;
      resumenMap[tipo] += saldo;
    });
  
    const nuevoResumen = Object.entries(resumenMap).map(([tipo, saldo]) => ({
      tipo,
      saldo
    }));
  
    setResumen(nuevoResumen);
  }, [movimientos, filtroFecha, filtroMes]);
  
  const obtenerCostos = async () => {
    try {
      const response = await serviciousuario1.traercaja2(usuarioId);

      const resumenMap = {};
      const adaptados = response.movimientos.map((mov) => {
        const precio = mov.nuevo_precio !== "No" ? mov.nuevo_precio : mov.precio;
        const precioNum = parseFloat(precio) || 0;
        const signo = mov.tipo === "Compra" ? -1 : 1;

        const tipo = mov.tipo_movimiento;
        if (!resumenMap[tipo]) resumenMap[tipo] = 0;
        resumenMap[tipo] += precioNum * signo;

        return {
          fecha: mov.fecha?.slice(0, 10) || "-",
          producto: mov.producto || mov.categoria || "Concepto",
          tipo: mov.tipo_movimiento,
          tipoOperacion: mov.tipo, // Compra o Venta
          precio: mov.precio,
          nuevo_precio: mov.nuevo_precio,
          salidas: mov.tipo === "Venta" ? mov.cantidad : "-",
          saldo: precioNum * signo
        };
      });

      const resumenArray = Object.entries(resumenMap).map(([tipo, saldo]) => ({
        tipo,
        saldo
      }));

      setResumen(resumenArray);
      setMovimientos(adaptados);
    } catch (error) {
      console.error("Error al traer costos", error);
    }
  };

  const movimientosFiltrados = movimientos.filter((mov) => {
    if (filtroFecha) {
      return mov.fecha === filtroFecha;
    } else if (filtroMes) {
      return mov.fecha.startsWith(filtroMes);
    }
    return true;
  });

  return (
    <Box padding={2}>
      <Botonagregar />

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

      <Box mt={3} mb={2}>
        <Typography variant="subtitle1">Filtrar por Fecha o Mes</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <label>
            Fecha:
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => {
                setFiltroFecha(e.target.value);
                setFiltroMes("");
              }}
              style={{ marginLeft: 10 }}
            />
          </label>
          <label>
            Mes:
            <input
              type="month"
              value={filtroMes}
              onChange={(e) => {
                setFiltroMes(e.target.value);
                setFiltroFecha("");
              }}
              style={{ marginLeft: 10 }}
            />
          </label>
        </Box>
      </Box>

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
            {movimientosFiltrados.map((mov, idx) => (
              <TableRow key={idx}>
                <TableCell>{mov.fecha}</TableCell>
                <TableCell>{mov.tipo}</TableCell>
                <TableCell>{mov.producto}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: mov.tipoOperacion === "Compra" ? "red" : "inherit" }}
                >
                  {mov.tipoOperacion === "Venta"
                    ? mov.nuevo_precio === "No"
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
