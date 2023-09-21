import { useState, useEffect } from "react";
import servicioCursos from '../../../services/Cursos'
import MUIDataTable from "mui-datatables";
import Nuevo from './NuevoTurno'
import ModificarCurso from './ModalModificarCurso'
import CargaDeTabla from "../../CargaDeTabla"
import imagen from "../../../Assets/imagencurso.jpg"
import { useNavigate } from "react-router-dom";

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

import ServicioInscripciones from '../../../services/inscripciones'
////
import Asignarencargado from './ModalModificarclasesdelcurso';
import Modificarturno from './ModalModificarclasesdelcurso';
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


    
    
    const cambiarVista =  () => {
        
      setVista(!vista)
  }
   


    ///
//opcionde click en el nombre
const getturnos = async (id) => {
  setIda(id)

  const clients = await servicioCursos.getturnos(id)
  setTurnos(clients)
  setLoading(false);
}
const getClients = async () => {
        
  const clients = await servicioCursos.lista({

  })
  setClients(clients)
  setLoading(false);
}

useEffect(() => {
  getClients()
}, [])


function Borrarturno(dataIndex, rowIndex, data, onClick) {
  return (
    <>
    < Tooltip title="Borrar">
    <Button   onClick={() => borrarturno(turnos[dataIndex].id)} >Borrar</Button>
    </Tooltip>
    <Modificarturno
          id={turnos[dataIndex].id}
          getClients= { async (id) => {
         
   
            const clients = await servicioCursos.getturnos(ida)
            setTurnos(clients)
            setLoading(false);
          }}/>
       
    
    

    </>
  );
}
function Borrarturno(dataIndex, rowIndex, data, onClick) {
  return (
    <>
    < Tooltip title="Borrar">
    <Button   onClick={() => borrarturno(turnos[dataIndex].id)} >Borrar</Button>
    </Tooltip>
    <Modificarturno
          id={turnos[dataIndex].id}
          getClients= { async (id) => {
         
   
            const clients = await servicioCursos.getturnos(ida)
            setTurnos(clients)
            setLoading(false);
          }}/>
       
    
    

    </>
  );
}




function ir(dataIndex, rowIndex, data, onClick) {
  return (
    <>
  < Tooltip title="Borrar">
<Button   onClick={() => navigate('/administracion/turno/'+turnos[dataIndex].id)} >Ir al curso</Button>
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
          name: "cantidad_turnos",
         label: 'cantidad turnos',
        } ,

    


        
      /* 
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
  */

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
      name: "id_encargado",
     label: 'Encargado',
    } ,

    
  {
    name: "Ir",
    options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
        ir(
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
 await servicioCursos.borrarturno(id)

getturnos(ida)
}
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
 

   {/*  <Button  variant='contained' onClick={cambiarVista} > Cambiar vista <RemoveRedEyeIcon/></Button> */}

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

{clients.map((row) => (
   <Grid container spacing={2}>
   <Grid item>
     <ButtonBase sx={{ width: 128, height: 128 }}>
       <Img alt="complex" src={imagen} />
     </ButtonBase>
   </Grid>
   <Grid item xs={12} sm container>
     <Grid item xs container direction="column" spacing={2}>
       <Grid item xs>
         <Typography gutterBottom variant="subtitle1" component="div">
         {row.nombre}
         </Typography>
         <Typography variant="body2" gutterBottom>
         {row.encargado}
         </Typography>
         <Typography variant="body2" color="text.secondary">
           curso
         </Typography>
       </Grid>
       <Grid item>
         <Typography sx={{ cursor: 'pointer' }} variant="body2">
          Borrar
         </Typography>
       </Grid>
     </Grid>
     <Grid item>
       <Typography variant="subtitle1" component="div">
       {row.fecha}
       </Typography>
     </Grid>
   </Grid>
 </Grid>
))}
     
    </Paper>


</>


    </>}

    {turnos ? <>si turnos
    
      <Nuevo  
          id={ida}
          getturnos ={ async (ida) => {
            setIda(ida)
            const clients = await servicioCursos.getturnos(ida)
            setTurnos(clients)
            setLoading(false);
          } }/>
      <MUIDataTable
        
            title={"Lista de turnos"}
            data={turnos}
            columns={columns2}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                }
            ]}
            options={options}


        />
        </>:<>no turnos</>}
    </div>
    )}





    </>


)
}

export default Lotes;