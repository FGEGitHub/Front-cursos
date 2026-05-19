import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
  TableContainer,
  TextField,
  Chip,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SearchIcon from '@mui/icons-material/Search';

import servicioDtc from "../../../../services/dtc";
import NuevaColacion from './nuevacolacion';
import NuevaMerienda from './nuevamerienda';
import Borrar from './borar';
import BorrarColacion from './borrarracion';

export default function TablaActividades() {

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const [asistenciasColaciones, setAsistenciasColaciones] = useState();
  const [asistenciasMeriendas, setAsistenciasMeriendas] = useState();

  const [usuario, setUsuario] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    traerDatos();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const traerDatos = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');

    if (loggedUserJSON) {

      const usuario = JSON.parse(loggedUserJSON);
      setUsuario(usuario);

      const colaciones = await servicioDtc.traercolaciones();
      const meriendas = await servicioDtc.traermeriendas();

      setAsistenciasColaciones(colaciones);
      setAsistenciasMeriendas(meriendas);
    }
  };

  const handleViewFile = async (id) => {
    try {
      const response = await servicioDtc.verimagendemerienda(id);
      setImageUrl(response);
      setOpen(true);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  const agruparPorMes = (datos) => {

    if (!datos) return [];

    const agrupado = datos.reduce((acc, item) => {

      const mes = item.fecha.slice(0, 7);

      if (!acc[mes]) acc[mes] = 0;

      acc[mes] += parseInt(item.cantidad);

      return acc;

    }, {});

    return Object.entries(agrupado).map(([mes, total]) => ({
      mes,
      total,
    }));
  };

  const datosTabla =
    activeStep === 0
      ? asistenciasColaciones
      : asistenciasMeriendas;

  const resumenMensual = agruparPorMes(datosTabla);

  const datosFiltrados = datosTabla
    ?.filter((item) =>
      item.fecha.toLowerCase().includes(busqueda.toLowerCase())
    )
    ?.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const totalGeneral = datosTabla?.reduce(
    (acc, item) => acc + parseInt(item.cantidad),
    0
  );

  const ultimaCarga = datosTabla?.[0]?.fecha;

  return (

    <div style={{ padding: 20 }}>

      {/* TABS */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: "18px",
          overflow: "hidden",
          mb: 3,
          background: "#fff",
        }}
      >

        <Tabs
          value={activeStep}
          onChange={(e, newValue) => setActiveStep(newValue)}
          variant="fullWidth"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#2e7d32",
              height: 4,
            }
          }}
        >

          <Tab
            icon={<FastfoodIcon />}
            iconPosition="start"
            label="Colaciones"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: 16,
            }}
          />

          <Tab
            icon={<CalendarMonthIcon />}
            iconPosition="start"
            label="Meriendas"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: 16,
            }}
          />

        </Tabs>

      </Paper>

      {/* BOTON */}

      <Box sx={{ mb: 3 }}>

        {activeStep === 0 ? (
          <NuevaColacion
            id_trabajador={usuario.id}
            traer={() => traerDatos()}
          />
        ) : (
          <NuevaMerienda
            id_trabajador={usuario.id}
            traer={() => traerDatos()}
          />
        )}

      </Box>

      {/* KPIs */}

<Grid
  container
  spacing={2}
  sx={{
    mb: 3,
    alignItems: "stretch"
  }}
>

       <Grid item xs={12} md={4}>

  <Paper
    elevation={2}
    sx={{
      p: 2,
      borderRadius: "18px",
      background: "linear-gradient(135deg,#2e7d32,#43a047)",
      color: "white",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}
  >

    <Typography
      variant="body2"
      sx={{
        opacity:1
      }}
    >
      Total General
    </Typography>

    <Typography
      variant="h5"
      fontWeight="bold"
      color={'white'}
    >
      {totalGeneral || 0}
    </Typography>

  </Paper>

</Grid>

<Grid item xs={12} md={4}>

  <Paper
    elevation={2}
    sx={{
      p: 2,
      borderRadius: "18px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}
  >

    <Typography variant="body2">
      Última carga
    </Typography>

    <Typography
      variant="h6"
      fontWeight="bold"
    >
      {ultimaCarga || "-"}
    </Typography>

  </Paper>

</Grid>

<Grid item xs={12} md={4}>

  <Paper
    elevation={2}
    sx={{
      p: 2,
      borderRadius: "18px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}
  >

    <Typography variant="body2">
      Registros
    </Typography>

    <Typography
      variant="h6"
      fontWeight="bold"
    >
      {datosTabla?.length || 0}
    </Typography>

  </Paper>

</Grid>
      </Grid>

      {/* RESUMEN */}

      <Paper
        elevation={2}
        sx={{
          borderRadius: "20px",
          p: 3,
          mb: 3,
        }}
      >

        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Resumen mensual
        </Typography>

        <TableContainer>

          <Table size="small">

            <TableHead>

              <TableRow
                sx={{
                  background: "#2e7d32",
                }}
              >

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Mes
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Total
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {resumenMensual.map((item) => (

                <TableRow
                  key={item.mes}
                  hover
                  sx={{
                    transition: "0.2s",

                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    }
                  }}
                >

                  <TableCell>{item.mes}</TableCell>

                  <TableCell>

                    <Chip
                      label={item.total}
                      color="success"
                    />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

      {/* TABLA PRINCIPAL */}

      <Paper
        elevation={2}
        sx={{
          borderRadius: "20px",
          p: 3,
        }}
      >

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2
          }}
        >

          <Typography
            variant="h6"
            fontWeight="bold"
          >

            {activeStep === 0
              ? "Lista de Colaciones"
              : "Lista de Meriendas"}

          </Typography>

          <TextField
            size="small"
            placeholder="Buscar por fecha..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />
            }}
          />

        </Box>

        {!datosTabla ? (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 5
            }}
          >
            <CircularProgress color="success" />
          </Box>

        ) : (

          <TableContainer>

            <Table>

              <TableHead>

                <TableRow
                  sx={{
                    background: "#2e7d32",
                  }}
                >

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    Fecha
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    Cantidad
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    Imagen
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    Acciones
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {datosFiltrados?.map((row) => (

                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      transition: "0.2s",

                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      }
                    }}
                  >

                    <TableCell>{row.fecha}</TableCell>

                    <TableCell>

                      <Chip
                        label={row.cantidad}
                        color="success"
                        variant="outlined"
                      />

                    </TableCell>

                    <TableCell>

                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleViewFile(row.id)}
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none"
                        }}
                      >
                        Ver imagen
                      </Button>

                    </TableCell>

                    <TableCell>

                      {activeStep === 0 ? (

                        <BorrarColacion
                          id={row.id}
                          traer={() => traerDatos()}
                        />

                      ) : (

                        <Borrar
                          id={row.id}
                          traer={() => traerDatos()}
                        />

                      )}

                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </TableContainer>

        )}

      </Paper>

      {/* MODAL */}

      <Modal open={open} onClose={handleClose}>

        <Box
          sx={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            margin: "auto",
            mt: 5,
            bgcolor: "white",
            p: 3,
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: 24,
          }}
        >

          {imageUrl ? (

            <img
              src={`data:image/jpeg;base64,${imageUrl}`}
              alt="Imagen"
              style={{
                width: "100%",
                borderRadius: 12,
              }}
            />

          ) : (

            <Typography>
              No se encontró la imagen
            </Typography>

          )}

          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleClose}
            sx={{
              mt: 3,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: "bold"
            }}
          >
            Cerrar
          </Button>

        </Box>

      </Modal>

    </div>
  );
}