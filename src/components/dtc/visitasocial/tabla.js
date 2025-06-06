import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Borrar from "./modalborrar";
import '../estilos.css';
import logo from "../../../Assets/dtcletra.png";  // Logo 1
import logo2 from "../../../Assets/logomuni.png"; // Logo 2
import '../usuario1/actividades/paraimprimir.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FirmaAugusto from "../../../Assets/firmaaugusto.jpeg";
import FirmaSole from "../../../Assets/firmasole.jpeg";
import ModalBorrar from "./modalborrar"
import servicioDtc from "../../../services/dtc";
import Nueva from './nueva';
import Modificar from './editaractividad';
import MUIDataTable from "mui-datatables";
import Snack from './snackbar'
const convertImageToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default function TablaActividades(props) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [asistencias, setAsitencias] = useState();
  const [usuario, setUsuario] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    dni: true,
    fecha_nacimiento: true,
    fecha_act: true,
    nombre: true,
    apellido: true,
    grado: true,
    escuela: true,
  });
  const [includeSignature, setIncludeSignature] = useState(false);

  useEffect(() => {
    const traer = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        console.log(usuario)
        setUsuario(usuario);
        const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
        setAsitencias(novedades_aux);
      }
    };
    traer();
  }, []);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldChange = (event) => {
    setSelectedFields({
      ...selectedFields,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSignatureChange = (event) => {
    setIncludeSignature(event.target.checked);
  };

  const handlePrint = async () => {
    const logoBase64 = await convertImageToBase64(logo);
    const logo2Base64 = await convertImageToBase64(logo2);

    let firmaBase64 = '';
    if (includeSignature) {
      if (selectedRow.id_tallerista === 262) {
        firmaBase64 = await convertImageToBase64(FirmaAugusto);
      } else if (selectedRow.id_tallerista === 267) {
        firmaBase64 = await convertImageToBase64(FirmaSole);
      }
    }

    const row = selectedRow;
    let content = /* `<div>
      ${selectedFields.apellido && selectedFields.nombre ? `<b>Nombre: ${row.apellido} ${row.nombree}</b><br/>` : ''}
      ${selectedFields.dni ? `<b>DNI: ${row.dni}</b><br/>` : ''}
      ${selectedFields.fecha_nacimiento ? `<b>Fecha de nacimiento: ${row.fecha_nacimiento}</b><br/>` : ''}
      ${selectedFields.fecha_act ? `<b>Fecha: ${row.fecha_act}</b><br/>` : ''}
      ${selectedFields.grado ? `<b>Grado: ${row.grado}</b><br/>` : ''}
      ${selectedFields.escuela ? `<b>Escuela: ${row.escuela}</b><br/>` : ''}
      <p>${(row.detalle || '').replace(/\./g, '<br/>')}</p>
    </div>` */""

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Impresión de Actividades</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 14px;
              color: #000;
            }
            @media print {
              body * {
                visibility: hidden;
              }
              .print-container, .print-container * {
                visibility: visible;
              }
              .print-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .print-container .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
              }
              .print-container .header img {
                height: 100px;
              }
              .print-container .header img.logo2 {
                height: 50px;
              }
              .print-container .header .title {
                flex-grow: 1;
                text-align: center;
              }
              .print-container .header .title h1 {
                font-size: 24px;
                color: #000;
                margin: 0;
              }
              .color-line {
                width: 100%;
                height: 5px;
              }
              .print-container .footer {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: #000;
              }
              .print-container table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              .print-container th, .print-container td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              .firma {
                margin-top: 20px;
                text-align: center;
              }
              .firma img {
                height: 100px;
                margin-bottom: 20px;
              }
              .logo-footer {
                position: fixed;
                bottom: 0;
                left: 0;
                height: 50px;
              }
            }

            @keyframes colorTransition {
              0% {
                border-bottom: 5px solid blue;
              }
              25% {
                border-bottom: 5px solid green;
              }
              50% {
                border-bottom: 5px solid yellow;
              }
              75% {
                border-bottom: 5px solid red;
              }
              100% {
                border-bottom: 5px solid blue;
              }
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 16px;
              text-align: left;
              color: #333;
            }
            th, td {
              padding: 12px 15px;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
              color: #333;
              font-weight: bold;
            }
            tr:nth-of-type(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="header">
              <img src="${logoBase64}" alt="Logo 1" />
              <div class="title">
                <h1>Dispositivo territorial comunitario</h1>
              </div>
              <img src="${logo2Base64}" alt="Logo 2" class="logo2" />
            </div>
            <div class="color-line" style="animation: colorTransition 8s linear infinite;"></div>
            ${content}
            <div class="firma">
              ${firmaBase64 ? `<img src="${firmaBase64}" alt="Firma" />` : ''}
            </div>
            <div class="footer">
              Secretaría de Salud - Coordinación de Discapacidad e Inclusión Social
              <img src="${logoBase64}" alt="Logo Footer" class="logo-footer" />
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);

    handleClose();
  };

  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    return (
        <>   {asistencias[dataIndex].usuariodispositivo =="Si" ? <>   {asistencias[dataIndex].usuario_nombre}    {asistencias[dataIndex].usuario_apellido}</> :<>{asistencias[dataIndex].psicologa_nombre}</>} 

          

        </>
    );
}


function Nivel(dataIndex, rowIndex, data, onClick) {
    return (
        <>
<Button variant="outlined" sx={{ color: "#37474f", borderColor: "black", fontSize: "0.65rem", }} color="primary" onClick={() => handleOpen(asistencias[dataIndex])}>
                  Ver detalles
                </Button><br/>
                {asistencias[dataIndex].ubicacion !== "no" && (
                  <Button variant="outlined" sx={{ color: "#37474f", borderColor: "black", fontSize: "0.65rem", }} onClick={() => handleViewFile(asistencias[dataIndex].id)}>
                    Ver Online
                  </Button>
                )}
               <Modificar id={asistencias[dataIndex].id} 
                  fecha_referencia={asistencias[dataIndex].fecha_referencia}
                  titulo={asistencias[dataIndex].titulo}
                  detalle={asistencias[dataIndex].detalle}
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsitencias(novedades_aux);
                    }
                  }}/>
                    <Borrar id={asistencias[dataIndex].id} 
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsitencias(novedades_aux);
                    }
                  }}/>
                {usuario ? <>
      
                {usuario.id==asistencias[dataIndex].idu ? <>
                  <Borrar id={asistencias[dataIndex].id} 
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsitencias(novedades_aux);
                    }
                  }}/>
                <Modificar id={asistencias[dataIndex].id} 
                  fecha_referencia={asistencias[dataIndex].fecha_referencia}
                  titulo={asistencias[dataIndex].titulo}
                  detalle={asistencias[dataIndex].detalle}
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsitencias(novedades_aux);
                    }
                  }}/>
             
                  
                  </>:<></>}
                
                </>:<></>}
               
        </>
    );
}



const columns = [
    {
        name: "trabajador_nombre",
        label: "Quen cargó",
    },

    {
      name: "Nombre usuario",
      options: {
          customBodyRenderLite: (dataIndex, rowIndex) =>
              CutomButtonsRenderer(
                  dataIndex,
                  rowIndex,
                  // overbookingData,
                  // handleEditOpen
              )
      }

  },

    {
        name: "titulo",
        label: "titulo",

    },
    {
      name: "fecha_carga",
      label: "fecha_carga",

  },
  {
    name: "fecha_referencia",
    label: "fecha_referencia",

},
    {
        name: "Acciones pa hacer",
        options: {
            customBodyRenderLite: (dataIndex, rowIndex) =>
                Nivel(
                    dataIndex,
                    rowIndex,
                    // overbookingData,
                    // handleEditOpen
                )
        }

    },





];
  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };
  
  const handleViewFile = async (id) => {
    try {
      const response = await servicioDtc.verArchivo(id);
      if (response && response.data) {
        const fileBlob = new Blob([response.data], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(fileBlob);
        window.open(fileUrl, '_blank');
        setTimeout(() => {
          URL.revokeObjectURL(fileUrl);
        }, 10000);
      } else {
        console.error("No se recibió un archivo válido.");
      }
    } catch (error) {
      console.error("Error al obtener el archivo PDF:", error);
    }
  };
  const options = {
    setTableProps: () => {
        return {
          style: {
            backgroundColor: "#e3f2fd", // Cambia el color de fondo de la tabla
          },
        };
      },
      customHeadRender: (columnMeta, handleToggleColumn) => ({
        TableCell: {
          style: {
            backgroundColor: '#1565c0', // Cambia el color de fondo del encabezado
            color: 'white', // Cambia el color del texto del encabezado
          },
        },
      }),
    selectableRows: false, // Desactivar la selección de filas
    stickyHeader: true,
    selectableRowsHeader: false,
    selectableRowsOnClick: true,
    responsive: 'scroll',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
    print: true,
    filter: true,
    viewColumns: true,
    pagination: true,

    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "siguiente pagina",
        previous: "La que esta antes",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "buscar",
        downloadCsv: "Descargar en excel",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos ",
        title: "FILTROS",
        reset: "RESETEAR",
      },
      viewColumns: {
        title: "Que columnas quieres verr",
        titleAria: "Mostrar/ocultar columnas de la tabla",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },

  };
  return (
    <div className="App">
      <Snack/>
      <Nueva
        id_trabajador={usuario.id}
        traer={ async () => {
          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
          if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON);
            setUsuario(usuario);
            const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
            setAsitencias(novedades_aux);
          }
        }}/>
      {/* <Typography variant="h5" gutterBottom>
        Actividades
      </Typography>
      <table>
        <thead>
          <tr>
            <th>Creado por</th>
            <th>Usuario</th>
            <th>Foto</th>
            <th>Título</th>
            <th>Fecha de Carga</th>
            {showDetail && <>
              <th>Detalle</th>
              <th>Fecha de Referencia</th>
            </>}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asistencias && asistencias.map((row, index) => (
            <tr key={index}>
              <td>{row.nombre}</td>
              <td>{row.nombree} {row.apellido}</td>
              <td>
                {row.id_tallerista == 262 && <img src={Fotoaugusto} alt="Foto Augusto" style={{ height: '50px' }} />}
                {row.id_tallerista == 267 && <img src={Fotosole} alt="Foto Sole" style={{ height: '50px' }} />}
              </td>
              <td>{row.titulo}</td>
              <td>{row.fecha_carga}</td>
              {showDetail && <>
                <td>{row.detalle}</td>
                <td>{row.fecha_referencia}</td>
              </>}
              <td>
                <Button variant="contained" color="primary" onClick={() => handleOpen(row)}>
                  Ver detalles
                </Button><br/>
                {row.ubicacion !== "no" && (
                  <Button variant="contained" color="secondary" onClick={() => handleViewFile(row.id)}>
                    Ver Online
                  </Button>
                )}
                <Borrar id={row.id} 
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsitencias(novedades_aux);
                    }
                  }}/>
                <Modificar id={row.id} 
                  fecha_referencia={row.fecha_referencia}
                  titulo={row.titulo}
                  detalle={row.detalle}
                  traer={ async () => {
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                    if (loggedUserJSON) {
                      const usuario = JSON.parse(loggedUserJSON);
                      setUsuario(usuario);
                      const novedades_aux = await servicioDtc.traerasitenciasociales(usuario.id);
                      setAsitencias(novedades_aux);
                    }
                  }}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <MUIDataTable

title={"Lista de asistencias"}
data={asistencias}
columns={columns}
options={options}
actions={[
    {
        icon: 'save',
        tooltip: 'Save User',
        onClick: (event, rowData) => alert("You saved " + rowData.name)
    }
]}



/>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" sx={{ 
          width: 400, 
          padding: 2, 
          bgcolor: 'background.paper', 
          boxShadow: 24,
          borderRadius: 1 
        }}>
          {selectedRow && (
            <div>
              <h2>Detalles</h2>
              <p>{selectedRow.detalle}</p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeSignature}
                    onChange={handleSignatureChange}
                    name="includeSignature"
                    color="primary"
                  />
                }
                label="Incluir Firma"
              />
              <Button  variant="contained" 
        color="success" 
        sx={{ width: '150px', height: '40px', margin: '8px', fontSize: '14px', textTransform: 'none' }}
 onClick={handlePrint} style={{ marginRight: 8 }}>
                Imprimir
              </Button>
              <Button  variant="contained" 
        color="success" 
        sx={{ width: '150px', height: '40px', margin: '8px', fontSize: '14px', textTransform: 'none' }}
onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
