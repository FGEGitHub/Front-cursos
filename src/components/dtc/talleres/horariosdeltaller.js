import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useParams } from "react-router-dom";
import servicioDtc from "../../../services/dtc";

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

const HorariosTalleres = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  // 👉 ahora incluye detalle
  const [form, setForm] = useState({
    detalle: "",
    dia: "",
    horario: ""
  });

  const traerDatos = async () => {
    try {
      const res = await servicioDtc.traerhorairoastalleres(id);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    traerDatos();
  }, [id]);

  const handleGuardar = async () => {
    try {
      console.log("Guardando horario con datos:", form);
      await servicioDtc.agregarHorario({ 
        id_tallerista: id,
        detalle: form.detalle,
        dia: form.dia,
        horario: form.horario
      });

      setOpen(false);
      setForm({ detalle: "", dia: "", horario: "" });
      traerDatos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEliminar = async () => {
    try {
      await servicioDtc.eliminarHorarioo(idAEliminar);
      setOpenConfirm(false);
      setIdAEliminar(null);
      traerDatos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Nuevo Horario
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Taller</TableCell>
              <TableCell>Día</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.detalle}</TableCell>
                <TableCell>{row.dia}</TableCell>
                <TableCell>{row.horario}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => {
                      setIdAEliminar(row.id);
                      setOpenConfirm(true);
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog agregar */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Horario</DialogTitle>
        <DialogContent>

          {/* 👉 NUEVO CAMPO DETALLE */}
          <TextField
            fullWidth
            label="Detalle (opcional)"
            value={form.detalle}
            onChange={(e) =>
              setForm({ ...form, detalle: e.target.value })
            }
            sx={{ mt: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Día"
            value={form.dia}
            onChange={(e) => setForm({ ...form, dia: e.target.value })}
            sx={{ mt: 2 }}
          >
            {dias.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Horario (ej: 14:30)"
            value={form.horario}
            onChange={(e) =>
              setForm({ ...form, horario: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleGuardar}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog confirmación eliminar */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Seguro que quieres borrar este horario?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleEliminar}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HorariosTalleres;