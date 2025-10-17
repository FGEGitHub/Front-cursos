import servicioDtc from '../../../../services/dtc'
import ModaNueva from './nuevo'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import {
    makeStyles,
    useMediaQuery,
    useTheme,
    Button,
    TextField,
    InputAdornment
} from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';

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

const transparentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
};

const useStyles = makeStyles({
    table: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    bodyCell: {
        color: 'blue',
    },
    selectCell: {
        headerCell: {
            backgroundColor: '#880e4f',
        },
        checkboxRoot: {
            color: 'green',
        },
    },
    searchField: {
        marginBottom: '16px',
        backgroundColor: 'white',
        borderRadius: '4px',
    },
    nombreCompleto: {
        fontWeight: 'bold',
        fontSize: '14px',
    },
    dniCell: {
        fontSize: '13px',
        color: '#666',
    },
});

const TablaNotificaciones = (props) => {
    const theme = useTheme();
    const [chicos, setchicos] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [datos, setDatos] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();

    let params = useParams()
    let id = params.id

    useEffect(() => {
        traer()
    }, [])

    // Filtrar datos basado en el término de búsqueda
    const filteredChicos = chicos.filter(persona => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        return (
            (persona.dni && persona.dni.toString().toLowerCase().includes(searchLower)) ||
            (persona.nombre && persona.nombre.toLowerCase().includes(searchLower)) ||
            (persona.apellido && persona.apellido.toLowerCase().includes(searchLower))
        );
    });

    const options = {
        setTableProps: () => {
            return {
                style: {
                    backgroundColor: "#e3f2fd",
                },
            };
        },
        customHeadRender: (columnMeta, handleToggleColumn) => ({
            TableCell: {
                style: {
                    backgroundColor: '#1565c0',
                    color: 'white',
                },
            },
        }),
        selectableRows: false,
        stickyHeader: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        responsive: 'scroll',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        print: true,
        filter: true,
        viewColumns: true,
        pagination: true,

        textLabels: {
            body: {
                noMatch: "No se encontraron registros",
                toolTip: "Ordenar",
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver columnas",
                filterTable: "Filtrar tabla",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "RESETEAR",
            },
            viewColumns: {
                title: "Mostrar columnas",
                titleAria: "Mostrar/ocultar columnas de la tabla",
            },
            selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar",
                deleteAria: "Eliminar filas seleccionadas",
            },
        },
    };

    const theme2 = createTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    color: '#1e88e5',
                },
            },
            MUIDataTableSelectCell: {
                headerCell: {
                    backgroundColor: '#3f51b5',
                },
                checkboxRoot: {
                    color: '#3f51b5',
                },
            },
        },
    });

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
                setUsuario(usuario)
                const novedades_aux = await servicioDtc.listadepersonaspsiq()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }
        } catch (error) {
            console.error('Error al traer datos:', error)
        }
    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        const persona = isMatch ? filteredChicos[dataIndex] : chicos[dataIndex];
        
        return (
            <>
                {usuario && usuario.nivel == 20 ?
                    <>
                        <div onClick={() => navigate('/dtc/usuario1/personapsiq/' + persona['id'])}>
                            <Tooltip title="Ver">
                                <Button onClick={() => navigate('/dtc/usuario1/personapsiq/' + persona['id'])} variant="contained">
                                    Ver
                                </Button>
                            </Tooltip>
                        </div>
                    </> :
                    <>
                        {usuario.nivel == 24 ?
                            <div onClick={() => navigate('/dtc/psicologa/usuario/' + persona['id'])}>
                                <Tooltip title="Ver">
                                    <Button onClick={() => navigate('/dtc/psicologa/usuario/' + persona['id'])} variant="contained">
                                        Ver
                                    </Button>
                                </Tooltip>
                            </div>
                            :
                            <div onClick={() => navigate('/dtc/visitasocial/personatratamieto/' + persona['id'])}>
                                <Tooltip title="Ver">
                                    <Button onClick={() => navigate('/dtc/visitasocial/personatratamieto/' + persona['id'])} variant="contained">
                                        Ver
                                    </Button>
                                </Tooltip>
                            </div>
                        }
                    </>
                }
            </>
        );
    }

    // definimos las columnas para versión desktop
    const columns = [
        {
            name: "id",
            label: "id",
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
            name: "dni", // Añadí la columna DNI para desktop también
            label: "DNI",
        },
        {
            name: "cantidadturnos",
            label: "Cantidad de turnos",
        },
        {
            name: "observaciones",
            label: "observaciones",
        },
        {
            name: "Ver",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer(
                        dataIndex,
                        rowIndex,
                    )
            }
        },
    ];

    // Componente del buscador para móvil
    const MobileSearchField = () => (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por DNI, nombre o apellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchField}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );

    // renderiza la data table
    return (
        <div sx={{
            cursor: 'pointer',
            backgroundImage: 'linear-gradient(90deg, #9775fa 0%, #69db7c 0%, #3bc9db 99%, #ec8c69 100%, #f783ac 100%, #ffa94d 100%, #ed6ea0 100%)',
            color: '#bdbdbd',
        }}
        >
            {datos ? <>
                <Alert variant="filled" severity="success">
                    datos importantes para rellenar
                </Alert>
            </> : <></>}

            <h2>Lista de personas asistiendo </h2>
            {chicos ? <>
                <div>
                    <ModaNueva
                        id_turno={id}
                        traer={async () => {
                            try {
                                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                if (loggedUserJSON) {
                                    const usuario = JSON.parse(loggedUserJSON)
                                    setUsuario(usuario)
                                    const novedades_aux = await servicioDtc.listadepersonaspsiq(id)
                                    setchicos(novedades_aux[0])
                                }
                            } catch (error) {
                                console.error('Error al traer datos:', error)
                            }
                        }}
                    />
                    {chicos.length > 0 ? <>
                        {isMatch ?
                            <>
                                {/* Buscador para móvil */}
                                <MobileSearchField />
                                
                                <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                        <h1>Lista de usuarios </h1>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>DNI</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Nombre Completo</b></TableCell>
                                                   
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredChicos.map((row) => (
                                                    <StyledTableRow key={row.id}>
                                                        <StyledTableCell component="th" scope="row">
                                                            <div className={classes.nombreCompleto}>
                                                                {row.apellido}, 
                                                            </div>
                                                        </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">
                                                            <div className={classes.dniCell}>
                                                                <b>{row.nombre} , {row.dni}</b>
                                                            </div>
                                                        </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">
                                                            <AccountBoxIcon 
                                                                onClick={() => {
                                                                    if (usuario.nivel == 20) {
                                                                        navigate('/dtc/usuario1/personapsiq/' + row.id)
                                                                    } else if (usuario.nivel == 24) {
                                                                        navigate('/dtc/psicologa/usuario/' + row.id)
                                                                    } else {
                                                                        navigate('/dtc/visitasocial/personatratamieto/' + row.id)
                                                                    }
                                                                }} 
                                                                style={{ cursor: 'pointer', color: '#1976d2' }}
                                                            />
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                                {filteredChicos.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="center">
                                                            No se encontraron resultados
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </>}
                                </TableContainer>
                            </> : 
                            <>
                                <MUIDataTable
                                    title={"Lista de personas "}
                                    data={chicos}
                                    columns={columns}
                                    actions={[
                                        {
                                            icon: 'save',
                                            tooltip: 'Save User',
                                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                                        }
                                    ]}
                                    options={options}
                                    className={classes.table}
                                    classes={{
                                        bodyCell: classes.bodyCell,
                                        selectCell: classes.selectCell,
                                    }}
                                />
                            </>
                        }
                    </> : <> </>}
                </div>
            </> : <></>}
        </div>
    )
}

export default TablaNotificaciones