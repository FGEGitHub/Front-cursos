import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioAdministracion from '../../../services/administracion'

import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";




export default function Ingresos() {
    let params = useParams()


    const [cursado, setCursado] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
 console.log('Historial')
        const historial = await servicioAdministracion.sistemas()
        console.log(historial[0])
        setCursado(historial[0])
        setTurnos(historial[1])
        setpersonas(historial[2])
        setCursos(historial[3])
        // 

    };
  



    
    const columns = [
        {
            name: "id",
            label: "id",
        },
   
        {
            name: "id_curso",
            label: "id_curso",
        },
        {
            name: "id_persona",
            label: "id_persona",

        },
        {
            name: "id_turno",
            label: "id_turno",

        },
 


    ];

    const columnsp = [
        {
            name: "id",
            label: "id",
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
            name: "dni",
            label: "dni",

        },
 


    ];

    const columnst = [
        {
            name: "id",
            label: "id",
        },
   
        {
            name: "id_curso",
            label: "id_curso",
        },
        {
            name: "numero",
            label: "numero",

        },
        {
            name: "descripcion",
            label: "descripcion",

        },
 


    ];
    const columnsc = [
        {
            name: "id",
            label: "id",
        },
   
        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "numero",
            label: "numero",

        },
        {
            name: "descripcion",
            label: "descripcion",

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

                    title={"Lista de cursado"}
                    data={cursado}
                    columns={columns}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}



                /> 
                 <MUIDataTable

title={"Lista de turnos"}
data={turnos}
columns={columnst}
actions={[
    {
        icon: 'save',
        tooltip: 'Save User',
        onClick: (event, rowData) => alert("You saved " + rowData.name)
    }
]}



/> 
       

             
                
<MUIDataTable

title={"Lista de personas"}
data={personas}
columns={columnsp}
actions={[
    {
        icon: 'save',
        tooltip: 'Save User',
        onClick: (event, rowData) => alert("You saved " + rowData.name)
    }
]}



/>  
<MUIDataTable

title={"Lista de cursos"}
data={cursos}
columns={columnsc}
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
