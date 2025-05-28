import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import servicioDtc from "../../../../services/dtc";
import NuevaColacion from './nuevacolacion';
import NuevaMerienda from './nuevamerienda';
import Borrar from './borar';

export default function TablaActividades() {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [asistenciasColaciones, setAsistenciasColaciones] = useState();
  const [asistenciasMeriendas, setAsistenciasMeriendas] = useState();
  const [usuario, setUsuario] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    traerDatos();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
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
      const mes = item.fecha.slice(0, 7); // formato "YYYY-MM"
      if (!acc[mes]) acc[mes] = 0;
      acc[mes] += (parseInt(item.cantidad));
      return acc;
    }, {});

    return Object.entries(agrupado).map(([mes, total]) => ({
      mes,
      total,
    }));
  };

  const columns = [
    { name: "fecha", label: "Fecha" },
    { name: "cantidad", label: "Cantidad" },
    {
      name: "Actions",
      label: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const data = activeStep === 0 ? asistenciasColaciones : asistenciasMeriendas;
          const rowData = data[dataIndex];
          return (
            rowData.ubicacion && (
              <>
                <Button variant="contained" color="primary" onClick={() => handleViewFile(rowData.id)}>
                  Ver Imagen
                </Button>
                <Borrar id={rowData.id} traer={() => traerDatos()} />
              </>
            )
          );
        },
      },
    },
  ];

  const resumenMensual = agruparPorMes(activeStep === 0 ? asistenciasColaciones : asistenciasMeriendas);

  return (
    <div className="App">
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step onClick={() => setActiveStep(0)}>
          <StepLabel>Colaciones</StepLabel>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <StepLabel>Meriendas</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 ? (
        <NuevaColacion id_trabajador={usuario.id} traer={() => traerDatos()} />
      ) : (
        <NuevaMerienda id_trabajador={usuario.id} traer={() => traerDatos()} />
      )}

      {/* Tabla resumen de cantidades por mes */}
      <Paper elevation={3} style={{ margin: '20px 0', padding: '10px', maxWidth: '400px' }}>
        <Typography variant="h6" gutterBottom>Resumen mensual</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Mes</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumenMensual.map((item) => (
              <TableRow key={item.mes}>
                <TableCell>{item.mes}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <MUIDataTable
        title={activeStep === 0 ? "Lista de Colaciones" : "Lista de Meriendas"}
        data={activeStep === 0 ? asistenciasColaciones : asistenciasMeriendas}
        columns={columns}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, padding: 2, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 1 }}>
          {imageUrl ? (
            <img src={`data:image/jpeg;base64,${imageUrl}`} width="100%" height="100%" />
          ) : (
            <p>No se encontró la imagen</p>
          )}
          <Button variant="contained" color="success" onClick={handleClose} sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
