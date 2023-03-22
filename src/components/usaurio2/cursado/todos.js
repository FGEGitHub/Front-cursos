import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioAdministracion from '../../../services/administracion'

import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";




export default function Ingresos() {
    let params = useParams()


    const [cursado, setCursado] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
        console.log('Historial')
        const historial = await servicioAdministracion.traertodoelcursado()

        setCursado(historial[0])
        setTurnos(historial[1])
        // 

    };





    const columns = [
        {
            name: "apellidopersona",
            label: "apellidopersona",
        },

        {
            name: "nombrepersona",
            label: "nombrepersona",
        },

        {
            name: "id_turno",
            label: "id_turno",

        },
        {
            name: "horarioincripcion",
            label: "horario inscripcion",

        },
        {
            name: "numero",
            label: "horario cursado",

        },

        {
            name: "uno",
            label: "opcion 1",

        },
        {
            name: "dos",
            label: "opcion 2",

        },
        {
            name: "cursoo",
            label: "Cursando",

        },



    ];
    const columns2 = [
        {
            name: "id",
            label: "id",
        },

        {
            name: "nombre",
            label: "Nombre curso",
        },

       



    ];

    return (
        <div>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#eeeeee',
                    color: '#eeeeee',
                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                }}
            >


                <MUIDataTable

                    title={"Lista de cursado"}
                    data={cursado}
                    columns={columns}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}



                />
                <MUIDataTable

                    title={"Lista de curso"}
                    data={turnos}
                    columns={columns2}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}



                />
                

            </Paper>

        </div>
    );
}
