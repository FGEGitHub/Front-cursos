import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioInscripciones from '../../../services/inscripciones'

import MUIDataTable from "mui-datatables";

import Vernscripto from "../../usuario6/listatodos/modalpaso2";
import Desasignar from '../../usuario6/listatodos/desasignar'

import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
    overrides: {
      MUIDataTableBodyRow: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#F5F5F5", // Color de fondo para filas impares
          },
        },
      },
    },
  });
  

export default function Ingresos() {

    let params = useParams()
    let id = params.id
    const [inscrip, setInscrip] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
   

          const ins = await servicioInscripciones.preinscriptascall(id)
          console.log(ins[0])
          setInscrip(ins[0])
      
   
    };
  
    
      function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        const handleButtonClick = async () => {
          const ins = await servicioInscripciones.todaspaso4();
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
           
          </>
        );
      }
      
      

      function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      {inscrip[dataIndex].estado != 'Asignadx a curso' ? <>
          <Vernscripto
          dni= {inscrip[dataIndex].dni}
          id= {inscrip[dataIndex].id_inscripcion}
          nombre= {inscrip[dataIndex].nombre}
          apellido= {inscrip[dataIndex].apellido}
          telefono={inscrip[dataIndex].tel}
          telefono2={inscrip[dataIndex].tel2}
          descripcion={inscrip[dataIndex].descripcion}
  
          id_inscripcion={inscrip[dataIndex].id_inscripcion}
       
    
          observaciones={inscrip[dataIndex].observaciones}
          fecha_carga={inscrip[dataIndex].fecha}
          traer = {async () => {
         
      
                const ins = await servicioInscripciones.preinscriptascall(id)
                setInscrip(ins[0])
            
         
          }}/>
          </>:<>
          
          <p> <b>{inscrip[dataIndex].nombrecurso}{inscrip[dataIndex].descripcion}</b></p>
          <Desasignar
           id_inscripcion={inscrip[dataIndex].id}
           traer = { async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
      
                const ins = await servicioInscripciones.preinscriptascall(usuario.id)
                setInscrip(ins[0])
            }
         
          }}
          dni= {inscrip[dataIndex].dni}
          /></>}
          
          {/* 
 <CambiarEst
                    id={inscrip[dataIndex].id}
                    estado={inscrip[dataIndex].estado}
                    getClients={ async () => {

                      const ins = await servicioInscripciones.todaspaso4()
                      setInscrip(ins[0])
                      // 
              
                  
                  }}
                /> */}

          </>

        );
      }

      
  
      function dondevot(dataIndex, rowIndex, data, onClick) {
        return (
          <>

      {inscrip[dataIndex].etapa2 =="Si" ? <> <p style={{ color: 'green' }} >{inscrip[dataIndex].etapa2} {inscrip[dataIndex].donde_vota} </p> </> : <>{inscrip[dataIndex].donde_vota}</> }
    
          </>

        );
      }

      function Obser(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
    

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
          name: "estado",
          label: "estado",
      
      },  
    
        
      
        {
            name: "tel",
            label: "telefono",

        },
        {
            name: "tel2",
            label: "Alternativo",

        },
   

      {
        name: "descripcion",
        label: "turno",

    },
    
 
    {
      name: "Acciones",
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
        stickyHeader: true,   
        rowStyle: (rowData, dataIndex) => {
            return dataIndex % 2 === 0 ? {} : { backgroundColor: "#2196f3"};
          },
    
        
    };

    return (
        <div >

    <MUIDataTable
      title={"Lista de Inscripcioness"}
      data={inscrip}
      columns={columns}
      options={options}
      actions={[
        {
          icon: "save",
          tooltip: "Save User",
          onClick: (event, rowData) => alert("You saved " + rowData.name),
        }
      ]}
    />

                
       
          
        </div>
    );
}