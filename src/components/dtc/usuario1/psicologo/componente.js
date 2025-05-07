import React, { useEffect, useState } from 'react';
import servicioDtc from '../../../../services/dtc';

const ListaAsistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
  const usuario = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;

  useEffect(() => {
   
    fetchAsistencias();
  }, []);
  const fetchAsistencias = async () => {
    try {
      if (usuario) {
        const response = await servicioDtc.traerturnosdepsico(usuario.id);
        setAsistencias(response);
      }
    } catch (error) {
      console.error('Error al obtener asistencias:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Lista de Turnos</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.length > 0 ? (
            asistencias.map((asistencia, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-2">{asistencia.fecha}</td>
                <td className="border px-4 py-2">{asistencia.nombre}</td>
                <td className="border px-4 py-2">{asistencia.presente ? 'Presente' : 'Ausente'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">No hay asistencias registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAsistencias;
