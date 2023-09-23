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

{/* <PersonSearchIcon     onClick={() =>  navigate('/fiscalizacion/administracion/encargado/'+inscrip[dataIndex].id)} /> */}

          </>

        );
      }


    
    const columns = [

   
        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "asignados",
            label: "asignadas",

        },
        {
            name: "sinc",
            label: "Sin Contactar",

        },
      
        {
            name: "asig",
            label: "Asignadas a curso",

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