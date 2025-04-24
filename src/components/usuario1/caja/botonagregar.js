import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import serviciousuario from "../../../services/vendedoras"; // Asegurate que este sea el path correcto

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function MovimientoModal() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [monto, setMonto] = useState("");
  const [detalle, setDetalle] = useState("");
  const [fecha, setFecha] = useState("");

  
  const handleSubmit = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      console.log(1)
      const nuevoMovimiento = {
        id_usuario:usuario.id,
        tipo,
        detalle,
        formaPago,
        fecha,
        monto: parseFloat(monto),
      };

      try {
        await serviciousuario.enviarmovimientoingreso(nuevoMovimiento);
        setOpen(false);
        // Podés agregar feedback acá (alerta o snackbar)
      } catch (error) {
        console.error("Error al enviar el movimiento", error);
      }
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Agregar Movimiento
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Nuevo Movimiento
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select value={tipo} onChange={(e) => setTipo(e.target.value)} label="Tipo">
              <MenuItem value="ingreso">Ingreso</MenuItem>
              <MenuItem value="egreso">Egreso</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Forma de Pago</InputLabel>
            <Select value={formaPago} onChange={(e) => setFormaPago(e.target.value)} label="Forma de Pago">
                <MenuItem   value={"EFECTIVO"}>EFECTIVO</MenuItem>
                <MenuItem   value={"MERCADO PAGO"}>MERCADO PAGO</MenuItem>
             <MenuItem   value={"NARANJA X"}>NARANJA X</MenuItem>
             <MenuItem   value={"ADEUDA"}>ADEUDA</MenuItem>
           
             <MenuItem   value={"TRANSFERENCIA BANCARIA"}>TRANSFERENCIA BANCARIA</MenuItem>
             <MenuItem   value={"TARJETA DE CREDITO"}>TARJETA DE CREDITO</MenuItem>
             <MenuItem   value={"OTROS"}>OTROS</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Monto"
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />

<TextField
            fullWidth
            margin="normal"
            label="Detalle"
            value={detalle}
           
            onChange={(e) => setDetalle(e.target.value)}
          />
               <TextField
                    fullWidth
                    margin="dense"
                    label="Fecha"
                    type="date"
                    name="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
          
     <Button
  variant="contained"
  fullWidth
  onClick={handleSubmit} // <- llamada directa a tu función handleSubmit
  disabled={!tipo || !formaPago || !monto}
>
  Enviar

          </Button>
        </Box>
      </Modal>
    </div>
  );
}
