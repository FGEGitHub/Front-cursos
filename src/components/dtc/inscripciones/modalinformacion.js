import * as React from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from "react";
import servicioDtc from '../../../services/dtc';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Clasenueva(props) {
    let params = useParams();
    let id = params.id;
    const [info, setInfo] = useState();
    const [open, setOpen] = useState(false);
    const [cursado, setCursado] = useState(null);

    const traer = async () => {
        try {
            const novedades_aux = await servicioDtc.informaciondeinscriptos();
            setInfo(novedades_aux);
        } catch (error) {
            console.error("Error al obtener información:", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
        traer();
    };

    const handleClose = () => {
        setOpen(false);
        setCursado(null); // Limpiar al cerrar el modal
    };

    const verDetalles = async (idChico) => {
        try {
            const rts = await servicioDtc.datosdechique(idChico);
          
            setCursado(rts[3]); // Suponiendo que la info está en la posición 3
        } catch (error) {
            console.error("Error al obtener detalles:", error);
        }
    };

    return (
        <div>
            <button onClick={handleClickOpen}>VER INSCRIPTOS</button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Información de Inscripciones</DialogTitle>
                <DialogContent>
                    {info && (
                        <>
                            <b>Total de inscripciones:</b> {info.total_cursado} <br />
                            <b>Total de chicos inscriptos:</b> {info.total_distinct_chicos} <br />
                            <b>Lista de inscriptos:</b>  
                            <ul>
                                {info.listado_chicos.map((row, index) => (
                                    <li key={index}>
                                        {row.nombre} {row.apellido} 
                                        <Button color="primary" size="small" onClick={() => verDetalles(row.id)} style={{ marginLeft: 10 }}>
                                            Ver
                                        </Button>
                                    </li>
                                ))}
                            </ul>

                            {cursado && (
                                <>
                                    <h3>Detalles del Inscripto</h3>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><b>Mail</b></TableCell>
                                                    <TableCell><b>Día</b></TableCell>
                                                    <TableCell><b>Hora</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cursado.map((item, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell>{item.mail}</TableCell>
                                                        <TableCell>{item.dia}</TableCell>
                                                        <TableCell>{item.hora}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleClose}>Cerrar ya vi todo</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
