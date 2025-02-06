import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Card, CardContent, Typography } from "@mui/material";
import serviciodtc from '../../../services/dtc';
import { useParams } from "react-router-dom";

const ClassDataTable = () => {
  let params = useParams();
  let hora = params.id;

  const [tableData, setTableData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      traer();
      setIsFetched(true);
    }
  }, [hora]);

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      const requestData = { hora, id_taller: usuario.id };

      console.log("Enviando solicitud con datos:", requestData);

      try {
        const response = await serviciodtc.traerdatosdeclasehorausuario(requestData);
        if (Array.isArray(response)) {
          setTableData(response[0] || []); // Datos de la clase
          setClassDetails(response[1] || []); // Lista de alumnos
        }
      } catch (error) {
        console.error("Error al traer los datos:", error);
      }
    }
  };

  // Manejo del cambio en el checkbox
  const handleCheckboxChange = async (id_chico, checked) => {
    if (tableData.length === 0) return;
    

    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      await serviciodtc.ponerpresenteclase({ hora, id_usuario: id_chico,id_tallerista:JSON.parse(loggedUserJSON).id });

      // Actualizar el estado para reflejar el cambio en la UI
      setClassDetails(prevDetails =>
        prevDetails.map(row =>
          row.id_chico === id_chico ? { ...row, presente: checked ? "Presente" : "Ausente" } : row
        )
      );
    } catch (error) {
      console.error("Error al actualizar la asistencia:", error);
    }
  };

  return (
    <div>
      {tableData.length > 0 && (
        <Card variant="outlined" style={{ marginBottom: "20px", padding: "10px" }}>
          <CardContent>
            <Typography variant="h6">{tableData[0].titulo || "Clase sin título"}</Typography>
            <Typography variant="body1">Fecha: {tableData[0].fecha}</Typography>
            <Typography variant="body1">Día: {tableData[0].dia}</Typography>
            <Typography variant="body1">Hora: {tableData[0].hora}</Typography>
          </CardContent>
        </Card>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Presente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classDetails.length > 0 &&
              classDetails.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.apellido}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.presente === "Presente"}
                      onChange={(e) => handleCheckboxChange(row.id_chico, e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClassDataTable;
