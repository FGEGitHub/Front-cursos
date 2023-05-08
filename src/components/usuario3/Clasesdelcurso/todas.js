import servicioturnos from '../../../services/turnos'
import ModalVer from './ModalVer'
import ModaNueva from './ModalNuevaclase'
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
import AccountBoxIcon from '@mui/icons-material/AccountBox';


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
    const [clases, setClases] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();

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

                const novedades_aux = await servicioturnos.lista(id)
                setClases(novedades_aux)
            }

        } catch (error) {

        }






    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

                {usuario.nivel == 2 ? <>
                    <div onClick={() => navigate('/administracion/clase/' + clases[dataIndex]['id'])}>

                        < Tooltip title="ASISTENCIA">
                            <AccountBoxIcon onClick={() => navigate('/administracion/clase/' + clases[dataIndex]['id'])} />
                        </Tooltip>




                    </div>

                </> : <>
                    <div onClick={() => navigate('/coordinadores/clase/' + clases[dataIndex]['id'])}>

                        < Tooltip title="ASISTENCIA">
                            <AccountBoxIcon onClick={() => navigate('/coordinadores/clase/' + clases[dataIndex]['id'])} />
                        </Tooltip>




                    </div>
                </>}
            </>
        );
    }




    // definimos las columnas
    const columns = [
        {
            name: "fecha",
            label: "fecha",

        },
        {
            name: "observacion",
            label: "detalle",

        },
        {
            name: "numero_clase",
            label: "Numero",

        },
        {
            name: "presentes",
            label: "presentes",

        },
          {
            name: "ausentes",
            label: "No tomados",
            
        },
        {
            name: "notomados",
            label: "no tomados",

        },


        {
            name: "Asistencia",
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
            <h2>CLASES DEL CURSO</h2>
            {clases ? <>
                <div>


                    <ModaNueva
                        id_turno={id}
                        traer={async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)

                                    setUsuario(usuario)

                                    const novedades_aux = await servicioturnos.lista(id)
                                    setClases(novedades_aux)
                                }

                            } catch (error) {

                            }






                        }

                        }
                    />
                    {clases.length > 0 ? <>
                        <>
                            <MUIDataTable

                                title={"Clase del curso"}
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
                        </></> : <> <h2>El curso aun no tiene clases</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones