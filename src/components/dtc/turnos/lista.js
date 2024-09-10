import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import servicioDtc from '../../../services/dtc';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Buscador from '../usuario1/turnos/calendariobusquedadeturnos';
import Asignar from './asignar';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Clasificar from '../usuario1/turnos/borrar';
import Skeleton from '@mui/material/Skeleton';
import logo from "../../../Assets/logomuni.png";
import Nuevo from "../usuario1/turnos/nuevoturno"
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MobileFriendlyTable = (props) => {
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const [fecha, setFecha] = useState();
  const [usuario, setUsuario] = useState();
  const [form, setForm] = useState();
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  useEffect(() => {
    traer();
  }, [fechaSeleccionada]);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const user = JSON.parse(loggedUserJSON);
    setUsuario(user);

    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    props.fecha === undefined ? setCurrentDate(formattedDate) : setCurrentDate(props.fecha);
    if(user.nivel==40 || user.nivel==41 ){
      const historial = await servicioDtc.traerparaturnoscadia(
        props.fecha === undefined
          ? { fecha: formattedDate, id: props.idt === undefined ? user.id : props.idt }
          : { fecha: props.fecha, id: props.idt === undefined ? user.id : props.idt }
      );
  
      setDatos(historial);
    }else{
      const historial = await servicioDtc.traerparaturnos(
        props.fecha === undefined
          ? { fecha: formattedDate, id: props.idt === undefined ? user.id : props.idt }
          : { fecha: props.fecha, id: props.idt === undefined ? user.id : props.idt }
      );
  
      setDatos(historial);
    }
  
  };

  const handlePrint = (row) => {
    const doc = new jsPDF();
  
    // Tamaño personalizado del logo
    const logoWidth = 40; // Ajusta el ancho del logo
    const logoHeight = 10; // Ajusta la altura del logo
  
    // Añadir imagen (logo) al PDF
    doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight); // Ajuste de posición para que esté alineado a la izquierda
    
    // Título del encabezado alineado a la derecha del logo
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("DISPOSITIVO TERRITORIAL COMUNITARIO", 60, 20); // Ajuste de posición
    doc.setFontSize(12);
    doc.text("Municipalidad de Corrientes", 60, 30); // Ajuste de posición
    
    // Línea divisoria degradada con colores alternados cada 1 cm
    const colors = [
      [0, 102, 204], // Celeste
      [0, 153, 51],  // Verde
      [153, 0, 51],  // Bordó
      [255, 204, 0]  // Amarillo
    ];
  
    let startX = 10; // Punto inicial en el eje X
    const lineY = 40; // Posición de la línea en el eje Y
    const lineWidth = 2; // Grosor de la línea
    const cmToPts = 28.35; // Conversión de 1 cm a puntos en PDF
    const segmentWidth = cmToPts; // Ancho de cada segmento en puntos (equivalente a 1 cm)
    const pageWidth = doc.internal.pageSize.width; // Ancho de la página
  
    let colorIndex = 0;
    
    while (startX < pageWidth) {
      const color = colors[colorIndex % colors.length]; // Alternar colores
      doc.setDrawColor(...color);
      doc.setLineWidth(lineWidth);
      doc.line(startX, lineY, startX + segmentWidth, lineY); // Dibujar el segmento de línea
      
      startX += segmentWidth; // Moverse al siguiente segmento
      colorIndex++; // Cambiar al siguiente color
    }
  
    // Datos del turno justificado a la izquierda
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`USUARIO: ${row.nombre || "N/A"}`, 10, 60);
    doc.text(`FECHA: ${row.fecha || "N/A"}`, 10, 70);
    doc.text(`HORA: ${row.detalle || "N/A"}`, 10, 80);
   
    doc.text(`PROF.: ${row.nombrepsiq== "Vale" ? "Valeria apellido" :row.nombrepsiq== "Sofia" ? "Sofia apellido" :"" || "N/A"}`, 10, 90);
  
    // Pie de página centrado
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Secretaría De Salud", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 30, { align: "center" });
    doc.text("Subsecretaría de Discapacidad e Inclusión Social", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20, { align: "center" });
    doc.text("Calle 658 Nº 2100. Barrio Independencia", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
  
    // Guardar PDF
    doc.save(`${row.nombre}_turno.pdf`);
  };
  return (
    <div>
      {datos ? (
        <>
          <Typography variant="p" gutterBottom>
            Fecha: {currentDate}
          </Typography>

          <Buscador
            chicos={datos[1]}
            fecha={currentDate}
            
            usuario={usuario}
            traer={async (fecha) => {
              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
              setForm({fecha:fecha})
              const user = JSON.parse(loggedUserJSON);
              setUsuario(user);
              if(user.nivel==40 || user.nivel==41 ){
                const historial = await servicioDtc.traertodoslosturnosfechacadia(fecha);
                setDatos(historial);
                setFecha(fecha);
              }else{
                const historial = await servicioDtc.traertodoslosturnosfecha(fecha);
              setDatos(historial);
              setFecha(fecha);
              }
           
            }}
          />
          {form ? <><Nuevo fecha={form.fecha}
 traer={async (fecha) => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
  const user = JSON.parse(loggedUserJSON);
  setUsuario(user);
  if(user.nivel==40 || user.nivel==41 ){
    const historial = await servicioDtc.traertodoslosturnosfechacadia(form);
    setDatos(historial);
    setFecha(fecha);
  }else{
    const historial = await servicioDtc.traertodoslosturnosfecha(form);
  setDatos(historial);
  setFecha(fecha);
  }

}}/></>:<></>}
          <TableContainer>
            {!datos[0] ? (
              <Skeleton />
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Nombre</b></TableCell>
                      <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Estado</b></TableCell>
                      <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Horario</b></TableCell>
                      <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Psicólogo</b></TableCell>
                      <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Asignar</b></TableCell>
                      <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Imprimir</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datos[0].map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.apellido ? `${row.apellido} ${row.nombre}` : "Disponible"}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">{row.estado}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">{row.detalle}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">{row.nombrepsiq}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Asignar id={row.id} chicos={datos[1]} traer={traer} />
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Button onClick={() => handlePrint(row)}>Imprimir</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
        </>
      ) : (
        <></>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MobileFriendlyTable;
