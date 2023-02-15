import servicioCursos from '../../../services/Cursos'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import Tooltip from '@material-ui/core/Tooltip';

import { useParams } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const TablaNotificaciones = (props) => {
    const [alumnos, setAlumnos] = useState([''])
    const [clase, setClase] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();
    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])


    const traer = async () => {
        try {



            setUsuario(usuario)
            const alumn = await servicioCursos.asistencia(id)
            console.log(alumn)
            setClase(alumn[0][0])
            setAlumnos(alumn[1])

        } catch (error) {

        }






    }




    // definimos las columnas

    return (
        <div>


            <>
                <Paper
                    sx={{
                        cursor: 'pointer',
                        background: '#eeeeee',
                        color: '#bdbdbd',
                        border: '1px dashed #ccc',
                        width: "90%",
                        '&:hover': { border: '1px solid #ccc' },
                        border: "1px solid black",
                        margin: '75px',

                    }}
                >   {!clase ? <Skeleton /> : <>
                    <h2>Fecha {clase.fecha}</h2>
                    <TableContainer>

                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Fecha</b> <b /></TableCell>
                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>NOMBRE</b></TableCell>
                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>ENCARGADO/A</b></TableCell>
                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>CUPO</b></TableCell>
                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>INSCRIPTO/A</b></TableCell>
                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>INSCRIBIRSE</b></TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>


                                {alumnos ? <>
                                {alumnos.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">{row.fecha}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row"><b>{row.nombre}</b></StyledTableCell>
                                        <StyledTableCell component="th" scope="row">{row.encargado}</StyledTableCell>

                                        <StyledTableCell component="th" scope="row">{row.cupo}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">{row.inscripcion === null ? <>NO</> : <> {row.inscripcion === 'Pendiente' ? <>INSCRIPCION EN PROCESO</> : <></>} </>}</StyledTableCell>


                                    </StyledTableRow>
                                ))}

</>  :<> <StyledTableCell component="th" scope="row">No hay alumnos cursando</StyledTableCell></>}


                            </TableBody>
                        </Table>


                    </TableContainer>
                </>}
                </Paper>
            </>
            <div>

            </div>

        </div>
    )
}
export default TablaNotificaciones