import servicioCursos from '../../../services/Cursos'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import ModalVer from "./ModalVer";

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
    const [noti, setNoti] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();
    useEffect(() => {
        traer()



    }, [])


    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
                
                setUsuario(usuario)
                const lotes = await servicioCursos.listaniv1(usuario.usuario)
                setNoti(lotes)
           
            }

        } catch (error) {

        }






    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div>
                    < ModalVer
                        id={noti[dataIndex].id} />
                  


                </div>
                </>
        );
    }
    function Inscripto(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div>
                  {noti[dataIndex].inscripcion === null ? <>No</>:<></>}
                  


                </div>
                </>
        );
    }

    

    // definimos las columnas
    const columns = [
        {
            name: "id",
            label: "ID",

        },
        {
            name: "cuil_cuit",
            label: "Cuil/cuit",
        },

        {
            name: "descripcion",
            label: "descripcion",

        },
        {
            name: "leida",
            label: "leida",

        },
        {
            name: "asunto",
            label: "asunto",

        },
         
        {
            name: "Inscripto/a?",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    Inscripto(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "Ver/Contestar",
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
                >
                    <h2>Cursos</h2>
                    <TableContainer>
                        {!noti ? <Skeleton /> : <>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Fecha</b> <b /></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>NOMBRE</b></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>ENCARGADO/A</b></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>CUPO</b></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>INSCRIPTO/A</b></TableCell>
                                        <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>VER</b></TableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>

 

                                    {noti.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">{row.fecha}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row"><b>{row.nombre}</b></StyledTableCell>
                                            <StyledTableCell component="th" scope="row">{row.encargado}</StyledTableCell>

                                            <StyledTableCell component="th" scope="row">{row.cupo}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">{row.inscripcion === null ? <>No</>:<> {row.inscripcion === 'Pendiente' ?<>Inscripta</>:<></>} </>}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">    < ModalVer id={row.id} 
                                            nombre ={row.nombre}
                                            traer={async () => {
                                                try {
                                                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                                    if (loggedUserJSON) {
                                                        const usuario = JSON.parse(loggedUserJSON)
                                                        console.log(usuario.cuil_cuit)
                                                        setUsuario(usuario)
                                                        const lotes = await servicioCursos.noticliente(usuario.cuil_cuit)
                                                        setNoti(lotes)
                                                    }

                                                } catch (error) {

                                                }

                                            }} /> </StyledTableCell>

                                        </StyledTableRow>
                                    ))}




                                </TableBody>
                            </Table>
                        </>}

                    </TableContainer>
                </Paper>
            </>
            <div>
                
            </div>

        </div>
    )
}
export default TablaNotificaciones