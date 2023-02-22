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
  const [clients, setClients] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [inscriptosSi, setInscriptosSi] = useState([]);
  const [inscriptosNo, setInscriptosNo] = useState([]);
  const [curso, setCurso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inscriptosacepados, setInscriptosacepados] = useState([]);
  const [clases, setClases] = useState([]);
  const [cursado, setCursado] = useState([]);
  const [cupodelcurso, setCupodelcurso] = useState([]);
  const navigate = useNavigate();



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getClients = async () => {

    const clients = await servicioCursos.detalledelcurso(id)
    console.log(clients[2][1])
    setClients(clients[0])
    setPendientes(clients[1])
    console.log(clients[1])

    setInscriptosSi(clients[2][0])
    setInscriptosNo(clients[2][1])
    setCurso(clients[3][0])
    setInscriptosacepados(clients[4])
    setClases(clients[5])
    setCupodelcurso(clients[6])
    setCursado(clients[7])
    setLoading(false);
  }


  const getClases = async () => {
    const classs = await servicioCursos.verclases(id)
    console.log(classs)


    setClases(classs)


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
        <Ver
          id_usuario={inscriptosSi[dataIndex].dni}
          getClients={async () => {

            const clients = await servicioCursos.detalledelcurso(id)
            console.log(clients[2][1])
            setClients(clients[0])
            setPendientes(clients[1])
            console.log(clients[1])

            setInscriptosSi(clients[2][0])
            setInscriptosNo(clients[2][1])
            setCurso(clients[3][0])
            setInscriptosacepados(clients[4])
            setClases(clients[5])
            setCupodelcurso(clients[6])

            setLoading(false);
          }}


        />
      </>
    );
  }




  function CutomButtonsRendererpendien(dataIndex, rowIndex, data, onClick) {
    return (
      <>
        <Ver
          id_usuario={pendientes[dataIndex].dni}
          cupo={curso.cupo}
          getClients={async () => {

            const clients = await servicioCursos.detalledelcurso(id)
            console.log(clients[2][1])
            setClients(clients[0])
            setPendientes(clients[1])
            console.log(clients[1])

            setInscriptosSi(clients[2][0])
            setInscriptosNo(clients[2][1])
            setCurso(clients[3][0])
            setInscriptosacepados(clients[4])
            setClases(clients[5])
            setCupodelcurso(clients[6])

            setLoading(false);
          }}


        />
      </>
    );
  }

  function CutomButtonsRendererNo(dataIndex, rowIndex, data, onClick) {
    return (
      <>
        <Ver
          id_usuario={inscriptosNo[dataIndex].dni}
          cupo={curso.cupo}
          getClients={async () => {

            const clients = await servicioCursos.detalledelcurso(id)
            console.log(clients)
            setClients(clients[0])
            setPendientes(clients[1])
            setInscriptosSi(clients[2][0])
            setInscriptosNo(clients[2][1])
            setCurso(clients[3][0])
            setInscriptosacepados(clients[4])
            setLoading(false);
          }}


        />
      </>
    );
  }

  function pendientessSi(dataIndex, rowIndex, data, onClick) {
    return (
      <>

        {inscriptosSi[dataIndex].estado === "pendiente" ? <><b style={{ color: '#ff9800' }}>     {inscriptosSi[dataIndex].estado}   </b> </> :
          <>{inscriptosSi[dataIndex].estado === "Cursando" ? <><b style={{ color: '#4caf50' }}>    {inscriptosSi[dataIndex].estado}   </b> </>
            : <><b style={{ color: '#d32f2f' }} >  {inscriptosSi[dataIndex].estado} </b></>}</>}



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
  function pendientesNo(dataIndex, rowIndex, data, onClick) {
    return (
      <>

        {inscriptosNo[dataIndex].estado === "pendiente" ? <><b style={{ color: '#ff9800' }}>     {inscriptosNo[dataIndex].estado}   </b> </> :
          <>{inscriptosNo[dataIndex].estado === "Cursando" ? <><b style={{ color: '#4caf50' }}>    {inscriptosNo[dataIndex].estado}   </b> </>
            : <><b style={{ color: '#d32f2f' }} >  {inscriptosNo[dataIndex].estado} </b></>}</>}



      </>
    );
  }
  // definimos las columnas SI
  const columns = [
    {
      name: "apellido",
      label: "Apellido",

    },

    {
      name: "nombre",
      label: "Nombre",

    },
    {
      name: "hijos",
      label: "Hijos",

    },
    {
      name: "estado",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          pendientessSi(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },
    /*       
        {
          name: "Estado",
          options: {
              customBodyRenderLite: (dataIndex, rowIndex) =>
              pendientessSi(
                      dataIndex,
                      rowIndex,
                     // overbookingData,
                     // handleEditOpen
                  )
          }
      
      }, */
    {
      name: "Acciones",
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


  // definimos las columnas
  const columnsno = [
    {
      name: "apellido",
      label: "Apellido",

    },

    {
      name: "nombre",
      label: "Nombre",

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
      name: "tipot",
      label: "Tipo de Trabajo",

    },
    {
      name: "estado",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          pendientesNo(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },
    {
      name: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRendererNo(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },




  ];

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
            <Tab label="Clases" />
          </Tabs>
        </Paper>
      </Box>


      {/*  { pendientes[0].length>0 ||pendientes[1].length>0 || pendientes[2].length>0 ? <>     <Alert severity="success">Tienes {pendientes[0].length} inscripcion(es) de prioridad 1 pendiente(s),  {pendientes[1].length} inscripcion(es) pendiente(s) prioridad 2,{pendientes[2].length} inscripcion(es) pendiente(s) prioridad 3 cupo {inscriptosacepados}/{curso.cupo} </Alert></> : <></>} */}

      {value === 1 ? <> <br />
        <>
          <MUIDataTable

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


          />
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
          <Nuevo
            getClients={async () => {
              const classs = await servicioCursos.verclases(id)

              setClases(classs)


              setLoading(false);
            }}
          /><br />
          < Tooltip>
            <h2>Clases </h2>

          </Tooltip>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "20%", maxWidth: "1000%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Fecha</StyledTableCell>
                  <StyledTableCell align="right">Tema</StyledTableCell>
                  <StyledTableCell align="right">Tomar asistencia</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>

                {clases ? <>

                  {clases.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.fecha}
                      </StyledTableCell>


                      <StyledTableCell align="right">{row.observacion}</StyledTableCell>
                      <StyledTableCell onClick={() => navigate('/coordinadores/asistencia/' + row.id)} align="right">ir</StyledTableCell>

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