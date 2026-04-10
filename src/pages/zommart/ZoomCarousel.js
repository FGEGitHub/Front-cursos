import React, { useEffect, useState } from "react";
import "./ZoomCarousel.css";

const DURATION = 12000;

const ZoomCarousel = ({ images = [] }) => {
const [current, setCurrent] = useState(0);
const [next, setNext] = useState(images.length > 1 ? 1 : null);
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (current + 1) % images.length;
      setNext(nextIndex);

      // apenas la nueva imagen ya llenó la pantalla,
      // la anterior desaparece
     setTimeout(() => {
  setCurrent(nextIndex);
  setNext((nextIndex + 1) % images.length);
}, DURATION - 800);
    }, DURATION);

    return () => clearInterval(interval);
  }, [current, images.length]);

  return (
    <div className="zoom-container">
      {images.map((img, i) => {
        let className = "zoom-slide";

        if (i === current) className += " current";
        if (i === next) className += " next";

        return (
          <div
            key={i}
            className={className}
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ZoomCarousel;