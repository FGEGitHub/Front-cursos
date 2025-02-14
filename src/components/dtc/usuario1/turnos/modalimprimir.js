import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import logo from "../../../../Assets/dtcletra.png";



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




const ModalConstanciaTurno = ({ nombrepsic, detalle, fecha }) => {
  const [isOpen, setIsOpen] = useState(false);
  const printRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
   
  const handlePrint = async () => {
    const logoBase64 =  await convertImageToBase64(logo);
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Constancia de Turno</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              img { width: 80px; height: 80px; margin-bottom: 10px; }
              .container { border: 1px solid #000; padding: 20px; display: inline-block; }
              @media print {
                body { visibility: hidden; }
                .container { visibility: visible; position: absolute; top: 0; left: 0; width: 100%; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="${logoBase64}" alt="Logo" />
         
              <h2>Turno de ${nombrepsic}</h2>
              <p>Constancia del día ${fecha} a las ${detalle}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Imprimir Constancia
      </Button>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent style={{ textAlign: "center", padding: "24px" }}>
          <div ref={printRef} id="print-section">
            <img src={logo} alt="Logo" style={{ width: "64px", height: "64px", margin: "0 auto 16px" }} />
            <DialogTitle>Turno de {nombrepsic}</DialogTitle>
            <p style={{ marginBottom: "16px" }}>
              Constancia el día {fecha} a las {detalle}
            </p>
          </div>
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Imprimir
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalConstanciaTurno;
