import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";

const COLORS = {
  mujeres: "#52e70d",
  menores: "#49e719",
  mayores: "#39ce77",
};

const Donut = ({ data, total }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    const size = 260;
    canvas.width = size;
    canvas.height = size;

    let start = -Math.PI / 2;

    data.forEach((d) => {
      const angle = (d.value / total) * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(130, 130, 90, start, start + angle);
      ctx.arc(130, 130, 55, start + angle, start, true);
      ctx.closePath();

      ctx.fillStyle = d.color;
      ctx.fill();

      start += angle;
    });

    // centro
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 26px Arial";
    ctx.textAlign = "center";
    ctx.fillText(total, 130, 140);

  }, [data, total]);

  return <canvas ref={ref} style={{ width: "100%", maxWidth: 260 }} />;
};

const StatBox = ({ label, value }) => (
  <Box
    sx={{
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      p: 2,
      background: "#f8fafc",
    }}
  >
    <Typography sx={{ fontSize: 12, color: "#64748b" }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
      {value}
    </Typography>
  </Box>
);

const EstadisticasMujeres = ({ datos, cantidad }) => {
  const [mostrar, setMostrar] = useState(true);
  if (!datos) return null;

  const mujeres = datos.cantidad_mujeres || 0;
  const mujeresMenores = datos.mujeres_menores_16 || 0;
  const mujeresMayores = datos.mujeres_mayores_16 || 0;
  const totalMenores = datos.total_menores_16 || 0;
  const totalMayores = datos.total_mayores_16 || 0;

  const porcMujeres = (mujeres / cantidad) * 100;
  const porcMujeresMenores = (mujeresMenores / mujeres) * 100 || 0;
  const porcMujeresMayores = (mujeresMayores / mujeres) * 100 || 0;

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: "24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>

        <Button
          size="small"
          variant="contained"
          onClick={() => setMostrar(!mostrar)}
          sx={{ mb: 2 }}
        >
          {mostrar ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </Button>

        {mostrar && (
          <>
            <Typography sx={{ fontSize: 22, fontWeight: "bold", mb: 2 }}>
              👩 Estadísticas Mujeres
            </Typography>

            {/* 🔹 GRID */}
          <Grid container spacing={2} alignItems="center">

  {/* 🔹 BLOQUE IZQUIERDO: LOS 2 DONUTS */}
  <Grid item xs={12} md={5}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {/* DONUT 1 */}
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 13, mb: 1 }}>
          Mujeres sobre total
        </Typography>

        <Donut
          total={cantidad}
          data={[
            { value: mujeres, color: COLORS.mujeres },
            { value: cantidad - mujeres, color: "#e2e8f0" },
          ]}
        />
      </Box>

      {/* DONUT 2 */}
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 13, mb: 1 }}>
          Edad de mujeres
        </Typography>

        <Donut
          total={mujeres || 1}
          data={[
            { value: mujeresMenores, color: COLORS.menores },
            { value: mujeresMayores, color: COLORS.mayores },
          ]}
        />
      </Box>
    </Box>
  </Grid>

  {/* 🔹 BLOQUE DERECHO: INFO */}
  <Grid item xs={12} md={7}>
    <Grid container spacing={2}>

      <Grid item xs={6}>
        <StatBox
          label="Total Mujeres"
          value={`${mujeres} (${porcMujeres.toFixed(1)}%)`}
        />
      </Grid>

      <Grid item xs={6}>
        <StatBox
          label="Menores de 16"
          value={`${mujeresMenores} (${porcMujeresMenores.toFixed(1)}%)`}
        />
      </Grid>

      <Grid item xs={6}>
        <StatBox
          label="Mayores de 16"
          value={`${mujeresMayores} (${porcMujeresMayores.toFixed(1)}%)`}
        />
      </Grid>

      <Grid item xs={6}>
        <StatBox
          label="Total menores"
          value={totalMenores}
        />
      </Grid>

      <Grid item xs={6}>
        <StatBox
          label="Total mayores"
          value={totalMayores}
        />
      </Grid>

    </Grid>
  </Grid>

</Grid>

            {/* 🔹 LEYENDA */}
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                Referencias:
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.mujeres }} />
                  <Typography sx={{ fontSize: 12 }}>Mujeres</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: "#e2e8f0" }} />
                  <Typography sx={{ fontSize: 12 }}>Resto</Typography>
                </Box>
              </Box>
            </Box>

          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EstadisticasMujeres;