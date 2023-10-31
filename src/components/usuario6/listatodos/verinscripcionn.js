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
import servicioCarnaval from '../../../services/carnavales'
import Tooltip from '@material-ui/core/Tooltip';
import RuleTwoToneIcon from '@mui/icons-material/RuleTwoTone';
import { Paper } from '@mui/material';

import Box from '@mui/material/Box';

export default function Clasenueva(props) {


    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState()
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [escuelas, setEscuelas] = useState()

    const traer = async () => {



        const turnos = await servicioCarnaval.vercursosinscripta(props.id)
        setEscuelas(turnos[0])



    }
    const handleClickOpen = () => {
        setOpen(true);
        setForm({ id: props.id_inscripcion })
        traer()
    };


    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>


            < Tooltip title="Asignar mas llamados">
                < Button variant='outlined' onClick={handleClickOpen} >Ver cursos</Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Cursos</DialogTitle>
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
                          
                        {escuelas? <>
                        {escuelas.map((row)=><>
                                    {row.descripcion} <br/>
                                    </> 
                        )}

                        </>:<></>}
                          
                            
                        </DialogContentText>


                        <DialogActions>
                            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Entendido</Button>

                        </DialogActions>



                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );

                                    }