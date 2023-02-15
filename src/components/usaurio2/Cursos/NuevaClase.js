import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import servicioCursos from '../../../services/Cursos'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Paper } from '@mui/material';

import Box from '@mui/material/Box';

export default function Clasenueva(props) {
    let params = useParams()
    let id = params.id

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState({ id_curso: id })
    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDeterminar = async (event) => {
        event.preventDefault();
        try {

            await servicioCursos.nuevaclase(form)


        } catch (error) {
            console.error(error);
            console.log('Error algo sucedio')


        }
        props.getClients()

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>


            <Button variant="outlined" onClick={handleClickOpen}>
                Nueva clase<PersonAddAlt1Icon />
            </Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Nueva Clase </DialogTitle>
                <Paper
                    sx={{
                        cursor: 'pointer',
                        background: '#fafafa',
                        color: '#bdbdbd',
                        border: '1px dashed #ccc',
                        '&:hover': { border: '1px solid #ccc' },
                    }}
                >
                    <DialogContent>
                        <DialogContentText>
                            Datos del Nueva clase
                        </DialogContentText>
                        <form >

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Tema"
                                name="observaciones"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Fecha
                            </InputLabel>
                            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                <TextField

                                    onChange={handleChange}
                                    name="fecha"
                                    id="date"
                                    label="Fecha del curso"
                                    type="date"
                                    defaultValue="2020-01-01"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Dato adicional
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'tipo_dni',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'C.U.I.L.'}>Elegir</option>
                                <option value={'C.U.I.L.'}>dato 1</option>
                                <option value={'C.U.I.T.'}>dato 1</option>

                            </NativeSelect>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Encargado"
                                name="encargado"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />

                        


                            <DialogActions>
                                {form.observaciones && form.fecha ? <><Button variant="contained" color="primary" onClick={handleDeterminar}>Crear</Button></> : <><h6 style={{ color: "red" }} >Completar todos los campos</h6></>}
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                        </form>


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}