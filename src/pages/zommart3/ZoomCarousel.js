import React, { useEffect, useRef, useState } from "react";
import "./ZoomCarousel.css";

const DURATION = 12000;

const ZoomCarousel = ({ images = [] }) => {
  const [index, setIndex] = useState(0);
  
  const requestRef = useRef();
  const startRef = useRef();
const prev =
  images[(index - 1 + images.length) % images.length];
const animate = (time) => {
  if (!startRef.current) startRef.current = time;

  const elapsed = time - startRef.current;
  const rawT = (elapsed % DURATION) / DURATION;

  const t = Math.min(rawT, 0.999);

  const cycle = Math.floor(elapsed / DURATION);
  const nextIndex = cycle % images.length;

  /* 🔥 CAMBIO SOLO AL INICIO DEL CICLO */
  if (nextIndex !== index && rawT < 0.02) {
    setIndex(nextIndex);
  }

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
    "--fx-prev": prev.focus.x,
    "--fy-prev": prev.focus.y,
    "--fx-next": next.focus.x,
    "--fy-next": next.focus.y,
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