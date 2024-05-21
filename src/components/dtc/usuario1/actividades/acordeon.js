import React, { useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Borrar from"./modalborrar"
import '../../estilos.css'
import logo from "../../../../Assets/dtcletra.png";
export default function AccordionExpandIcon(props) {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
        <img src={logo} alt="Logo" />
          <title>Imprimir PDF</title>
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
              /* Ajusta los estilos para el PDF aquí */
              .print-container h1 {
                color: #000;
                font-size: 24px;
              }
              .print-container p {
                color: #000;
                font-size: 16px;
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
          </style>
        </head>
        <body>
          <div class="print-container">${printContents}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  const islogo = {
    width: "70%",                  
    };
  return (
    <div>
      {props.actividades.length>0 ? <>
        {props.actividades.map((row) => (
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{row.nombre} - {row.titulo} -  {row.fecha} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          { row.detalle}
          <Borrar id={row.id}
          traer={props.traer}/>
    
      <div>
      <div ref={printRef} className="print-container">
        <div className="header">
         
          <h1>Institución XYZ</h1>
        </div>
        <p>Este es el contenido que se incluirá en el PDF.</p>
        { row.detalle}
        {/* Agrega más contenido según sea necesario */}
      </div>
      <button onClick={handlePrint}>Imprimir PDF</button>
    </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
     ) )}
      </>:<>No hay actividades en el dia</>}
    </div>
  );
}