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
  const [openCells, setOpenCells] = useState({}); // Para controlar la expansión de celdas en modo semanal
  const [selectedCurso, setSelectedCurso] = useState(''); // Filtro de curso
  const [selectedDia, setSelectedDia] = useState(''); // Filtro de día

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

  // Filtrar datos en base a los filtros seleccionados
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

  // Agrupar los datos por día y hora para el modo semanal
  const getDataByDayAndHour = () => {
    const groupedData = {};
    diasSemana.forEach((dia) => {
      groupedData[dia] = {};
      horarios.forEach((hora) => {
        groupedData[dia][hora] = filteredData.filter(
          (row) => row.dia === dia && row.hora === hora
        );
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
        <Button
          variant="contained"
          onClick={() => setModoSemanal((prev) => !prev)}
        >
          {modoSemanal ? 'Cambiar a modo detallado' : 'Cambiar a modo semanal'}
        </Button>
      </Box>

      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Filtro de id_curso */}
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

        {/* Filtro de día */}
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

      {/* Tabla en modo detallado */}
      {!modoSemanal && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Taller</TableCell>
                <TableCell>Día</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Cantidad de Kids</TableCell>
                <TableCell>Nombres</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.nombre_curso}</TableCell>
                  <TableCell>{row.dia}</TableCell>
                  <TableCell>{row.hora}</TableCell>
                  <TableCell>{row.cantidad_kids}</TableCell>
                  <TableCell>{row.nombres_kids}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Tabla en modo semanal */}
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
                          <Typography>
                            Cantidad: {data.length > 0 ? data[0].cantidad_kids : 0}
                          </Typography>
                          <IconButton size="small" onClick={() => toggleCell(dia, hora)}>
                            {openCells[key] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                          <Collapse in={openCells[key]}>
                            <Box>
                              {data.length > 0
                                ? data[0].nombres_kids
                                : 'Sin inscriptos'}
                            </Box>
                          </Collapse>
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
