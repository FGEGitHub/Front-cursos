import React, { useEffect, useState } from "react";
import { Paper, Tooltip, TextField, Box, Typography } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import servicioDtc from '../../../services/dtc';
import ModaNueva from './ModalNuevaclase';
import ModalBorrar from './borrarclase';

const TablaNotificaciones = () => {
    const [clases, setClases] = useState([]);
    const [filtradas, setFiltradas] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [filtroFecha, setFiltroFecha] = useState("");
    const navigate = useNavigate();

    const traerDatos = async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON);
            setUsuario(usuario);
            const novedades_aux = await servicioDtc.traerclasestaller2(usuario.id);
            setClases(novedades_aux);
            setFiltradas(novedades_aux);
        }
    };

    useEffect(() => {
        traerDatos();
    }, []);

    useEffect(() => {
        if (filtroFecha) {
            const filtrado = clases.filter(c => c.fecha === filtroFecha);
            setFiltradas(filtrado);
        } else {
            setFiltradas(clases);
        }
    }, [filtroFecha, clases]);

    const CutomButtonsRenderer = (dataIndex) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <ModalBorrar
            id={filtradas[dataIndex]['id']}
            traer={traerDatos}
        />
        <Tooltip title="Asistencia">
            <button
                style={{ padding: '4px 8px', cursor: 'pointer' }}
                onClick={() => navigate('/dtc/tallerasistencia/' + filtradas[dataIndex]['id'])}
            >
                Asistencia
            </button>
        </Tooltip>
    </div>
);

    const columns = [
     {
  name: "fecha",
  label: "Fecha",
  options: {
    customBodyRender: (value) => {
      const [año, mes, día] = value.split("-");
      return `${día}/${mes}/${año}`;
    }
  }
},
        {
            name: "titulo",
            label: "Título",
        },
         {
            name: "materia",
            label: "materia",
        },
        {
            name: "Ver",
            label: "Acciones",
            options: {
                customBodyRenderLite: (dataIndex) =>
                    CutomButtonsRenderer(dataIndex)
            }
        }
    ];

    const options = {
        responsive: "standard",
        selectableRows: 'none',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
        textLabels: {
            body: {
                noMatch: "No se encontraron clases",
            },
            pagination: {
                next: "Siguiente Página",
                previous: "Página Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver Columnas",
                filterTable: "Filtrar Tabla",
            },
            filter: {
                all: "Todos",
                title: "Filtros",
                reset: "Reiniciar",
            },
            viewColumns: {
                title: "Mostrar Columnas",
                titleAria: "Mostrar/Ocultar Columnas de la Tabla",
            },
            selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar",
                deleteAria: "Eliminar Filas Seleccionadas",
            },
        }
    };

    return (
        <Box p={2}>
            <br/> <br/>
            <Typography variant="h6" gutterBottom>
                Clases Registradas
            </Typography>

            <ModaNueva id_tallerista={usuario.id} traer={traerDatos} />

            <Box my={2}>
                <TextField
                    label="Buscar por fecha"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                />
            </Box>

          <Paper
    elevation={3}
    sx={{
        overflowX: 'auto',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#fafafa'
    }}
>

                <MUIDataTable
                    title={"Haz click para buscar una clase"}
                    data={filtradas}
                    columns={columns}
                    options={options}
                />
            </Paper>
        </Box>
    );
};

export default TablaNotificaciones;
