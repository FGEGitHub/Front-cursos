import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioFidei from '../../../../services/fiscalizacion'

import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ConfirmarCapa from "./confirmarcapacitacion";
import Volver from "./volverpaso3";



export default function Ingresos() {
    let params = useParams()


    const [inscrip, setInscrip] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {

        const ins = await servicioFidei.todaslasasignaciones()
        setInscrip(ins[0])
        // 

    };
  

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
            name: "nombre",
            label: "nombre",
        },
        {
            name: "nombreescuela",
            label: "escuela",

        },
       
        {
            name: "telefono",
            label: "telefono",

        },
        {
            name: "estado",
            label: "estado",

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