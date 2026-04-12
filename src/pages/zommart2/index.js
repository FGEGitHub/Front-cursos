import ZoomCarousel from "./ZoomCarousel";
import img1 from "../../Assets/foto1.jpeg";
import img2 from "../../Assets/foto2.jpeg";
import img3 from "../../Assets/foto1.jpeg";
import img4 from "../../Assets/foto3.jpeg";

function App() {
  return (
    <>
   <ZoomCarousel
  images={[
    { src: img1, focus: { x: 70, y: 55 } }, // montaña → ciudad
    { src: img2, focus: { x: 75, y: 40 } }, // ciudad → isla
    { src: img3, focus: { x: 25, y: 45 } }, // isla → montaña
  ]}
/></>
  );
}

export default App;