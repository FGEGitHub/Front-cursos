import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioCursos from '../../../services/Cursos'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import PhoneForwardedSharpIcon from '@mui/icons-material/PhoneForwardedSharp';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';


export default function SelectTextFields(props) {
    const [open, setOpen] = React.useState(false);
    //const usuario  = useUser().userContext
    const [form, setForm] = useState({
        id_alumno: props.id_alumno,
        id_clase: props.id_clase
    })

    //const [activo, setActivo] = useState(false)



 const traer =  () => {
    setForm( {id_alumno: props.id_alumno,
        id_clase: props.id_clase,
        observaciones:"ninguna",
        asistencia:"Sin determinar"
    })
      


        }
    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleClickOpen = () => {

        setOpen(true);
        traer()

    };

    const handleClose = () => {
        setOpen(false);
    };
    const determinarpresente = async (id_usuario) => {
        try {



          
             await servicioCursos.presente(form)
          props.traer()
        } catch (error) {

        }


        setOpen(false)



    }

    const [currency, setCurrency] = React.useState('EUR');

    /*   const handleChange = (event) => {
        setCurrency(event.target.value);
      }; */


    return (




        <Box

            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            < Tooltip title="Atender">
                <Button variant="outlined" onClick={handleClickOpen}> Tomar asistencia</Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>



                    <h3>
                        <b> TOMAR ASISENCIA </b></h3>




                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                       Asistencia  {props.id_alumno}
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        onChange={handleChange}
                        inputProps={{
                            name: 'asistencia',
                            id: 'uncontrolled-native',

                        }}
                    >   <option value={'Sin determinar'}>Sin determinar</option>
                        <option value={'Presente'}>Presente</option>
                        <option value={'Ausente'}>Ausente Injustificado</option>
                        <option value={'Ausente justificado'}>Ausente justificado</option>

                    </NativeSelect>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Observaciones"
                        name="observaciones"
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />

                    <DialogActions>

                        <><Button variant="contained" color="primary" onClick={determinarpresente}> Aceptar </Button></>
                        <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
                    </DialogActions>


                </DialogContent>
            </Dialog>
        </Box >


    );
}