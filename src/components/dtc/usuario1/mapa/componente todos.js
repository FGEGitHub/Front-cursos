import React, { useEffect } from 'react';
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

const LoadKML = ({ kmlUrl }) => {
  const map = useMap();

  useEffect(() => {
    console.log('Cargando KML desde:', kmlUrl);
    const kmlLayer = omnivore.kml(kmlUrl)
      .on('ready', function() {
        console.log('KML cargado correctamente:', this.toGeoJSON());
        map.fitBounds(this.getBounds());

        // Añadir eventos de clic en los puntos del KML
        this.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            layer.on('click', () => {
              const { name, description } = layer.feature.properties;
              L.popup()
                .setLatLng(layer.getLatLng())
                .setContent(`<strong>${name || 'Sin nombre'}</strong><br>${description || 'Sin descripción'}`)
                .openOn(map);
            });
          }
        });
      })
      .on('error', function() {
        console.error('Error al cargar el archivo KML');
      })
      .addTo(map);

    return () => {
      map.removeLayer(kmlLayer);
    };
  }, [kmlUrl, map]);

  return null;
};

const MapComponent = () => {
  const kmlUrl = Mapa; // Asegúrate de que la ruta sea correcta

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LoadKML kmlUrl={kmlUrl} />
    </MapContainer>
  );
};

export default MapComponent;
