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
import servicioInscripciones from '../../../../services/fiscalizacion'
import Tooltip from '@material-ui/core/Tooltip';
import RuleTwoToneIcon from '@mui/icons-material/RuleTwoTone';
import { Paper } from '@mui/material';
import servicioFide from '../../../../services/fiscalizacion'
import Box from '@mui/material/Box';

export default function Clasenueva(props) {


    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState()
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [escuelas, setEscuelas] = useState()
    const handleOptionChange = (option) => {
        // Verificar si la opción ya está seleccionada
        if (selectedOptions.includes(option)) {
            // Si la opción ya está seleccionada, la eliminamos del arreglo de opciones seleccionadas
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
        } else {
            // Si la opción no está seleccionada, la agregamos al arreglo de opciones seleccionadas
            setSelectedOptions([...selectedOptions, option]);
        }
        console.log(selectedOptions)
    };
    const traer = async () => {



        const turnos = await servicioFide.traerinscripcionesenc(props.id)
        setEscuelas(turnos)



    }
    const handleClickOpen = () => {
        setOpen(true);
        setForm({ id: props.id_inscripcion })
        traer()
    };
    const handleDeterminar = async (event) => {



        const respuesta = await servicioInscripciones.asignarinscripciones({id:props.id, inscrip:selectedOptions})
        alert(respuesta)



        props.traer()

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>


            < Tooltip title="Asignar mas llamados">
                < RuleTwoToneIcon onClick={handleClickOpen} />
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>elegir</DialogTitle>
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
                            <div>
                                <h2>Selecciona tus opciones:</h2>
                               {props.id}
                                {escuelas ? <>
                                    {escuelas.map((row) => (

                                        <>
                                            <label>
                                                <input type="checkbox" checked={selectedOptions.includes( row.id )} onChange={() => handleOptionChange( row.id )} />
                                                {row.apellido}  {row.nombre}
                                            </label>
                                            <br />
                                        </>
                                    ))}

                                </> : <></>}
                              
                                <p>Opciones seleccionadas: {selectedOptions.join(', ')}</p>
                            </div>
                        </DialogContentText>


                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={handleDeterminar}>Asignar</Button>
                            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                        </DialogActions>



                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}