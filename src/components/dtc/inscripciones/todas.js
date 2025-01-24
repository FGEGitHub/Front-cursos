import React, { useState, useEffect } from 'react';
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
  Collapse,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import servicioDtc from '../../../services/dtc';

const CursoDialog = () => {
  const [cursosData, setCursosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modoSemanal, setModoSemanal] = useState(false); // Controla el modo semanal
  const [openRows, setOpenRows] = useState({}); // Controla la expansión de las filas
  const [selectedCurso, setSelectedCurso] = useState(''); // Filtro de curso
  const [selectedDia, setSelectedDia] = useState(''); // Filtro de día
  const [openCells, setOpenCells] = useState({}); // Para controlar la expansión de celdas en modo semanal

  const horarios = ['14', '15', '16'];
  const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await servicioDtc.obtenerinfodecursostodos();
        setCursosData(response);
        setFilteredData(response);
      } catch (error) {
        console.error('Error al obtener datos del curso:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let data = cursosData;
    if (selectedCurso) {
      data = data.filter((row) => row.id_curso === Number(selectedCurso));
    }
    if (selectedDia) {
      data = data.filter((row) => row.dia === selectedDia);
    }
    setFilteredData(data);
  }, [selectedCurso, selectedDia, cursosData]);

  const toggleRow = (index) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Agrupar los datos por día y hora para el modo semanal
  const getDataByDayAndHour = () => {
    const groupedData = {};
    diasSemana.forEach((dia) => {
      groupedData[dia] = {};
      horarios.forEach((hora) => {
        // Agrupamos los datos por día y hora
        const data = filteredData.filter((row) => row.dia == dia && row.hora == hora);
  
        // Creamos una lista con el nombre del curso y la cantidad de chicos
        const courses = data.map((row) => ({
          nombreCurso: row.nombre_curso,
          cantidadChicos: row.cantidad_kids,
        }));
  
        groupedData[dia][hora] = courses;
      });
    });
    return groupedData;
  };

  const toggleCell = (dia, hora) => {
    const key = `${dia}-${hora}`;
    setOpenCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      {/* Botón para cambiar entre los modos */}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setModoSemanal((prev) => !prev)}>
          {modoSemanal ? 'Cambiar a modo detallado' : 'Cambiar a modo semanal'}
        </Button>
      </Box>

      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Curso</InputLabel>
          <Select
            value={selectedCurso}
            onChange={(e) => setSelectedCurso(e.target.value)}
          >
            <MenuItem value="">
              <em>Todos los cursos</em>
            </MenuItem>
            {[...new Set(cursosData.map((row) => row.id_curso))].map((idCurso) => (
              <MenuItem key={idCurso} value={idCurso}>
                Curso {idCurso}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Día</InputLabel>
          <Select
            value={selectedDia}
            onChange={(e) => setSelectedDia(e.target.value)}
          >
            <MenuItem value="">
              <em>Todos los días</em>
            </MenuItem>
            {diasSemana.map((dia) => (
              <MenuItem key={dia} value={dia}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Tabla detallada */}
      {!modoSemanal && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Taller</TableCell>
                <TableCell>Día</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Cantidad de Kids</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{row.nombre_curso}</TableCell>
                    <TableCell>{row.dia}</TableCell>
                    <TableCell>{row.hora}</TableCell>
                    <TableCell>{row.cantidad_kids}</TableCell>
                    <TableCell>
                      <Button onClick={() => toggleRow(index)} variant="outlined">
                        {openRows[index] ? 'Ocultar' : 'Ver'}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} style={{ padding: 0 }}>
                      <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Nombres: {row.nombres_kids || 'Sin información'}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modo semanal */}
      {modoSemanal && (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Hora</TableCell>
          {diasSemana.map((dia) => (
            <TableCell key={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {horarios.map((hora) => (
          <TableRow key={hora}>
            <TableCell>{hora}:00</TableCell>
            {diasSemana.map((dia) => {
              const key = `${dia}-${hora}`;
              const data = getDataByDayAndHour()[dia][hora];

              return (
                <TableCell key={key}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {data.length > 0 ? (
                      data.map((course, index) => (
                        <Typography key={index}>
                          <b>{course.nombreCurso}</b>: {course.cantidadChicos} chico(s)
                        </Typography>
                      ))
                    ) : (
                      <Typography>Sin inscriptos</Typography>
                    )}
                  </Box>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}
    </div>
  );
};

export default CursoDialog;
