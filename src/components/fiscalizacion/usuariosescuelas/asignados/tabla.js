import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioFidei from '../../../../services/fiscalizacion'
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ConfirmarCapa from "./confirmarcapacitacion";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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

export default function Ingresos() {
   
    const navigate = useNavigate();

    const [inscrip, setInscrip] = useState([]);
    const [vista, setVista] = useState(true);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON)

            const ins = await servicioFidei.todaslasasignacionesdeunaescuela(usuario.id)
            setInscrip(ins)
        }
    
     
        // 

    };
  
    function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
        <Button  onClick={() => navigate('/fiscalizacion/usuarioescuela/persona/'+inscrip[dataIndex].idpersona)} >Ver persona</Button>

          </>

        );
      }
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
          <ConfirmarCapa
          id= {inscrip[dataIndex].id}
        
          getClients = { async () => {

            const ins = await servicioFidei.todasincripciones()
            setInscrip(ins)
            // 
    
          }}/>


          </>

        );
      }

      const cambiarvista = () => {
        setVista(!vista);
      };
    
    const columns = [
        {
            name: "dni",
            label: "dni",
        },
        {
            name: "apellido",
            label: "apellido",

        },
   
        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "nombreescuela",
            label: "escuela",

        },
        {
            name: "numero",
            label: "numero mesa",

        },
       
        {
            name: "telefono",
            label: "telefono",

        },
    
        {
            name: "VER PERSONA",
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

    ];


    return (
        <div>

<Button variant='contained' onClick={cambiarvista} color='success'>Cambiar Vista</Button>
{ vista ? <>
               <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DNI</StyledTableCell>
            <StyledTableCell align="right">Apellido</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Escuela</StyledTableCell>
            <StyledTableCell align="right">Numero de mesa</StyledTableCell>
            <StyledTableCell align="right">Ver persona</StyledTableCell>
            <StyledTableCell align="right">Capacitacion</StyledTableCell>
 
          </TableRow>
        </TableHead>
        <TableBody>
          {inscrip.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.dni}
              </StyledTableCell>
              <StyledTableCell align="right">{row.apellido}</StyledTableCell>
              <StyledTableCell align="right">{row.nombre}</StyledTableCell>
              <StyledTableCell align="right">{row.nombreescuela}</StyledTableCell>
              <StyledTableCell align="right">{row.numero}</StyledTableCell>
              <StyledTableCell align="right"> <Button  onClick={() => navigate('/fiscalizacion/usuarioescuela/persona/'+row.idpersona)} >Ver persona</Button></StyledTableCell>
              <StyledTableCell align="right">
          <ConfirmarCapa
          id= {row.id}
        
          getClients = { async () => {

            const ins = await servicioFidei.todasincripciones()
            setInscrip(ins)
            // 
    
          }}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

  
    </TableContainer>    
    </>:<>
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

                    title={"Lista de Incripciones"}
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
                </>}
          
        </div>
    );
}