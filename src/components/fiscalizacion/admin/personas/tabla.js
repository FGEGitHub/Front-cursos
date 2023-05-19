import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioFidei from '../../../../services/fiscalizacion'
import Volver from './volverpaso2'
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";





export default function Ingresos() {
    let params = useParams()


    const [inscrip, setInscrip] = useState([]);



    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {

        const ins = await servicioFidei.traerpersonas()
        setInscrip(ins)
        // 

    };


    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                <Volver
                    dni={inscrip[dataIndex].dni}
                    id_inscripcion={inscrip[dataIndex].id}
                    traer={async () => {

                        const ins = await servicioFidei.traerpaso2inscrip()
                        setInscrip(ins)
                        // 

                    }}
                />
            </>

        );
    }



    const columns = [
        {
            name: "dni",
            label: "dni",
        },

        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "nombreescuela",
            label: "escuela",

        },
        {
            name: "nombreescuela2",
            label: "escuela2",

        },

        {
            name: "telefono",
            label: "telefono",

        },
        {
            name: "donde_vota",
            label: "donde_vota",

        },

        {
            name: "Acciones/llamado",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

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

                    title={"Lista de Incripciones"}
                    data={inscrip}
                    columns={columns}
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