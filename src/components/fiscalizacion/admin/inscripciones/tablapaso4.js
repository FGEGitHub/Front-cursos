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
import Vernscripto from "./modalpaso2";
import CambiarEst from './cambiarestado'
import AsignarEnc from './asignarencargado'
import ObserModal from "../../encargados/inscripciones/modalobservaciones"
import Cambirdodne from '../persona/dondevota'


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
          fecha_carga={inscrip[dataIndex].fecha_carga}
          traer = { async () => {

            const ins = await servicioFidei.todaspaso4()
            setInscrip(ins[0])
            // 
    
        
        }}/>
 <CambiarEst
                    id={inscrip[dataIndex].id}
                    estado={inscrip[dataIndex].estado}
                    getClients={ async () => {

                      const ins = await servicioFidei.todaspaso4()
                      setInscrip(ins[0])
                      // 
              
                  
                  }}
                />

<AsignarEnc
                    id_inscripcion={inscrip[dataIndex].id}
                    getClients={ async () => {

                      const ins = await servicioFidei.todaspaso4()
                      setInscrip(ins[0])
                      // 
              
                  
                  }}/>

          </>

        );
      }

      
  
      function dondevot(dataIndex, rowIndex, data, onClick) {
        return (
          <>

      {inscrip[dataIndex].etapa2 =="Si" ? <> <p style={{ color: 'green' }} >{inscrip[dataIndex].etapa2} {inscrip[dataIndex].donde_vota} </p> </> : <>{inscrip[dataIndex].donde_vota}</> }
    
      {inscrip[dataIndex].id_donde_vota ==undefined ? <>  <Cambirdodne id={inscrip[dataIndex].idpers} 
       traer={ async () => {

        const ins = await servicioFidei.todaspaso4()
        setInscrip(ins[0])
        // 

    
    }}
     />   </>:<></>}
          </>

        );
      }

      function Obser(dataIndex, rowIndex, data, onClick) {
        return (
          <>
      
      <ObserModal
      id={inscrip[dataIndex].dni}
      
      />

          </>

        );
      }

    const columns = [
      {
        name: "circuito",
        label: "Circ",
    },
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
            name: "telefono",
            label: "telefono",

        },
        {
          name: "Donde vota",
          options: {
              customBodyRenderLite: (dataIndex, rowIndex) =>
                  dondevot(
                      dataIndex,
                      rowIndex,
                     // overbookingData,
                     // handleEditOpen
                  )
          }
      
      }, 
      

      {
        name: "nombrevota",
        label: "Fiscaliza",

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

      {
        name: "nombrequienllama",
        label: "encargado",

    },
    
        {
          name: "Observaciones",
          options: {
              customBodyRenderLite: (dataIndex, rowIndex) =>
                  Obser(
                      dataIndex,
                      rowIndex,
                     // overbookingData,
                     // handleEditOpen
                  )
          }
      
      }, 
        
      {
        name: "donde_vota",
        label: "escuela",
  
    },
  

    ];
    const options = {
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
    };

    return (
        <div >
        <Button   onClick={traer }>Refrescar</Button> 

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