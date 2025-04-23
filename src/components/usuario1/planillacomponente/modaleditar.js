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

    const rta= await serviciousuario1.modificarmovimiento(datos)
    alert(rta)
   // modificarProducto(datos, serviiousuario1); // Enviamos el objeto completo, con id
  };

  return (
    <div>
      {registro ? (
        <div>
             <TextField
      label="Fecha"
      type="date"
      value={datos.fecha}
      onChange={(e) => setDatos({ ...datos, fecha: e.target.value })}
      fullWidth
    />
 
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
