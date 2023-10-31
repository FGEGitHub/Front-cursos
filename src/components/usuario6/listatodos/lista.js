import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioCarnaval from '../../../services/carnavales'
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Vernscripto from "./modalpaso2";
import Desasignar from './desasignar'
import Vercursos from './verinscripcionn'
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

    const navigate = useNavigate();

    const [inscrip, setInscrip] = useState([]);
    const [vista, setVista] = useState(true);
    const [personas, setpersonas] = useState([]);
    const [cursos, setCursos] = useState([]);


    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)

          const ins = await servicioCarnaval.preinscriptascall(usuario.id)
          setInscrip(ins[0])
      }
   
    };
  
    
      function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        const handleButtonClick = async () => {
          const ins = await servicioCarnaval.todaspaso4();
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
          nombre= {inscrip[dataIndex].nombre}
          apellido= {inscrip[dataIndex].apellido}
          telefono={inscrip[dataIndex].tel}
          telefono2={inscrip[dataIndex].tel2}
          maquillaje={inscrip[dataIndex].maquillaje}
          peinado={inscrip[dataIndex].peinado}
          confeccion={inscrip[dataIndex].confeccion}
          baile={inscrip[dataIndex].baile}
          id_inscripcion={inscrip[dataIndex].id}
       
    
          observaciones={inscrip[dataIndex].observaciones}
          fecha_carga={inscrip[dataIndex].fecha}
          traer = { async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
      
                const ins = await servicioCarnaval.preinscriptascall(usuario.id)
                setInscrip(ins[0])
            }
         
          }}/>
          </>:<>
          
        
          <Vercursos 
           id={inscrip[dataIndex].id}
           traer = { async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
      
                const ins = await servicioCarnaval.preinscriptascall(usuario.id)
                setInscrip(ins[0])
            }
         
          }}
          dni= {inscrip[dataIndex].dni}  />
          <Desasignar
           id={inscrip[dataIndex].id}
           traer = { async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
      
                const ins = await servicioCarnaval.preinscriptascall(usuario.id)
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

                      const ins = await servicioCarnaval.todaspaso4()
                      setInscrip(ins[0])
                      // 
              
                  
                  }}
                /> */}

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
          name: "maquillaje",
          label: "maquillaje",

      },
      {
        name: "peinado",
        label: "peinado",

    },
    {
      name: "confeccion",
      label: "confeccion",

  },
  {
    name: "baile",
    label: "baile",

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
    const columns2 = [
    
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
{vista ?  <>
  <Alert variant="filled" severity="success">
        Nota: en esta vista hay una barra de desplazamiento en la parte inferior para ver el boton del llamado, podes cambiar la vista en el boton de "ocultar cursos seleccionados"
      </Alert>
  <Button variant='contained' onClick={()=>(setVista(!vista))}>Ocultar cursos seleccionados</Button>
    <MUIDataTable
      title={"Lista de Inscripciones"}
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
</>:<>
<Button variant='contained'  onClick={()=>(setVista(!vista))}>Mostrar tabla con cursos elegidos</Button>
<MUIDataTable
      title={"Lista de Inscripciones"}
      data={inscrip}
      columns={columns2}
      options={options}
      actions={[
        {
          icon: "save",
          tooltip: "Save User",
          onClick: (event, rowData) => alert("You saved " + rowData.name),
        }
      ]}
    /></>}
                
       
          
        </div>
    );
}