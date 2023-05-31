import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioFidei from '../../../../services/fiscalizacion'
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ConfirmarCapa from "./confirmarcapacitacion";
import Volver from "./volverpaso3";



export default function Ingresos() {
   
    const navigate = useNavigate();

    const [inscrip, setInscrip] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON)

            const ins = await servicioFidei.todaslasasignacionesdeun(usuario.id)
            setInscrip(ins[0])
        }
    
     
        // 

    };
    

    function CutomButtonsRendererCapacitado(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
      {inscrip[dataIndex].capacitado === 'No' ? <><p style={{ color: 'warning' }} >No Capacitado</p></>:<><p style={{ color: 'green' }} >Capacitado</p></>}

          </>

        );
      }

    function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
        <Button  onClick={() => navigate('/fiscalizacion/encargados/persona/'+inscrip[dataIndex].idpersona)} >Ver persona</Button>

          </>

        );
      }
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
          <ConfirmarCapa
          id= {inscrip[dataIndex].id}
        
          getClients = { async () => {

            const ins = await servicioFidei.todasincripciones()
            setInscrip(ins[0])
            // 
    
          }}/>
  <Volver
          id= {inscrip[dataIndex].id}
        
          traer = {async () => {

            const ins = await servicioFidei.todaslasasignaciones()
            setInscrip(ins[0])
            // 
    
        }}/>

          </>

        );
      }


    
    const columns = [
        {
            name: "dni",
            label: "dni",
        },
        {
            name: "apellido",
            label: "apellido",

        },
   
        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "nombreescuela",
            label: "escuela",

        },
        {
            name: "numero",
            label: "numero mesa",

        },
       
        {
            name: "telefono",
            label: "telefono",

        },
        {
            name: "capacitado",
            label: "capacitado",

        },
        {
            name: "Capacitado",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRendererCapacitado(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        },  
        {
            name: "VER PERSONA",
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
            name: "Acciones/llamado",
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

                    title={"Lista de Incripciones"}
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