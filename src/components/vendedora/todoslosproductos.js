import servicioVendedoras from '../../services/vendedoras'
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

import Ver from "./modalverproducto";

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
    const [searchValue, setSearchValue] = useState("");

    const [usuario, setUsuario] = useState([''])
    const [vista, setvista] = useState(true)
    const [imagenBase64, setImagenBase64] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        traer()



    },  [searchValue])

    const islogo = {
        width: "90px",
    };
    const traer = async () => {
        const novedades_aux = await servicioVendedoras.listadetodosproductos();
    
        // Filtrar productos por nombre
        const productosFiltrados = novedades_aux.filter(producto =>
            producto.nombre.toLowerCase().includes(searchValue.toLowerCase())
        );
    
        setNegocio(productosFiltrados);
    };
    const cambiarvista = () => {
        setvista(!vista)


    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>


                <>
                    < Tooltip title="contactar">
                        <PhoneForwardedSharpIcon onClick={() => navigate('/encargados/curso/' + negocio[dataIndex]['turnoid'])} />
                    </Tooltip>
                </>
                <br />
                <>
                    < Tooltip title="ir a la clase">
                        <ContentPasteGoIcon onClick={() => navigate('/encargados/turno/' + negocio[dataIndex]['turnoid'])} />
                    </Tooltip>
                </>
                <br />
                <>
                    < Tooltip title="Estadisticas">
                        <Face3Icon onClick={() => navigate('/encargados/alumnosdelturno/' + negocio[dataIndex]['turnoid'])} />
                    </Tooltip>
                </>

            </>

        );
    }




    // definimos las columnas

    const ir = (id) => {
        navigate('/encargados/turno/' + id)
    }
    // renderiza la data table
    return (
        <div>
<div>
    <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
    />
</div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>

                    {negocio ? <>
                        {negocio.map((row) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Item>
                                    <div className="body__Page">
                                        <div className="container__article">

                                            <div className="box__article">




                                                <div>
                                                    <img src={`data:image/jpeg;base64,${row.imagenBase64}`} alt="Mi Imagen" height="140" />
                                                </div>


                                                <h5   >Cantidad: {row.cantidad}</h5>

                                                <label  >Precio:{row.precio}</label>
                                                <Ver
                                                    id_usuario={row.id_usuario}
                                                    nombre={row.nombre}
                                                    descripcion={row.descripcion}
                                                    precio={row.precio}
                                                    cantidad={row.cantidad}
                                                    fecha={row.fecha}
                                                    imagenBase64={row.imagenBase64}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                        ))}


                    </> : <>  </>}


                </Grid>
            </Box>


        </div>
    )
}
export default TablaNotificaciones