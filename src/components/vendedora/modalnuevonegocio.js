import React, { useState } from 'react';
import { TextField, Button, Input, Card, CardContent, CardMedia } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import NativeSelect from '@mui/material/NativeSelect';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import serviciovendedoras from '../../services/vendedoras';
import InputLabel from '@mui/material/InputLabel';
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
      const nov = await serviciovendedoras.nuevoprpducto(formData)

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


      <div className="body__Page">
        <div className="container__article">

          <div onClick={handleClickOpen} className="box__article">
            <i onClick={handleClickOpen}> < LibraryAddIcon sx={{ color: 'green', }} fontSize="large" /></i>
            <h5 onClick={handleClickOpen}>NUEVO PRODUCTO</h5>
            <p onClick={handleClickOpen}> Seleccionar para agregar un nuevo negocio </p>
          </div>


        </div>
      </div>






      {/* <  Tooltip title="Nueva Clase">
        <Button variant="outlined" onClick={handleClickOpen}> Nueva Clase  </Button>

      </Tooltip> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>


          <h3>
            <b> Nuevo Producto</b></h3>




          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del negocio"
            name="nombre"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Categoria
          </InputLabel>
          <NativeSelect
            defaultValue={'sin determnar'}
            onChange={handleChange}
            inputProps={{
              name: 'categoria1',
              id: 'uncontrolled-native',

            }}
          >  <option value={1}>Seleccionar</option>
            <option value={"Plumas"}>Plumas</option>
            <option value={"Piedras"}>Piedras</option>
            <option value={"Cosa 1"}>Cosa 1</option>
            <option value={"Cosa 2"}>Cosa 2</option>
            <option value={"Otras"}>Otras</option>


          </NativeSelect>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descripcion"
            name="descripcion"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Precio"
            name="precio"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cantidad disponible (Stock)"
            name="stock"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
           {previewImage && (
        <Card>
          <CardMedia component="img" alt="Preview" height="140" image={previewImage} />
          <CardContent>
            <p>Imagen de vista previa</p>
          </CardContent>
        </Card>
      )}
          <DialogActions>


            <>
              <Button variant="contained" color="primary" onClick={enviar}> Agregar </Button>
            </>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>


        </DialogContent>
      </Dialog>
    </>


  );
}