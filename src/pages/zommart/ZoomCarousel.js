import React, { useEffect, useState } from "react";
import "./ZoomCarousel.css";

const DURATION = 12000;
const SWITCH_TIME = 10800;

const ZoomCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(images.length > 1 ? 1 : null);

  useEffect(() => {
    if (images.length <= 1) return;

    const timeout = setTimeout(() => {
      const newCurrent = next;
      const newNext = (next + 1) % images.length;

      setCurrent(newCurrent);
      setNext(newNext);
    }, SWITCH_TIME);

    return () => clearTimeout(timeout);
  }, [current, next, images.length]);

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
            style={{ backgroundImage: `url(${img})` }}
          />
        );
      })}
    </div>
  );
};

export default ZoomCarousel;