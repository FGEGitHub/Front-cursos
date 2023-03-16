import { useState, useEffect } from "react";
import ServicioCursos from '../../../services/Cursos'
import MUIDataTable from "mui-datatables";
import AsignarEncargado from './ModalAsignarEncargado'
import Asignarllamado from './ModalAsignarcoordinador'
import ModalModificarturno from './ModalModificarclasesdelcurso'
import NuevoTurno from './NuevoTurno'
import CargaDeTabla from "../../CargaDeTabla"
import imagen from "../../../Assets/imagencurso.jpg"
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { useParams } from "react-router-dom"
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Paper } from '@mui/material';
////

import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Modal } from "@material-ui/core";

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


  

  


  
const Lotes = () => {
    //configuracion de Hooks
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vista, setVista] = useState(true);
    const navigate = useNavigate();

    let params = useParams()
    let id = params.id
    

    const getClients = async () => {
        
        const clients = await ServicioCursos.listadeturnos(id)
   console.log(clients[0])
        setTurnos(clients)
        setLoading(false);
    }

 
    const borrarturno = async (id) => {
        console.log(id)
      const clients = await ServicioCursos.borrarturno(id)
      getClients()
  }


    useEffect(() => {
        getClients()
    }, [])

    ///
//opcionde click en el nombre
const columnas = [
    {
      name: "apellidopersona",
      label: "Apellido",

    },
    {
      name: "nombrepersona",
      label: "Nombre",

    },

    {
      name: "inscripcion",
      label: "estado",

    },
    {
      name: "descripcion",
      label: "descripcion",

    },
       {
      name: "motivo",
      label: "motivo",

    },
  



  ];
return (
    <>
    {loading ? (<CargaDeTabla/>)
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 

    </Stack>




    <br/>  
    {vista ? <>
   
   
     {turnos.map((row) => ( 
        <>
         <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
         <Button variant="contained"  onClick={() => borrarturno(row[0]['id_turno'])} >Borrar turno  {row[0].id_turno} </Button><br/>
         {row[0].nombrecoordinador === undefined ? <>Sin designado { row[0].id} </> :<> <h2> <b>Coordinador {row[0].nombrecoordinador} </b></h2></> } <br/>

        {row[0].nombreencargado === undefined ? <>Sin designado { row[0].id} </> :<> <h2> <b>Encargado {row[0].nombreencargado} </b></h2></> } 

        <AsignarEncargado 
        id= { row[0].id_turno}
        
        />
<ModalModificarturno
   id= { row[0].id_turno}
   />
<Asignarllamado
        id=  { row[0].id_turno}
        
        />
        <MUIDataTable

        title={"curso"+row[0]["descripcion"]}
        data={row}
        columns={columnas}
        actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          }
        ]}
  


      /></Paper>
      <br/></> 

     ))}

  </>:<></>}
<NuevoTurno/>
<>

</>



    </div>
    )}





    </>


)
}

export default Lotes;