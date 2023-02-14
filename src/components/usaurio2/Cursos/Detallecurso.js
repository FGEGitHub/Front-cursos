import { useState, useEffect } from "react";
import servicioCursos from '../../../services/Cursos'
import MUIDataTable from "mui-datatables";
import Fuchacurso from './Fichacurso'
import Nuevo from './NuevaClase'
import Ver from './Verinscripto'
import CargaDeTabla from "../../CargaDeTabla"
import { useNavigate } from "react-router-dom";

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
    const [pendientes, setPendientes] = useState([]);
    const [inscriptos, setInscriptos] = useState([]);
    const [curso, setCurso] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    

    const getClients = async () => {
        
        const clients = await servicioCursos.detalledelcurso(id)
        console.log(clients)
        setClients(clients[0])
        setPendientes(clients[1])
        setInscriptos(clients[2])
        setCurso(clients[3][0])
       
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
          <Ver
          id_usuario = {inscriptos[dataIndex].id_usuario}
          />
          </>
        );
      }

      function Nombre(dataIndex, rowIndex, data, onClick) {
        return (
          <>
           <b> 
            {inscriptos[dataIndex].nombre}   </b> 
           
          </>
        );
      }

      function pendientess(dataIndex, rowIndex, data, onClick) {
        return (
          <>

{inscriptos[dataIndex].inscripcion  = "Pendiente" ? <><b style={{ color: '#ff9800' }}>     {inscriptos[dataIndex].inscripcion}    </b> </> : <><b>  <p style={{ color: '#2e7d32' }} > {inscriptos[dataIndex].inscripcion} </p>   </b></>}

           
           
          </>
        );
      }
    // definimos las columnas
    const columns = [
        {
            name: "fecha",
            label: "Fecha inscripcion",

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
        name: "Estado",
        options: {
            customBodyRenderLite: (dataIndex, rowIndex) =>
                pendientess(
                    dataIndex,
                    rowIndex,
                   // overbookingData,
                   // handleEditOpen
                )
        }
    
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
    
    { pendientes.length>0? <>     <Alert severity="success">Tienes {pendientes.length} inscripcion(es) pendiente(s) </Alert></> : <></>}
 
   

    {loading ? (<CargaDeTabla/>)
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 

    </Stack>
    <br/> <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
    <Fuchacurso
    nombre={curso.nombre}
    encargado={curso.encargado}
     fecha={curso.cupo}
     cupo={curso.cupo}
    /></Paper>
        <br/>
        <br/>
        <MUIDataTable
        
            title={"Lista de Inscriptos"}
            data={inscriptos}
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
    <br/>  <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      > <br/> <br/> 
    <Nuevo
    getClients =  { async () => {
        const clients = await servicioCursos.lista({
        })
        setClients(clients)
    }}
    /><br/> 
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
    </Paper>
    </div>
    </>


)
}

export default Lotes;