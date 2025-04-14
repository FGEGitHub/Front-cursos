import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import productosImg from "../../../Assets/productos.png";
import movimientosImg from "../../../Assets/movimientos.webp";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const productosRef = useRef(null);
  const movimientosRef = useRef(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.dataset.name);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (productosRef.current) observer.observe(productosRef.current);
    if (movimientosRef.current) observer.observe(movimientosRef.current);

    return () => {
      if (productosRef.current) observer.unobserve(productosRef.current);
      if (movimientosRef.current) observer.unobserve(movimientosRef.current);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div
        ref={productosRef}
        data-name="productos"
        style={{
          ...styles.buttonWrapper,
          transform: active === "productos" ? "scale(1.1)" : "scale(1)",
        }}
      >
        <button onClick={() => navigate("/productos")} style={styles.button}>
          <img src={productosImg} alt="Productos" style={styles.image} />
        </button>
      </div>
      <div
        ref={movimientosRef}
        data-name="movimientos"
        style={{
          ...styles.buttonWrapper,
          transform: active === "movimientos" ? "scale(1.1)" : "scale(1)",
        }}
      >
        <button onClick={() => navigate("/movimientos")} style={styles.button}>
          <img src={movimientosImg} alt="Movimientos" style={styles.image} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Uno arriba del otro
    alignItems: "center",    // Centrado
    gap: "2rem",
    marginTop: "2rem",
  },
  buttonWrapper: {
    transition: "transform 0.3s ease",
  },
  button: {
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
  },
};

export default NavigationButtons;
