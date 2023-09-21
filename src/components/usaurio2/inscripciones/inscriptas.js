import servicioInscripciones from '../../../services/inscripciones'
import Carga from '../../CargaDeTabla'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Observaciones from '../Personas/observaciones'
import { useNavigate } from "react-router-dom";


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



const TablaNotificaciones = (props) => {
    const [clases, setClases] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [inscriptos, setinscriptos] = useState([''])
    const [datos, setDatos] = useState([''])
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



                <CambiarEstado
                id = {inscriptos[dataIndex].id}
                getClients={async () => {
              
       

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
            name: "nombrecurso1",
            label: "Prioridad 1",

        },
        {
            name: "nombrecurso2",
            label: "Prioridad 2",

        },
   
        
        {
            name: "estado",
            label: "estado",

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
            name: "nombrecurso",
            label: "nombrecurso",

        },
        {
            name: "descripcion",
            label: "Turno",

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
    // renderiza la data table
    return (
        <div>

            {inscriptos ? <>       
                {datos ? <>
             <div className="home">
                
                <Widget  type="Cupos totales "
                      cantidad={datos.cantidadturnos}
                    />
                          <Widget  type="Cantidad preinscriptas"
                      cantidad={datos.cant_preasig}
                    />
                          <Widget  type="Cantidad confirmadas"
                      cantidad={datos.cant_conf}
                    />
                          <Widget  type="Cupos disponibles"
                      cantidad={datos.cantidaddis}
                    />
                    
                    </div>
                    </>:<></>}
                <Button variant="outlined" onClick={crearcursos}>
       Crear Cursos 
      </Button>
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