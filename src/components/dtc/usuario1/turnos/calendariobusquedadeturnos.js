import React, { useEffect, useState } from "react";
import servicioDtc from '../../../../services/dtc';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Alert } from '@mui/material';
import { useParams } from "react-router-dom";
// Archivo CSS para personalizar el calendario

const TablaNotificaciones = (props) => {
    const [chicos, setChicos] = useState([]);
    const [datos, setDatos] = useState();
    const [fechas1, setFechas1] = useState([]);
    const [fechas2, setFechas2] = useState([]);
    let params = useParams();
    let id = params.id;

    useEffect(() => {
        traer();
    }, []);

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                if(usuario.nivel==40 || usuario.nivel==41 ){
                    const novedades_aux = await servicioDtc.traercitastodoscadia(usuario.id);
                    setChicos(novedades_aux[0]);
                    setDatos(novedades_aux[1]);
    
                    // Extrae fechas1 y fechas2 de los datos recibidos y convierte las fechas a objetos Date en UTC
                    const fechas1 = novedades_aux[0].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    const fechas2 = novedades_aux[1].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    setFechas1(fechas1);
                    setFechas2(fechas2);
                }else{
                    const novedades_aux = await servicioDtc.traercitastodos(usuario.id);
                    setChicos(novedades_aux[0]);
                    setDatos(novedades_aux[1]);
    
                    // Extrae fechas1 y fechas2 de los datos recibidos y convierte las fechas a objetos Date en UTC
                    const fechas1 = novedades_aux[0].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    const fechas2 = novedades_aux[1].map(item => new Date(item.fecha + 'T00:00:00Z'));
                    setFechas1(fechas1);
                    setFechas2(fechas2);
                }
             
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const onDateClick = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Convertir la fecha a formato YYYY-MM-DD
        props.traer({ fecha: formattedDate }); // Enviar la fecha seleccionada a la función heredada por props
    };

    const isSameDay = (date1, date2) => {
        return date1.getUTCDate() === date2.getUTCDate() &&
               date1.getUTCMonth() === date2.getUTCMonth() &&
               date1.getUTCFullYear() === date2.getUTCFullYear();
    };

    return (
        <div>
    

            <h2>Lista de chicos</h2>
            {chicos  ? (
                <div>
                    <Calendar
                        onClickDay={onDateClick}
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                // Buscar todos los eventos para la fecha actual
                                const eventos = chicos.filter(chico => isSameDay(new Date(chico.fecha + 'T00:00:00Z'), date));
                                
                                // Si hay eventos, renderizar el detalle de cada uno
                                return eventos.length > 0 ? (
                                    <ul className="event-detail-list">
                                        {eventos.map((evento, index) => (
                                            <li key={index} className="event-detail-item">
                                                {evento.detalle}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null;
                            }
                            return null;
                        }}
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                if (fechas1.some(f1 => isSameDay(f1, date))) {
                                    return 'react-calendar__tile--fechas1';
                                }
                                if (fechas2.some(f2 => isSameDay(f2, date))) {
                                    return 'react-calendar__tile--fechas2';
                                }
                            }
                            return null;
                        }}
                        className="custom-calendar"
                    />
                </div>
            ) : (
                <h2>El curso aún no tiene chicos</h2>
            )}
        </div>
    );
};

export default TablaNotificaciones;
