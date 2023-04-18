import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioAdministracion from '../../../../services/fiscalizacion'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Nuevo from './AgregarUsuario';
import Borrar from './borrarusuario';
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import Modificar from './modificarusuario';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#311b92",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor:"#4dd0e1"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function Ingresos() {
    let params = useParams()


    const [usuarios, setUsuarios] = useState([]);
    const [vista, setVista] = useState(false);




    useEffect(() => {
        traer()
    }, [])
    const traer = async () => {
        console.log('Historial')
        const historial = await servicioAdministracion.todos()


        setUsuarios(historial)
        // 

    };



    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <Modificar
                    id={usuarios[dataIndex].id}
                    nivel={usuarios[dataIndex].nivel}
                    usuario={usuarios[dataIndex].usuario}
                    nombre={usuarios[dataIndex].nombre}
                    traer={async () => {
                        console.log('Historial')
                        const historial = await servicioAdministracion.todos()


                        setUsuarios(historial)
                        // 

                    }}
                />
                <Borrar
                    id={usuarios[dataIndex].id}
                    usuario={usuarios[dataIndex].usuario}
                    nombre={usuarios[dataIndex].nombre}
                    traer={async () => {
                        console.log('Historial')
                        const historial = await servicioAdministracion.todos()


                        setUsuarios(historial)
                        // 

                    }}
                />

            </>
        );
    }
    function Nivel(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {usuarios[dataIndex].nivel === 1 ? <> Alumna  </> : <>  {usuarios[dataIndex].nivel === 2 ? <> Administracion</> : <> {usuarios[dataIndex].nivel === 3 ? <>Coordinador </> : <>  {usuarios[dataIndex].nivel === 4 ? <> Encargad</> : <></>}</>}  </>}     </>}

            </>
        );
    }

    const cambiarvista =  () => {
        setVista(!vista)


    }

    const columns = [
        {
            name: "id",
            label: "id",
        },

        {
            name: "nombre",
            label: "nombre",
        },
        {
            name: "usuario",
            label: "usuario",

        },
        {
            name: "nivel",
            label: "nivel",

        },
        {
            name: "Actions",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    Nivel(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },


        {
            name: "Actions",
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



    return (
        <div>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#eeeeee',
                    color: '#eeeeee',
                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                }}
            >
                <Nuevo />
                <Button variant="contained" onClick={cambiarvista} > CAMBIAR VISTA DE TABLA<RemoveRedEyeIcon/></Button>
                {vista ? <>
                <MUIDataTable

                    title={"Lista de usuarios"}
                    data={usuarios}
                    columns={columns}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}



                /></>: <>
                <TableContainer>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>id </b> <b /></TableCell>
                               
                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>NOMBRE</b></TableCell>

                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>USUARIO</b></TableCell>
                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>TELEFONO</b></TableCell>
                                <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>ACCIONES</b></TableCell>




                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {usuarios ? <>
                                {usuarios.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                       
                                        <StyledTableCell component="th" scope="row"><b>{row.nombre}</b></StyledTableCell>

                                        <StyledTableCell component="th" scope="row">{row.usuario}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row"> {row.tel}  </StyledTableCell>
                                        {/*  <StyledTableCell component="th" scope="row">{row.presente === null ? <>Sin registrar</> : <> {row.row.presente === 'presente' ? <>PRESENTE</> : <>AUSENTE</>} </>}</StyledTableCell> */}
                                        <StyledTableCell component="th" scope="row"> <Modificar
                                            id={row.id}
                                            nivel={row.nivel}
                                            usuario={row.usuario}
                                            nombre={row.nombre}
                                            traer={async () => {
                                                console.log('Historial')
                                                const historial = await servicioAdministracion.todos()


                                                setUsuarios(historial)
                                                // 

                                            }}


                                        />
                                            <Borrar
                                                id={row.id}
                                                usuario={row.usuario}
                                                nombre={row.nombre}
                                                traer={async () => {
                                                    console.log('Historial')
                                                    const historial = await servicioAdministracion.todos()


                                                    setUsuarios(historial)
                                                    // 

                                                }}
                                            />

                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}

                            </> : <> <StyledTableCell component="th" scope="row">No hay alumnos cursando</StyledTableCell></>}


                        </TableBody>
                    </Table>


                </TableContainer>
                </>}





            </Paper>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}
