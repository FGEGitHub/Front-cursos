import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import servicioAdministracion from '../../../services/administracion'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';





export default function Ingresos() {
    let params = useParams()



    const [usuario, setUsuario] = useState({

    });
  




    const handleChange = (e) => {
        console.log(usuario)
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }


    const handleDeterminar = async (event) => {
        event.preventDefault()
        const rta = await servicioAdministracion.registronivel3(
            usuario
        )


    };
    


    return (
        <div>

            <div>
                <Card sx={{ maxWidth: 345 }}  >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Agregar Usuario 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">






                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="usuario"
                                name="usuario"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                type="password"
                                label="password"
                                name="password"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Nivel</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="Nivel"
                                    name="nivel"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="2">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'1'}>1-Alumna***</MenuItem>
                                    <MenuItem value={'2'}>2-Administracion</MenuItem>
                                    <MenuItem value={'3'}>3-Coordinador</MenuItem>
                                    <MenuItem value={'4'}>4-Encargado</MenuItem>
                                    <MenuItem value={'6'}>6-Llamados</MenuItem>
                                    <MenuItem value={'13'}>13-Vendedora</MenuItem>
                                    
                                </Select>
                            </FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="nombre"
                                name="nombre"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />


                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="mail"
                                name="mail"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />




                            <Button onClick={handleDeterminar}>Enviar</Button>
                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
