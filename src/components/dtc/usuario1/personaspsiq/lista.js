import servicioDtc from '../../../../services/dtc'
import ModaNueva from './nuevo'
import React, { useEffect, useState } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { useNavigate, useParams } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
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
import { createTheme } from '@material-ui/core/styles';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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

const TablaNotificaciones = () => {
    const theme = useTheme();
    const [chicos, setchicos] = useState([])
    const [usuario, setUsuario] = useState([])
    const [datos, setDatos] = useState(null)
    const [porcentajeObraSocial, setPorcentajeObraSocial] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();
    const { id } = useParams()

    useEffect(() => {
        traer()
    }, [])

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)
                setUsuario(usuario)

                const novedades_aux = await servicioDtc.listadepersonaspsiq()
                console.log(novedades_aux[0])
                const listaChicos = novedades_aux[0]

                setchicos(listaChicos)
                setDatos(novedades_aux[1])

                // ✅ Calcular porcentaje con obra social válida
                if (listaChicos && listaChicos.length > 0) {
                    const total = listaChicos.length
                    const conObra = listaChicos.filter(
                        (c) =>
                            c.obra_social &&
                            c.obra_social.toLowerCase() !== "no" &&
                            c.obra_social.toLowerCase() !== "sin determinar"
                    ).length

                    const porcentaje = ((conObra / total) * 100).toFixed(1)
                    setPorcentajeObraSocial(porcentaje)
                }
            }
        } catch (error) {
            console.error('Error al traer datos:', error)
        }
    }

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
        selectableRows: false,
        stickyHeader: true,
        responsive: 'scroll',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        textLabels: {
            body: { noMatch: "No se encontraron registros" },
        },
    };

    const columns = [
        { name: "id", label: "ID" },
        { name: "apellido", label: "Apellido" },
        { name: "nombre", label: "Nombre" },
        { name: "dni", label: "DNI" },
        { name: "cantidadturnos", label: "Turnos" },
        { name: "observaciones", label: "Observaciones" },
        {
            name: "Ver",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const persona = chicos[dataIndex]
                    return (
                        <Tooltip title="Ver">
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (usuario.nivel === 20) {
                                        navigate('/dtc/usuario1/personapsiq/' + persona.id)
                                    } else if (usuario.nivel === 24) {
                                        navigate('/dtc/psicologa/usuario/' + persona.id)
                                    } else {
                                        navigate('/dtc/visitasocial/personatratamieto/' + persona.id)
                                    }
                                }}
                            >
                                Ver
                            </Button>
                        </Tooltip>
                    )
                }
            }
        }
    ];

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

    return (
        <div
            style={{
                cursor: 'pointer',
                backgroundImage: 'linear-gradient(90deg, #9775fa 0%, #69db7c 0%, #3bc9db 99%)',
                color: '#bdbdbd',
                padding: 16,
            }}
        >
            {datos && (
                <Alert variant="filled" severity="success">
                    Datos importantes para rellenar
                </Alert>
            )}

            {/* 🔹 Mostrar porcentaje con obra social */}
            {porcentajeObraSocial && (
                <Alert
                    variant="filled"
                    severity="info"
                    style={{
                        marginTop: '10px',
                        fontSize: '16px',
                        backgroundColor: '#1976d2'
                    }}
                >
                    <b>Porcentaje con obra social:</b> {porcentajeObraSocial}%
                </Alert>
            )}

            <h2>Lista de personas asistiendo</h2>

            {chicos.length > 0 && (
                <>
                    {isMatch ? (
                        <>
                            <MobileSearchField />
                            <TableContainer>
                                <h3>Lista de usuarios</h3>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>DNI</b></TableCell>
                                            <TableCell><b>Nombre Completo</b></TableCell>
                                            <TableCell><b>Ver</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredChicos.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell>{row.dni}</StyledTableCell>
                                                <StyledTableCell>
                                                    {row.apellido}, {row.nombre}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <AccountBoxIcon
                                                        onClick={() => {
                                                            if (usuario.nivel === 20) {
                                                                navigate('/dtc/usuario1/personapsiq/' + row.id)
                                                            } else if (usuario.nivel === 24) {
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
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    ) : (
                        <MUIDataTable
                            title={"Lista de personas"}
                            data={chicos}
                            columns={columns}
                            options={options}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default TablaNotificaciones;
