import * as React from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import servicioAdministracion from '../../../services/administracion';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Ingresos() {
    let params = useParams();
    const [usuario, setUsuario] = useState({});

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleDeterminar = async (event) => {
        event.preventDefault();
        await servicioAdministracion.registroemprendedora(usuario);
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundColor: 'purple' 
        }}>
            <Card sx={{ backgroundColor: '#4caf50', padding: 3, width: 400, color: 'white', borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white', textAlign: 'center' }}>
                        Registro de Usuario
                    </Typography>
                    <TextField
                        margin="dense"
                        label="Nombre de Usuario"
                        name="usuario"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'white' } }}
                        sx={{ input: { color: 'white' }, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                    />
                    <TextField
                        margin="dense"
                        type="password"
                        label="Contraseña"
                        name="password"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'white' } }}
                        sx={{ input: { color: 'white' }, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel sx={{ color: 'white' }}>Tipo de Negocio</InputLabel>
                        <Select
                            label="Tipo de Negocio"
                            name="tipo_negocio"
                            onChange={handleChange}
                            sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                        >
                            <MenuItem value="comida">Comida</MenuItem>
                            <MenuItem value="ropa">Ropa</MenuItem>
                            <MenuItem value="tela">Tela</MenuItem>
                            <MenuItem value="otro">Otro</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Nombre Completo"
                        name="nombre"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'white' } }}
                        sx={{ input: { color: 'white' }, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                    />
                    <TextField
                        margin="dense"
                        label="Correo Electrónico"
                        name="mail"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'white' } }}
                        sx={{ input: { color: 'white' }, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                    />
                    <Button onClick={handleDeterminar} variant="contained" sx={{ mt: 3, width: '100%', backgroundColor: 'white', color: '#7FFF00', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                        Registrar Usuario
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
