import React from "react";
import { useNavigate } from "react-router-dom";

import productosImg from "../../../Assets/iraproductos.png";
import movimientosImg from "../../../Assets/iramovimientos.png";
import costosFijosImg from "../../../Assets/iraproductos.png";
import stockImg from "../../../Assets/irastock.png";
import informesImg from "../../../Assets/irainformes.png";
import cajaImg from "../../../Assets/iracaja.png";
import negocioImg from "../../../Assets/iraproductos.png";

const NavigationButtons = () => {
  const navigate = useNavigate();

  const buttons = [
    { img: productosImg, route: "/usuario1/productos", label: "Productos" },
    { img: movimientosImg, route: "/usuario1/movimientos", label: "Movimientos" },
    { img: costosFijosImg, route: "/usuario1/costosfijos", label: "Costos Fijos" },
    { img: stockImg, route: "/usuario1/stock", label: "Stock" },
    { img: informesImg, route: "/usuario1/informes", label: "Informes" },
    { img: cajaImg, route: "/usuario1/caja", label: "Caja" },
    { img: negocioImg, route: "/usuario1/minegocio", label: "Mi Negocio" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {buttons.map((btn, index) => (
          <div key={index} style={styles.card}>
            <button onClick={() => navigate(btn.route)} style={styles.button}>
              <img src={btn.img} alt={btn.label} style={styles.image} />
              <div style={styles.label}>{btn.label}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px", // Limita el ancho total del grid
    margin: "0 auto",
    padding: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    justifyItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    padding: "0.8rem",
    width: "130px", // Tarjetas más angostas
    textAlign: "center",
    transition: "transform 0.2s ease",
  },
  button: {
    border: "none",
    background: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
  },
  label: {
    marginTop: "0.4rem",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#333",
  },
};

export default NavigationButtons;
