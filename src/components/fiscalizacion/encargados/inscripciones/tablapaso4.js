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
import Vernscripto from "./modalpaso2";


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
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)

     

          const ins = await servicioFidei.todaspaso42(usuario.id)
          setInscrip(ins[0])
      }
 
     
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
          const ins = await servicioFidei.todaspaso42();
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
           
          </>
        );
      }
      
      

      function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
          <Vernscripto
          dni= {inscrip[dataIndex].dni}
          nombre= {inscrip[dataIndex].nombre}
          apellido= {inscrip[dataIndex].apellido}
          telefono={inscrip[dataIndex].telefono}
          escuela1={inscrip[dataIndex].nombreescuela}
          escuela2={inscrip[dataIndex].nombreescuela2}
          id_inscripcion={inscrip[dataIndex].id}
          id_escuela={inscrip[dataIndex].id_escuela}
          id_escuela2={inscrip[dataIndex].id_escuela2}
          donde_vota={inscrip[dataIndex].donde_vota}
          observaciones={inscrip[dataIndex].observaciones}
          traer = { async () => {

            const ins = await servicioFidei.todaspaso42()
            setInscrip(ins[0])
            // 
    
        
        }}/>

{/* <Volver
 dni= {inscrip[dataIndex].dni}
 id_inscripcion={inscrip[dataIndex].id}
 traer = { async () => {

  const ins = await servicioFidei.todaspaso42()
  setInscrip(ins[0])
  // 

}}
/> */}
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
            name: "donde_vota",
            label: "Donde vota padron anterior",

        },
        {
            name: "dondefiscal",
            label: "donde fiscalizo",

        },
        {
          name: "estado",
          label: "estado",
      
      },  
    
        {
            name: "telefono",
            label: "telefono",

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