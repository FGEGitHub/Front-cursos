import servicioCursos from '../../../services/Cursos'
import Modificarturno from '../Cursos/ModalModificarclasesdelcurso'
import ModalCoordina from '../Cursos/ModalAsignarcoordinador'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import Face3Icon from '@mui/icons-material/Face3';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from "@mui/material/Button";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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


        const tur = await servicioCursos.listadetodoslosturnos()
        console.log(tur)
        setClases(tur)




    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >
                  
                  
                    
                </div>
            </>
        );
    }



    function Borrarturno(dataIndex, rowIndex, data, onClick) {
        return (
          <>
     
          <Modificarturno
                id={clases[dataIndex].id}
                getClients= { async () => {


                    const tur = await servicioCursos.listadetodoslosturnos()
                    console.log(tur)
                    setClases(tur)
            
            
            
            
                }}/>
             
          
          
      
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
                Borrarturno(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },

Borrarturno
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
         <p  style={{ color: 'crimson' }}  >***Nota: si no asignaste el encargado entonces habra 0(cero) Alumnas por responder llamado</p>
            {clases ? <>
                <div>
                  
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
           
            <StyledTableCell >NOMBRE</StyledTableCell>
            <StyledTableCell>Referencia de turno</StyledTableCell>
            <StyledTableCell  >Horario</StyledTableCell>
            <StyledTableCell  >Coordinador</StyledTableCell>
            <StyledTableCell  >Encargado</StyledTableCell>
            <StyledTableCell align="left">Confirmadas/cupo</StyledTableCell>
          
            <StyledTableCell align="left">Opciones</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {clases.map((row) => (
            <StyledTableRow  key={row.id}>       
          
          
              <StyledTableCell  onClick={() => navigate('/administracion/turno/'+row.id)} >{row.nombrecurso}</StyledTableCell>
               <StyledTableCell >{row.numero}</StyledTableCell>
              <StyledTableCell  onClick={() => navigate('/administracion/turno/'+row.id)} >{row.descripcion}</StyledTableCell>
              <StyledTableCell  onClick={() => navigate('/administracion/turno/'+row.id)} >{row.coordinador}</StyledTableCell>
              <StyledTableCell  onClick={() => navigate('/administracion/turno/'+row.id)} >{row.encargado}</StyledTableCell>
              <StyledTableCell > {row.cantidad}/{row.cupo}  </StyledTableCell>
  

              <StyledTableCell style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >  < Tooltip title="ir al turno">
              <Button variant='outlined' onClick={() => navigate('/administracion/turno/'+row.id)} style={{minWidth: '150px'}}>Ver</Button>
                </Tooltip>
                <Modificarturno
                id={row.id}
                getClients= { async () => {


                    const tur = await servicioCursos.listadetodoslosturnos()
                    console.log(tur)
                    setClases(tur)
            
            
            
            
                }}/>
                 <ModalCoordina
                id={row.id}
                getClients= { async () => {


                    const tur = await servicioCursos.listadetodoslosturnos()
                    console.log(tur)
                    setClases(tur)
            
            
            
            
                }}/>
                
              </StyledTableCell>

              
              {/* <StyledTableCell >   <ModalVer
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
                
                                const novedades_aux = await servicioCursos.curso(id)
                                setClases(novedades_aux)
                            }
                
                        } catch (error) {
                
                        }
                
                
                    }}

                    />
               </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                        <>
                            
                        </>
                        /* 
                                      */

                 
                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones