import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import productosImg from "../../../Assets/iraproductos.png";
import movimientosImg from "../../../Assets/iramovimientoss.png";
import costosFijosImg from "../../../Assets/iraproductos.png";
import stockImg from "../../../Assets/irastock.png";
import informesImg from "../../../Assets/irainformess.png";
import cajaImg from "../../../Assets/iracaja.png";
import negocioImg from "../../../Assets/iraproductos.png";
import Bot from "../bot";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageList = [
    negocioImg,
    cajaImg,
    productosImg,
    movimientosImg,
    costosFijosImg,
    stockImg,
    informesImg,
  ];

  useEffect(() => {
    if (loadedImages === imageList.length) {
      setIsLoaded(true);
    }
  }, [loadedImages]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  const mainButton = {
    img: negocioImg,
    route: "/usuario1/minegocio",
    label: "Mi Negocio",
  };

  const secondaryButtons = [
    { img: cajaImg, route: "/usuario1/caja", label: "Caja" },
    { img: productosImg, route: "/usuario1/productos", label: "Productos" },
    { img: movimientosImg, route: "/usuario1/movimientos", label: "Movimientos" },
    { img: costosFijosImg, route: "/usuario1/costosfijos", label: "Costos Fijos" },
    { img: stockImg, route: "/usuario1/stock", label: "Stock" },
    { img: informesImg, route: "/usuario1/informes", label: "Informes" },
  ];

  if (!isLoaded) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", fontSize: "1.2rem" }}>
        Cargando...
        {imageList.map((src, index) => (
          <img key={index} src={src} alt="" style={{ display: "none" }} onLoad={handleImageLoad} />
        ))}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Bot />
      <div style={styles.centered}>
        <div style={styles.cardMain}>
          <button
            onClick={() => navigate(mainButton.route)}
            style={styles.button}
          >
            <img src={mainButton.img} alt={mainButton.label} style={styles.imageMain} />
            <div style={styles.labelMain}>{mainButton.label}</div>
          </button>
        </div>
      </div>

      <div style={styles.grid}>
        {secondaryButtons.map((btn, index) => (
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
    maxWidth: "600px",
    margin: "0 auto",
    padding: "1rem",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
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
    width: "130px",
    textAlign: "center",
    transition: "transform 0.2s ease",
  },
  cardMain: {
    backgroundColor: "#e0f2f1",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    padding: "1rem",
    width: "150px",
    textAlign: "center",
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
  imageMain: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  label: {
    marginTop: "0.4rem",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#333",
    fontFamily: "Montserrat, sans-serif",
  },
  labelMain: {
    marginTop: "0.6rem",
    fontSize: "1.05rem",
    fontWeight: "700",
    color: "#2e7d32",
    fontFamily: "Montserrat, sans-serif",
  },
};

export default NavigationButtons;
