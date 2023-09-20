import servicioturnos from '../../../services/turnos'
import ModalVer from './ModalVer'
import ModaNueva from './ModalNuevaclase'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useNavigate } from "react-router-dom";
import TouchAppTwoToneIcon from '@mui/icons-material/TouchAppTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModificarClase from './ModalModificarClase'
import BorrarClase from './Modalborrar'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WysiwygTwoToneIcon from '@mui/icons-material/WysiwygTwoTone'
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
                    <>
                    <ModificarClase
                    id={clases[dataIndex]['id']}
                    fecha={clases[dataIndex]['fecha']}
                    observacion={clases[dataIndex]['observacion']} 
                    numero_clase={clases[dataIndex]['numero']}
                    traer =  {async () => {
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
                
                
                
                
                
                
                    }}
                    
                    />
                    <><BorrarClase
                        id={clases[dataIndex]['id']}
                        traer =  {async () => {
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
                    
                        }}
                    /></>
                    </>

                </> : <>
                    <div onClick={() => navigate('/encargados/clase/' + clases[dataIndex]['id'])}>

                        < Tooltip title="ASISTENCIA">
                            <AccountBoxIcon onClick={() => navigate('/encargados/clase/' + clases[dataIndex]['id'])} />
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
            name: "numero",
            label: "Numero",

        },
        {
            name: "presentes",
            label: "presentes",

        },
          {
            name: "ausentes",
            label: "Ausentes",
            
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
    const ir = (id) => {
        navigate('/encargados/clase/'+id)
    }
    return (
        <div>
            <h2>CLASES DEL CURSO</h2>
            {clases ? <>
                <div>


                    
                 

                 <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
             
           
               {clases.map((row) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Item>
                            <div  onClick={() => ir(row.id)} className="body__Page">
                                <div  onClick={() => ir(row.id)}  className="container__article">

                                    <div  onClick={() => ir(row.id)} className="box__article">

                                    
                                    <i  onClick={() => ir(row.id)} > < WysiwygTwoToneIcon fontSize="large"/></i>
                                  


                                        <h5  onClick={() => ir(row.id)}  >{row.observacion}</h5>
                                        
                                        <label onClick={() => ir(row.id)} >{row.fecha}</label>
                                        <p  onClick={() => ir(row.id)} >TOMAR ASISTENCIA</p>
                                    </div>


                                </div>
                            </div>
                        </Item>
                    </Grid>
                    ))}

                </Grid>
            </Box>


                </div>
            </> : <></>}
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
        </div>
    )
}
export default TablaNotificaciones