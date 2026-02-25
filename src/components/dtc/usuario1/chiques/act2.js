import servicioDtc from '../../../../services/dtc'
import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

// 🎨 COLORES FIJOS
const COLOR_MAP = {
  "En Tratamiento": "#2e7d32",
  "Judicializados": "#c62828",
  "Sin Tratamiento": "#1565c0",
  "No Judicializados": "#ff9800",
};

// =====================
// 🎨 PIE CHART INTERACTIVO
// =====================
const PieChartCanvas = ({ data, onSliceClick }) => {
  const canvasRef = useRef(null);
  const slicesRef = useRef([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const total = data.reduce((a, b) => a + b.value, 0);
    if (total === 0) return;

    ctx.clearRect(0, 0, 400, 400);
    slicesRef.current = [];

    let startAngle = 0;

    data.forEach((slice) => {
      const sliceAngle = (slice.value / total) * 2 * Math.PI;
      const percent = ((slice.value / total) * 100).toFixed(1);

      slicesRef.current.push({
        startAngle,
        endAngle: startAngle + sliceAngle,
        name: slice.name,
      });

      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = COLOR_MAP[slice.name] || "#999999";
      ctx.fill();

      const midAngle = startAngle + sliceAngle / 2;
      const x = 200 + Math.cos(midAngle) * 90;
      const y = 200 + Math.sin(midAngle) * 90;

      ctx.fillStyle = "white";
      ctx.font = "bold 14px Arial";
      ctx.fillText(`${percent}%`, x - 15, y);

      startAngle += sliceAngle;
    });

  }, [data]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 200;
    const y = e.clientY - rect.top - 200;
    const angle = Math.atan2(y, x);
    const fixedAngle = angle < 0 ? angle + 2 * Math.PI : angle;

    const slice = slicesRef.current.find(
      s => fixedAngle >= s.startAngle && fixedAngle <= s.endAngle
    );

    if (slice) onSliceClick(slice.name);
  };

  return (
    <canvas
      ref={canvasRef}
      width="400"
      height="400"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    />
  );
};

// =====================
// COMPONENTE PRINCIPAL
// =====================
const TablaNotificaciones = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [nivel, setNivel] = useState(1);
  const [grafico, setGrafico] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    tratamiento: 0,
    judicializados: 0,
    sinTratamiento: 0,
    noJudicializados: 0,
  });

  useEffect(() => {
    traer();
  }, []);

  // =====================
  // TRAER DATOS
  // =====================
  const traer = async () => {
    try {
      const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
      if (!loggedUserJSON) return;
      const usuario = JSON.parse(loggedUserJSON);

      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

      const historial = await servicioDtc.traerestadisticas({
        fecha: formattedDate,
        id_usuario: usuario.id
      });

      const s = historial?.[1];
      if (!s) return;

      const total = Number(s.cantidad_usuarios || 0);
      const tratamiento = Number(s.cantidad_tratamiento || 0);
      const judicializados = Number(s.cantidad_judicializados || 0);
      const sinTratamiento = total - tratamiento;
      const noJudicializados = tratamiento - judicializados;

      setStats({ total, tratamiento, judicializados, sinTratamiento, noJudicializados });

      // NIVEL 1
      setGrafico([
        { name: "En Tratamiento", value: tratamiento },
        { name: "Sin Tratamiento", value: sinTratamiento },
      ]);

    } catch (e) {
      console.error("❌ ERROR traer", e);
    }
  };

  // =====================
  // CLICK TORTA
  // =====================
  const handleSliceClick = (name) => {
    if (nivel === 1 && name === "En Tratamiento") {

      setGrafico([
        { name: "Judicializados", value: stats.judicializados },
        { name: "No Judicializados", value: stats.noJudicializados },
        { name: "Sin Tratamiento", value: stats.sinTratamiento },
      ]);

      setNivel(2);
    }
  };

  const volver = () => {
    setGrafico([
      { name: "En Tratamiento", value: stats.tratamiento },
      { name: "Sin Tratamiento", value: stats.sinTratamiento },
    ]);
    setNivel(1);
  };

  return (
    <div style={{ padding: 20 }}>

      {/* ================= KPI CARDS ================= */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ background: "#212121", color: "white" }}>
            <CardContent>
              <Typography>Total Usuarios</Typography>
              <Typography variant="h3">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={2.4}>
          <Card sx={{ background: "#2e7d32", color: "white" }}>
            <CardContent>
              <Typography>En Tratamiento</Typography>
              <Typography variant="h3">{stats.tratamiento}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={2.4}>
          <Card sx={{ background: "#ff9800", color: "white" }}>
            <CardContent>
              <Typography>No Judicializados</Typography>
              <Typography variant="h3">{stats.noJudicializados}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={2.4}>
          <Card sx={{ background: "#c62828", color: "white" }}>
            <CardContent>
              <Typography>Judicializados</Typography>
              <Typography variant="h3">{stats.judicializados}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={2.4}>
          <Card sx={{ background: "#1565c0", color: "white" }}>
            <CardContent>
              <Typography>Sin Tratamiento</Typography>
              <Typography variant="h3">{stats.sinTratamiento}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= GRAFICO ================= */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h5" align="center">
          📊 Situación Psicosocial {nivel === 2 && "(Tratamiento subdividido)"}
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChartCanvas data={grafico} onSliceClick={handleSliceClick} />
        </div>

        {/* LEYENDA DINAMICA */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10, fontWeight: "bold" }}>
          {grafico.map((g) => (
            <span key={g.name} style={{ color: COLOR_MAP[g.name] }}>
              ● {g.name} ({g.value})
            </span>
          ))}
        </div>

        {nivel === 2 && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <Button variant="contained" onClick={volver}>
              ⬅ Volver
            </Button>
          </div>
        )}
      </Card>

    </div>
  );
};

export default TablaNotificaciones;