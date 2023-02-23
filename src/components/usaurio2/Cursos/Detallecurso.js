import { useState, useEffect } from "react";
import servicioCursos from '../../../services/Cursos'
import MUIDataTable from "mui-datatables";
import Fuchacurso from './Fichacurso'
import ModalCursado from './ModalCursado'
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
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent } from 'react';
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
  const [value, setValue] = React.useState(0);


  let params = useParams()
  let id = params.id
  //configuracion de Hooks

  const [pendientes, setPendientes] = useState([]);
  const [inscriptosSi, setInscriptosSi] = useState([]);
  const [inscriptosNo, setInscriptosNo] = useState([]);
  const [curso, setCurso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inscriptosacepados, setInscriptosacepados] = useState([]);

  const [cursado, setCursado] = useState([]);
  const [cupodelcurso, setCupodelcurso] = useState([]);
  const navigate = useNavigate();



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getClients = async () => {

    const clients = await servicioCursos.detalledelcurso(id)
    
 
    setPendientes(clients[0])
    setCurso(clients[1])
    setInscriptosacepados(clients[3])
    setCupodelcurso(clients[4])
    setCursado(clients[5])
    setLoading(false);
  }




  useEffect(() => {
    getClients()
  }, [])

  ///
  //opcionde click en el nombre


 


  function CutomButtonsRendererpendien(dataIndex, rowIndex, data, onClick) {
    return (
      <>
        <Ver
          id_usuario={pendientes[dataIndex].dni}
          cupo={curso.cupo}
          id_inscripcion={pendientes[dataIndex].id_inscripcion}
          getClients={async () => {

            const clients = await servicioCursos.detalledelcurso(id)
    
 
            setPendientes(clients[0])
            setCurso(clients[1])
            setInscriptosacepados(clients[3])
            setCupodelcurso(clients[4])
            setCursado(clients[5])
            setLoading(false);
          }}


        />
      </>
    );
  }

  


  function prioridad(dataIndex, rowIndex, data, onClick) {
    return (
      <>

        {pendientes[dataIndex].uno === id ? <><b style={{ color: 'green' }}>  Prioridad 1  </b> </> :
          <>{pendientes[dataIndex].dos === id ? <><b style={{ color: '#fdd835' }}>    Prioridad 2  </b> </>
            : <><b style={{ color: 'crimson' }} >  Prioridad 3</b></>}</>}



      </>
    );
  }

  // definimos las columnas SI
  

  const colpendient = [
    {
      name: "prioridad",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          prioridad(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },
    {
      name: "apellido",
      label: "Apellido",

    },

    {
      name: "nombre",
      label: "Nombre",

    },
    {
      name: "participante_anterior",
      label: "Participante anterior",

    },
    {
      name: "hijos",
      label: "Hijos",

    },
    {
      name: "trabajo",
      label: "Trabajo",

    },
    {
      name: "tipo_trabajo",
      label: "Tipo de Trabajo",

    },
    {
      name: "estado",
      label: "estado",

    },

    {
      name: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRendererpendien(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },




  ];

  const columnascupo = [
    {
      name: "dato",
      label: "dato",

    },
    {
      name: "Categoria",
      label: "Categoria",

    },

    {
      name: "cantidad",
      label: "cantidad",

    },
    {
      name: "aceptados",
      label: "aceptados",

    }

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
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Paper
          sx={{
            cursor: 'pointer',
            background: '#fafafa',
            color: '#bdbdbd',
            border: '1px dashed #ccc',
            '&:hover': { border: '1px solid #ccc' },
          }}
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Info del curso" />
            <Tab label="Inscriptos" />
            <Tab label="Cursado" />
          </Tabs>
        </Paper>
      </Box>


      {/*  { pendientes[0].length>0 ||pendientes[1].length>0 || pendientes[2].length>0 ? <>     <Alert severity="success">Tienes {pendientes[0].length} inscripcion(es) de prioridad 1 pendiente(s),  {pendientes[1].length} inscripcion(es) pendiente(s) prioridad 2,{pendientes[2].length} inscripcion(es) pendiente(s) prioridad 3 cupo {inscriptosacepados}/{curso.cupo} </Alert></> : <></>} */}

      {value === 1 ? <> <br />
        <>
          {/* <MUIDataTable

            title={"Lista de Inscriptos que ya participaron - 45% - (" + (curso.cupo * 0.45).toFixed(0) + " Personas)"}
            data={inscriptosSi}
            columns={columns}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              }
            ]}
            options={options}


          /></>
        <>
          <MUIDataTable

            title={"Lista de Inscriptos que ya participaron - 55% - (" + (curso.cupo * 0.55).toFixed(0) + " Personas)"}
            data={inscriptosNo}
            columns={columnsno}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              }
            ]}
            options={options}


          /> */}
          <MUIDataTable

            title={"Lista de Inscriptos "}
            data={pendientes}
            columns={colpendient}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              }
            ]}
            options={options}


          />
        </>

      </> : <>  {value === 2 ? <>
        <br />  <Paper
          sx={{
            cursor: 'pointer',
            background: '#fafafa',
            color: '#bdbdbd',
            border: '1px dashed #ccc',
            '&:hover': { border: '1px solid #ccc' },
          }}
        > <br /> <br />
         
          < Tooltip>
            <h2>Cursado </h2>

          </Tooltip>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "20%", maxWidth: "1000%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Apellido</StyledTableCell>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Categoria </StyledTableCell>
                  <StyledTableCell align="right">Estado </StyledTableCell>
                  <StyledTableCell align="right">Acciones </StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>

                {cursado ? <>

                  {cursado.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.apellido}
                      </StyledTableCell>


                      <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                      <StyledTableCell align="right">{row.categoria}</StyledTableCell>
                      <StyledTableCell align="right">{row.inscripcion}</StyledTableCell>
                      <StyledTableCell  align="right"><ModalCursado
                      id_cursado={row.id}

                      getClients = {async () => {

                        const clients = await servicioCursos.detalledelcurso(id)
                        
                     
                        setPendientes(clients[0])
                        setCurso(clients[1])
                        setInscriptosacepados(clients[3])
                        setCupodelcurso(clients[4])
                        setCursado(clients[5])
                        setLoading(false);
                      }}
                      /></StyledTableCell>

                    </StyledTableRow>
                  ))}

                </> : <></>}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper></> : <>{loading ? (<CargaDeTabla />)
          : (
            <div>
              <Stack spacing={2} sx={{ width: '100%' }}>


              </Stack>
              <br /> <Paper
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
                  inscriptosacepados={inscriptosacepados}
                />
                <MUIDataTable

                  title={"Cupo del curso"}
                  data={cupodelcurso}
                  columns={columnascupo}
                  actions={[
                    {
                      icon: 'save',
                      tooltip: 'Save User',
                      onClick: (event, rowData) => alert("You saved " + rowData.name)
                    }
                  ]}
                  options={options}


                />

              </Paper>
              <br />

            </div>
          )}
        <div>

        </div></>}</>}


    </>


  )
}

export default Lotes;