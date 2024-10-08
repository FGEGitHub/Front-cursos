import servicioEncargados from '../../../services/encargados'

import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import CambiarEstado from '../../usaurio2/Cursos/ModalCAmbiarestado'
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

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
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();
    const [vista, setvista] = useState(true)
  let params = useParams()
  let id = params.id
    useEffect(() => {
        traer()



    }, [])

    const cambiarvista =  () => {
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
            }

        } catch (error) {

        }






    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >
                  
                {clases[dataIndex]['presentes']}/{clases[dataIndex]['ausentes']}/{clases[dataIndex]['sintomar']}

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
            name: "tel",
            label: "telefono",

        },
        {
            name: "Estado",
            label: "estado",

        },

        {
            name: "Presente/ausente/Sin tomar",
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
    const enviarWhatsApp = (telefono) => {
        const link = `https://wa.me/${telefono}`;
        window.open(link, '_blank');
    };
    return (
        <div>
    {/*         {datos ? <>

                <Featured
                titulo1={'Porcentaje presentes/clases'}
                titulo2={'Porcentaje Presentes/ no tomados'}
                porcentaje1={(datos.totalpresentes/datos.total*100).toFixed(2)} 
                porcentaje2={datos.totalpresentes/datos.totalreal *100}

                />
               
            
            </>:<></>} */}
            {clases ? <>
                <div>
                <Button variant="contained" onClick={cambiarvista} >Vista<RemoveRedEyeIcon/></Button>
                {vista ? <>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>DNI</StyledTableCell>
            <StyledTableCell>APELLDO</StyledTableCell>
            <StyledTableCell >NOMBRE</StyledTableCell>
            <StyledTableCell  >TELEFONO</StyledTableCell>
            <StyledTableCell  >ESTADO</StyledTableCell>
            <StyledTableCell align="left">Presente/Ausente/Sin tomar</StyledTableCell>
            <StyledTableCell  >Porcentaje</StyledTableCell>
            <StyledTableCell  >Estado</StyledTableCell>
            <StyledTableCell  >Finalizacion</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {clases.map((row) => (
            <StyledTableRow  key={row.id}>      
             <StyledTableCell >{row.dni}</StyledTableCell> 
              <StyledTableCell >{row.apellido}</StyledTableCell>
              <StyledTableCell >{row.nombre}</StyledTableCell>
              <StyledTableCell>
                                                <Button onClick={() => enviarWhatsApp(row.tel)}>
                                                    {row.tel}
                                                </Button>
                                            </StyledTableCell>
              <StyledTableCell >{row.estado}</StyledTableCell>
              <StyledTableCell >{row.presentes}/{row.ausentes}/{row.sintomar}</StyledTableCell>
              <StyledTableCell >{row.presentes*100 / (row.presentes+row.ausentes +row.sintomar)}%</StyledTableCell>
              <StyledTableCell >{row.observaciones}</StyledTableCell> 
             <StyledTableCell ><CambiarEstado
             
             
             nombre_curso={'s'}
             id_turno= {id}
             id_cursado= {row.id_cursado}

              traer= {async () => {
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
        
         
             }
             /></StyledTableCell>
            </StyledTableRow>




          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>:<>  
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
                  
                     </> }
                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones