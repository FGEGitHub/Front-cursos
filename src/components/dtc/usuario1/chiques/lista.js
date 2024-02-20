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

                {usuario.nivel == 2 ? <>
                    <div onClick={() => navigate('/administracion/clase/' + chicos[dataIndex]['id'])}>

                        < Tooltip title="ASISTENCIA">
                            <AccountBoxIcon onClick={() => navigate('/administracion/clase/' + chicos[dataIndex]['id'])} />
                        </Tooltip>




                    </div>

                </> : <>
                    <div onClick={() => navigate('/coordinadores/clase/' + chicos[dataIndex]['id'])}>

                        < Tooltip title="ASISTENCIA">
                            <AccountBoxIcon onClick={() => navigate('/coordinadores/clase/' + chicos[dataIndex]['id'])} />
                        </Tooltip>




                    </div>
                </>}
            </>
        );
    }




    // definimos las columnas
    const columns = [
        {
            name: "nombre",
            label: "nombre",

        },
        {
            name: "apellido",
            label: "apellido",

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
            name: "primer_contacto",
            label: "primer_contacto",

        },    {
            name: "primer_ingreso",
            label: "primer_ingreso",

        },    {
            name: "admision",
            label: "admision",

        },    {
            name: "dni",
            label: "dni",

        },    {
            name: "domicilio",
            label: "domicilio",

        },    {
            name: "telefono",
            label: "telefono",

        },    {
            name: "autorizacion_imagen",
            label: "autorizacion_imagen",

        },    {
            name: "fotoc_dni",
            label: "fotoc_dni",

        },    {
            name: "fotoc_responsable",
            label: "fotoc_responsable",

        },    {
            name: "tel_responsable",
            label: "tel_responsable",

        },
        {
            name: "visita_social",
            label: "visita_social",

        },
        {
            name: "egreso",
            label: "egreso",

        },
        {
            name: "aut_retirar",
            label: "aut_retirar",

        },
        {
            name: "dato_escolar",
            label: "dato_escolar",

        },
        {
            name: "hora_merienda",
            label: "hora_merienda",

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

        /*    rowsPerPage: 10,
           download: false, // hide csv download option
           onTableInit: this.handleTableInit,
           onTableChange: this.handleTableChange, */
    };
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
                                            <h1>Chiques</h1>
                                            <Table >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Apellido</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Fecha de nacimiento</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Primer contacto</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Primer ingreso</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Admision</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Dni</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Domicilio</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>telefono</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Autorizacion de imagen</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Fotoc DNI</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Fotoc dni Responsable</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>tel_responsable</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>visita_social</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Egreso</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>aut_retirar</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>dato_escolar</b></TableCell>
                                                        <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>hora merienda</b></TableCell>

                                                       
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>



                                                    {chicos.map((row) => (
                                                        <StyledTableRow key={row.name}>
                                                            <StyledTableCell component="th" scope="row">{row.apellido} </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.nombre} </b> </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.primer_contacto}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.primer_ingreso}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.admision}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.dni}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.domicilio}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.telefono}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.autorizacion_imagen}</b></StyledTableCell> 
                                                            <StyledTableCell component="th" scope="row"> <b>{row.fotoc_dni}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.fotoc_responsable}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.tel_responsable}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.visita_social}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.egreso}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.aut_retirar}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.dato_escolar}</b></StyledTableCell>
                                                            <StyledTableCell component="th" scope="row"> <b>{row.hora_merienda}</b></StyledTableCell>



                                                           
                                                        </StyledTableRow>
                                                    ))}




                                                </TableBody>
                                            </Table>
                                        </>}

                                    </TableContainer>
                                    </>:<><>
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