import * as React from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import servicioDtc from '../../../services/dtc';
import { Paper } from '@mui/material';

export default function Clasenueva(props) {
    let params = useParams();
    let id = params.id;

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState({
        id: props.id,
        titulo: props.titulo || '',
        descripcion: props.descripcion || '',
        fecha: props.fecha || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "titulo" && value.length > 144) {
            newValue = value.slice(0, 144);
        } else if (name === "descripcion" && value.length > 344) {
            newValue = value.slice(0, 344);
        }

        setForm({ ...form, [name]: newValue });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDeterminar = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await servicioDtc.modificarclase(form);
            alert(respuesta);
        } catch (error) {
            console.error(error);
            console.log('Error algo sucedió');
        }
        props.traer();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClickOpen}>Modificar</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modificar Actividad</DialogTitle>
                <Paper sx={{
                    cursor: 'pointer',
                    background: '#fafafa',
                    color: '#bdbdbd',
                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                }}>
                    <DialogContent>
                        <TextField
                            defaultValue={props.fecha}
                            onChange={handleChange}
                            name="fecha"
                            id="date"
                            label="Fecha"
                            type="date"
                            sx={{ width: 220 }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            value={form.titulo}
                            margin="dense"
                            id="titulo"
                            label="Titulo"
                            name="titulo"
                            onChange={handleChange}
                            fullWidth
                            variant="standard"
                            helperText={`${form.titulo.length}/144 caracteres`}
                        />
                        <TextField
                            value={form.descripcion}
                            margin="dense"
                            id="descripcion"
                            label="Descripcion"
                            name="descripcion"
                            onChange={handleChange}
                            fullWidth
                            variant="standard"
                            helperText={`${form.descripcion.length}/344 caracteres`}
                            multiline
                        />
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={handleDeterminar}>Modificar</Button>
                            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                        </DialogActions>
                    </DialogContent>
                </Paper>
            </Dialog>
        </div>
    );
}
