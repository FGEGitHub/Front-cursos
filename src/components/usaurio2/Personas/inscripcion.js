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


export default function ClienteNuevo(props) {
    let params = useParams()
    let cuil_cuit = params.cuil_cuit

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState({})
    const [cursos, setCursos] = useState()
    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleClickOpen = () => {
        getCursos()
        setOpen(true);
    };
    const handleDeterminar = async (event) => {
        event.preventDefault();
        try {

            await servicioCursos.inscribirniv2(form)

        } catch (error) {
            console.error(error);
            console.log('Error algo sucedio')


        }


        setOpen(false);
    };


    const getCursos = async () => {
        console.log('get')
        const clients = await servicioCursos.lista()
        console.log(clients)
        setCursos(clients)

    }







    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>


            <Button variant="outlined" onClick={handleClickOpen}>
                INSCRIBIR <PersonAddAlt1Icon />
            </Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Incscripcion </DialogTitle>
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
                            Seleccionar cursos de interes
                        </DialogContentText>
                        <form onSubmit={handleDeterminar}>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre del curso"
                                name="nombre"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Cursos
                            </InputLabel>
                            {cursos ? <>
                            
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Prioridad 1
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'uno',
                                    id: 'uncontrolled-native',

                                }}
                            > 
                            
                            {
                                            cursos.map((option) => (
                                                <option value={option.id}>{option.nombre}</option>
                                            ))}
                            
                           

                            </NativeSelect>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Prioridad 2
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'dos',
                                    id: 'uncontrolled-native',

                                }}
                            > 
                            
                            {
                                            cursos.map((option) => (
                                                <option value={option.id}>{option.nombre}</option>
                                            ))}
                            
                           

                            </NativeSelect>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Prioridad 3
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'tres',
                                    id: 'uncontrolled-native',

                                }}
                            > 
                            
                            {
                                            cursos.map((option) => (
                                                <option value={option.id}>{option.nombre}</option>
                                            ))}
                            
                           

                            </NativeSelect>
                          
                           
                     
                            </> : <></>}
                      
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Motivacion"
                                name="motivacion"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                            />
                              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Describir el motivo de inscripcion    Caracteres{form.motivacion ? <>{form.motivacion.length} </> : <>0</>}/900
                            </InputLabel>

                            <DialogActions>
                                {form.uno && form.dos && form.tres  ? <>     {form.uno !== form.dos && form.uno  !==form.tres && form.dos  !==form.tres ? <><Button variant="contained" color="primary" type="submit">Crear</Button> </>:<><h6 style={{ color: "red" }} >no puede seleccioanr el mismo curso</h6></>}  </> : <><h6 style={{ color: "red" }} >Completar todos los campos</h6></>}
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                        </form>


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}