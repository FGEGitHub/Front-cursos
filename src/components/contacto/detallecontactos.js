import { useState, useEffect } from "react";
import servicioAdmin from '../../services/administracion'
import MUIDataTable from "mui-datatables";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CargaDeTabla from "../CargaDeTabla"
import imagen from "../../Assets/imagencurso.jpg"
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
import Widget from '../estadisticas/Widget/Widget'

import SocialDistanceSharpIcon from '@mui/icons-material/SocialDistanceSharp';
import '../estadisticas/Home.scss'

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
  const [detall, setDetall] = useState(true);
  const [vista, setVista] = useState(true);
  const [vista2, setVista2] = useState(2);

  const navigate = useNavigate();




  const cambiarVista = () => {

    setVista(!vista)
  }
  const cambiarVista2 = (id) => {
    console.log(id)
    setVista2(id)
  }


  ///
  //opcionde click en el nombre

  const getClients = async () => {

    const clients = await servicioAdmin.contactos()

    setClients(clients[0])
    setDetall(clients[1])
    setLoading(false);
  }

  useEffect(() => {
    getClients()
  }, [])


  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    return (
      <>
        < Tooltip title="Ir a la clase">
          <Button onClick={() => navigate('/administracion/clase/' + clients[dataIndex].id_clase)}>Ir a clase
            <SearchIcon /></Button>
        </Tooltip>
        <>
          < Tooltip title="Ir al turno">
            <Button onClick={() => navigate('/administracion/turno/' + clients[dataIndex].id_turno)}>Ir a Turno
              <SearchIcon /></Button>
          </Tooltip>
          <br />
        </>
        <>
          < Tooltip title="Estado Alumnas del turno">
            <Button onClick={() => navigate('/administracion/estadoalumnas/' + clients[dataIndex].id_turno)}>Estado Alumnas
              <SearchIcon /></Button>
          </Tooltip>
          <br />
        </>
      </>
    );
  }

  function Nombre(dataIndex, rowIndex, data, onClick) {
    return (
      <>
        <b>
          <p
            onClick={() => navigate('/administracion/detallecurso/' + clients[dataIndex].id)}
            style={{ color: '#blue' }}
          > {clients[dataIndex].nombre} </p>   </b>

      </>
    );
  }
  // definimos las columnas
  const columns = [

    {
      name: "nombre",
      label: "nombre"

    },

    {
      name: "confirmados",
      label: "confirmados"

    },
    {
        name: "rechazados",
        label: "rechazados"
  
      },

    {
        name: "asignados",
        label: "Sin responder"
  
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


            <div className="home">

              <div className="container">
                <div >
                  <Widget type="total Confirmados"
                    cantidad={detall.totalconfirmados}
                  />

                  <Widget type="total Rechazados"
                    cantidad={detall.totalrechazados}
                  /></div>
              </div>
            </div>
          






            

            {vista ? <>
              <MUIDataTable

                title={clients[0] ? <>{'Clases de ' + clients[0].nombre}</> : <>Sin clases</>}
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






            </>}
          </div>
        )}





    </>


  )
}

export default Lotes;