import React, { useEffect, useRef, useState } from "react";
import "./ZoomCarousel.css";

const DURATION = 12000;

const ZoomCarousel = ({ images = [] }) => {
  const [index, setIndex] = useState(0);
  const requestRef = useRef();
  const startRef = useRef();

  const animate = (time) => {
    if (!startRef.current) startRef.current = time;

    const elapsed = time - startRef.current;

    // 🔥 tiempo continuo (NO resetea)
    const t = (elapsed % DURATION) / DURATION;

    // 🔥 índice sin cortes
    const newIndex = Math.floor(elapsed / DURATION) % images.length;

    if (newIndex !== index) {
      setIndex(newIndex);
    }

    // 🔥 actualiza variable CSS
    const container = document.querySelector(".zoom-container");
    if (container) {
      container.style.setProperty("--t", t);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [index]);

  const current = images[index];
  const next = images[(index + 1) % images.length];

  return (
    <div className="zoom-container">
      <div
        className="zoom-slide current"
        style={{
          backgroundImage: `url(${current.src})`,
          "--fx": current.focus.x,
          "--fy": current.focus.y,
        }}
      />

      <div
        className="zoom-slide next"
        style={{
          backgroundImage: `url(${next.src})`,
          "--fx": next.focus.x,
          "--fy": next.focus.y,
        }}
      />
    </div>
  );
};

export default ZoomCarousel;