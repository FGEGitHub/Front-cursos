import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import omnivore from '@mapbox/leaflet-omnivore';
import Mapa from '../../../../Assets/mapadtc.kml';

// Configura el icono para que Leaflet lo cargue correctamente
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Carga del archivo KML y permite centrarse en un punto específico
const LoadKML = ({ kmlUrl, selectedPoint }) => {
  const map = useMap();

  useEffect(() => {
    const kmlLayer = omnivore.kml(kmlUrl)
      .on('ready', function() {
        map.fitBounds(this.getBounds());

        // Añadir eventos a los puntos
        this.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            const { name, description } = layer.feature.properties;
            layer.bindPopup(`<strong>${name || 'Sin nombre'}</strong><br>${description || 'Sin descripción'}`);

            // Verificar si el punto seleccionado coincide
            if (selectedPoint && selectedPoint === name) {
              map.setView(layer.getLatLng(), 15); // Centrar en el punto seleccionado
              layer.openPopup();
            }
          }
        });
      })
      .addTo(map);

    return () => {
      map.removeLayer(kmlLayer);
    };
  }, [kmlUrl, map, selectedPoint]);

  return null;
};

// Componente de selección del punto
const PointSelector = ({ points, onSelect }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="pointSelector">Seleccionar un punto: </label>
      <select id="pointSelector" onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Seleccionar --</option>
        {points.map(point => (
          <option key={point} value={point}>{point}</option>
        ))}
      </select>
    </div>
  );
};

// Componente principal
const MapComponent = () => {
  const kmlUrl = Mapa;
  const [selectedPoint, setSelectedPoint] = useState('');
  const [availablePoints, setAvailablePoints] = useState([]);

  // Extraer los puntos del KML para mostrarlos en el selector
  useEffect(() => {
    const kmlLayer = omnivore.kml(kmlUrl)
      .on('ready', function() {
        const points = [];
        this.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            const { name } = layer.feature.properties;
            if (name) points.push(name); // Guardar nombres de puntos
          }
        });
        setAvailablePoints(points);
      });

    return () => {
      kmlLayer.remove();
    };
  }, [kmlUrl]);

  return (
    <div>
      <PointSelector points={availablePoints} onSelect={setSelectedPoint} />
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LoadKML kmlUrl={kmlUrl} selectedPoint={selectedPoint} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
