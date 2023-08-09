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
import Checkbox from '@mui/material/Checkbox';


export default function Ingresos() {
    let params = useParams()
    const navigate = useNavigate();

    const [inscrip, setInscrip] = useState([]);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {

        const ins = await servicioFidei.todaslasasignaciones()
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
          const ins = await servicioFidei.todaslasasignaciones();
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
      function fiscaliza(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
      {inscrip[dataIndex].dni2 == undefined ? <><p style={{ color: 'red ' }} >{inscrip[dataIndex].nombreescuela} </p></>:<><p style={{ color: 'green' }} >{inscrip[dataIndex].nombreescuela}</p></>}

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
          name: "Fiscaliza",
          options: {
              customBodyRenderLite: (dataIndex, rowIndex) =>
                  fiscaliza(
                      dataIndex,
                      rowIndex,
                     // overbookingData,
                     // handleEditOpen
                  )
          }
      
      }, 
      {
        name: "nombredondevota",
        label: "Vota",

    },
      
        
        {
            name: "numero",
            label: "numero mesa",

        },
        {
            name: "dato1",
            label: "Presente",

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
        {
            name: "Contactado",
            options: {
              customBodyRenderLite: (dataIndex, rowIndex) =>
              CutomButtonsRenderer2contactado(
                  dataIndex,
                  rowIndex,
                  // overbookingData,
                  // handleEditOpen
                )
            }
      
          }, 
      
        {
          name: "nombreescuela",
          label: "Fiscaliza",

      },
    

    ];
    const options = {
        selectableRows: false, // Desactivar la selección de filas
    };
    function CutomButtonsRenderer2contactado(dataIndex, rowIndex, data, onClick) {
        return (
          <>
    
    {inscrip[dataIndex].checkk == null  || inscrip[dataIndex].checkk == 'No'? <>  No contactado <Checkbox   onClick={() => checkede(inscrip[dataIndex].id)}  {...label} /> </>:<> Ya contactado <Checkbox onClick={() => checkede(inscrip[dataIndex].id)}  {...label} defaultChecked /></>}
    
          </>
    
        );
      }
      const checkede = async (id) => {
        console.log(id)
         await servicioFidei.contactada2(id)
        traer()
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