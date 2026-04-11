import ZoomCarousel from "./ZoomCarousel";
import img1 from "../../Assets/foto1.jpeg";
import img2 from "../../Assets/foto2.jpeg";
import img3 from "../../Assets/foto1.jpeg";
import img4 from "../../Assets/foto1.jpeg";

function App() {
  return (
    <>
    <ZoomCarousel
      images={[  { src: img1, focus: { x: 50, y: 50 } }, // centro
  { src: img2, focus: { x: 50, y: 50 } }, // arriba derecha
  { src: img3, focus: { x: 50, y: 50 }  }, // abajo izquierda
  { src: img4, focus: { x: 50, y: 50 }  },]}
    /></>
  );
}

export default App;