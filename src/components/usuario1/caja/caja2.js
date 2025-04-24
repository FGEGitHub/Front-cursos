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

  const obtenerCostos = async () => {
    try {
      const response = await serviciousuario1.traercaja2(usuarioId);

      const adaptados = response.movimientos.map((mov) => {
        const precio = mov.nuevo_precio !== "No" ? mov.nuevo_precio : mov.precio;
        const precioNum = parseFloat(precio) || 0;
        const signo = mov.tipo === "Compra" ? -1 : 1;
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

  useEffect(() => {
    const resumenMap = {};
    movimientosFiltrados.forEach((mov) => {
      const tipo = mov.tipo;
      if (!resumenMap[tipo]) resumenMap[tipo] = 0;
      resumenMap[tipo] += mov.saldo;
    });
    const nuevoResumen = Object.entries(resumenMap).map(([tipo, saldo]) => ({ tipo, saldo }));
    setResumen(nuevoResumen);
  }, [movimientosFiltrados]);

  const agruparPorTipoMovimiento = (movs) => {
    const resumen = {};
    movs.forEach((mov) => {
      const tipo = mov.tipo;
      if (!resumen[tipo]) resumen[tipo] = 0;
      resumen[tipo] += Math.abs(mov.saldo);
    });
    return Object.entries(resumen).map(([tipo, saldo]) => ({ tipo, saldo }));
  };

  const dataVentas = agruparPorTipoMovimiento(
    movimientosFiltrados.filter((mov) => mov.tipoOperacion === "Venta")
  );

  const dataCompras = agruparPorTipoMovimiento(
    movimientosFiltrados.filter((mov) => mov.tipoOperacion === "Compra")
  );

  const PieChartSimple = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.saldo, 0);
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#af52de", "#ff4560"];

    if (data.length === 1) {
      return (
        <Box display="inline-block" m={2}>
          <Typography variant="subtitle1" align="center">{title}</Typography>
          <svg width={120} height={120}>
            <circle cx="60" cy="60" r="50" fill={colors[0]} />
          </svg>
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <div style={{ width: 10, height: 10, backgroundColor: colors[0] }} />
              <Typography variant="body2">
                {data[0].tipo}: ${data[0].saldo.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }

    let cumulative = 0;
    const slices = data.map((item, i) => {
      const value = item.saldo;
      const startAngle = (cumulative / total) * 360;
      const endAngle = ((cumulative + value) / total) * 360;
      cumulative += value;

      const largeArc = endAngle - startAngle > 180 ? 1 : 0;

      const radius = 50;
      const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
      const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);
      const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
      const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

      const pathData = `
        M ${radius} ${radius}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
        Z
      `;

      return (
        <path key={i} d={pathData} fill={colors[i % colors.length]}>
          <title>{item.tipo}: ${item.saldo.toLocaleString()}</title>
        </path>
      );
    });

    return (
      <Box display="inline-block" m={2}>
        <Typography variant="subtitle1" align="center">{title}</Typography>
        <svg width={120} height={120}>{slices}</svg>
        <Box>
          {data.map((item, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1}>
              <div style={{ width: 10, height: 10, backgroundColor: colors[i % colors.length] }} />
              <Typography variant="body2">
                {item.tipo}: ${item.saldo.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box padding={2}>
      <Botonagregar />
      <Typography variant="h6" gutterBottom>Resumen de Caja</Typography>
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

      <Box mt={3} display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        <PieChartSimple data={dataVentas} title="Movimientos de Venta" />
        <PieChartSimple data={dataCompras} title="Movimientos de Compra" />
      </Box>

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

      <Typography variant="h6" gutterBottom>Detalle de Movimientos</Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow style={{ backgroundColor: theme.palette.grey[200] }}>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Tipo movimiento</strong></TableCell>

              <TableCell><strong>Concepto</strong></TableCell>
              <TableCell align="right"><strong>Precio</strong></TableCell>
              <TableCell align="right"><strong>Saldo</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movimientosFiltrados.map((mov, idx) => (
              <TableRow key={idx}>
                <TableCell>{mov.fecha}</TableCell>
                <TableCell>{mov.tipoOperacion}</TableCell>
                <TableCell>{mov.tipo}</TableCell>
                <TableCell>{mov.producto}</TableCell>
                <TableCell align="right" style={{ color: mov.tipoOperacion === "Compra" ? "red" : "inherit" }}>
                  ${mov.precio}
                </TableCell>
                <TableCell align="right">${mov.saldo.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CajaMobile;
