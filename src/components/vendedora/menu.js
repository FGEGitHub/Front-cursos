import servicioVendedoras from '../../services/vendedoras'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import ModalBorrar from '../helpers/modalborrar'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import Uno from "../../Assets/uno.webp";
import Nuevo from "./modalnuevonegocio";
import DeleteIcon from '@mui/icons-material/Delete';
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
    const [negocio, setNegocio] = useState()
    const [usuario, setUsuario] = useState([''])
    const [vista, setvista] = useState(true)
    const [imagenBase64, setImagenBase64] = useState('');
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
                const novedades_aux = await servicioVendedoras.listadeproductos(usuario.id)
                console.log(novedades_aux)
                setNegocio(novedades_aux)
            }

        } catch (error) {

        }


    }
    const cambiarvista = () => {
        setvista(!vista)


    }




   
    const ir = (id) => {
        navigate('/encargados/turno/'+id)
    }
    // renderiza la data table
    return (
        <div>
        

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
             
           {negocio ? <>
               {negocio.map((row) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Item>
                            <div className="body__Page">
                                <div   className="container__article">

                                    <div className="box__article">



                                  
                                    <div>
                                
                                    <img src={`data:image/jpeg;base64,${row.imagenBase64}`} alt="Mi Imagen" height="140" />
    </div>


                                        <h5  >Cantidad: {row.cantidad}</h5>
                                        
                                        <label  >Precio:{row.precio}</label>
                                        <p   >Ver producto</p>
                                        <ModalBorrar
                                        id={row.id}
                                        servicio={servicioVendedoras.borrararticulo}
                                    icono = {DeleteIcon}
                                    titulo={'Borrar articulo?'}
                                    texto={'Se borrara permanentemente '}
                                    textoconfirmacion={'Borrar'}
                                    />
                                    </div>


                                </div>
                            </div>
                        </Item>
                    </Grid>
                    ))}


</>:<>  </>}
<Nuevo

id_usuario={usuario.id}
traer={async () => {
    try {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON)

            setUsuario(usuario)
            const novedades_aux = await servicioVendedoras.listadeproductos(usuario.id)
            console.log(novedades_aux)
            setNegocio(novedades_aux)
        }

    } catch (error) {

    }


}}/> 

                </Grid>
            </Box>


        </div>
    )
}
export default TablaNotificaciones