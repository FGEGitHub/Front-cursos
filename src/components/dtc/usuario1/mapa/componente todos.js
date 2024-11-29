import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import omnivore from '@mapbox/leaflet-omnivore';
import Mapa from '../../../../Assets/mapadtc.kml';

// Configuración del icono
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Carga del archivo KML y permite marcar un punto
const LoadKML = ({ kmlUrl, selectedPoint, setMarkedPoint }) => {
  const map = useMap();
  const [kmlLayer, setKmlLayer] = useState(null);
  const [highlightMarker, setHighlightMarker] = useState(null); // Referencia al marcador resaltado

  useEffect(() => {
    const layer = omnivore.kml(kmlUrl)
      .on('ready', function () {
        map.fitBounds(this.getBounds());
        this.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const { name, description } = layer.feature.properties;

            // Vincular un popup al marcador
            layer.bindPopup(`<strong>${name || 'Sin nombre'}</strong><br>${description || 'Sin descripción'}`);

            // Evento de clic en el marcador
            layer.on('click', () => {
              // Actualizar el estado del punto marcado
              setMarkedPoint({ name, latlng: layer.getLatLng() });

              // Resaltar el marcador seleccionado
              if (highlightMarker) {
                map.removeLayer(highlightMarker); // Eliminar el marcador anterior
              }
              const newHighlight = L.circleMarker(layer.getLatLng(), {
                radius: 10,
                color: 'red',
                fillColor: 'red',
                fillOpacity: 0.5,
              }).addTo(map);
              setHighlightMarker(newHighlight);
            });
          }
        });
      })
      .addTo(map);

    setKmlLayer(layer);

    return () => {
      if (layer) map.removeLayer(layer);
      if (highlightMarker) map.removeLayer(highlightMarker);
    };
  }, [kmlUrl, map, setMarkedPoint, highlightMarker]);

  // Centrar el mapa en el punto seleccionado si cambia
  useEffect(() => {
    if (selectedPoint && kmlLayer) {
      kmlLayer.eachLayer((layer) => {
        if (
          layer instanceof L.Marker &&
          layer.feature.properties.name === selectedPoint.name
        ) {
          map.setView(layer.getLatLng(), 15);
          layer.openPopup();
        }
      });
    }
  }, [selectedPoint, kmlLayer, map]);

  return null;
};

// Selector de puntos
const PointSelector = ({ points, onSelect, onSave, markedPoint }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="pointSelector">Seleccionar un punto: </label>
      <select id="pointSelector" onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Seleccionar --</option>
        {points.map((point) => (
          <option key={point} value={point}>
            {point}
          </option>
        ))}
      </select>
      <button
        style={{ marginLeft: '10px' }}
        onClick={() => onSave(markedPoint)}
        disabled={!markedPoint}
      >
        Guardar selección
      </button>
    </div>
  );
};

// Componente principal
const MapComponent = () => {
  const kmlUrl = Mapa;
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [markedPoint, setMarkedPoint] = useState(null);
  const [availablePoints, setAvailablePoints] = useState([]);

  // Extraer puntos del KML
  useEffect(() => {
    const kmlLayer = omnivore.kml(kmlUrl)
      .on('ready', function () {
        const points = [];
        this.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const { name } = layer.feature.properties;
            if (name) points.push(name);
          }
        });
        setAvailablePoints(points);
      });

    return () => {
      kmlLayer.remove();
    };
  }, [kmlUrl]);

  // Guardar el punto marcado (puedes modificar para guardarlo en un backend o almacenamiento local)
  const handleSave = (point) => {
    if (point) {
      console.log('Punto guardado:', point);
      alert(`Punto guardado: ${point.name}`);
    }
  };

  return (
    <div>
      <PointSelector
        points={availablePoints}
        onSelect={(name) => {
          const point = availablePoints.find((p) => p === name);
          setSelectedPoint(point ? { name } : null);
        }}
        onSave={handleSave}
        markedPoint={markedPoint}
      />
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LoadKML kmlUrl={kmlUrl} selectedPoint={selectedPoint} setMarkedPoint={setMarkedPoint} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
