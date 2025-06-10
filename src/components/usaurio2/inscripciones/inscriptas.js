import servicioInscripciones from '../../../services/inscripciones'
import Carga from '../../CargaDeTabla'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Observaciones from '../Personas/observaciones'
import { useNavigate } from "react-router-dom";
import Tablaprioridades from './TablaPrioridades'

import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import CambiarEstado from '../../usuario6/listatodos/cambiarestado'
import Widget from '../../fiscalizacion/Widget/Widget'
import CargaDeTabla from '../../CargaDeTabla';
import Borrar from './modalborrarinsrip'


const TablaNotificaciones = (props) => {
    const [clases, setClases] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [inscriptos, setinscriptos] = useState()
    const [datos, setDatos] = useState([])
    const [deudaExigible, setDeudaExigible] = useState([''])
    const [vista, setVista] = useState(false)
    const navigate = useNavigate();

    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])


    const traer = async () => {
              
       

                setUsuario(usuario)
                
                const novedades_aux = await servicioInscripciones.incriptas2da()
               console.log(novedades_aux)
                setinscriptos(novedades_aux[0])
                setDeudaExigible(novedades_aux[1])
                setDatos(novedades_aux[2])
                setClases(novedades_aux)
       


    }

    
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >



                <Borrar
                id = {inscriptos[dataIndex].id}
                traer={async () => {
              
       

                    setUsuario(usuario)
                    console.log(123)
                    const novedades_aux = await servicioInscripciones.incriptas2da()
                    console.log(novedades_aux)
                    setinscriptos(novedades_aux[0])
                    setDeudaExigible(novedades_aux[1])
                    setDatos(novedades_aux[2])
                    setClases(novedades_aux)
           
    
    
    
    
    
    
        }}/>



                </div>
            </>
        );
    }
   
    function Observacioness(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >



                <Observaciones
                id = {inscriptos[dataIndex].idp}
                traer={async () => {
              
       

                    setUsuario(usuario)
                    console.log(123)
                    const novedades_aux = await servicioInscripciones.incriptas2da()
                    console.log(novedades_aux)
                    setinscriptos(novedades_aux[0])
                    setDeudaExigible(novedades_aux[1])
                    setDatos(novedades_aux[2])
                    setClases(novedades_aux)
           
    
    
    
    
    
    
        }}/>



                </div>
            </>
        );
    }

    

    // definimos las columnas
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
            name: "tel",
            label: "tel",

        },
        {
            name: "detalle",
            label: "Edicion",

        },
  
       {
            name: "barrio",
            label: "barrio",

        },
        
  
        {
            name: "fecha",
            label: "fecha",

        },
     
        {
            name: "Borrar",
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
  selectableRows: false,
  textLabels: {
    body: {
      noMatch: "Ninguna inscripción encontrada",
    },
  },
  search: true,              // Habilita la búsqueda
  filter: true,              // Habilita los filtros
  download: false,           // Oculta botón de descarga
  print: false,              // Oculta botón de impresión
  viewColumns: false,        // Oculta botón de columnas
  selectableRowsHeader: false,
};


const exportarAExcel = () => {
  if (!inscriptos || inscriptos.length === 0) return;

  // Definir columnas que queremos exportar
  const encabezados = ['DNI', 'Apellido', 'Nombre','Curso inscripto', 'Tel', 'Tel2',  'barrio','alumnaanteior','profesion','enseniar','tiene espacio para oficios','curso_adic','Fecha'];

  // Crear el contenido CSV con separador punto y coma
  const filas = inscriptos.map(item =>
    [item.dni, item.apellido, item.nombre, item.curso, item.tel, item.detalle,item.barrio,item.alumna_anterior,item.profesion,item.enseniar,item.tiene_espacio, item.curso_adic,item.fecha]
  );

  const csvContent = [
    encabezados.join(';'),
    ...filas.map(fila => fila.map(valor => `"${valor || ''}"`).join(';'))
  ].join('\n');

  // Crear y disparar descarga
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "inscriptos.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



    // renderiza la data table
    return (
        <div>

            {inscriptos && datos ? <>       
          
                <Paper
                                                sx={{
                                                    cursor: 'pointer',
                                                    background: '#eeeeee',
                                                    color: '#bdbdbd',
                                                    border: '1px dashed #ccc',
                                                    width: "80%",
                                                    '&:hover': { border: '1px solid #ccc' },
                                                    border: "1px solid black",
                                                    margin: '75px',
                                                    display: 'flex'

                                                }}
                                            >
                                              
                      
                                            </Paper>
                <div>


                    <>
   <Button
  variant="contained"
  onClick={exportarAExcel}
  sx={{
    backgroundColor: '#6c757d', // gris medio
    color: 'white',             // texto blanco
    fontSize: '0.65rem',
    margin: '20px',
    '&:hover': {
      backgroundColor: '#5a6268' // gris más oscuro al pasar el mouse
    }
  }}
>
  Descargar Excel
</Button>
                        <MUIDataTable

                            title={"Inscriptas"}
                            data={inscriptos}
                            columns={columns}
                            actions={[
                                {
                                    icon: 'save',
                                    tooltip: 'Save User',
                                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                                }
                            ]}
                            options={options}


                        />
                       
                    </>
                
                </div>
            </> : <><Carga/></>}  
        </div>
      
    )
}
export default TablaNotificaciones