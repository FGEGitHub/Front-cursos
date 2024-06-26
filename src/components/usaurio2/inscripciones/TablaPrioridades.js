import { useState, useEffect } from "react";
import ServicioInscripciones from '../../../services/inscripciones'
import MUIDataTable from "mui-datatables";
import Nuevo from './ModalCambiarprioridades'
import CargaDeTabla from "../../CargaDeTabla"
import imagen from "../../../Assets/imagencurso.jpg"
import { useNavigate } from "react-router-dom";
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

import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

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
      backgroundColor: "#007bb2",
      color: "white",
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
        
        const clients = await ServicioInscripciones.listacriterios({

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

// renderiza la data table
return (
    <>
    {loading ? (<CargaDeTabla/>)
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 

    </Stack>

    <Nuevo
    getClients =  { async () => {
        const clients = await ServicioInscripciones.lista({
        })
        setClients(clients)
    }}
    />
   


    <br/>  
    {vista ? <>
   
    <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "90%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >
<TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            
            <StyledTableCell align="right"> 1.1.1</StyledTableCell>
            <StyledTableCell align="right"> 1.1.2.1</StyledTableCell>
            <StyledTableCell align="right">1.1.2.2</StyledTableCell>
            <StyledTableCell align="right"> 1.2.1</StyledTableCell>
            <StyledTableCell align="right">1.2.2.1</StyledTableCell>
            <StyledTableCell align="right"> 1.2.2.2</StyledTableCell>
            <StyledTableCell align="right"> 2.1.1</StyledTableCell>
            <StyledTableCell align="right"> 2.1.2.1</StyledTableCell>
            <StyledTableCell align="right"> 2.1.2.2</StyledTableCell>
            <StyledTableCell align="right"> 2.2.1</StyledTableCell>
            <StyledTableCell align="right"> 2.2.2</StyledTableCell>
        
          
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row) => (
            <StyledTableRow key={row.name}>
            
          
              <StyledTableCell align="right">{row["1.1.1"]}</StyledTableCell>
              <StyledTableCell align="right">{row["1.1.2.1"]}</StyledTableCell>
              <StyledTableCell align="right">{row["1.1.2.2"]}</StyledTableCell>
              <StyledTableCell align="right">{row["1.2.1"]}</StyledTableCell>
              <StyledTableCell align="right">{row["1.2.2.1"]}</StyledTableCell>
              <StyledTableCell align="right">{row["1.2.2.2"]}</StyledTableCell>
              <StyledTableCell align="right">{row["2.1.1"]}</StyledTableCell>
              <StyledTableCell align="right">{row["2.1.2.1"]}</StyledTableCell>
              <StyledTableCell align="right">{row["2.1.2.2"]}</StyledTableCell>
              <StyledTableCell align="right">{row["2.2.1"]}</StyledTableCell>
              <StyledTableCell align="right">{row["2.2.2"]}</StyledTableCell>
             
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper></>:<></>}

<>

</>



    </div>
    )}





    </>


)
}

export default Lotes;