import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

const ModalConfirmarBorrado = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirmar Borrado</DialogTitle>
      <DialogContent>
        <Typography>¿Estás seguro que quieres borrar?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Sí, estoy seguro
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmarBorrado;
