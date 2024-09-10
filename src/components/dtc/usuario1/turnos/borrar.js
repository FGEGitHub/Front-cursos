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
import servicioDtc from '../../../../services/dtc'
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import { Paper, CircularProgress, Typography, Card, CardActions } from '@mui/material';
export default function Clasenueva(props) {
    let params = useParams()
    let id = params.id
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState({ id: props.id })
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

    
         const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
         if (loggedUserJSON) {
             const usuario = JSON.parse(loggedUserJSON)
   
   
             if(usuario.nivel==41 || usuario.nivel==40){
                const respuesta=  await servicioDtc.borrarturnocadia(form)
                alert(respuesta)
             }else{
                const respuesta=  await servicioDtc.borrarturno(form)
                alert(respuesta)
             }
         }



        } catch (error) {
            console.error(error);
            console.log('Error algo sucedio')


        }
        props.traer()

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>


            <Button variant="contained"  color="error" onClick={handleClickOpen} /* style={{ width: '25%' }} */ >
            Eliminar
            </Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>   Seguro que deseas eliminar el turno?</DialogTitle>
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
                  
                      

                            <DialogActions>
                       <Button variant="contained" color="success" onClick={handleDeterminar}>si</Button>
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                      


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}