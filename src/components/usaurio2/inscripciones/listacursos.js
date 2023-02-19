import { useState, useEffect } from "react";
import servicioInscipciones from '../../../services/inscripciones'
import MUIDataTable from "mui-datatables";
import VerDetalles from "./ModalVer"
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
  const [priori1, setPriori1] = useState([]);
  const [priori2, setPriori2] = useState([]);
  const [priori3, setPriori3] = useState([]);
    const [participo, setParticipo] = useState([]);
    const [noparticipo, setNoparticipo] = useState([]);
    const [listadef1, setListadef1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState(true);
  const navigate = useNavigate();




  const cambiarVista = () => {

    setVista(!vista)
  }
  const getClients = async () => {

    const clients = await servicioInscipciones.lista({

    })
    console.log(clients)
    setPriori1(clients[0])
    setPriori2(clients[1])
    setPriori3(clients[2])
  
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
        <IconButton>

          <p
            onClick={() => navigate('/coordinadores/detallecurso/' + priori1[dataIndex].id)}
            style={{ color: 'blue' }}
          > Ver </p>    </IconButton>

      </>
    );
  }

  function Nombre(dataIndex, rowIndex, data, onClick) {
    return (
      <>
        <b>
          <p
            onClick={() => navigate('/coordinadores/detallecurso/' + priori1[dataIndex].id)}
            style={{ color: '#blue' }}
          > {priori1[dataIndex].nombre} </p>   </b>

      </>
    );
  }
  // definimos las columnas
  const columns = [
    {
      name: "nombre",
      label: "nombre",

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
      label: "Observaciones",

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
      {loading ? (<CargaDeTabla />)
        : (
          <div>
            <Stack spacing={2} sx={{ width: '100%' }}>

              <Alert severity="info">Cantidad de cursos: {priori1.length}</Alert>
              
            </Stack>
            <br />


            <Button variant='contained' onClick={cambiarVista} > Cambiar vista <RemoveRedEyeIcon /></Button>

            {vista ? <>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "80%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >

                <TableContainer >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Detalles prioridad 1</b></TableCell>
                        <TableCell><b>Inscriptas</b></TableCell>
                        <TableCell><b>Cantidad Si</b></TableCell>
                        <TableCell><b>Cantidad No</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priori1.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{row.nombre}</TableCell>
                          <TableCell align="left">{row.cantidadsi +   row.cantidadno }</TableCell>
                          <TableCell align="left">{row.cantidadsi}</TableCell>
                          <TableCell align="left">{row.cantidadno}</TableCell>
                          <TableCell align="left">{participo[row.idc] }  </TableCell>
                         
                          <TableCell align="left"><VerDetalles
                          id={row.idc}
                          /></TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "80%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >

                <TableContainer >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Detalles prioridad 2</b></TableCell>
                        <TableCell><b>Inscriptas</b></TableCell>
                        <TableCell><b>Cantidad Si</b></TableCell>
                        <TableCell><b>Cantidad No</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priori2.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{row.nombre}</TableCell>
                          <TableCell align="left">{row.cantidadsi +   row.cantidadno }</TableCell>
                          <TableCell align="left">{row.cantidadsi}</TableCell>
                          <TableCell align="left">{row.cantidadno}</TableCell>
                          <TableCell align="left">{participo[row.idc] }  </TableCell>
                         
                          <TableCell align="left"><VerDetalles
                          id={row.idc}
                          /></TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>    <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "80%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >

                <TableContainer >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Detalles prioridad 3</b></TableCell>
                        <TableCell><b>Inscriptas</b></TableCell>
                        <TableCell><b>Cantidad Si</b></TableCell>
                        <TableCell><b>Cantidad No</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priori3.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{row.nombre}</TableCell>
                          <TableCell align="left">{row.cantidadsi +   row.cantidadno }</TableCell>
                          <TableCell align="left">{row.cantidadsi}</TableCell>
                          <TableCell align="left">{row.cantidadno}</TableCell>
                          <TableCell align="left">{participo[row.idc] }  </TableCell>
                         
                          <TableCell align="left"><VerDetalles
                          id={row.idc}
                          /></TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              
              <MUIDataTable

                title={"Lista de prioridad 3 "}
                data={priori3}
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


              <>
                <br /><br /><br />


              </>


            </>}
          </div>
        )}





    </>


  )
}

export default Lotes;