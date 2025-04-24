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

  const handleSubmit = async () => {
    const loggedUserJSON = localStorage.getItem("usuario");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);

      const nuevoMovimiento = {
        id_usuario:usuario.id,
        tipo,
        formaPago,
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
              <MenuItem value="efectivo">Efectivo</MenuItem>
              <MenuItem value="tarjeta de credito">Tarjeta de Crédito</MenuItem>
              <MenuItem value="mercado pago">Mercado Pago</MenuItem>
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

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!tipo || !formaPago || !monto}
          >
            Enviar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
