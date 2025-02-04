import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

const MobileNavigation = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" gap={2} p={2} bgcolor="grey.100">
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={() => navigate("/dtc/alumnosdeltaller")}
      >
        Ver Inscriptos
      </Button>
      <Button
        variant="contained"
        color="success"
        size="large"
        fullWidth
        onClick={() => navigate("/dtc/tallerclases")}
      >
        Ir a Asistencia
      </Button>
    </Box>
  );
};

export default MobileNavigation;
