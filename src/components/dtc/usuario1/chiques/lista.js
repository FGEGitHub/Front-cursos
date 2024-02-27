import servicioDtc from '../../../../services/dtc'
import ModalVer from './ModalVer'
import ModaNueva from './nuevo'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import {

    makeStyles,
    useMediaQuery,
    useTheme,
    Button
} from '@material-ui/core';
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
    const theme = useTheme();
    const [chicos, setchicos] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));


    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])
    const options = {
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
    };

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioDtc.listachiques()
                setchicos(novedades_aux[0])
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

                <div onClick={() => navigate('/dtc/usuario1/usuario/' + chicos[dataIndex]['id'])} >

                    < Tooltip title="Ver">
                        <Button  onClick={() => navigate('/dtc/usuario1/usuario/' + chicos[dataIndex]['id'])} variant="contained">
Ver                        </Button>
                    </Tooltip>




                </div>


            </>
        );
    }




    // definimos las columnas
    const columns = [
        {
            name: "apellido",
            label: "apellido",

        },
        {
            name: "nombre",
            label: "nombre",

        },
    
        {
            name: "fecha_nacimiento",
            label: "Fecha de nacimiento",

        },
        {
            name: "observaciones",
            label: "observaciones",

        },

        {
            name: "Ver",
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

    // renderiza la data table
    return (
        <div>
            <h2>Lista de chicos</h2>
            {chicos ? <>
                <div>


                    <ModaNueva
                        id_turno={id}
                        traer={async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)

                                    setUsuario(usuario)

                                    const novedades_aux = await servicioDtc.lista(id)
                                    setchicos(novedades_aux[0])
                                }

                            } catch (error) {

                            }






                        }

                        }
                    />
                    {chicos.length > 0 ? <>


                        {isMatch ?
                            <>

                                <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                        <h1>Lista de usuarios </h1>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Dni</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {chicos.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.apellido} {row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">  <AccountBoxIcon onClick={() => navigate('/dtc/usuario1/usuario/' + row.id)} /> </StyledTableCell>




                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
                            </> : <><>
                                <MUIDataTable

                                    title={"Lista de chicos"}
                                    data={chicos}
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

                            </></>}

                    </> : <> <h2>El curso aun no tiene chicos</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones