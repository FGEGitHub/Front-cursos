import React, { useEffect, useState } from "react";
import servicioDtc from "../../../services/dtc"; // Ajustá esta ruta si es necesario

const App = () => {
  const [chicos, setChicos] = useState([]);
  const [asistencias2025, setAsistencias2025] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Usuarios de gimnasio

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const data = await servicioDtc.traerestadisticastodas();
        console.log("Datos recibidos:", data);

        setChicos(data[0]);
        setAsistencias2025(data[1]);
        setPacientes(data[2]);
        setTurnos(data[3]);
        setUsuarios(data[4]); // Dato nuevo: usuarios de gimnasio
      } catch (error) {
        console.error("Error al traer datos:", error);
      }
    };

    traerDatos();
  }, []);

  // 🔢 Agrupar por mes YYYY-MM
  const agruparPorMes = (datos, campoFecha) => {
    const porMes = {};
    datos.forEach((item) => {
      const fecha = item[campoFecha];
      if (fecha && typeof fecha === "string") {
        const mes = fecha.substring(0, 7); // YYYY-MM
        porMes[mes] = (porMes[mes] || 0) + 1;
      }
    });
    return porMes;
  };

  // 📆 Contar días únicos con clases por mes
  const contarDiasDistintosPorMes = (datos, campoFecha) => {
    const diasPorMes = {};
    datos.forEach((item) => {
      const fecha = item[campoFecha];
      if (fecha && typeof fecha === "string") {
        const mes = fecha.substring(0, 7);
        const dia = fecha.substring(0, 10);
        if (!diasPorMes[mes]) diasPorMes[mes] = new Set();
        diasPorMes[mes].add(dia);
      }
    });

    const resultado = {};
    for (const mes in diasPorMes) {
      resultado[mes] = diasPorMes[mes].size;
    }

    return resultado;
  };

  // 🧩 Agrupar usuarios de gimnasio por clase
  const agruparPorClase = (usuarios) => {
    const clases = {};
    usuarios.forEach((usuario) => {
      const clase = usuario.clases || "Sin clase";
      clases[clase] = (clases[clase] || 0) + 1;
    });
    return clases;
  };

  const asistenciasPorMes = agruparPorMes(asistencias2025, "fecha");
  const diasConClasesPorMes = contarDiasDistintosPorMes(asistencias2025, "fecha");
  const turnosPorMes = agruparPorMes(turnos, "fecha");
  const usuariosPorClase = agruparPorClase(usuarios);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📊 Resumen de Estadísticas 2025</h1>

      <p><strong>👦 Cantidad de chicos:</strong> {chicos.length}</p>
      <p><strong>📝 Cantidad de asistencias 2025:</strong> {asistencias2025.length}</p>
      <p><strong>🏥 Cantidad de pacientes:</strong> {pacientes.length}</p>
      <p><strong>📅 Cantidad de turnos:</strong> {turnos.length}</p>
      <p><strong>🏋️‍♀️ Cantidad de usuarios de gimnasio:</strong> {usuarios.length}</p>

      <h2>🧩 Usuarios de gimnasio por clase</h2>
      {Object.keys(usuariosPorClase).length > 0 ? (
        <ul>
          {Object.entries(usuariosPorClase).map(([clase, cantidad]) => (
            <li key={clase}>{clase}: {cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>Sin datos.</p>
      )}

      <h2>🗓️ Asistencias 2025 por mes</h2>
      {Object.keys(asistenciasPorMes).length > 0 ? (
        <ul>
          {Object.entries(asistenciasPorMes).map(([mes, cantidad]) => (
            <li key={mes}>
              {mes}: {cantidad} asistencias ({diasConClasesPorMes[mes] || 0} Dias laborables)
            </li>
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
