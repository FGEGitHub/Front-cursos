import React, { useEffect, useState } from "react";
import serviciousuario1 from "../../../services/vendedoras"; // Ajustá según tu ruta real

const FinanzasComponent = () => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [resumenMensual, setResumenMensual] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [modoFiltroFecha, setModoFiltroFecha] = useState("fecha");


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
      const response = await serviciousuario1.traerinformes(usuarioId);
      setResumenMensual(response[0]);
      setMovimientos(response[1]);
    } catch (error) {
      console.error("Error al traer costos fijos", error);
    }
  };



  const movimientosFiltrados = movimientos.filter((m) => {
    const coincideTipo = filtroTipo ? m.tipo === filtroTipo : true;
  
    const coincideFecha = filtroFecha
      ? modoFiltroFecha === "fecha"
        ? m.fecha === filtroFecha
        : m.fecha.startsWith(filtroFecha)
      : true;
  
    return coincideTipo && coincideFecha;
  });
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Resumen Mensual</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Ingresos</th>
            <th>Egresos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        <tr>
  <td>
    {filtroFecha
      ? modoFiltroFecha === "fecha"
        ? filtroFecha
        : filtroFecha.split("-").reverse().join("/")
      : "Sin filtro"}
  </td>
  <td>
    $
    {movimientosFiltrados
      .filter((m) => m.tipo === "Venta")
      .reduce((acc, curr) => acc + parseFloat(curr.nuevo_precio === "No" ? curr.precio : curr.nuevo_precio), 0)
      .toFixed(2)}
  </td>
  <td>
    $
    {movimientosFiltrados
      .filter((m) => m.tipo === "Compra")
      .reduce((acc, curr) => acc + parseFloat(curr.nuevo_precio === "No" ? curr.precio : curr.nuevo_precio), 0)
      .toFixed(2)}
  </td>
  <td
    style={{
      color:
        movimientosFiltrados
          .filter((m) => m.tipo === "Venta")
          .reduce((acc, curr) => acc + parseFloat(curr.nuevo_precio === "No" ? curr.precio : curr.nuevo_precio), 0) -
          movimientosFiltrados
            .filter((m) => m.tipo === "Compra")
            .reduce((acc, curr) => acc + parseFloat(curr.nuevo_precio === "No" ? curr.precio : curr.nuevo_precio), 0) <
        0
          ? "red"
          : "inherit",
    }}
  >
    $
    {(
      movimientosFiltrados
        .filter((m) => m.tipo === "Venta")
        .reduce((acc, curr) => acc + parseFloat(curr.nuevo_precio === "No" ? curr.precio : curr.nuevo_precio), 0) -
      movimientosFiltrados
        .filter((m) => m.tipo === "Compra")
        .reduce((acc, curr) => acc + parseFloat(curr.nuevo_precio === "No" ? curr.precio : curr.nuevo_precio), 0)
    ).toFixed(2)}
  </td>
</tr>

        </tbody>
      </table>

      <h2 style={styles.title}>Movimientos</h2>

      <div style={styles.filtros}>
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} style={styles.select}>
          <option value="">Todos</option>
          <option value="Venta">Venta</option>
          <option value="Compra">Compra</option>
        </select>
        <select value={modoFiltroFecha} onChange={(e) => setModoFiltroFecha(e.target.value)} style={styles.select}>
  <option value="fecha">Filtrar por fecha</option>
  <option value="mes">Filtrar por mes</option>
</select>

<input
  type={modoFiltroFecha === "fecha" ? "date" : "month"}
  value={filtroFecha}
  onChange={(e) => setFiltroFecha(e.target.value)}
  style={styles.input}
/>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Mov</th>
      
            <th>Producto</th>
            <th>Categoría</th>
            <th>Cant.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {movimientosFiltrados.map((m, index) => (
            <tr key={index}>
              <td>{m.fecha}</td>
              <td>{m.tipo}</td>
       
              <td>{m.producto}</td>
              <td>{m.categoria}</td>
              <td>{m.cantidad}</td>
              <td style={{ color: m.nuevo_precio !== "No" ? "blue" : "inherit" }}>
  {m.nuevo_precio === "No" ? m.precio : m.nuevo_precio}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    fontFamily: "sans-serif",
    color: "#333",
    maxWidth: "100%",
  },
  title: {
    fontSize: "1.3rem",
    margin: "1rem 0 0.5rem",
    color: "#6a1b9a",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1.5rem",
  },
  filtros: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
};

export default FinanzasComponent;
