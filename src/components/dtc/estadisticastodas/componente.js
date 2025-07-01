import React, { useEffect, useState } from "react";
import servicioDtc from "../../../services/dtc"; // Ajusta esta ruta si tu servicio está en otro lado

const App = () => {
  const [chicos, setChicos] = useState([]);
  const [asistencias2025, setAsistencias2025] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const data = await servicioDtc.traerestadisticastodas();
        console.log("Datos recibidos:", data);

        setChicos(data[0]);
        setAsistencias2025(data[1]);
        setPacientes(data[2]);
        setTurnos(data[3]);
      } catch (error) {
        console.error("Error al traer datos:", error);
      }
    };

    traerDatos();
  }, []);

  // 🔢 Agrupar registros por mes YYYY-MM
  const agruparPorMes = (datos, campoFecha) => {
    const porMes = {};

    datos.forEach((item) => {
      const fecha = item[campoFecha];
      if (fecha && typeof fecha === "string") {
        const mes = fecha.substring(0, 7); // YYYY-MM
        if (!porMes[mes]) porMes[mes] = 0;
        porMes[mes]++;
      }
    });

    return porMes;
  };

  // 📌 Cambia el nombre del campo si no coincide exactamente
  const asistenciasPorMes = agruparPorMes(asistencias2025, "fecha"); // O "fecha" o "asitencias2025"
  const turnosPorMes = agruparPorMes(turnos, "fecha");

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📊 Resumen de Estadísticas 2025</h1>

      <p><strong>👦 Cantidad de chicos:</strong> {chicos.length}</p>
      <p><strong>📝 Cantidad de asistencias 2025:</strong> {asistencias2025.length}</p>
      <p><strong>🏥 Cantidad de pacientes:</strong> {pacientes.length}</p>
      <p><strong>📅 Cantidad de turnos:</strong> {turnos.length}</p>

      <h2>🗓️ Asistencias 2025 por mes</h2>
      {Object.keys(asistenciasPorMes).length > 0 ? (
        <ul>
          {Object.entries(asistenciasPorMes).map(([mes, cantidad]) => (
            <li key={mes}>{mes}: {cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos.</p>
      )}

      <h2>🗓️ Turnos por mes</h2>
      {Object.keys(turnosPorMes).length > 0 ? (
        <ul>
          {Object.entries(turnosPorMes).map(([mes, cantidad]) => (
            <li key={mes}>{mes}: {cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos.</p>
      )}
    </div>
  );
};

export default App;
