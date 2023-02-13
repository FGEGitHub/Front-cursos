import { useState, useEffect } from "react";
import servicioCursos from '../../../services/Cursos'
import MUIDataTable from "mui-datatables";
import Nuevo from './NuevaClase'
import CargaDeTabla from "../../CargaDeTabla"
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import { useParams } from "react-router-dom"
//////

import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const Lotes = () => {

      
    let params = useParams()
    let id = params.id
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    

    const getClients = async () => {
        
        const clients = await servicioCursos.detalledelcurso(id)
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
           <b> 
             <p 
             onClick={() =>  navigate('/coordinadores/detallecurso/'+clients[dataIndex].id)}
             style={{ color: 'blue' }}
            > Ver </p>   </b> 
           
          </>
        );
      }

      function Nombre(dataIndex, rowIndex, data, onClick) {
        return (
          <>
           <b> 
             <p 
             onClick={() =>  navigate('/coordinadores/detallecurso/'+clients[dataIndex].id)}
             style={{ color: '#blue' }}
            > {clients[dataIndex].nombre} </p>   </b> 
           
          </>
        );
      }
    // definimos las columnas
    const columns = [
        {
            name: "fecha",
            label: "Fecha creacion",

        },
       
      {
            name: "Nombre",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    Nombre(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        },   
        
        {
            name: "encargado",
            label: "Encargado",
           
        },
        {
            name: "observaciones",
            label:"Observaciones",
           
        },
       {
            name: "Actions",
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
 
 <Alert severity="info">Cantidad de clases: {clients.length}</Alert>
    </Stack>
    <br/>
    <Nuevo
    getClients =  { async () => {
        const clients = await servicioCursos.lista({
        })
        setClients(clients)
    }}
    />
        <MUIDataTable
        
            title={"Lista de Clases"}
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
     <div>
    <br/>  <br/> <br/> <br/> 
    < Tooltip> 
    <h2>Clases </h2>
    
     </Tooltip> 
    <br/>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell align="right">Observacion</StyledTableCell>
            <StyledTableCell align="right">Leida</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.fecha}
              </StyledTableCell>
          
              <StyledTableCell align="right">{row.observacion}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>


)
}

export default Lotes;