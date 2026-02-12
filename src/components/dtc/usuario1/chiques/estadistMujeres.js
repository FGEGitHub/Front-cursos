import React from "react";
import { Paper } from "@mui/material";

const EstadisticasMujeres = ({ datos, cantidad = 3 }) => {
  if (!datos) return null;

  const mujeres = datos.mujeres || 0;
  const mujeresConHijos = datos.mujeres_con_hijos || 0;

  // Porcentaje sobre el total de personas
  const porcMujeres = (mujeres / cantidad) * 100;
  const porcHijos = (mujeresConHijos / cantidad) * 100;

  return (
    <Paper
      style={{
        padding: 16,
        marginTop: 20,
        background: "#fce4ec",
        maxWidth: 350,
        width: "100%",
        margin: "20px auto",
        borderRadius: 15,
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
      }}
    >
      <h3 style={{ marginBottom: 10 }}>👩 Estadísticas Mujeres</h3>

      {/* Mujeres */}
      <p>Total Mujeres: {mujeres} de {cantidad}</p>
      <div style={{ background: "#f8bbd0", borderRadius: 10, height: 14 }}>
        <div
          style={{
            width: `${porcMujeres}%`,
            background: "#e91e63",
            height: 14,
            borderRadius: 10
          }}
        />
      </div>

      {/* Mujeres con hijos */}
      <p style={{ marginTop: 12 }}>👶 Mujeres con hijos: {mujeresConHijos}</p>
      <div style={{ background: "#f8bbd0", borderRadius: 10, height: 14 }}>
        <div
          style={{
            width: `${porcHijos}%`,
            background: "#ad1457",
            height: 14,
            borderRadius: 10
          }}
        />
      </div>
    </Paper>
  );
};

export default EstadisticasMujeres;
