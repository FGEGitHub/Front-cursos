import * as React from 'react';
import { useParams } from "react-router-dom"
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useState, useEffect } from "react";
import servicioFidei from '../../../../services/fiscalizacion'
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";





export default function Ingresos() {
    let params = useParams()

    const navigate = useNavigate();
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

{inscrip[dataIndex].nombreescuela === null ? <> Sin completar</>:<>{inscrip[dataIndex].nombreescuela}</>}
             
            </>

        );
    }

    function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
        return (
            <>

         <PersonSearchIcon  onClick={() => navigate('/fiscalizacion/persona/'+inscrip[dataIndex].id)}  />
           
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
            name: "telefono",
            label: "telefono",

        },
        {
            name: "telefono2",
            label: "telefono2",

        },

       

        {
            name: "donde vota",
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
            name: "Ver",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer2(
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

                    title={"Lista de Personas"}
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