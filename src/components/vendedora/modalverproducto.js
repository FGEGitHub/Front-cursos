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
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    categoria1: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Mostrar una vista previa de la imagen en el frontend
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
         {props.descripcion}
         cantidad:{props.cantidad}
         precio:{props.precio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
     
      
      </CardActions>
      <Collapse  timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp
          </Typography>
          <Typography paragraph>
            Add rice and stir ver
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
        
          <DialogActions>


            <>
              <Button variant="contained" color="primary" onClick={enviar}> Contactar </Button>
            </>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>


        </DialogContent>
      </Dialog>
    </>


  );
}