import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import servicioDtc from '../../../../services/dtc';

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

  const [asistencias, setAsistencias] = useState([]);
  const [mostrarSelectAsistencia, setMostrarSelectAsistencia] = useState(false);
const [errores, setErrores] = useState({
  titulo: false
});
  const [chiques, setChiques] = useState([]);
  const [mostrarSelectCasa, setMostrarSelectCasa] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    observaciones: "",
    id_asistencia: "",
    id_chique: ""
  });

  useEffect(() => {
    traer();
  }, []);

  const traer = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        setUsuario(usuario);

        const data = await servicioDtc.puntos();
        setPuntos(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🔴 ELIMINAR PUNTO
  const eliminarPunto = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este punto?");
    if (!confirmar) return;

    try {
      await servicioDtc.borrarpunto(id);

      // Actualizar estado sin recargar todo
      setPuntos(prev => prev.filter(p => p.id !== id));

    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el punto");
    }
  };

  const traerAsistencias = async () => {
    try {
      const data = await servicioDtc.traerasitenciasociales();
      setAsistencias(data);
      setMostrarSelectAsistencia(true);
      setMostrarSelectCasa(false);

      setFormData(prev => ({
        ...prev,
        categoria: "Asistencia Social"
      }));

    } catch (error) {
      console.error("Error trayendo asistencias:", error);
    }
  };

  const traerChiques = async () => {
    try {
      const data = await servicioDtc.listachiquesmomentaneo();
      setChiques(data[0]);
      setMostrarSelectCasa(true);
      setMostrarSelectAsistencia(false);

      setFormData(prev => ({
        ...prev,
        categoria: "Casa"
      }));

    } catch (error) {
      console.error("Error trayendo chiques:", error);
    }
  };

  const guardarPunto = async () => {

  if (!formData.titulo.trim()) {
    setErrores({ titulo: true });
    return alert("El título es obligatorio");
  }

  if (!nuevoPunto) return alert("Toca el mapa primero");

  try {

    const nuevo = await servicioDtc.crearpuntos({
      ...formData,
      lat: nuevoPunto.lat,
      lng: nuevoPunto.lng
    });

    setPuntos(prev => [...prev, nuevo]);

    setNuevoPunto(null);

    setFormData({
      titulo: "",
      categoria: "",
      observaciones: "",
      id_asistencia: "",
      id_chique: ""
    });

  } catch (error) {
    console.error("Error al guardar:", error);
  }
};

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
      
      <input
  placeholder="Título *"
  value={formData.titulo}
  required
  style={{
    border: errores.titulo ? "2px solid red" : "1px solid #ccc",
    outline: "none",
    padding: "6px",
    borderRadius: 4
  }}
  onChange={e => {
    setFormData({ ...formData, titulo: e.target.value });

    if (e.target.value.trim() !== "") {
      setErrores(prev => ({ ...prev, titulo: false }));
    }
  }}
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

      <button onClick={traerAsistencias}>
        Nueva Asistencia
      </button>

      <button onClick={traerChiques} style={{ marginLeft: 10 }}>
        Agregar Casa
      </button>

      {mostrarSelectAsistencia && (
        <select
          value={formData.id_asistencia}
          onChange={(e) =>
            setFormData({
              ...formData,
              id_asistencia: e.target.value
            })
          }
        >
          <option value="">Seleccionar asistencia</option>
          {asistencias.map((a) => (
            <option key={a.id} value={a.id}>
              {a.titulo}
            </option>
          ))}
        </select>
      )}

      {mostrarSelectCasa && (
        <select
          value={formData.id_chique}
          onChange={(e) =>
            setFormData({
              ...formData,
              id_chique: e.target.value
            })
          }
        >
          <option value="">Seleccionar chique</option>
          {chiques.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre} {c.apellido}
            </option>
          ))}
        </select>
      )}

      <MapContainer center={[-27.47, -58.83]} zoom={13} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CrearPunto setNuevoPunto={setNuevoPunto} />

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
                <br /><br />
                <button
                  onClick={() => eliminarPunto(p.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: 4,
                    cursor: "pointer"
                  }}
                >
                  Eliminar
                </button>
              </Popup>
            </Marker>
          ))}

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