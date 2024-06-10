import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Borrar from "./modalborrar";
import '../../estilos.css';
import logo from "../../../../Assets/dtcletra.png";  // Logo 1
import logo2 from "../../../../Assets/logomuni.png"; // Logo 2
import Button from '@mui/material/Button';
import './paraimprimir.css'

// Convertir imágenes a base64
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

export default function AccordionExpandIcon(props) {
  const handlePrint = async (content) => {
    const logoBase64 = await convertImageToBase64(logo);
    const logo2Base64 = await convertImageToBase64(logo2);

    const printWindow = window.open('', '_blank', 'width=800,height=600');

    // Establece el título del documento
    printWindow.document.write(`
      <html>
        <head>
          <title >. </title>
          <style>
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
                height: 100px; /* Ajusta la altura del primer logo */
              }
              .print-container .header img.logo2 {
                height: 50px; /* Altura del segundo logo */
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
              }
              .print-container th, .print-container td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
            }

            @keyframes colorTransition {
              0% {
                border-bottom: 5px solid blue; /* Azul */
              }
              25% {
                border-bottom: 5px solid green; /* Verde */
              }
              50% {
                border-bottom: 5px solid yellow; /* Amarillo */
              }
              75% {
                border-bottom: 5px solid red; /* Rojo */
              }
              100% {
                border-bottom: 5px solid blue; /* Vuelve a Azul */
              }
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
            <div class="footer">Secretaría de Salud - Coordinación de Discapacidad e Inclusión Social</div>
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
  };

  return (
    <div>
      {props.actividades.length > 0 ? (
        props.actividades.map((row, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>{`${row.nombre} - ${row.titulo} - ${row.fecha}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {row.detalle}
                <Borrar id={row.id} traer={props.traer} />
                <div>
                  <Button variant="contained" color="success" onClick={() => handlePrint(`
                    <div>
                      <b>Nombre:${row.apellido} ${row.nombree} </b><br/>
                      <b>Dni:${row.dni} </b><br/>
                      <b>Fecha de nacimiento:${row.fecha_nacimiento} </b><br/>
                      <p>${row.detalle}</p>
                    </div>
                  `)}>Imprimir PDF</Button>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No hay actividades en el día</Typography>
      )}
    </div>
  );
}
