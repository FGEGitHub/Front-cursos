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

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

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
      if (editando) {
        await servicioDtc.modificarHorario({
          id: idEditando,
          ...form
        });
      } else {
        await servicioDtc.agregarHorario({
          id_tallerista: id,
          ...form
        });
      }

      setOpen(false);
      setEditando(false);
      setIdEditando(null);
      setForm({ detalle: "", dia: "", horario: "" });
      traerDatos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditar = (row) => {
    setForm({
      detalle: row.detalle,
      dia: row.dia,
      horario: row.horario
    });
    setIdEditando(row.id);
    setEditando(true);
    setOpen(true);
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
        <Button variant="contained" onClick={() => {
          setEditando(false);
          setForm({ detalle: "", dia: "", horario: "" });
          setOpen(true);
        }}>
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
                  <Button onClick={() => handleEditar(row)}>
                    Modificar
                  </Button>

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

      {/* Dialog agregar / editar */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editando ? "Modificar Horario" : "Agregar Horario"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Detalle"
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
            label="Horario"
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
            {editando ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmación eliminar */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Seguro que quieres borrar este horario?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>
            Cancelar
          </Button>
          <Button color="error" variant="contained" onClick={handleEliminar}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HorariosTalleres;