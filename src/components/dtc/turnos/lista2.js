import * as React from "react";
import { useState, useEffect } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import serviciodtc from "../../../services/dtc";
import Nuevo from "./nuevo"

export default function OficiosTable() {
    const [oficios, setOficios] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOficio, setSelectedOficio] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editedOficio, setEditedOficio] = useState({
        id: "",
        juzgado: "",
        causa: "",
        solicitud: "",
        fecha: ""
    });

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
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank", "noopener,noreferrer");
            setTimeout(() => window.URL.revokeObjectURL(url), 5000);
        } catch (error) {
            console.error("Error al obtener el expediente:", error);
            alert("No se pudo abrir el expediente.");
        }
    };

    // 🟢 Función para abrir el modal con datos cargados
    const handleOpenModal = (oficio) => {
        setEditedOficio(oficio);
        setModalOpen(true);
    };

    // 🟢 Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setEditedOficio({
            ...editedOficio,
            [e.target.name]: e.target.value
        });
    };

    // 🟢 Función para actualizar el oficio
    const handleUpdateOficio = async () => {
        try {
            await serviciodtc.actualizarOficio(editedOficio);
            traerOficios();
            setModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar el oficio:", error);
            alert("No se pudo actualizar el oficio.");
        }
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <Nuevo
            traer={traerOficios}/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Fecha</TableCell>
                            <TableCell>A travez de</TableCell>
                            <TableCell>Juzgado-expte</TableCell>
                            <TableCell>Causa</TableCell>
                            <TableCell>Acciones</TableCell>
                            <TableCell>Solicitud</TableCell>
                       
                     
                       
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {oficios.map((oficio) => (
                            <TableRow key={oficio.id}>
                                 <TableCell>{oficio.fecha}</TableCell>
                                <TableCell>{oficio.oficio}</TableCell>
                                <TableCell>{oficio.juzgado}-{oficio.expediente}</TableCell>
                                <TableCell>{oficio.causa}</TableCell>
                                <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleOpenModal(oficio)}>
                                        Modificar
                                    </Button>
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
                                                                    <Button variant="outlined" onClick={() => handleVerExpediente(exp.id)}>
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
                                            <Button variant="contained" onClick={() => setSelectedOficio(oficio.id)}>
                                                Agregar Expediente
                                            </Button>
                                            {selectedOficio === oficio.id && (
                                                <div style={{ marginTop: 10 }}>
                                                    <input type="file" onChange={handleFileChange} accept=".pdf" />
                                                    <Button variant="contained" color="primary" onClick={() => handleUpload(oficio.id, oficio.fecha)} disabled={!selectedFile}>
                                                        Subir
                                                    </Button>
                                                </div>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                </TableCell>
                                <TableCell>
                                  {oficio.solicitud} 
                                </TableCell>
                                
                               
                              
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 🟢 MODAL PARA EDITAR OFICIO */}
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>Modificar Oficio</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="dense" label="Juzgado" name="juzgado" value={editedOficio.juzgado} onChange={handleChange} />
                    <TextField fullWidth margin="dense" label="Causa" name="causa" value={editedOficio.causa} onChange={handleChange} />
                    <TextField fullWidth margin="dense" label="Solicitud" name="solicitud" value={editedOficio.solicitud} onChange={handleChange} />
                    <TextField fullWidth margin="dense" label="Fecha" type="date" name="fecha" value={editedOficio.fecha} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="error">
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdateOficio} color="primary" variant="contained">
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
