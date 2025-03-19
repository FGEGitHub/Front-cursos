import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

const ModalFormulario = ({ registro }) => {
  const [datos, setDatos] = useState({});

  useEffect(() => {
    if (registro) {
      setDatos(registro);
    }
  }, [registro]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {registro ? (
        <div>
          {Object.keys(registro).map((key) => (
            <TextField
              key={key}
              label={key}
              name={key}
              value={datos[key] || ""}
              onChange={manejarCambio}
              fullWidth
              margin="dense"
            />
          ))}
          <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
            Guardar Cambios
          </Button>
        </div>
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default ModalFormulario;
