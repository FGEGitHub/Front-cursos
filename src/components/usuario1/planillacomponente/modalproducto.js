import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Divider,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Add,
  Close,
  LocalShipping,
  Inventory,
  MoreHoriz,
} from "@mui/icons-material";

// Opciones con íconos y colores
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

const ModalAgregarProducto = ({ open, onClose, serviciousuario1, traer,productos  }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
  });

  const [costoVariable1, setCostoVariable1] = useState({
    tipo: "",
    otro: "",
    monto: "",
  });

  const [costoVariable2, setCostoVariable2] = useState(null); // null si no se agregó
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [usandoNuevaCategoria, setUsandoNuevaCategoria] = useState(false);

  // Obtener categorías únicas de productos
  const categoriasUnicas = Array.from(
    new Set(productos.map((p) => p.categoria).filter(Boolean))
  );
  const renderCostoVariable = (
    variable,
    setVariable,
    label,
    usedTipos = [],
    allowRemove = false
  ) => {
    const selectedOption = variableOptions.find(
      (opt) => opt.value === variable.tipo
    );

    return (
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <TextField
          select
          label={label}
          value={variable.tipo}
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

        {variable.tipo === "otro" && (
          <TextField
            label="Especifique"
            value={variable.otro}
            onChange={(e) =>
              setVariable({ ...variable, otro: e.target.value })
            }
            sx={{ flex: 1 }}
          />
        )}

        <TextField
          label="Monto"
          type="number"
          value={variable.monto}
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
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
  
        // Preparar valores de variables adicionales
        const productoExtra = {};
        if (costoVariable1) {
          productoExtra[`variable1`] =
            costoVariable1.tipo === "otro" ? costoVariable1.otro : costoVariable1.tipo;
          productoExtra[`costevariable1`] = parseFloat(costoVariable1.monto) || 0;
        }
        if (costoVariable2) {
          productoExtra[`variable2`] =
            costoVariable2.tipo === "otro" ? costoVariable2.otro : costoVariable2.tipo;
          productoExtra[`costevariable2`] = parseFloat(costoVariable2.monto) || 0;
        }
  
        const productoFinal = {
          ...producto,
          ...productoExtra, // <--- aquí se agregan al producto
          costoVariables: [costoVariable1, costoVariable2].filter(Boolean),
          usuarioId: usuario.id,
        };
  console.log(productoFinal)
        const rta = await serviciousuario1.crearnuevoproducto(productoFinal);
        alert(rta);
        traer();
        setProducto({ nombre: "", categoria: "", costo: "" });
      setCostoVariable1({ tipo: "", otro: "", monto: "" });
      setCostoVariable2(null);
      setUsandoNuevaCategoria(false);
      setNuevaCategoria("");
      }
      onClose();
    } catch (error) {
      console.error("Error al crear el producto", error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Agregar Producto</DialogTitle>
      <DialogContent>
      <TextField
    select
    label="Categoría"
    fullWidth
    value={usandoNuevaCategoria ? "nueva" : producto.categoria}
    onChange={(e) => {
      if (e.target.value === "nueva") {
        setUsandoNuevaCategoria(true);
        setProducto({ ...producto, categoria: "" });
      } else {
        setUsandoNuevaCategoria(false);
        setProducto({ ...producto, categoria: e.target.value });
      }
    }}
    sx={{ mb: 2 }}
  >
    {categoriasUnicas.map((cat) => (
      <MenuItem key={cat} value={cat}>
        {cat}
      </MenuItem>
    ))}
    <MenuItem value="nueva">
      + Nueva categoría
    </MenuItem>
  </TextField>

  {usandoNuevaCategoria && (
    <TextField
      label="Nueva categoría"
      fullWidth
      value={producto.categoria}
      onChange={(e) =>
        setProducto({ ...producto, categoria: e.target.value })
      }
      sx={{ mb: 2 }}
    />
  )}
        <TextField
          label="Modelo"
          fullWidth
          value={producto.nombre}
          onChange={(e) =>
            setProducto({ ...producto, nombre: e.target.value })
          }
          sx={{ mb: 2 }}
        />
  
 <TextField
          label="costo"
          fullWidth
          value={producto.costo}
          onChange={(e) =>
            setProducto({ ...producto, costo: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        {/* Costo Variable 1 */}
        {renderCostoVariable(
          costoVariable1,
          setCostoVariable1,
          "Costo Variable 1",
          costoVariable2 ? [costoVariable2.tipo] : []
        )}

        {/* Costo Variable 2 */}
        {costoVariable2 ? (
          renderCostoVariable(
            costoVariable2,
            setCostoVariable2,
            "Costo Variable 2",
            [costoVariable1.tipo],
            true
          )
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

        <Divider sx={{ my: 2 }} />

        {/* Resumen */}
        <Box sx={{ mb: 2 }}>
  <Typography variant="subtitle2">Resumen:</Typography>



  {[costoVariable1, costoVariable2].filter(Boolean).map((cv, idx) => {
    const opt = variableOptions.find((o) => o.value === cv.tipo);
    return (
      <Typography key={idx} sx={{ ml: 2 }}>
        {opt?.icon}{" "}
        <strong>
          {cv.tipo === "otro" ? `Otro: ${cv.otro}` : opt?.label}
        </strong>
        : ${cv.monto}
      </Typography>
    );
  })}

  <Divider sx={{ my: 1 }} />

  {(() => {
    const costoFijo = parseFloat(producto.costo) || 0;
    const precioVenta = parseFloat(producto.precio_venta) || 0;
    const costoVarTotal = [costoVariable1, costoVariable2]
      .filter(Boolean)
      .reduce((sum, cv) => sum + (parseFloat(cv.monto) || 0), 0);
    const costoTotal = costoFijo + costoVarTotal;
    const ganancia = precioVenta - costoTotal;

    return (
      <>
        <Typography sx={{ ml: 2 }}>
          <strong>Costo total:</strong> ${costoTotal.toFixed(2)}
        </Typography>

      </>
    );
  })()}
</Box>
</DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleGuardar}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAgregarProducto;
