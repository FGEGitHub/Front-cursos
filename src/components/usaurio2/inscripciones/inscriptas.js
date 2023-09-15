import servicioInscripciones from '../../../services/inscripciones'
import Carga from '../../CargaDeTabla'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
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
            name: "categoria",
            label: "categoria",

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

    ];
   
    const options = {

        /*    rowsPerPage: 10,
           download: false, // hide csv download option
           onTableInit: this.handleTableInit,
           onTableChange: this.handleTableChange, */
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
                      cantidad={3}
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
                                                            {deuda_exigible ? <>
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