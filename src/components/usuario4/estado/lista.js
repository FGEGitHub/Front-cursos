import servicioEncargados from '../../../services/encargados'

import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Widget from '../../estadisticas/Widget/Widget'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from "@mui/material/Button";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modalestado from './modalestado'
import '../../estadisticas/Home.scss'
import Featured from '../../estadisticas/featured/Featured'

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
    const [clases, setClases] = useState()
    const [datos, setDatos] = useState()
    const [datosconfirmados, setDatosconfirmados] = useState()
    const [estadisticas, setEstadisticas] = useState()
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();
    const [vista, setvista] = useState(true)
    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])

    const cambiarvista = () => {
        setvista(!vista)


    }

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await servicioEncargados.alumnasdelcurso(id)
                console.log(novedades_aux)
                setClases(novedades_aux[0])
                console.log(novedades_aux[1])
                setDatos(novedades_aux[1])
                setEstadisticas(novedades_aux[2])
                setDatosconfirmados(novedades_aux[3])
            }

        } catch (error) {

        }






    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >


                    <Modalestado


                        nombre_curso={'s'}
                        id_turno={id}

                        id_cursado={clases[dataIndex]['idcursado']}

                        traer={async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)

                                    setUsuario(usuario)

                                    const novedades_aux = await servicioEncargados.alumnasdelcurso(id)
                                    console.log(novedades_aux)
                                    setClases(novedades_aux[0])
                                    console.log(novedades_aux[1])
                                    setDatos(novedades_aux[1])
                                }

                            } catch (error) {

                            }




                        }

                        } />

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
            name: "inscripcion",
            label: "Estado",

        },
        {
            name: "presente",
            label: "Presentes",

        },
        {
            name: "ausente",
            label: "Ausentes",

        },
        {
            name: "justificadas",
            label: "Justificado",

        },
        {
            name: "primerclase",
            label: "Primer clase",

        },


        {
            name: "Ausentes(Justificadas)",
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
            {clases ? <>

                <Alert variant="outlined" severity="error">
        Detalles del curso: Confirmadas: {datosconfirmados.confirmados} Rechazados: {datosconfirmados.rechazados}
      </Alert>

          
                    <div className="home">
      {estadisticas.map((row) => (
                 <>       <h3>Clase {row.numero} </h3>
                        <div className="widgets">

                            <Widget type="total Presentes"
                                cantidad={row.presenteclase}
                            />
                        </div>
                        <div className="widgets">
                            <Widget type="total ausentes"
                                cantidad={row.ausenteclase}
                            />
                        </div> 
                        
                             </>
            ))}
                    </div>

                  

                <div>
                    <Button variant="contained" onClick={cambiarvista} >Vista<RemoveRedEyeIcon /></Button>
                    {vista ? <>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: "20%", maxWidth: "1000%" }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>APELLDO</StyledTableCell>
                                        <StyledTableCell >NOMBRE</StyledTableCell>
                                        <StyledTableCell  >INSCRIPCION</StyledTableCell>
                                        <StyledTableCell align="left">Presentes</StyledTableCell>
                                        <StyledTableCell align="left">Ausentes(Justificados)</StyledTableCell>
                                        <StyledTableCell  >ESTADO</StyledTableCell>
                                        <StyledTableCell  >PRIMER CLASE</StyledTableCell>
                                        <StyledTableCell  >CAMBIAR ESTADO</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clases.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell >{row.apellido}</StyledTableCell>
                                            <StyledTableCell >{row.nombre}</StyledTableCell>
                                            <StyledTableCell >{row.inscripcion}</StyledTableCell>
                                            <StyledTableCell >{row.presente}</StyledTableCell>
                                            <StyledTableCell >{row.ausente}/({row.justificadas})</StyledTableCell>
                                            <StyledTableCell >{row.observaciones === null ? <>Cursando</> : <>{row.observaciones} </>}</StyledTableCell>
                                            <StyledTableCell >{row.primerclase}</StyledTableCell>
                                            <StyledTableCell >
                                                <Modalestado


                                                    nombre_curso={'s'}
                                                    id_turno={id}
                                                    id_cursado={row.idcursado}

                                                    traer={async () => {
                                                        try {
                                                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                                            if (loggedUserJSON) {
                                                                const usuario = JSON.parse(loggedUserJSON)

                                                                setUsuario(usuario)

                                                                const novedades_aux = await servicioEncargados.alumnasdelcurso(id)
                                                                console.log(novedades_aux)
                                                                setClases(novedades_aux[0])
                                                                console.log(novedades_aux[1])
                                                                setDatos(novedades_aux[1])
                                                            }

                                                        } catch (error) {

                                                        }




                                                    }

                                                    } />

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </> : <>
                        <>
                            <MUIDataTable

                                title={"Clase"}
                                data={clases}
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
                        /*
                        */

                    </>}
                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones