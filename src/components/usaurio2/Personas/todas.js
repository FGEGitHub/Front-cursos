import { useState, useEffect } from "react";
import servicioPersnas from '../../../services/personas'
import MUIDataTable from "mui-datatables";
import Nuevo from './NuevaPersona'
import CargaDeTabla from "../../CargaDeTabla"
import imagen from "../../../Assets/imagencurso.jpg"
import { useNavigate } from "react-router-dom";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
//import overbookingData from "./overbooking";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
////



const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

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
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vista, setVista] = useState(true);
    const navigate = useNavigate();


    
    
    const cambiarVista =  () => {
        
      setVista(!vista)
  }
    const getClients = async () => {
       
        
        const clients = await servicioPersnas.lista()
        console.log(clients)
        setClients(clients)
        setLoading(false);
    }

    useEffect(() => {
        getClients()
    }, [])

    ///
//opcionde click en el nombre
   
     
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
    
        
          <PersonSearchIcon
             onClick={() =>  navigate('/administracion/detallepersona/'+clients[dataIndex].id)}
            
            />   
           
          </>
        );
      }

 
    // definimos las columnas
    const columns = [
       
      {
        name: "dni",
        label:"dni",
       
    },
      
      {
        name: "nombre",
        label: "Apellido",
       
    }, 
        
        {
            name: "apellido",
            label: "Apellido",
           
        },
        {
          name: "participante_anterior",
          label:"participante_anterior",
         
      },
      {
        name: "trabajo",
        label:"trabajo",
       
    },
    {
      name: "hijos",
      label:"hijos",
     
  },
  {
    name: "dni",
    label:"dni",
   
},
       
        {
          name: "categoria",
          label:"categoria",
         
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
 
 <Alert severity="info">Cantidad de cursos: {clients.length}</Alert>
    </Stack>
    <br/>
    <Nuevo
    getClients =  { async () => {
        const clients = await servicioPersnas.lista({
        })
        setClients(clients)
    }}
    />
  
    <Button  variant='contained' onClick={cambiarVista} > Cambiar vista <RemoveRedEyeIcon/></Button>

{vista   ? <>
        <MUIDataTable
        
            title={"Lista de Cursos"}
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
        </> : <>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>FECHA</StyledTableCell>
            <StyledTableCell align="right">NOMBRE</StyledTableCell>
            <StyledTableCell align="right">ENCARGADO</StyledTableCell>
            <StyledTableCell align="right">ACCIONES</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.fecha}
              </StyledTableCell>
          
              <StyledTableCell align="right">{row.nombre}</StyledTableCell>
              <StyledTableCell align="right">{row.encargado}</StyledTableCell>
              <StyledTableCell align="center">  
              <IconButton    onClick={() =>  navigate('/coordinadores/detallecurso/'+row.id)} >
                Ver mas </IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


<>



</>


    </>}
    </div>
    )}





    </>


)
}

export default Lotes;