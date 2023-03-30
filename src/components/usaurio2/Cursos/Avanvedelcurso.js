import { useState, useEffect } from "react";
import servicioCursos from '../../../services/Cursos'
import MUIDataTable from "mui-datatables";
import Nuevo from './NuevoCurso'
import ModificarCurso from './ModalModificarCurso'
import CargaDeTabla from "../../CargaDeTabla"
import imagen from "../../../Assets/imagencurso.jpg"
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
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
import ServicioInscripciones from '../../../services/inscripciones'
import { useParams } from "react-router-dom"
import SocialDistanceSharpIcon from '@mui/icons-material/SocialDistanceSharp';


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
    
  let params = useParams()
  let id = params.id
    const navigate = useNavigate();


    
    
    const cambiarVista =  () => {
        
      setVista(!vista)
  }
   

    ///
//opcionde click en el nombre

const getClients = async () => {
        
  const clients = await servicioCursos.avancedelcurso(id)
  setClients(clients)
  setLoading(false);
}

useEffect(() => {
  getClients()
}, [])


    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          < Tooltip title="Avance del curso">
          <SearchIcon   onClick={() =>  navigate('/administracion/avancedelcurso/'+clients[dataIndex].id)}  />
          </Tooltip>
          <>
          < Tooltip title="Distribucion de alumnas">
          <SocialDistanceSharpIcon   onClick={() =>  navigate('/administracion/detallecurso/'+clients[dataIndex].id)}  />
          </Tooltip>
          <br/>
          </>
          <>
          <ModificarCurso
          id= {clients[dataIndex].id}
          nombre= {clients[dataIndex].nombre}
          getClients = {async () => {
        
        const clients = await servicioCursos.lista({

        })
        setClients(clients)
        setLoading(false);
    }}/>
          </>
          </>
        );
      }

      function Nombre(dataIndex, rowIndex, data, onClick) {
        return (
          <>
           <b> 
             <p 
             onClick={() =>  navigate('/administracion/detallecurso/'+clients[dataIndex].id)}
             style={{ color: '#blue' }}
            > {clients[dataIndex].nombre} </p>   </b> 
           
          </>
        );
      }
    // definimos las columnas
    const columns = [
    
  
       
      {
            name: "dato1",
           label:"Clase"
        
        },   
        
        {
          name: "presentes",
         label: 'Presentes',
        } ,

        {
            name: "ausentes",
           label: 'Ausentes',
          } ,
  


        
      
       {
            name: "Ir/Modificar",
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
              <IconButton    onClick={() =>  navigate('/administracion/detallecurso/'+row.id)} >
                Ver mas </IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


<>
<br/><br/><br/>



</>


    </>}
    </div>
    )}





    </>


)
}

export default Lotes;