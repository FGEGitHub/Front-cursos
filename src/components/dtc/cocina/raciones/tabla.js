import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUIDataTable from "mui-datatables";
import servicioDtc from "../../../../services/dtc";
import Nueva from './nuevo';

export default function TablaActividades() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [asistencias, setAsistencias] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [includeSignature, setIncludeSignature] = useState(false);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUsuario(usuario);
      const novedades_aux = await servicioDtc.traermeriendas();
      setAsistencias(novedades_aux);
    }
  };

  useEffect(() => {
    traer();
  }, []);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignatureChange = (event) => {
    setIncludeSignature(event.target.checked);
  };

  // Calcular el total de la cantidad sumando todas las cantidades de la lista
  const totalCantidad = asistencias.reduce((acc, item) => acc + (item.cantidad || 0), 0);

  const columns = [
    {
        name: "fecha",
        label: "Fecha",
    },
    {
        name: "cantidad",
        label: "Cantidad",
    },
    {
        name: "ubicacion",
        label: "Ubicación",
    },
    {
        name: "Actions",
        label: "Acciones",
        options: {
            customBodyRenderLite: (dataIndex) => {
                const rowData = asistencias[dataIndex];

                return (
                    <>
                        {rowData.ubicacion && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleViewFile(rowData.id)}
                            >
                                Ver Archivo
                            </Button>
                        )}
                    </>
                );
            },
        },
    },
];

const handleViewFile = async (id) => {
  try {
      const response = await servicioDtc.verimagendemerienda(id);
      
      if (response && response.data) {
          const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
          const fileUrl = URL.createObjectURL(fileBlob);
          window.open(fileUrl, '_blank');

          setTimeout(() => {
              URL.revokeObjectURL(fileUrl);
          }, 10000);
      } else {
          console.error("No se recibió un archivo válido.");
      }
  } catch (error) {
      console.error("Error al obtener el archivo:", error);
  }
};


  return (
    <div className="App">
      <h1>Total Cantidad: {totalCantidad}</h1>
      
      <Nueva id_trabajador={usuario.id} traer={traer} />

      <MUIDataTable title={"Lista de informes"} data={asistencias} columns={columns} />

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" sx={{ width: 400, padding: 2, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 1 }}>
          {selectedRow && (
            <div>
              <h2>Detalles</h2>
              <p>{selectedRow.detalle}</p>
              <FormControlLabel
                control={<Checkbox checked={includeSignature} onChange={handleSignatureChange} name="includeSignature" color="primary" />}
                label="Incluir Firma"
              />
              <Button variant="contained" color="success" sx={{ width: '150px', height: '40px', margin: '8px', fontSize: '14px', textTransform: 'none' }} onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
