import ZoomCarousel from "./ZoomCarousel";
import img1 from "../../Assets/foto1.jpeg";
import img2 from "../../Assets/foto2.jpeg";
import img3 from "../../Assets/foto1.jpeg";
import img4 from "../../Assets/foto1.jpeg";

function App() {
  return (
    <>
    <ZoomCarousel
      images={[img1, img2, img3, img4]}
    /></>
  );
}

export default App;