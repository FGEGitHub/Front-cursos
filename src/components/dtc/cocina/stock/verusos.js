import Box from '@mui/material/Box';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../../services/dtc';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState, useEffect } from 'react';
import DialogActions from '@mui/material/DialogActions';

export default function VerUsosModal({ id }) {
  const [open, setOpen] = useState(false);
  const [usos, setUsos] = useState([]);

  const handleClickOpen = async () => {
    setOpen(true);
    try {
      const data = await servicioDtc.verusosdeproducto(id);
      setUsos(data);
    } catch (error) {
      console.error('Error al obtener usos:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Tooltip title="Ver Usos">
        <button  onClick={handleClickOpen}>
          Ver Usos
        </button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <h3>Usos del Producto - ID: {id}</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID Producto</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Uso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usos.map((uso, index) => (
                  <TableRow key={index}>
                    <TableCell>{uso.id_producto}</TableCell>
                    <TableCell>{uso.fecha}</TableCell>
                    <TableCell>{uso.cantidadconsumo ? <><p style={{ color: 'crimson' }} >{uso.cantidadconsumo} </p></>:<><p style={{ color: 'green' }} >{uso.cantidadrecibido} </p> </>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
