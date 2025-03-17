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
import { useNavigate } from "react-router-dom";
import servicioDtc from '../../../services/dtc';
import Agregar from './modalagregar'
import Info from './modalinformacion'
const CursoDialog = () => {
  const [cursosData, setCursosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modoSemanal, setModoSemanal] = useState(false); // Controla el modo semanal
  const [openRows, setOpenRows] = useState({}); // Controla la expansión de las filas
  const [selectedCurso, setSelectedCurso] = useState(''); // Filtro de curso
  const [selectedDia, setSelectedDia] = useState(''); // Filtro de día
  const [openCells, setOpenCells] = useState({}); // Para controlar la expansión de celdas en modo semanal
  const navigate = useNavigate();
  const horarios = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30']; // Nuevos horarios agregados

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
      if (selectedCurso.startsWith("FISICO")) {
        data = data.filter((row) => {
          return (
            row.nombre_curso === "FISICO" &&
            (
              (selectedCurso === "FISICO - Gimnasio" && row.hora === "14:30") ||
              (selectedCurso === "FISICO - Fútbol masculino" && row.hora === "15:30" && ["lunes", "miércoles", "viernes"].includes(row.dia)) ||
              (selectedCurso === "FISICO - Fútbol femenino" && row.hora === "16:30" && ["lunes", "miércoles", "viernes"].includes(row.dia)) ||
              (selectedCurso === "FISICO - Vóley masculino" && row.hora === "16:30" && row.dia === "martes") ||
              (selectedCurso === "FISICO - Vóley femenino" && row.hora === "15:30" && row.dia === "martes") ||
              (selectedCurso === "FISICO - Básquet masculino" && row.hora === "16:30" && row.dia === "jueves") ||
              (selectedCurso === "FISICO - Básquet femenino" && row.hora === "15:30" && row.dia === "jueves")
            )
          );
        });
      } else {
        data = data.filter((row) => row.nombre_curso === selectedCurso);
      }
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
      <Info/>
      {/*<Chat/>  Botón para cambiar entre los modos */}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setModoSemanal((prev) => !prev)}>
          {modoSemanal ? 'Cambiar a modo detallado' : 'Cambiar a modo semanal'}
        </Button>
      </Box>

      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <FormControl sx={{ minWidth: 200 }}>
  <InputLabel>Curso</InputLabel>
  <Select value={selectedCurso} onChange={(e) => setSelectedCurso(e.target.value)}>
    <MenuItem value="">
      <em>Todos los cursos</em>
    </MenuItem>
    {Array.from(new Set(cursosData.map((curso) => curso.nombre_curso)))
      .map((nombreCurso) => (
        <MenuItem key={nombreCurso} value={nombreCurso}>
          {nombreCurso}
        </MenuItem>
      ))}
    
    {/* Opciones detalladas para FISICO */}
    <MenuItem value="FISICO - Gimnasio">FISICO - Gimnasio</MenuItem>
    <MenuItem value="FISICO - Fútbol masculino">FISICO - Fútbol masculino</MenuItem>
    <MenuItem value="FISICO - Fútbol femenino">FISICO - Fútbol femenino</MenuItem>
    <MenuItem value="FISICO - Vóley masculino">FISICO - Vóley masculino</MenuItem>
    <MenuItem value="FISICO - Vóley femenino">FISICO - Vóley femenino</MenuItem>
    <MenuItem value="FISICO - Básquet masculino">FISICO - Básquet masculino</MenuItem>
    <MenuItem value="FISICO - Básquet femenino">FISICO - Básquet femenino</MenuItem>
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
    {diasSemana
      .filter((dia) => cursosData !== 307 || dia !== "miércoles") // Filtra "miércoles" si cursosData es 307
      .map((dia) => (
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
              <TableRow >
                <TableCell>Taller</TableCell>
                <TableCell>Día</TableCell>
     
                <TableCell>Cantidad de inscriptos</TableCell>
         
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredData
    .filter((row) => !(row.id_curso === 307 && row.dia === "miércoles")) // Filtrar solo miércoles para curso 307
    .map((row, index) => (
      <React.Fragment key={index}>
        <TableRow
          key={index}
          sx={{ backgroundColor: index % 2 === 0 ? "#e0e0e0" : "#e0e0e0" }}
        >
          <TableCell>
            <div
              onClick={() => navigate("/dtc/usuario1/taller/" + row.id_curso)}
              style={{ cursor: "pointer" }}
            >
              <b>
                {row.nombre_curso}
                {row.nombre_curso === "FISICO" && (
                  <div>
                    {row.hora === "14:30" && "FISICO - Gimnasio"}
                    {row.hora === "15:30" &&
                      ["lunes", "miércoles", "viernes"].includes(row.dia) &&
                      "FISICO - Fútbol masculino"}
                    {row.hora === "15:30" &&
                      row.dia === "martes" &&
                      "FISICO - Vóley femenino"}
                    {row.hora === "15:30" &&
                      row.dia === "jueves" &&
                      "FISICO - Básquet femenino"}
                    {row.hora === "16:30" &&
                      ["lunes", "miércoles", "viernes"].includes(row.dia) &&
                      "FISICO - Fútbol femenino"}
                    {row.hora === "16:30" &&
                      row.dia === "martes" &&
                      "FISICO - Vóley masculino"}
                    {row.hora === "16:30" &&
                      row.dia === "jueves" &&
                      "FISICO - Básquet masculino"}
                  </div>
                )}
              </b>
            </div>
          </TableCell>
          <TableCell>
            <b>
              {row.dia}-{row.hora} hs
            </b>
          </TableCell>
          <TableCell>
            <b>
              Cantidad:{" "}
              <span
                style={{
                  color:
                    row.cantidad_kids < 8
                      ? "green"
                      : row.cantidad_kids >= 8 && row.cantidad_kids <= 20
                      ? "orange"
                      : "red",
                }}
              >
                {row.cantidad_kids}
              </span>
            </b>
          </TableCell>
        </TableRow>
        <TableRow
          key={`extra-${index}`}
          sx={{ backgroundColor: index % 2 === 0 ? "#e0e0e0" : "#e0e0e0" }}
        >
          <TableCell colSpan={5} style={{ padding: 0 }}>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Nombres: {row.nombres_kids || ""}
                {row.cantidad_kids > 20 &&
                row.nombre_curso !== "FISICO" &&
                row.nombre_curso !== "merienda" ? (
                  <></>
                ) : (
                  <Agregar
                    id={row.id_curso}
                    nombre_curso={row.nombre_curso}
                    dia={row.dia}
                    hora={row.hora}
                    traer={async () => {
                      try {
                        const response =
                          await servicioDtc.obtenerinfodecursostodos();
                        setCursosData(response);
                        setFilteredData(response);
                      } catch (error) {
                        console.error("Error al obtener datos del curso:", error);
                      }
                    }}
                  />
                )}
              </Typography>
            </Box>
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
