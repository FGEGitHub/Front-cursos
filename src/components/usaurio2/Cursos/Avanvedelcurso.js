import { useState, useEffect } from "react";
import servicioCursos from '../../../services/Cursos'
import MUIDataTable from "mui-datatables";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
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
import Widget from '../../estadisticas/Widget/Widget'
import { useParams } from "react-router-dom"
import SocialDistanceSharpIcon from '@mui/icons-material/SocialDistanceSharp';
import '../../estadisticas/Home.scss'

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

const buttons = [
  <Button key="1">Clase 1</Button>,
  <Button key="2">Clase 2</Button>,
  <Button key="3">Clase 3</Button>,
  <Button key="4">Clase 4</Button>,
  <Button key="5">Clase 5</Button>,
];

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
  let params = useParams()
  let id = params.id
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

    const clients = await servicioCursos.avancedelcurso(id)

    setClients(clients[0])
    setDetall(clients[1])
    setLoading(false);
  }

  useEffect(() => {
    getClients()
  }, [])


  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    return (
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        < Tooltip title="Ir a la clase">
          <Button style={{minWidth: '200px'}} variant="outlined" onClick={() => navigate('/administracion/clase/' + clients[dataIndex].id_clase)}>Ir a clase     
            <SearchIcon /></Button>
        </Tooltip>
  
          < Tooltip title="Ir al turno">
            <Button style={{minWidth: '200px'}} variant="outlined" onClick={() => navigate('/administracion/turno/' + clients[dataIndex].id_turno)}>Ir a Turno    
              <SearchIcon /></Button>
          </Tooltip>
       
      
        <>
          < Tooltip title="Estado Alumnas del turno">
            <Button style={{minWidth: '200px'}} variant="outlined" onClick={() => navigate('/administracion/estadoalumnas/' + clients[dataIndex].id_turno)}> Alumnas 
              <SearchIcon /></Button>
          </Tooltip>
          <br />
        </>
      </div>
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
      name: "descripcion",
      label: "Horario"

    },

    {
      name: "dato1",
      label: "Numero de clase"

    },




    {
      name: "presentes",
      label: 'Presentes',
    },

    {
      name: "ausentes",
      label: 'Ausentes',
    },
    {
      name: "justificados",
      label: 'justificados',
    },


    {
      name: "total",
      label: 'total(alumnos en el curso)',
    },



    {
      name: "Opciones(leer detalle)",
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


            <div className="home">

              <div className="container">
                <div >
                  <Widget type="total Presentes"
                    cantidad={detall.totalpresentes}
                  />

                  <Widget type="total ausentes"
                    cantidad={detall.totalausentes}
                  /></div>
              </div>
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
              }}
            >


              <ButtonGroup size="large" aria-label="Clases"  >
                <Button onClick={() => cambiarVista2(1)} >Clase 1</Button>,
                <Button onClick={() => cambiarVista2(2)}>Clase 2</Button>,
                <Button onClick={() => cambiarVista2(3)}>Clase 3</Button>,
                <Button onClick={() => cambiarVista2(4)}>Clase 4</Button>,

              </ButtonGroup>
            </Box>




            <div className="home">

              <div className="container">
                {vista2 === 1 ? <>
                  <div className="widgets">

                    <Widget type="Presentes Clase 1"
                      cantidad={detall.presentes1}
                    />

                    <Widget type="Ausentes Clase 1"
                      cantidad={detall.ausentes1}
                    />
                    <Widget type="Ausentes Justificados Clase 1"
                      cantidad={detall.ausentesjus1}
                    />

                  </div>
                </> : <></>}
                <div className="widgets">

                  {vista2 === 2 ? <>
                    <Widget type="Presentes Clase 2"
                      cantidad={detall.presentes2}
                    />
                    <Widget type="Ausentes Clase 2"
                      cantidad={detall.ausentes2}
                    />

                    <Widget type="Ausentes Justificados Clase 2"
                      cantidad={detall.ausentes2}
                    />
                  </> : <></>}
                </div>   {vista2 === 3 ? <>
                  <div className="widgets">

                    <Widget type="Presentes Clase 3"
                      cantidad={detall.presentes3}
                    />
                    <Widget type="Ausentes Clase 3"
                      cantidad={detall.ausentes3}
                    />
                    <Widget type="Ausentes Justificados Clase 3"
                      cantidad={detall.ausentes3}
                    />


                  </div>
                </> : <></>}
                {vista2 === 4 ? <>
                  <div className="widgets">

                    <Widget type="Presentes Clase 4"
                      cantidad={detall.presentes4}
                    />
                    <Widget type="Ausentes Clase 4"
                      cantidad={detall.ausentes4}
                    />
                    <Widget type="Ausentes Justificados Clase 4"
                      cantidad={detall.ausentes4}
                    />

                  </div>
                </> : <></>}

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