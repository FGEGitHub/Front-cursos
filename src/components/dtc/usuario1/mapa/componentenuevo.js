import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import servicioDtc from '../../../../services/dtc'; // Servicio para obtener el mapa

// Fix iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});
const iconos = {
  Casa: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  }),
  Dispositivo: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
  }),
  "Visita Domiciliaria": new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
  }),
  "Asistencia Social": new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    iconSize: [32, 32],
  }),
  Otras: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    iconSize: [32, 32],
  }),
};

const Leyenda = () => {
  return (
    <div style={{
      position: "absolute",
      bottom: 20,
      right: 20,
      background: "white",
      padding: 10,
      borderRadius: 8,
      boxShadow: "0 0 5px rgba(0,0,0,0.3)",
      zIndex: 1000
    }}>
      <strong>Referencias</strong>
      <div>🔴 Casa</div>
      <div>🔵 Dispositivo</div>
      <div>🟢 Visita Domiciliaria</div>
      <div>🟡 Asistencia Social</div>
      <div>🟣 Otras</div>
    </div>
  );
};



const CrearPunto = ({ setNuevoPunto }) => {
  useMapEvents({
    click(e) {
      setNuevoPunto(e.latlng);
    }
  });
  return null;
};

export default function MapComponent() {
  const [puntos, setPuntos] = useState([]);
    const [usuario, setUsuario] = useState(null);
  const [nuevoPunto, setNuevoPunto] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    observaciones: ""
  });

  // 🔹 Traer puntos del backend

 useEffect(() => {
    traer()



  }, [])
  const traer = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)
  
          setUsuario(usuario)
  
          const data = await servicioDtc.puntos()
          console.log("PUNTOS DEL BACK:", data);
          setPuntos(data)
        }
  
      } catch (error) {
  
      }
  
    }
  // 🔹 Crear punto en backend
const guardarPunto = async () => {
  try {

    if (!nuevoPunto) return alert("Toca el mapa primero");

    const nuevo = await servicioDtc.crearpuntos({
      ...formData,
      lat: nuevoPunto.lat,
      lng: nuevoPunto.lng
    });

    // Agregar el nuevo punto al estado
    setPuntos(prev => [...prev, nuevo]);

    // Limpiar
    setNuevoPunto(null);
    setFormData({
      titulo: "",
      categoria: "",
      observaciones: ""
    });

  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Error al guardar el punto");
  }
};
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Título"
          value={formData.titulo}
          onChange={e => setFormData({ ...formData, titulo: e.target.value })}
        />
      <select
  value={formData.categoria}
  onChange={e => setFormData({ ...formData, categoria: e.target.value })}
>
  <option value="">Seleccionar categoría</option>
  <option value="Casa">Casa</option>
  <option value="Dispositivo">Dispositivo</option>
  <option value="Visita Domiciliaria">Visita Domiciliaria</option>
  <option value="Asistencia Social">Asistencia Social</option>
  <option value="Otras">Otras</option>
</select>
        <input
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={e => setFormData({ ...formData, observaciones: e.target.value })}
        />
        <button onClick={guardarPunto}>Crear Punto</button>
      </div>

      <MapContainer center={[-27.47, -58.83]} zoom={13} style={{ height: "500px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CrearPunto setNuevoPunto={setNuevoPunto} />

        {/* 🔵 Pintar puntos traídos del backend */}
 {puntos
  .filter(p => p.lat && p.lng)
  .map(p => (
    <Marker
      key={p.id}
  position={[Number(p.lat), Number(p.lng)]}
  icon={iconos[p.categoria] || iconos["Otras"]}
    >
      <Popup>
        <strong>{p.titulo}</strong><br />
        Categoría: {p.categoria}<br />
        {p.observaciones}
      </Popup>
    </Marker>
))}

        {/* 🔴 Mostrar marcador temporal */}
        {nuevoPunto && (
          <Marker position={nuevoPunto}>
            <Popup>Nuevo punto seleccionado</Popup>
          </Marker>
        )}
          <Leyenda />
      </MapContainer>
    </div>
  );
}