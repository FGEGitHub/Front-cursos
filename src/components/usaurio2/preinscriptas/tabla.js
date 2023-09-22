import { useState, useEffect } from "react";


import MUIDataTable from "mui-datatables";
import CargaDeTabla from "../../CargaDeTabla"
import imagen from "../../../Assets/imagencurso.jpg"
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import AsignarEnc from './asignarencargado'
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
////
import SocialDistanceSharpIcon from '@mui/icons-material/SocialDistanceSharp';
import Grid from '@mui/material/Grid';
import GroupIcon from '@mui/icons-material/Group';
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
    const [clients, setClients] = useState([]);
    const [turnos, setTurnos] = useState();
    const [loading, setLoading] = useState(true);
    const [vista, setVista] = useState(true);
    const [ida, setIda] = useState();
    const navigate = useNavigate();


    
    



    ///
//opcionde click en el nombre
const getturnos = async (id) => {
  setIda(id)
  console.log(ida)

  const clients = await ServicioInscripciones.getturnos(id)
  setTurnos(clients)
  setLoading(false);
}
const getClients = async () => {
        
  const clients = await ServicioInscripciones.preinscriptas({

  })
  setClients(clients[0])
  setLoading(false);
}

useEffect(() => {
  getClients()
}, [])
function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
  return (
      <>

      
          <AsignarEnc
              id_inscripcion={clients[dataIndex].id}
              getClients={ async () => {
        
                const clients = await ServicioInscripciones.preinscriptas({
              
                })
                setClients(clients[0])
                setLoading(false);
              }} />


      </>

  );
}

function Borrarturno(dataIndex, rowIndex, data, onClick) {
  return (
    <>
    < Tooltip title="Avance del curso">
    <Button   onClick={() => borrarturno(turnos[dataIndex].id)} >Boton para algo</Button>
    </Tooltip>
  
    </>
  );
}

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          < Tooltip title="Avance del curso">
          <SearchIcon   onClick={() =>  getturnos(clients[dataIndex].id)}  />
          </Tooltip>
         
        
          </>
        );
      }

      function Nombre(dataIndex, rowIndex, data, onClick) {
        return (
          <>
           <b> 
             <p 
            onClick={() =>  navigate('/administracion/avancedelcurso/'+clients[dataIndex].id)} 
             style={{ color: '#blue' }}
            > {clients[dataIndex].nombre} </p>   </b> 
           
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
        name: "encargado",
        label:"encargado asistencia",
       
    },
    {
      name: "nombrecall",
      label:"encargado llamado",
     
  },
      {
        name: "Designar call center",
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



const columns2 = [
    
  
    
    {
      name: "numero",
     label: 'numero',
    } ,
    {
      name: "descripcion",
     label: 'descripcion',
    } ,

    {
      name: "Ir/Modificar",
      options: {
          customBodyRenderLite: (dataIndex, rowIndex) =>
          Borrarturno(
                  dataIndex,
                  rowIndex,
                 // overbookingData,
                 // handleEditOpen
              )
      }
  
  },   

    


];
const options = {
  selectableRows: false, // Deshabilita los checkboxes
};
const borrarturno = async (id) => {
  console.log(id)
 await ServicioInscripciones.borrarturno(id)

getturnos(ida)
}
// renderiza la data table
return (
    <>
    {loading ? (<CargaDeTabla/>)
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 
 <Alert severity="info">Cantidad de preinscriptas: {clients.length}</Alert>
    </Stack>
    <br/>
 

   {/*  <Button  variant='contained' onClick={cambiarVista} > Cambiar vista <RemoveRedEyeIcon/></Button> */}


        <MUIDataTable
        
            title={"Lista de Preinscriptas"}
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
         </div>
 
)}

<>
<br/><br/><br/>
<Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >

    </Paper>

</>

    </>

)
}

export default Lotes;