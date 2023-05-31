import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioFidei from '../../../../services/fiscalizacion'
import ModalBorrar from './borrarinscripcion'
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Vernscripto from "./verinscripto";
import AsignarEnc from './asignarencargado'
import Coment from './editarobservaciones'
import CambiarEst from './cambiarestado'



export default function Ingresos() {
    let params = useParams()


    const [inscrip, setInscrip] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {

        const ins = await servicioFidei.todasincripciones()
        setInscrip(ins[0])
        // 

    };


    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

                <Vernscripto
                    dni={inscrip[dataIndex].dni}
                    nombre={inscrip[dataIndex].nombre}
                    apellido={inscrip[dataIndex].apellido}
                    escuela={inscrip[dataIndex].nombre_escuela}
                    fecha_carga={inscrip[dataIndex].fecha_carga}
                    telefono={inscrip[dataIndex].telefono}
                    telefono2={inscrip[dataIndex].telefono2}
                    como_se_entero={inscrip[dataIndex].como_se_entero}
                    apellido_referido={inscrip[dataIndex].apellido_referido}
                    nombre_referido={inscrip[dataIndex].nombre_referido}
                    id_inscripcion={inscrip[dataIndex].id}
                    observaciones={inscrip[dataIndex].observaciones}
                    estado={inscrip[dataIndex].estado}
                    getClients={async () => {

                        const ins = await servicioFidei.todasincripciones()
                        setInscrip(ins[0])
                        // 

                    }} />

                <ModalBorrar
                    id={inscrip[dataIndex].id}
                    getClients={async () => {

                        const ins = await servicioFidei.todasincripciones()
                        setInscrip(ins[0])
                        // 

                    }}
                />
      <Coment
                    id={inscrip[dataIndex].id}
                    observaciones={inscrip[dataIndex].observaciones}
                    getClients={async () => {

                        const ins = await servicioFidei.todasincripciones()
                        setInscrip(ins[0])
                        // 

                    }}
                />
                 <CambiarEst
                    id={inscrip[dataIndex].id}
                    estado={inscrip[dataIndex].estado}
                    getClients={async () => {

                        const ins = await servicioFidei.todasincripciones()
                        setInscrip(ins[0])
                        // 

                    }}
                />
                
                <AsignarEnc
                    id_inscripcion={inscrip[dataIndex].id}
                    getClients={async () => {

                        const ins = await servicioFidei.todasincripciones()
                        setInscrip(ins[0])
                        // 

                    }} />


            </>

        );
    }
    function CutomButtonsRenderercargado(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {inscrip[dataIndex].cargadopor === undefined ? <>Autoinscripcion</> : <>{inscrip[dataIndex].cargadopor}</>}


            </>

        );
    }



    const columns = [
        {
            name: "dni",
            label: "dni",
        },

        {
            name: "apellido",
            label: "apellido",
        },

        {
            name: "nombre",
            label: "nombre",
        },

        {
            name: "telefono",
            label: "TELEFONO",
        },





        {
            name: "nombre_aliado",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderercargado(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "encargado",
            label: "encargado",
        },
        {
            name: "estado",
            label: "estado",
        },

        {
            name: "Contactar/borrar",
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
        {
            name: "observaciones",
            label: "observaciones",
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