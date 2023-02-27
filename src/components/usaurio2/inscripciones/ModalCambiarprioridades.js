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
                Cambiar prioridades<PersonAddAlt1Icon />
            </Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Nueva Clase </DialogTitle>
                {}
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
                       
{    form["1.1.1"] + form["1.1.2.1"] +form["1.1.2.2"] + form["1.2.1"] + form["1.2.2.1"] +form["1.2.2.2"]+ form["2.1.1"] +form["2.1.2.1"] +form["2.1.2.2"] +form["2.2.1"] + form["2.2.2"] 
}                        <form >

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="1.1.1"
                                name="1.1.1"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />



                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="1.1.2.1"
                                name="1.1.2.1"
                                onChange={handleChange}
                                fullWidth
                                type="number"
                                variant="standard"
                                maxRows="13"
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="1.1.2.2"
                                type="number"
                                name="1.1.2.2"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                type="number"
                                label="1.2.1"
                                name="1.2.1"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                type="number"
                                id="name"
                                label="1.2.2.1"
                                name="1.2.2.1"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="1.2.2.2"
                                type="number"
                                name="1.2.2.2"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                type="number"
                                label="2.1.1"
                                name="2.1.1"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="2.1.2.1"
                                name="2.1.2.1"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="2.1.2.2"
                                name="2.1.2.2"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                                type="number"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="2.2.1"
                                name="2.2.1"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                maxRows="13"
                                type="number"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="2.2.2"
                                name="2.2.2"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                type="number"
                                maxRows="13"
                            />

                            <DialogActions>
                                {form["1.1.1"] && form["1.1.2.1"] && form["1.1.2.2"] && form["1.2.1"] && form["1.2.2.1"] && form["1.2.2.2"] && form["2.1.1"] && form["2.1.2.1"] && form["2.1.2.2"] && form["2.2.1"] && form["2.2.2"] ? <><Button variant="contained" color="primary" onClick={handleDeterminar}>Crear</Button></> : <><h6 style={{ color: "red" }} >Completar todos los campos</h6></>}
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                        </form>


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}