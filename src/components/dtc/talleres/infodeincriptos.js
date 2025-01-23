import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import servicioDtc from '../../../services/dtc';

const CursoDialog = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [cursosData, setCursosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await servicioDtc.obtenerinfodecursos(id);
        setCursosData(response);
      } catch (error) {
        console.error('Error al obtener datos del curso:', error);
      }
    };

 
      fetchData();

  }, []);

  return (
    <div>

          {cursosData.length > 0 ? (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Día</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Cantidad de Kids</TableCell>
                    <TableCell>Nombres</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cursosData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.dia}</TableCell>
                      <TableCell>{row.hora}</TableCell>
                      <TableCell>{row.cantidad_kids}</TableCell>
                      <TableCell>{row.nombres_kids}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>No hay datos disponibles.</p>
          )}
    </div>
  );
};

export default CursoDialog;
