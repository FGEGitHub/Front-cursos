import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

const ModalFormulario = ({ registro, modificarProducto, serviciousuario1 }) => {
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

  const handleGuardar = async () => {

    const rta= await serviciousuario1.modificarproductoesme(datos)
    alert(rta)
   // modificarProducto(datos, serviiousuario1); // Enviamos el objeto completo, con id
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
              InputProps={{
                readOnly: key === "id", // Solo lectura si es el campo 'id'
              }}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleGuardar}
          >
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
