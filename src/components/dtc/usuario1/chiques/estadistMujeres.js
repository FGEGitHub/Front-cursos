import React from "react";
import { Paper } from "@mui/material";

const EstadisticasMujeres = ({ datos }) => {
  if (!datos) return null;

  const mujeres = datos.mujeres || 0;
  const mujeresConHijos = datos.mujeres_con_hijos || datos.con_hijos || 0;

  const max = Math.max(mujeres, mujeresConHijos, 1);
  const barMujeres = (mujeres / max) * 100;
  const barHijos = (mujeresConHijos / max) * 100;

  return (
    <Paper style={{ padding: 15, marginTop: 20, background: "#fce4ec" }}>

      <h2>👩 Estadísticas de Mujeres</h2>

      <h3>👩 Total Mujeres: {mujeres}</h3>
      <div style={{ background: "#ddd", borderRadius: 10 }}>
        <div style={{
          width: `${barMujeres}%`,
          background: "#e91e63",
          padding: 6,
          color: "white",
          borderRadius: 10
        }}>
          {mujeres}
        </div>
      </div>

      <h3 style={{ marginTop: 10 }}>👶 Mujeres con hijos: {mujeresConHijos}</h3>
      <div style={{ background: "#ddd", borderRadius: 10 }}>
        <div style={{
          width: `${barHijos}%`,
          background: "#7b1fa2",
          padding: 6,
          color: "white",
          borderRadius: 10
        }}>
          {mujeresConHijos}
        </div>
      </div>

    </Paper>
  );
};

export default EstadisticasMujeres;
