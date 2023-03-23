import servicioEncargados from '../../../services/encargados'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Tooltip from '@material-ui/core/Tooltip';
import NewReleasesTwoToneIcon from '@mui/icons-material/NewReleasesTwoTone';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from "@mui/material/Button";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#4caf50",
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
    const [vista, setvista] = useState(true)
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
                const novedades_aux = await servicioEncargados.clases(usuario.id)
                setClases(novedades_aux)
            }

        } catch (error) {

        }


    }
    const cambiarvista =  () => {
        setvista(!vista)


    }
    
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

            
                 <>
                 < Tooltip title="contactar">
                <PhoneForwardedSharpIcon  onClick={() => navigate('/encargados/curso/'+clases[dataIndex]['turnoid'])}  />
                </Tooltip>
                </>
                    <br/>      
                <>
                < Tooltip title="ir a la clase">
                <ContentPasteGoIcon   onClick={() => navigate('/encargados/turno/'+clases[dataIndex]['turnoid'])} />
                </Tooltip>
                </>
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
            name: "descripcion",
            label: "descripcion",

        },
        {
            name: "Llamar/ Ir al curso",
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
                <div>
                <Button variant="contained" onClick={cambiarvista} >Vista<RemoveRedEyeIcon/></Button>
                {vista ? <>

                <TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>NOMBRE</StyledTableCell>
            <StyledTableCell >DESCRIPCION</StyledTableCell>
            <StyledTableCell >PENDIENTES POR CONTESTAR</StyledTableCell>
            <StyledTableCell align="left">CONTACTAR  / IR A CLASES</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {clases.map((row) => (
            <StyledTableRow key={row.name}>       
              <StyledTableCell >{row.nombre}</StyledTableCell>
              <StyledTableCell >{row.descripcion}</StyledTableCell>
              <StyledTableCell >{row.cantsinresp}/{row.total}</StyledTableCell>
              <StyledTableCell >   < Tooltip title="contactar">
                <PhoneForwardedSharpIcon  onClick={() => navigate('/encargados/curso/'+row.turnoid)}  />
                </Tooltip> 
                  
                < Tooltip title="ir a la clase">
                <ContentPasteGoIcon   onClick={() => navigate('/encargados/turno/'+row.turnoid)} />
                </Tooltip></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>:<>
                        <>
                            <MUIDataTable

                                title={"Turnos"}
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
                        </></>}
                 

                 
                </div>
            </> : <></>}

     
        </div>
    )
}
export default TablaNotificaciones