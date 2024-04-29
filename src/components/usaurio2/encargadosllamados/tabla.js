import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioUsuarios from '../../../services/usuarios'
import Seleccionador from './modalseleccionar'
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Ingresos() {
    let params = useParams()


    const [inscrip, setInscrip] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {

        const ins = await servicioUsuarios.todoslosencargadosllamados()
        setInscrip(ins[0])
        // 

    };
  

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      <Seleccionador
      id ={inscrip[dataIndex].id}
      traer =  { async () => {

const ins = await servicioUsuarios.todoslosencargadosllamados()
setInscrip(ins[0])
// 

}}/>

<PersonSearchIcon     onClick={() =>  navigate('/administracion/call/'+inscrip[dataIndex].id)} /> 

          </>

        );
      }



      function CutomButtonconfirmadas(dataIndex, rowIndex, data, onClick) {
        return (
          <>
               <p style={{ color: "green"}}><b>{inscrip[dataIndex].asignada}</b> </p> 
          </>

        );
      }
      function CutomButtonsinc(dataIndex, rowIndex, data, onClick) {
        return (
          <>
               <p style={{ color: "crimson"}}><b>{inscrip[dataIndex].sinc}</b> </p> 
          </>

        );
      }

    
    const columns = [

   
        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "asig",
            label: "asignadas",

        },
        {
            name: "mensaje",
            label: "Mensaje enviado",

        },
        {
            name: "Confirmadas",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                CutomButtonconfirmadas(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        },   

        {
            name: "Sin contactar",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                CutomButtonsinc(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        }, 
      
        {
            name: "rech",
            label: "Rechazados",

        },
        {
            name: "nocont",
            label: "No contestado",

        },
        
        
        {
            name: "Ver detalles",
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
        filterType: 'checkbox', // Opciones adicionales de configuración según tus necesidades
    responsive: 'vertical',
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30],
    elevation: 0, // Elimina la sombra si no la deseas

    // Opciones de estilo
    tableBody: {
      // Puedes ajustar estos estilos según tus necesidades
      style: {
        backgroundColor: 'lightblue', // Cambia el color de fondo de la tabla
      },
    },
    rows: {
      style: {
        color: 'red', // Cambia el color del texto de las filas
      },
    },

    };
    return (
        <div>
                <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity="info"  onClick={() => navigate('/administracion/usuarios')}  > No encontras uno o ningun usuario del call center? ingresa ACA y agrega uno (nivel 6 ) </Alert>
      </Stack>
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

                    title={"Lista de encargados"}
                    data={inscrip}
                    columns={columns}
                    options={options}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}



                /> 
                   
                
                
                </Paper>
          
        </div>
    );
}