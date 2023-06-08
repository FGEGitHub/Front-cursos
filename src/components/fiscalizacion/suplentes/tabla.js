import { useState, useEffect } from "react";
import servicioFisca from '../../../services/fiscalizacion'
import MUIDataTable from "mui-datatables";
import Checkbox from '@mui/material/Checkbox';
import ConfirmarCapa from "./confirmarcapacitacion";
import RechazarCapa from "./sacarcapacitacion";

import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const Lotes = () => {
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const getClients = async () => {
        
        const clients = await servicioFisca.listademesassuplentes({

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
const checkede = async (id) => {
    console.log(id)
     await servicioFisca.checksuplente(id)
     getClients()
  };
    function CutomButtonsRendererr(dataIndex, rowIndex, data, onClick) {
        return (
          <>
           
            
           {clients[dataIndex].checkk == null  || clients[dataIndex].checkk == 'No'? <><p style={{ color: 'crimson' }} > No sumado al wasap </p><Checkbox   onClick={() => checkede(clients[dataIndex].id)}  {...label} /> </>:<> <p style={{ color: 'green' }} >sumado al wasap</p> <Checkbox onClick={() => checkede(clients[dataIndex].id)}  {...label} defaultChecked /></>}

           
          </>
        );
      }


      function CutomButtonsRendererCapacitado(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
      {clients[dataIndex].capacitado === 'No' ? <><p style={{ color: 'warning' }} >No Capacitado</p></>:<><p style={{ color: 'green' }} >Capacitado</p></>}

          </>

        );
      }
      function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
          <ConfirmarCapa
          id= {clients[dataIndex].id}
        
          getClients = {async () => {
        
            const clients = await servicioFisca.listademesassuplentes({
    
            })
            console.log(clients)
            setClients(clients)
            setLoading(false);
        }}/>

  <RechazarCapa
          id= {clients[dataIndex].id}
        
          getClients = {async () => {
        
            const clients = await servicioFisca.listademesassuplentes({
    
            })
            console.log(clients)
            setClients(clients)
            setLoading(false);
        }}/>
          </>

        );
      }
    // definimos las columnas
    const columns = [
        {
            name: "dni",
            label: "dni",

        }, 
         {
            name: "numero",
            label: "numero",

        },
   
        {
            name: "nombre",
            label: "Escuela",

        },
        {
            name: "nombredondevota",
            label: "donde vota",

        },
        {
            name: "apellido",
            label: "Apellido Fiscal",

        },
        {
            name: "nombrepers",
            label: "Nombre Fiscal",

        },
        {
            name: "telefono",
            label: "telefono",

        },
        {
            name: "telefono2",
            label: "telefono 2",

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

        {
            name: "Capacitado",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRendererCapacitado(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        },  
        {
            name: "Modificar",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRendererr(
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
    {loading ? ("dsa")
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 
 <Alert severity="info">Cantidad de suplentes : {clients.length}</Alert>
    </Stack>
    <br/>
    
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