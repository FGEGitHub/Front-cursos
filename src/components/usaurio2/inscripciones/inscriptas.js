import servicioInscripciones from '../../../services/inscripciones'
import ModalVer from './ModalVer'
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
    const [inscriptos, setinscriptos] = useState([''])
    const [noinscriptos, setnoinscriptos] = useState([''])
    const navigate = useNavigate();

    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])


    const traer = async () => {
              
       

                setUsuario(usuario)
                console.log(123)
                const novedades_aux = await servicioInscripciones.incriptas2da()
                console.log(novedades_aux)
                setinscriptos(novedades_aux[0])
                setnoinscriptos(novedades_aux[1])
                setClases(novedades_aux)
       






    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >







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
            name: "descripcion",
            label: "detalle turno",

        },
        


    ];
    const columns2 = [
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
            name: "nombrecurso",
            label: "curso",

        },
        {
            name: "nombrecurso",
            label: "Curso 1",

        },
        {
            name: "nombrecurso2",
            label: "prioridad 2",

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
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones