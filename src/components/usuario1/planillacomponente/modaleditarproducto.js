import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Add, Close, LocalShipping, Inventory, MoreHoriz } from "@mui/icons-material";

const variableOptions = [
  {
    label: "Transporte",
    value: "transporte",
    icon: <LocalShipping sx={{ mr: 1 }} />,
    color: "primary",
  },
  {
    label: "Packaging",
    value: "packaging",
    icon: <Inventory sx={{ mr: 1 }} />,
    color: "secondary",
  },
  {
    label: "Otro",
    value: "otro",
    icon: <MoreHoriz sx={{ mr: 1 }} />,
    color: "default",
  },
];

const ModalFormulario = ({ registro, serviciousuario1, onClose }) => {
  const [datos, setDatos] = useState({});
  const [costoVariable1, setCostoVariable1] = useState(null);
  const [costoVariable2, setCostoVariable2] = useState(null);

  useEffect(() => {
    if (registro) {
      setDatos(registro);
      if (registro.variable1) {
        setCostoVariable1({
          tipo: variableOptions.some(opt => opt.value === registro.variable1) ? registro.variable1 : "otro",
          otro: variableOptions.some(opt => opt.value === registro.variable1) ? "" : registro.variable1,
          monto: registro.costevariable1,
        });
      }
      if (registro.variable2) {
        setCostoVariable2({
          tipo: variableOptions.some(opt => opt.value === registro.variable2) ? registro.variable2 : "otro",
          otro: variableOptions.some(opt => opt.value === registro.variable2) ? "" : registro.variable2,
          monto: registro.costevariable2,
        });
      }
    }
  }, [registro]);

  const renderCostoVariable = (
    variable,
    setVariable,
    label,
    usedTipos = [],
    allowRemove = false
  ) => {
    const selectedOption = variableOptions.find((opt) => opt.value === variable?.tipo);

    return (
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <TextField
          select
          label={label}
          value={variable?.tipo || ""}
          onChange={(e) =>
            setVariable({ ...variable, tipo: e.target.value, otro: "" })
          }
          sx={{ flex: 1 }}
        >
          {variableOptions.map((opt) => (
            <MenuItem
              key={opt.value}
              value={opt.value}
              disabled={usedTipos.includes(opt.value)}
            >
              {opt.icon}
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        {variable?.tipo === "otro" && (
          <TextField
            label="Especifique"
            value={variable?.otro}
            onChange={(e) =>
              setVariable({ ...variable, otro: e.target.value })
            }
            sx={{ flex: 1 }}
          />
        )}

        <TextField
          label="Monto"
          type="number"
          value={variable?.monto || ""}
          onChange={(e) =>
            setVariable({ ...variable, monto: e.target.value })
          }
          sx={{ flex: 1 }}
        />

        {allowRemove && (
          <IconButton color="error" onClick={() => setVariable(null)}>
            <Close />
          </IconButton>
        )}
      </Box>
    );
  };

  const handleGuardar = async () => {
    const productoEditado = {
      ...datos,
      variable1: costoVariable1
        ? costoVariable1.tipo === "otro"
          ? costoVariable1.otro
          : costoVariable1.tipo
        : "",
      costevariable1: parseFloat(costoVariable1?.monto) || 0,
      variable2: costoVariable2
        ? costoVariable2.tipo === "otro"
          ? costoVariable2.otro
          : costoVariable2.tipo
        : "",
      costevariable2: parseFloat(costoVariable2?.monto) || 0,
    };

    const rta = await serviciousuario1.modificarproductoesme(productoEditado);
    alert(rta);
    if (onClose) onClose();
  };

  return (
    <Dialog open={!!registro} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
       
        <TextField
          label="Nombre"
          fullWidth
          value={datos.producto || ""}
          onChange={(e) => setDatos({ ...datos, producto: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Costo"
          fullWidth
          value={datos.costo || ""}
          onChange={(e) => setDatos({ ...datos, costo: e.target.value })}
          sx={{ mb: 2 }}
        />

        {/* Costo Variable 1 */}
        {renderCostoVariable(costoVariable1 || { tipo: "", otro: "", monto: "" }, setCostoVariable1, "Costo Variable 1", costoVariable2 ? [costoVariable2.tipo] : [])}

        {/* Costo Variable 2 */}
        {costoVariable2 ? (
          renderCostoVariable(costoVariable2, setCostoVariable2, "Costo Variable 2", [costoVariable1?.tipo], true)
        ) : (
          <Button
            startIcon={<Add />}
            onClick={() =>
              setCostoVariable2({ tipo: "", otro: "", monto: "" })
            }
            sx={{ mt: 2 }}
          >
            Agregar Costo Variable 2
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleGuardar}>
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFormulario;
