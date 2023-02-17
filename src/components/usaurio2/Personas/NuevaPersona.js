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
import servicioPersonas from '../../../services/personas'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Paper } from '@mui/material';


export default function ClienteNuevo(props) {
  let params = useParams()
  let cuil_cuit = params.cuil_cuit

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})
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

      await servicioPersonas.crear(form)


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
        CARGAR Nueva persona <PersonAddAlt1Icon />
      </Button>
      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>Nueva persona   </DialogTitle>
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
              Datos del Nuevo Curso
            </DialogContentText>
            <form onSubmit={handleDeterminar}>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre"
                name="nombre"
                onChange={handleChange}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Apellido"
                name="apellido"
                onChange={handleChange}
                fullWidth
                variant="standard"
              />
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Hijos
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                  name: 'hijos',
                  id: 'uncontrolled-native',

                }}
              >   <option value={'No'}>Elegir</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Trabajo
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                  name: 'trabajo',
                  id: 'uncontrolled-native',

                }}
              >   <option value={'No'}>Elegir</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>


              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Dni"
                name="dni"
                onChange={handleChange}
                fullWidth
                variant="standard"
                maxRows="13"
              />
              <br/>
<TextField

onChange={handleChange}
name="fecha_nac"
id="date"
label="Fecha de nacimiento"
type="date"
defaultValue="2000-01-01"
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Direccion"
                name="direccion"
                onChange={handleChange}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Mail"
                name="mail"
                onChange={handleChange}
                fullWidth
                variant="standard"
              />

              <DialogActions>
                {form.nombre && form.apellido && form.dni? <><Button variant="contained" color="primary" type="submit">Crear</Button></> : <><h6 style={{ color: "red" }} >Completar todos los campos</h6></>}
                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

              </DialogActions>
            </form>


          </DialogContent>

        </Paper>

      </Dialog>

    </div>
  );
}