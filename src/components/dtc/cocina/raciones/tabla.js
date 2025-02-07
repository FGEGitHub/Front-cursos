
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Borrar from './borar'
import MUIDataTable from "mui-datatables";
import servicioDtc from "../../../../services/dtc";
import Nueva from './nuevo';

export default function TablaActividades() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen
  const [asistencias, setAsistencias] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        setUsuario(usuario);
        const novedades_aux = await servicioDtc.traermeriendas();
        setAsistencias(novedades_aux);
      }
    };
    traer();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };
  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUsuario(usuario);
      const novedades_aux = await servicioDtc.traermeriendas();
      setAsistencias(novedades_aux);
    }
  };

  const handleViewFile = async (id) => {
    try {
      const response = await servicioDtc.verimagendemerienda(id);
      console.log(response)
   
      setImageUrl(response); // Guarda la URL para mostrar la imagen
      setOpen(true); // Abre el modal
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };
  

  const columns = [
    { name: "fecha", label: "Fecha" },
    { name: "cantidad", label: "Cantidad" },
    { name: "ubicacion", label: "Ubicación" },
    {
      name: "Actions",
      label: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = asistencias[dataIndex];
          return (
            rowData.ubicacion && (
              <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewFile(rowData.id)}
              >
                Ver Imagen
              </Button>
              <Borrar
              id={rowData.id}
              traer={async () => {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                if (loggedUserJSON) {
                  const usuario = JSON.parse(loggedUserJSON);
                  setUsuario(usuario);
                  const novedades_aux = await servicioDtc.traermeriendas();
                  setAsistencias(novedades_aux);
                }
              }}/>
              </>
            )
          );
        },
      },
    },
  ];

  return (
    <div className="App">
      <h1>Total Cantidad: {asistencias.reduce((acc, item) => acc + (item.cantidad || 0), 0)}</h1>

      <Nueva id_trabajador={usuario.id} traer={traer} />
      <MUIDataTable title={"Lista de informes"} data={asistencias} columns={columns} />

      {/* Modal para mostrar la imagen */}
      <Modal open={open} onClose={handleClose}>
  <Box sx={{ width: 400, padding: 2, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 1 }}>
    {imageUrl ? (<>
    <img src={`data:image/jpeg;base64,${imageUrl}`} width="100%" height="100%" /></>
    ) : (
      <p>No se encontró la imagen</p>
    )}
    <Button variant="contained" color="success" onClick={handleClose} sx={{ mt: 2 }}>
      Cerrar
    </Button>
  </Box>
</Modal>
    </div>
  );
}
