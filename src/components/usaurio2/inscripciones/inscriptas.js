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

    const crearcursos = async () => {
              
       

       alert('Boton sin funcionar aun... probablemente tampoco vaya a funcionar')
      // const novedades_aux = await servicioInscripciones.crearcursos2daetapa()





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
            name: "tel2",
            label: "tel2",

        },
  
   
        
  
        {
            name: "fecha",
            label: "fecha",

        },
     
        {
            name: "Cambiar Estado",
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
            name: "Observaciones",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    Observacioness(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        }, 
    ];
   
    const options = {
        selectableRows: false, // Deshabilita los checkboxes
      };

const exportarAExcel = () => {
  if (!inscriptos || inscriptos.length === 0) return;

  // Definir columnas que queremos exportar
  const encabezados = ['DNI', 'Apellido', 'Nombre', 'Tel', 'Tel2', 'Fecha'];

  // Crear el contenido CSV con separador punto y coma
  const filas = inscriptos.map(item =>
    [item.dni, item.apellido, item.nombre, item.tel, item.tel2, item.fecha]
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
                                              
                            {vista ? <>
                                <Button  onClick={() =>setVista(!vista)}> Ocultar resumen</Button>
                                                <TableContainer >
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Detalles segun prioridad 1 </TableCell>
                                                                <TableCell>Detalles cantidad </TableCell>
                                                                <TableCell>porcentaje </TableCell>
                                                                <TableCell>Cantidad de cursos a crear </TableCell>



                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {deudaExigible ? <>
                                                            {deudaExigible.map((row) => (
                                                                <TableRow
                                                                    key={row.name}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >

                                                                    <TableCell align="left">{row.datoa}</TableCell>
                                                                    <TableCell align="left">{(row.datob)}</TableCell>
                                                                    <TableCell align="left">{(row.datoc)}%</TableCell>
                                                                    <TableCell align="left">{row.datod} - {Math.round(row.datod)} cursos</TableCell>

                                                                </TableRow>
                                                            ))}</>:<><CargaDeTabla/></>}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                </>:<>  <Button onClick={() =>setVista(!vista)}> Ver resumen inscripciones</Button></> }
                                            </Paper>
                <div>


                    <>
         <Button variant="contained" color="primary" onClick={exportarAExcel} style={{ margin: '20px' }}>
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