import { useState, useEffect } from "react";
import servicioFisca from '../../../../services/fiscalizacion'
import MUIDataTable from "mui-datatables";

import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import Traslados from "./vertraslado"
import Ubicacion from "./modalubi"

import Info from "./modalverdetalles"



//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Lotes = () => {
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    const getClients = async () => {

        const clients = await servicioFisca.listadeescuelas({

        })
        console.log(clients)
        setClients(clients)
        setLoading(false);
    }

    useEffect(() => {
        getClients()
    }, [])

    ///
    //opcionde click en el nombre
    function CutomButtonsRenderer3(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                <Info
                    id={clients[dataIndex].id}
                />



            </>
        );
    }
    //

    function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                {clients[dataIndex].cantidad_mesas - clients[dataIndex].cantidad_asig}

            </>
        );
    }

    function traslados(dataIndex, rowIndex, data, onClick) {
        return (
            <>

                <Traslados
                    id={clients[dataIndex].id}
                    nombre={clients[dataIndex].nombre}
                />


            </>
        );
    }
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

         
               
                <Ubicacion
                    id={clients[dataIndex].id}
                    nombre={clients[dataIndex].nombre}
                    circuito={clients[dataIndex].circuito}

                    getClients={async () => {

                        const clients = await servicioFisca.listadeescuelas({

                        })
                        console.log(clients)
                        setClients(clients)
                        setLoading(false);
                    }} />



            </>
        );
    }
    // definimos las columnas
    const columns = [
        {
            name: "id",
            label: "ID",

        },
        {
            name: "nombre",
            label: "Escuela",

        },
        {
            name: "circuito",
            label: "Circuito",

        },
        {
            name: "dato1",
            label: "Encargado",

        },

        {
            name: "dato2",
            label: "telefono encargado",

        },
  
  
        {
            name: "cantidad_movil",
            label: "cantidad que necesitan movil",

        },
        {
            name: "cantidad_veg",
            label: "cantidad veg",

        },
        {
            name: "cantidad_cel",
            label: "cantidad celiaco",

        },
        {
            name: "Traslado",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    traslados(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "Faltan",
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
        {
            name: "Ver escuela",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer3(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },

        {
            name: "Modificar/borrar",
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

    const options = {

        /*    rowsPerPage: 10,
           download: false, // hide csv download option
           onTableInit: this.handleTableInit,
           onTableChange: this.handleTableChange, */
    };
    // renderiza la data table
    return (
        <>

            {loading ? ("<CargaDeTabla />")
                : (
                    <div>
                        <Stack spacing={2} sx={{ width: '100%' }}>

                            <Alert severity="info">Cantidad de Escuelas : {clients.length} (No estan contemplados los suplentes)</Alert>
                        </Stack>

                      
                        <br />
                                               <MUIDataTable

                            title={"Lista de Mesas"}
                            data={clients}
                            columns={columns}
                            actions={[
                                {
                                    icon: 'save',
                                    tooltip: 'Save User',
                                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                                }
                            ]}
                            options={options}


                        />
                    </div>
                )}
        </>


    )
}

export default Lotes;