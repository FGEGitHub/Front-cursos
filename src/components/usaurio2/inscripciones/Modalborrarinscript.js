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
import servicioInscripciones from '../../../services/inscripciones'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import ModeIcon from '@mui/icons-material/Mode';
import { Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Clasenueva(props) {
    let params = useParams()
    let id = params.id
    const [cargando, setCargando] = React.useState(false);
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
        setCargando(true)
        try {

         const respuesta=  await servicioInscripciones.borrarincripciones()
         alert(respuesta)


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


            <Button variant="contained"   color="error"  onClick={handleClickOpen}>
              BORRAR TODOS LOS INCRIPTOS <ModeIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle> BORRAR TODOS LOS INCRIPTOS</DialogTitle>
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
                          SE BORRARAN TODAS LAS INCRIPCIONES
                        </DialogContentText>
                       

                            <DialogActions>

                                { cargando ? <><CircularProgress disableShrink /></>:<><Button variant="contained" color="primary" onClick={handleDeterminar}>Borrar</Button></>}
                       
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Lo pensare mejor</Button>

                            </DialogActions>
                      


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}