import { useState, useEffect } from "react";
import servicioFisca from '../../../../services/fiscalizacion'
import MUIDataTable from "mui-datatables";
import CargaDeTabla from "../../../CargaDeTabla"
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const Circuito = () => {
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    

    const getClients = async () => {
        
        const clients = await servicioFisca.listadecircuitos({

        })
        console.log(clients)
        setClients(clients)
        setLoading(false);
    }

    useEffect(() => {
        getClients()
    }, [])



    // definimos las columnas
    const columns = [
        {
            name: "circuito",
            label: "circuito",

        },
        {
            name: "cantidad_m",
            label: "cantidad mesas",

        }, 
         {
            name: "cantidad",
            label: "cantidad",

        },
   
     
    
        {
            name: "dif",
            label: "Faltan",

        },
  
        {
            name: "Porcentaje ",
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


    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
           {(clients[dataIndex].porc).toFixed(2)}%
           
          </>
        );
      }
const options = {

    /*    rowsPerPage: 10,
       download: false, // hide csv download option
       onTableInit: this.handleTableInit,
       onTableChange: this.handleTableChange, */
};
// renderiza la data table
return (
    <>
    {loading ? (<CargaDeTabla/>)
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 
 <Alert severity="info">Cantidad de mesas : {clients.length}</Alert>
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

export default Circuito;