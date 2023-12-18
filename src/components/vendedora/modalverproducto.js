import React, { useState } from 'react';
import { TextField, Button, Input, Card, CardContent, CardMedia } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import NativeSelect from '@mui/material/NativeSelect';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { styled } from '@mui/material/styles';

import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';






export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  const [ver, setVer] = React.useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = React.useState(false);

  const mostrar = (e) => {
   setVer(true)
  
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  };

  const handleClickOpen = () => {
    setOpen(true); 
    setForm({id_usuario:props.id_usuario})
  };

  const handleClose = () => {
    setVer(false)
    setOpen(false);
  };

  const enviar = async (e) => {
    e.preventDefault();

    // Guardar la imagen solo si hay un archivo seleccionado
    if (file) {
      // Guardar el nombre de la imagen en el frontend
      const fileName = `${Date.now()}_${file.name}`;

      // Guardar la imagen en el frontend (puedes almacenarla donde sea necesario)
      // En este caso, estoy almacenando la imagen en el estado previewImage
      setPreviewImage(fileName);
    }

    // Enviar datos del formulario al backend
    
      const formData = new FormData();
      formData.append('nombre', form.nombre);
      formData.append('categoria1', form.categoria1);
      formData.append('descripcion', form.descripcion);
      formData.append('precio', form.precio);
      formData.append('stock', form.stock);
      formData.append('id_usuario', props.id_usuario);
      formData.append('imagen', file);
     // const nov = await serviciovendedoras.nuevoprpducto(formData)

        props.traer()

    // Puedes resetear el formulario y cerrar el diálogo si es necesario
    setForm({
      nombre: '',
      categoria1: '',
      descripcion: '',
      precio: '',
      stock: '',
    });
    setFile(null);
    setPreviewImage(null);

    setOpen(false);
  }


  return (

<>

<p onClick={handleClickOpen}> Ver < TravelExploreIcon sx={{ color: 'green', }} fontSize="large" /></p>





      {/* <  Tooltip title="Nueva Clase"> <img src={`data:image/jpeg;base64,${props.imagenBase64}`} alt="Mi Imagen" />
        <Button variant="outlined" onClick={handleClickOpen}> Nueva Clase  </Button>

      </Tooltip> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
       
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.nombre}
        subheader={props.fecha}
      />
      <CardMedia
        component="img"
        height="194"
        src={`data:image/jpeg;base64,${props.imagenBase64}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.descripcion} <br/>
         cantidad:{props.cantidad} <br/>
         precio:{props.precio} <br/>
        </Typography>
      </CardContent>
      { ver ? <>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre y apellido "
            name="nombre"
            onChange={handleChange}
            fullWidth
            variant="standard"
          /><br/>
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="consulta"
            name="nombre"
            onChange={handleChange}
            fullWidth
            variant="standard"
          /><br/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Telefono de contacto"
            name="nombre"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </>:<></>} 
     
     
    </Card>
        
          <DialogActions>


            <>
            {!ver &&
              <Button variant="contained" color="primary" onClick={mostrar}> Contactar </Button>}
            {ver &&
              <Button variant="contained" color="primary" onClick={enviar}> Enviar </Button>}
            </>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>


        </DialogContent>
      </Dialog>
    </>


  );
}