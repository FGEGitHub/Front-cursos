import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogActions, InputLabel, NativeSelect, Typography } from "@mui/material";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import servicio from "../../../../services/dtc";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    fontWeight: "bold",
    borderRadius: "8px",
  },
});

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function CambiarEstadoPsico(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [estado, setEstado] = useState("Activo");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setEstado(event.target.value);
  };

  const handleGuardar = async () => {
    try {
      const data = {
        id: props.id, // ID de la persona a cambiar estado
        estado: estado,
      };
      const respuesta = await servicio.cambiarestadopsico(data);
      alert(respuesta.mensaje);
      if (props.traer) props.traer(); // refresca tabla si se pasa función
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al cambiar el estado");
    }
  };

  return (
    <Box>
      <Tooltip title="Cambiar estado del paciente">
        <Button variant="contained" className={classes.button} onClick={handleClickOpen}>
          Cambiar estado
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Cambiar estado del paciente
          </Typography>

          <InputLabel htmlFor="estado">
            <StyledParagraph>Seleccione nuevo estado:</StyledParagraph>
          </InputLabel>
          <NativeSelect
            value={estado}
            onChange={handleChange}
            inputProps={{ name: "estado", id: "estado" }}
            sx={{ width: 250 }}
          >
            <option value="Activo">Activo</option>
            <option value="Baja">Baja</option>
            <option value="Dejó">Dejó</option>
            <option value="Fallecido">Fallecido</option>
          </NativeSelect>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleGuardar}>
            Guardar
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
