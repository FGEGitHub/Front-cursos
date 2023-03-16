import servicioEncargados from '../../../services/encargados'
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
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from "@mui/material/Button";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';


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

                const novedades_aux = await servicioEncargados.curso(id)
                setClases(novedades_aux)
            }

        } catch (error) {

        }






    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >
                  
                  
                    <ModalVer
                    id= {clases[dataIndex]['id']}
                   nombre_curso={'s'}
                   id_turno= {id}
                   id_cursado= {clases[dataIndex]['idcursado']}

                    traer= {async () => {
                        try {
                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                            if (loggedUserJSON) {
                                const usuario = JSON.parse(loggedUserJSON)
                
                                setUsuario(usuario)
                
                                const novedades_aux = await servicioEncargados.curso(id)
                                setClases(novedades_aux)
                            }
                
                        } catch (error) {
                
                        }
                
                
                
                
                
                
                    }}

                    />


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
            name: "Ver detalles",
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
                  
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>APELLDO</StyledTableCell>
            <StyledTableCell >NOMBRE</StyledTableCell>
            <StyledTableCell  >ESTADO</StyledTableCell>
            <StyledTableCell align="left">ACCIONES</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {clases.map((row) => (
            <StyledTableRow  key={row.id}>       
              <StyledTableCell >{row.apellido}</StyledTableCell>
              <StyledTableCell >{row.nombre}</StyledTableCell>
              <StyledTableCell >{row.inscripcion}</StyledTableCell>
              <StyledTableCell >   <ModalVer
                    id= {row.id}
                   nombre_curso={'s'}
                   id_turno= {id}
                   id_cursado= {row.idcursado}

                    traer= {async () => {
                        try {
                            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                            if (loggedUserJSON) {
                                const usuario = JSON.parse(loggedUserJSON)
                
                                setUsuario(usuario)
                
                                const novedades_aux = await servicioEncargados.curso(id)
                                setClases(novedades_aux)
                            }
                
                        } catch (error) {
                
                        }
                
                
                    }}

                    />
               </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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

                 
                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones