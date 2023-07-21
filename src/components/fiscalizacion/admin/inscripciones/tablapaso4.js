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
import RechazarCapa from "./sacarcapacitacion";
import Volver from "./volverpaso3";



export default function Ingresos() {
    let params = useParams()
    const navigate = useNavigate();

    const [inscrip, setInscrip] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {

        const ins = await servicioFidei.todaspaso4()
        setInscrip(ins[0])
        // 

    };
  
    
    function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
        <Button  onClick={() => navigate('/fiscalizacion/persona/'+inscrip[dataIndex].idpersona)} >Ver persona</Button>

          </>

        );
      }
      function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        const handleButtonClick = async () => {
          const ins = await servicioFidei.todaspaso4();
          setInscrip(ins[0]);
        };
      
        const buttonStyle = {
          fontSize: '10px',
          padding: '2px 4px',
          borderRadius: '4px',
          margin: '4px',
          display: 'inline-block',
        };
      
        return (
          <>
            <ConfirmarCapa id={inscrip[dataIndex].id} getClients={handleButtonClick} style={buttonStyle} />
            <Volver id={inscrip[dataIndex].id} traer={handleButtonClick} style={buttonStyle} />
            <RechazarCapa id={inscrip[dataIndex].id} getClients={handleButtonClick} style={buttonStyle} />
          </>
        );
      }
      
      

      function CutomButtonombre(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
     <p> {inscrip[dataIndex].apellido}  {inscrip[dataIndex].nombre}</p>

          </>

        );
      }

    
      function CutomButtonsRendererCapacitado(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
      {inscrip[dataIndex].capacitado === 'No' ? <><p style={{ color: 'warning' }} >No Capacitado</p></>:<><p style={{ color: 'green' }} >Capacitado</p></>}

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
            label: "Nombre",
        
        },  
        {
            name: "nombreescuela",
            label: "Fiscaliza",

        },
        {
            name: "nombredondevota",
            label: "Vota",

        },
        
    
        {
            name: "telefono",
            label: "telefono",

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
            name: "detalle",
            label: "detalle",

        },
  

    ];
    const options = {
        selectableRows: false, // Desactivar la selección de filas
    };

    return (
        <div >
         

         <MUIDataTable
                title={"Lista de Incripciones"}
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
                   
                
                
       
          
        </div>
    );
}