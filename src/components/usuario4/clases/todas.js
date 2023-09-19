import servicioEncargados from '../../../services/encargados'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Tooltip from '@material-ui/core/Tooltip';
import Face3Icon from '@mui/icons-material/Face3';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import Uno from "../../../Assets/uno.webp";
import Dos from "../../../Assets/dos.webp";
import Tres from "../../../Assets/tres.webp";
import Cuatro from "../../../Assets/cuatro.webp";
import Cinco from "../../../Assets/cinco.webp";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from "@mui/material/Button";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const TablaNotificaciones = (props) => {
    const [clases, setClases] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [vista, setvista] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        traer()



    }, [])

    const islogo = {
        width: "90px",                  
        };
    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
                const novedades_aux = await servicioEncargados.clases(usuario.id)
                console.log(novedades_aux)
                setClases(novedades_aux)
            }

        } catch (error) {

        }


    }
    const cambiarvista = () => {
        setvista(!vista)


    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                <>
                    < Tooltip title="contactar">
                        <PhoneForwardedSharpIcon onClick={() => navigate('/encargados/curso/' + clases[dataIndex]['turnoid'])} />
                    </Tooltip>
                </>
                <br />
                <>
                    < Tooltip title="ir a la clase">
                        <ContentPasteGoIcon onClick={() => navigate('/encargados/turno/' + clases[dataIndex]['turnoid'])} />
                    </Tooltip>
                </>
                <br />
                <>
                    < Tooltip title="Estadisticas">
                        <Face3Icon onClick={() => navigate('/encargados/alumnosdelturno/' + clases[dataIndex]['turnoid'])} />
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
    const ir = (id) => {
        navigate('/encargados/turno/'+id)
    }
    // renderiza la data table
    return (
        <div>
           {/*  {clases ? <>
                <div>
                    <Button variant="contained" onClick={cambiarvista} >Vista<RemoveRedEyeIcon /></Button>
                    {vista ? <>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: "20%", maxWidth: "1000%" }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>IR AL CURSO</StyledTableCell>
                                        <StyledTableCell>NOMBRE</StyledTableCell>
                                        <StyledTableCell >DESCRIPCION</StyledTableCell>
                                        <StyledTableCell >PENDIENTES POR CONTESTAR</StyledTableCell>
                                        <StyledTableCell align="left">CONTACTAR  / IR A CLASES/ </StyledTableCell>
                                        <StyledTableCell >ESTADO / CAMBIAR ESTADO</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clases.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell > <Button variant="contained" onClick={() => navigate('/encargados/turno/' + row.turnoid)}>iR</Button>  </StyledTableCell>
                                            <StyledTableCell >{row.nombre}</StyledTableCell>
                                            <StyledTableCell >{row.descripcion}</StyledTableCell>
                                            <StyledTableCell >{row.cantsinresp}/{row.total}</StyledTableCell>
                                            <StyledTableCell >   < Tooltip title="contactar">
                                                <PhoneForwardedSharpIcon onClick={() => navigate('/encargados/curso/' + row.turnoid)} />
                                            </Tooltip>

                                                < Tooltip title="ir a la clase">
                                                    <ContentPasteGoIcon onClick={() => navigate('/encargados/turno/' + row.turnoid)} />
                                                </Tooltip>
                                            </StyledTableCell>

                                            <StyledTableCell >
                                                < Tooltip title="Estado alumnas">
                                                    <Face3Icon onClick={() => navigate('/encargados/alumnosdelturno/' + row.turnoid)} />
                                                </Tooltip>

                                                < Tooltip title="cambiar estado ">
                                                    <ManageAccountsIcon onClick={() => navigate('/encargados/estadoalumnas/' + row.turnoid)} />
                                                </Tooltip>




                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </> : <>
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
            </> : <></>} */}

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
             
           
               {clases.map((row) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Item>
                            <div  onClick={() => ir(row.id)} className="body__Page">
                                <div  onClick={() => ir(row.id)}  className="container__article">

                                    <div  onClick={() => ir(row.id)} className="box__article">



                                  
                                    <div>
      {row.id_curso === '132' ? (
        <div>
          {/* Código para el caso 1 */}
          <img  onClick={() => ir(row.id)}  style={islogo} src={Uno} alt="logo" /> 
        </div>
      ) : row.id_curso  === '133' ? (
        <div>
          {/* Código para el caso 2 */}
          <img  onClick={() => ir(row.id)}  style={islogo} src={Dos} alt="logo" /> 
        </div>
      ) : row.id_curso  === '134' ? (
        <div>
          {/* Código para el caso 3 */}
          <img  onClick={() => ir(row.id)}  style={islogo} src={Tres} alt="logo" /> 
        </div>
      ) : row.id_curso  === '135' ? (
        <div>
          {/* Código para el caso 4 */}
          <img  onClick={() => ir(row.id)}  style={islogo} src={Cuatro} alt="logo" /> 
        </div>
      ) : row.id_curso  === '136' ? (
        <div>
          {/* Código para el caso 5 */}
          <img  onClick={() => ir(row.id)}  style={islogo} src={Cinco} alt="logo" /> 
        </div>
      )  : (
        <div>
           <img  onClick={() => ir(row.id)}  style={islogo} src={Cinco} alt="logo" /> 
        </div>
      )}
    </div>


                                        <h5  onClick={() => ir(row.id)}  >{row.nombre}</h5>
                                        
                                        <label onClick={() => ir(row.id)} >{row.descripcion}</label>
                                        <p  onClick={() => ir(row.id)} >IR AL CURSO</p>
                                    </div>


                                </div>
                            </div>
                        </Item>
                    </Grid>
                    ))}

                </Grid>
            </Box>


        </div>
    )
}
export default TablaNotificaciones