import serviciocoordinadores from '../../../services/coordinadores'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import Justificacion from './justificacion'
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
            console.log(loggedUserJSON)
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)

                const novedades_aux = await serviciocoordinadores.listadeausentes(usuario.id)
                console.log(novedades_aux)
                setClases(novedades_aux[0])
               
            }

        } catch (error) {

        }






    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <div >
                  
                {clases[dataIndex]['presente']}/{clases[dataIndex]['ausente']}/{clases[dataIndex]['sintomar']}

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
            name: "tel2",
            label: "Telefono alternativo",

        },

        {
            name: "FECHA CLASE",
            label: "Fechade clase",

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
    return (
        <div>
            <h2>LISTA DE AUSENTES</h2>
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
            <StyledTableCell  >TELEFONO 2</StyledTableCell>
            <StyledTableCell  >Justificado</StyledTableCell>
            <StyledTableCell align="left">FECHA CLASE</StyledTableCell>
            <StyledTableCell align="left">JUSTIFICAR</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clases.map((row) => (
            <StyledTableRow  key={row.id}>      
             <StyledTableCell >{row.dni}</StyledTableCell> 
              <StyledTableCell >{row.apellido}</StyledTableCell>
              <StyledTableCell >{row.nombre}</StyledTableCell>
              <StyledTableCell >{row.tel}</StyledTableCell>
              <StyledTableCell >{row.tel2}</StyledTableCell>
              <StyledTableCell >{row.justificacion == "Ninguna" ? <>No</>:<>Si</>}</StyledTableCell>
              <StyledTableCell >{row.fechaclase}</StyledTableCell>
              <StyledTableCell >
              <Justificacion
              id = {row.id}
              getClients={async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                    console.log(loggedUserJSON)
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
                        setUsuario(usuario)
                        const novedades_aux = await serviciocoordinadores.listadeausentes(usuario.id)
                        console.log(novedades_aux)
                        setClases(novedades_aux[0])
                    }  
            }
        }
              />
               </StyledTableCell>
              
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