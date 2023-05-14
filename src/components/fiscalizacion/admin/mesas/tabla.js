import { useState, useEffect } from "react";
import servicioFisca from '../../../../services/fiscalizacion'
import MUIDataTable from "mui-datatables";
import Nuevo from './nueva'
import Cambiarvotantes from './cambiarvotantes'
import Modificar from './modificar'
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
const Lotes = () => {
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    

    const getClients = async () => {
        
        const clients = await servicioFisca.listademesas({

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
    function CutomButtonsRenderere(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          
       
           <p  onClick={() =>  navigate('/usuario2/detallecliente/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].Nombre}</p>
          
          </>
        );
      }
      //

      function CutomButtonsRendercuil(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          
       
           <p  onClick={() =>  navigate('/usuario2/detallecliente/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].cuil_cuit}</p>
          
          </>
        );
      }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
            <Cambiarvotantes
            id_mesa={clients[dataIndex].id}
            traer ={async () => {
        
                const clients = await servicioFisca.listademesas({
        
                })
                console.log(clients)
                setClients(clients)
                setLoading(false);
            }}
            />
              <Modificar
            id_mesa={clients[dataIndex].id}
            numero={clients[dataIndex].numero}
            traer ={async () => {
        
                const clients = await servicioFisca.listademesas({
        
                })
                console.log(clients)
                setClients(clients)
                setLoading(false);
            }}
            />
        
           
          </>
        );
      }
    // definimos las columnas
    const columns = [
        {
            name: "circuito",
            label: "circuito",

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
            name: "cantidad",
            label: "cantidad",

        },
      
       
    
        {
            name: "Modificar",
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
    {loading ? (<CargaDeTabla/>)
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 
 <Alert severity="info">Cantidad de mesas : {clients.length}</Alert>
    </Stack>
    <br/>
    <Nuevo
    getClients =  { async () => {
        const clients = await servicioFisca.listademesas({
        })
        setClients(clients)
    }}
    />
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