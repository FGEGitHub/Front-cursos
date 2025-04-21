import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Divider
} from "@mui/material";

const ResumenNegocio = ({ inversiones = [], ganancias = 0, info = {} }) => {
  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      
      {/* Tarjeta: Inversiones */}
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Inversiones
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Descripción</strong></TableCell>
                <TableCell align="right"><strong>Monto</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inversiones.map((inv, idx) => (
                <TableRow key={idx}>
                  <TableCell>{inv.descripcion}</TableCell>
                  <TableCell align="right">${Number(inv.monto).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {inversiones.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center" style={{ color: '#888' }}>
                    No hay inversiones registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" size="small">
              Agregar Inversión
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tarjeta: Ganancias */}
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ganancias
          </Typography>
          <Typography variant="h4" color={ganancias >= 0 ? "green" : "error"}>
            ${Number(ganancias).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total acumulado
          </Typography>
        </CardContent>
      </Card>

      {/* Tarjeta: Información */}
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información del negocio
          </Typography>

          <Divider sx={{ mb: 1 }} />
          <Typography variant="body2"><strong>Última actividad:</strong> {info.ultimaActividad || "Sin datos"}</Typography>
          <Typography variant="body2"><strong>Fecha de inicio:</strong> {info.fechaInicio || "Sin datos"}</Typography>
          <Typography variant="body2"><strong>Estado:</strong> {info.estado || "Sin datos"}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResumenNegocio;
