import * as React from 'react';
import { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import serviciodtc from '../../../services/dtc';

export default function OficiosTable() {
    const [oficios, setOficios] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOficio, setSelectedOficio] = useState(null);

    useEffect(() => {
        traerOficios();
    }, []);

    const traerOficios = async () => {
        const data = await serviciodtc.traaeroficios();
        setOficios(data[0]);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (oficioId, fechaOficio) => {
        if (!selectedFile) return alert("Selecciona un archivo");

        const formData = new FormData();
        formData.append("archivo", selectedFile);
        formData.append("id_oficio", oficioId);
        formData.append("fecha", fechaOficio);

        await serviciodtc.subirExpediente(formData);
        setSelectedFile(null);
        setSelectedOficio(null);
        traerOficios(); // Refrescar datos
    };
    const handleVerExpediente = async (idExpediente) => {
        try {
            const response = await serviciodtc.obtenerExpediente(idExpediente);
            
            // Crear un blob con la respuesta
            const blob = new Blob([response.data], { type: 'application/pdf' });
            
            // Crear una URL temporal para el archivo
            const url = window.URL.createObjectURL(blob);
            
            // Abrir en una nueva pestaña
            window.open(url, '_blank', 'noopener,noreferrer');
            
            // Liberar la URL después de un tiempo para evitar consumo de memoria
            setTimeout(() => window.URL.revokeObjectURL(url), 5000);
        } catch (error) {
            console.error("Error al obtener el expediente:", error);
            alert("No se pudo abrir el expediente.");
        }
    };
    
    return (
        <Paper sx={{ padding: 2 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Oficio</TableCell>
                            <TableCell>Juzgado</TableCell>
                            <TableCell>Causa</TableCell>
                            <TableCell>Solicitud</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Expedientes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {oficios.map((oficio) => (
                            <TableRow key={oficio.id}>
                                <TableCell>{oficio.id}</TableCell>
                                <TableCell>{oficio.juzgado}</TableCell>
                                <TableCell>{oficio.causa}</TableCell>
                                <TableCell>{oficio.solicitud}</TableCell>
                                <TableCell>{oficio.fecha}</TableCell>
                                <TableCell>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>Ver Expedientes</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {oficio.expedientes.length > 0 ? (
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Fecha</TableCell>
                                                            <TableCell>Acción</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {oficio.expedientes.map((exp) => (
                                                            <TableRow key={exp.id}>
                                                                <TableCell>{exp.nombre}</TableCell>
                                                                <TableCell>
                                                                <Button 
    variant="outlined" 
    onClick={() => handleVerExpediente(exp.id)}
>
    Ver
</Button>

                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            ) : (
                                                <Typography>No hay expedientes</Typography>
                                            )}
                                            <Button
                                                variant="contained"
                                                onClick={() => setSelectedOficio(oficio.id)}
                                            >
                                                Agregar Expediente
                                            </Button>
                                            {selectedOficio === oficio.id && (
                                                <div style={{ marginTop: 10 }}>
                                                    <input type="file" onChange={handleFileChange} accept=".pdf" />
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleUpload(oficio.id, oficio.fecha)}
                                                        disabled={!selectedFile}
                                                    >
                                                        Subir
                                                    </Button>
                                                </div>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
