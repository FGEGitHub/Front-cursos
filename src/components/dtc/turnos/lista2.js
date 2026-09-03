import * as React from "react";
import { useState, useEffect } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Card,
  CardContent,
  Grid
} from "@mui/material";

import Asignar from "./Asignarusuarioaoficio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import serviciodtc from "../../../services/dtc";
import Nuevo from "./nuevo";
import EstadisticasFuero from "./estadoficiosfuero";

export default function OficiosTable() {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [oficios, setOficios] = useState([]);
  const [filteredOficios, setFilteredOficios] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOficio, setSelectedOficio] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [oficioToDelete, setOficioToDelete] = useState(null);

  const [confirmDeleteExp, setConfirmDeleteExp] = useState(false);
  const [expedienteToDelete, setExpedienteToDelete] = useState(null);

  const [selectedFuero, setSelectedFuero] = useState("ALL");
  const [selectedYear, setSelectedYear] = useState("ALL");

  // NUEVO FILTRO DE INTERVENCIÓN
  const [selectedIntervencion, setSelectedIntervencion] = useState("ALL");

  const [editedOficio, setEditedOficio] = useState({
    id: "",
    oficio: "",
    expediente: "",
    juzgado: "",
    causa: "",
    solicitud: "",
    fecha: "",
    fuero: "",
    intervencion: []
  });


  // =====================================================
  // AÑOS
  // =====================================================

  const years = React.useMemo(() => {

    const yearsSet = new Set(
      oficios
        .filter(o => o.fecha)
        .map(o => o.fecha.substring(0, 4))
    );

    return Array.from(yearsSet).sort(
      (a, b) => b - a
    );

  }, [oficios]);


  // =====================================================
  // FUEROS
  // =====================================================

  const fueros = React.useMemo(() => {

    const setFueros = new Set(
      oficios
        .map(o => o.fuero)
        .filter(f => f)
    );

    return Array.from(setFueros);

  }, [oficios]);


  // =====================================================
  // INTERVENCIONES DISPONIBLES
  // =====================================================

  const intervenciones = React.useMemo(() => {
  const todas = [];

  oficios.forEach((oficio) => {
    const lista = oficio.intervenciones || [];

    lista.forEach((intervencion) => {
      if (
        intervencion &&
        !todas.includes(intervencion)
      ) {
        todas.push(intervencion);
      }
    });
  });

  return todas;
}, [oficios]);


  // =====================================================
  // ESTADÍSTICAS DE INTERVENCIÓN
  // =====================================================

  const estadisticasIntervencion = React.useMemo(() => {

    const conteo = {};

    oficios.forEach((oficio) => {

      const lista = Array.isArray(oficio.intervencion)
        ? oficio.intervencion
        : [];

      lista.forEach((intervencion) => {

        if (!intervencion) return;

        conteo[intervencion] =
          (conteo[intervencion] || 0) + 1;

      });

    });

    return conteo;

  }, [oficios]);


  // =====================================================
  // TOTAL DE OFICIOS
  // =====================================================

  const totalOficios = oficios.length;


  // =====================================================
  // RESUMEN POR AÑO
  // =====================================================

  const resumenPorAnio = React.useMemo(() => {

    const conteo = {};

    oficios.forEach((o) => {

      if (!o.fecha) return;

      const anio = o.fecha.substring(0, 4);

      conteo[anio] =
        (conteo[anio] || 0) + 1;

    });

    return Object.entries(conteo)
      .sort((a, b) => b[0] - a[0])
      .map(([anio, cantidad]) => ({
        anio,
        cantidad
      }));

  }, [oficios]);


  // =====================================================
  // TRAER OFICIOS
  // =====================================================

  useEffect(() => {
    traerOficios();
  }, []);


  // =====================================================
  // CONVERTIR INTERVENCION JSON -> ARRAY
  // =====================================================
const procesarOficio = (oficio) => {
  let intervenciones = [];
console.log("Procesando oficio:", oficio);
  const valor = oficio.intervencion;

  if (Array.isArray(valor)) {
    intervenciones = valor;
  } else if (typeof valor == "string") {
    const texto = valor.trim();

    if (texto) {
      try {
        const parsed = JSON.parse(texto);

        if (Array.isArray(parsed)) {
          intervenciones = parsed;
        } else if (parsed) {
          intervenciones = [String(parsed)];
        }
      } catch (error) {
        intervenciones = [texto];
      }
    }
  }

  return {
    ...oficio,
    intervenciones: intervenciones.filter(Boolean),
    expedientes: Array.isArray(oficio.expedientes)
      ? oficio.expedientes
      : []
  };
};


  // =====================================================
  // FILTRADO
  // =====================================================

  useEffect(() => {

    const filtered = oficios.filter((oficio) => {

      // -------------------------
      // BUSCADOR
      // -------------------------

      const combinedFields = `
        ${oficio.fecha || ""}
        ${oficio.oficio || ""}
        ${oficio.juzgado || ""}
        ${oficio.expediente || ""}
        ${oficio.causa || ""}
        ${oficio.fuero || ""}
        ${oficio.intervencion || ""}
      `.toLowerCase();

      const matchesSearch =
        combinedFields.includes(
          searchTerm.toLowerCase()
        );


      // -------------------------
      // AÑO
      // -------------------------

      const matchesYear =
        selectedYear === "ALL" ||
        (
          oficio.fecha &&
          oficio.fecha.startsWith(selectedYear)
        );


      // -------------------------
      // FUERO
      // -------------------------

      const matchesFuero =
        selectedFuero === "ALL" ||
        oficio.fuero === selectedFuero;


      // -------------------------
      // INTERVENCIÓN
      // -------------------------

      const listaIntervenciones =
        Array.isArray(oficio.intervencion)
          ? oficio.intervencion
          : [];


      const matchesIntervencion =
        selectedIntervencion === "ALL" ||
        listaIntervenciones.includes(
          selectedIntervencion
        );


      return (
        matchesSearch &&
        matchesYear &&
        matchesFuero &&
        matchesIntervencion
      );

    });

    setFilteredOficios(filtered);

  }, [
    searchTerm,
    selectedYear,
    selectedFuero,
    selectedIntervencion,
    oficios
  ]);


  // =====================================================
  // TRAER DATOS
  // =====================================================
const traerOficios = async () => {
  try {
    const data = await serviciodtc.traaeroficios();

    console.log("DATOS CRUDOS:", data[0]);

    const procesados = (data[0] || []).map(
      procesarOficio
    );

    console.log(
      "DATOS PROCESADOS:",
      procesados.map((o) => ({
        id: o.id,
        original: o.intervencion,
        intervenciones: o.intervenciones
      }))
    );

    setOficios(procesados);
    setFilteredOficios(procesados);

  } catch (error) {
    console.error(
      "Error al traer oficios:",
      error
    );
  }
};
  // =====================================================
  // BORRAR EXPEDIENTE
  // =====================================================

  const handleDeleteExpediente = (id) => {

    setExpedienteToDelete(id);
    setConfirmDeleteExp(true);

  };


  const confirmDeleteExpediente = async () => {

    try {

      await serviciodtc.borrarexpediente(
        expedienteToDelete
      );

      traerOficios();

      setConfirmDeleteExp(false);
      setExpedienteToDelete(null);

    } catch (error) {

      console.error(
        "Error al borrar expediente:",
        error
      );

      alert(
        "No se pudo borrar el expediente."
      );

    }

  };


  // =====================================================
  // ARCHIVOS
  // =====================================================

  const handleFileChange = (event) => {

    setSelectedFile(
      event.target.files[0]
    );

  };


  const handleUpload = async (
    oficioId,
    fechaOficio
  ) => {

    if (!selectedFile) {
      return alert(
        "Selecciona un archivo"
      );
    }

    const formData = new FormData();

    formData.append(
      "archivo",
      selectedFile
    );

    formData.append(
      "id_oficio",
      oficioId
    );

    formData.append(
      "fecha",
      fechaOficio
    );

    await serviciodtc.subirExpediente(
      formData
    );

    setSelectedFile(null);
    setSelectedOficio(null);

    traerOficios();

  };


  // =====================================================
  // VER EXPEDIENTE
  // =====================================================

  const handleVerExpediente = async (
    idExpediente
  ) => {

    try {

      const response =
        await serviciodtc.obtenerExpediente(
          idExpediente
        );

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf"
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 5000);

    } catch (error) {

      console.error(
        "Error al obtener el expediente:",
        error
      );

      alert(
        "No se pudo abrir el expediente."
      );

    }

  };


  // =====================================================
  // MODIFICAR
  // =====================================================

  const handleOpenModal = (oficio) => {

    setEditedOficio({

      id: oficio.id,

      oficio:
        oficio.oficio || "",

      expediente:
        oficio.expediente || "",

      juzgado:
        oficio.juzgado || "",

      causa:
        oficio.causa || "",

      solicitud:
        oficio.solicitud || "",

      fecha:
        oficio.fecha || "",

      fuero:
        oficio.fuero || "",

      intervencion:
        oficio.intervencion || []

    });

    setModalOpen(true);

  };


  const handleChange = (e) => {

    setEditedOficio({
      ...editedOficio,
      [e.target.name]:
        e.target.value
    });

  };


  const handleUpdateOficio = async () => {

    try {

      await serviciodtc.actualizarOficio(
        editedOficio
      );

      traerOficios();

      setModalOpen(false);

    } catch (error) {

      console.error(
        "Error al actualizar el oficio:",
        error
      );

      alert(
        "No se pudo actualizar el oficio."
      );

    }

  };


  // =====================================================
  // BORRAR OFICIO
  // =====================================================

  const handleDeleteOficio = (id) => {

    setOficioToDelete(id);
    setConfirmDelete(true);

  };


  const confirmDeleteOficio = async () => {

    try {

      await serviciodtc.borraroficio(
        oficioToDelete
      );

      traerOficios();

      setConfirmDelete(false);
      setOficioToDelete(null);

    } catch (error) {

      console.error(
        "Error al borrar el oficio:",
        error
      );

      alert(
        "No se pudo borrar el oficio."
      );

    }

  };


  // =====================================================
  // FILTRAR POR INTERVENCIÓN
  // =====================================================

  const filtrarIntervencion = (
    intervencion
  ) => {

    if (
      selectedIntervencion === intervencion
    ) {

      setSelectedIntervencion("ALL");

    } else {

      setSelectedIntervencion(
        intervencion
      );

    }

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <Paper sx={{ padding: 2 }}>

      {/* =================================================
          ESTADÍSTICA DE FUERO
      ================================================== */}

      <EstadisticasFuero
        oficios={oficios}
      />


      {/* =================================================
          ESTADÍSTICAS DE INTERVENCIÓN
      ================================================== */}

      <Paper
        sx={{
          mb: 2,
          p: 2
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          Estadísticas por intervención
        </Typography>


        <Grid
          container
          spacing={2}
        >

          {/* TOTAL */}

          <Grid item xs={12} sm={6} md={2}>

            <Card
              sx={{
                cursor: "pointer",
                height: "100%"
              }}
              onClick={() =>
                setSelectedIntervencion("ALL")
              }
            >

              <CardContent>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Total
                </Typography>

                <Typography
                  variant="h4"
                >
                  {totalOficios}
                </Typography>

                <Typography
                  variant="body2"
                >
                  Oficios
                </Typography>

              </CardContent>

            </Card>

          </Grid>


          {/* INTERVENCIONES */}

          {intervenciones.map(
            (intervencion) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={2}
                key={intervencion}
              >

                <Card
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    border:
                      selectedIntervencion ===
                      intervencion
                        ? "3px solid"
                        : "1px solid #ddd"
                  }}
                  onClick={() =>
                    filtrarIntervencion(
                      intervencion
                    )
                  }
                >

                  <CardContent>

                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      {intervencion}
                    </Typography>

                    <Typography
                      variant="h4"
                    >
                      {
                        estadisticasIntervencion[
                          intervencion
                        ] || 0
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      intervenciones
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>

            )
          )}

        </Grid>


        {/* FILTRO ACTIVO */}

        {selectedIntervencion !== "ALL" && (

          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >

            <Typography>
              Filtrando por:
            </Typography>

            <Chip
              label={selectedIntervencion}
              color="primary"
              onDelete={() =>
                setSelectedIntervencion(
                  "ALL"
                )
              }
            />

          </Box>

        )}

      </Paper>


      {/* =================================================
          RESUMEN POR AÑO
      ================================================== */}

      <Paper
        sx={{
          mb: 2,
          p: 2
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          Resumen por año
        </Typography>

        <Table size="small">

          <TableHead>

            <TableRow>

              <TableCell>
                <strong>Año</strong>
              </TableCell>

              <TableCell>
                <strong>
                  Cantidad de oficios
                </strong>
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {resumenPorAnio.map(
              (row) => (

                <TableRow
                  key={row.anio}
                >

                  <TableCell>
                    {row.anio}
                  </TableCell>

                  <TableCell>
                    {row.cantidad}
                  </TableCell>

                </TableRow>

              )
            )}

          </TableBody>

        </Table>

      </Paper>


      {/* =================================================
          NUEVO
      ================================================== */}

      <Nuevo
        traer={traerOficios}
      />


      {/* =================================================
          BUSCADOR
      ================================================== */}

      <TextField
        fullWidth
        margin="dense"
        label="Buscar por fecha, oficio, juzgado, expediente, causa o intervención"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />


      {/* =================================================
          FILTRO AÑO
      ================================================== */}

      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 1
        }}
      >

        <Button
          variant={
            selectedYear === "ALL"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setSelectedYear("ALL")
          }
        >
          Todos
        </Button>


        {years.map((year) => (

          <Button
            key={year}
            variant={
              selectedYear === year
                ? "contained"
                : "outlined"
            }
            onClick={() =>
              setSelectedYear(year)
            }
          >
            {year}
          </Button>

        ))}

      </Box>


      {/* =================================================
          FILTRO FUERO
      ================================================== */}

      <FormControl
        size="small"
        sx={{
          minWidth: 200,
          mb: 2
        }}
      >

        <InputLabel>
          Fuero
        </InputLabel>

        <Select
          value={selectedFuero}
          label="Fuero"
          onChange={(e) =>
            setSelectedFuero(
              e.target.value
            )
          }
        >

          <MenuItem value="ALL">
            Todos
          </MenuItem>

          {fueros.map(
            (fuero) => (

              <MenuItem
                key={fuero}
                value={fuero}
              >
                {fuero}
              </MenuItem>

            )
          )}

        </Select>

      </FormControl>


      {/* =================================================
          FILTRO INTERVENCIÓN
      ================================================== */}

      <FormControl
        size="small"
        sx={{
          minWidth: 250,
          mb: 2,
          ml: 2
        }}
      >

        <InputLabel>
          Intervención
        </InputLabel>

        <Select
          value={selectedIntervencion}
          label="Intervención"
          onChange={(e) =>
            setSelectedIntervencion(
              e.target.value
            )
          }
        >

          <MenuItem value="ALL">
            Todas
          </MenuItem>

          {intervenciones.map(
            (intervencion) => (

              <MenuItem
                key={intervencion}
                value={intervencion}
              >
                {intervencion}
              </MenuItem>

            )
          )}

        </Select>

      </FormControl>


      {/* =================================================
          TABLA
      ================================================== */}

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                ID por año
              </TableCell>

              <TableCell>
                Fecha
              </TableCell>

              <TableCell>
                Personas/usuario
              </TableCell>

              <TableCell>
                Fuero
              </TableCell>

              <TableCell>
                Intervención
              </TableCell>

              <TableCell>
                A través de
              </TableCell>

              <TableCell>
                Juzgado-expte
              </TableCell>

              <TableCell>
                Causa
              </TableCell>

              <TableCell>
                Acciones
              </TableCell>

              <TableCell>
                Solicitud
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {filteredOficios.map(
              (oficio) => (

                <TableRow
                  key={oficio.id}
                >

                  {/* ID */}

                  <TableCell>
                    {oficio.id_anio}
                  </TableCell>


                  {/* FECHA */}

                  <TableCell>
                    {oficio.fecha}
                  </TableCell>


                  {/* USUARIO */}

                  <TableCell>

                    {oficio.nombre ? (

                      `${oficio.apellido} ${oficio.nombre}`

                    ) : (

                      <>
                        Sin enlazar{" "}

                        <Asignar
                          id_oficio={oficio.id}
                          traer={traerOficios}
                        />

                      </>

                    )}

                  </TableCell>


                  {/* FUERO */}

                  <TableCell>
                    {oficio.fuero}
                  </TableCell>


                  {/* INTERVENCIONES */}
<TableCell>
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 0.5,
      minWidth: 150
    }}
  >
    {(oficio.intervenciones || []).length > 0 ? (
      (oficio.intervenciones || []).map(
        (intervencion, index) => (
          <Chip
            key={`${intervencion}-${index}`}
            label={intervencion}
            size="small"
            color={
              selectedIntervencion === intervencion
                ? "primary"
                : "default"
            }
            onClick={() =>
              filtrarIntervencion(intervencion)
            }
          />
        )
      )
    ) : (
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Sin intervención
      </Typography>
    )}
  </Box>
</TableCell>


                  {/* OFICIO */}

                  <TableCell>
                    {oficio.oficio}
                  </TableCell>


                  {/* JUZGADO */}

                  <TableCell>

                    {oficio.juzgado}-
                    {oficio.expediente}

                  </TableCell>


                  {/* CAUSA */}

                  <TableCell>
                    {oficio.causa}
                  </TableCell>


                  {/* ACCIONES */}

                  <TableCell>

                    <Button
                      variant="outlined"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        mr: 1
                      }}
                      onClick={() =>
                        handleOpenModal(
                          oficio
                        )
                      }
                    >
                      Modificar
                    </Button>


                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleDeleteOficio(
                          oficio.id
                        )
                      }
                    >
                      Borrar
                    </Button>


                    {/* EXPEDIENTES */}

                    <Accordion
                      sx={{
                        mt: 1
                      }}
                    >

                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon />
                        }
                      >

                        <Typography>
                          Ver Expedientes
                        </Typography>

                      </AccordionSummary>


                      <AccordionDetails>

                      {(oficio.expedientes || []).length > 0 ? (

                          <Table size="small">

                            <TableHead>

                              <TableRow>

                                <TableCell>
                                  Fecha
                                </TableCell>

                                <TableCell>
                                  Acción
                                </TableCell>

                              </TableRow>

                            </TableHead>


                            <TableBody>

                             {(oficio.expedientes || []).map(
                                (exp) => (

                                  <TableRow
                                    key={exp.id}
                                  >

                                    <TableCell>
                                      {exp.nombre}
                                    </TableCell>

                                    <TableCell>

                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          handleVerExpediente(
                                            exp.id
                                          )
                                        }
                                        sx={{
                                          mr: 1
                                        }}
                                      >
                                        Ver
                                      </Button>


                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          handleDeleteExpediente(
                                            exp.id
                                          )
                                        }
                                      >
                                        Borrar
                                      </Button>

                                    </TableCell>

                                  </TableRow>

                                )
                              )}

                            </TableBody>

                          </Table>

                        ) : (

                          <Typography>
                            No hay expedientes
                          </Typography>

                        )}


                        <Button
                          variant="contained"
                          onClick={() =>
                            setSelectedOficio(
                              oficio.id
                            )
                          }
                        >
                          Agregar Expediente
                        </Button>


                        {selectedOficio ===
                          oficio.id && (

                          <div
                            style={{
                              marginTop: 10
                            }}
                          >

                            <input
                              type="file"
                              onChange={
                                handleFileChange
                              }
                              accept=".pdf"
                            />

                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                handleUpload(
                                  oficio.id,
                                  oficio.fecha
                                )
                              }
                              disabled={
                                !selectedFile
                              }
                            >
                              Subir
                            </Button>

                          </div>

                        )}

                      </AccordionDetails>

                    </Accordion>

                  </TableCell>


                  {/* SOLICITUD */}

                  <TableCell>
                    {oficio.solicitud}
                  </TableCell>

                </TableRow>

              )
            )}

          </TableBody>

        </Table>

      </TableContainer>


      {/* =================================================
          MODAL MODIFICAR
      ================================================== */}

      <Dialog
        open={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
      >

        <DialogTitle>
          Modificar Oficio
        </DialogTitle>


        <DialogContent>

          <TextField
            fullWidth
            margin="dense"
            label="Oficio"
            name="oficio"
            value={
              editedOficio.oficio
            }
            onChange={handleChange}
          />


          <TextField
            fullWidth
            margin="dense"
            label="Expediente"
            name="expediente"
            value={
              editedOficio.expediente
            }
            onChange={handleChange}
          />


          <TextField
            fullWidth
            margin="dense"
            label="Juzgado"
            name="juzgado"
            value={
              editedOficio.juzgado
            }
            onChange={handleChange}
          />


          <TextField
            fullWidth
            margin="dense"
            label="Causa"
            name="causa"
            value={
              editedOficio.causa
            }
            onChange={handleChange}
          />


          <TextField
            fullWidth
            margin="dense"
            label="Solicitud"
            name="solicitud"
            value={
              editedOficio.solicitud
            }
            onChange={handleChange}
          />


          <TextField
            fullWidth
            margin="dense"
            label="Fecha"
            type="date"
            name="fecha"
            value={
              editedOficio.fecha
            }
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />

        </DialogContent>


        <DialogActions>

          <Button
            onClick={() =>
              setModalOpen(false)
            }
            color="error"
          >
            Cancelar
          </Button>


          <Button
            onClick={
              handleUpdateOficio
            }
            color="primary"
            variant="contained"
          >
            Guardar Cambios
          </Button>

        </DialogActions>

      </Dialog>


      {/* =================================================
          CONFIRMAR BORRADO OFICIO
      ================================================== */}

      <Dialog
        open={confirmDelete}
        onClose={() =>
          setConfirmDelete(false)
        }
      >

        <DialogTitle>
          ¿Seguro que quieres borrar?
        </DialogTitle>

        <DialogActions>

          <Button
            onClick={() =>
              setConfirmDelete(false)
            }
          >
            Cancelar
          </Button>

          <Button
            onClick={
              confirmDeleteOficio
            }
            color="error"
            variant="contained"
          >
            Borrar
          </Button>

        </DialogActions>

      </Dialog>


      {/* =================================================
          CONFIRMAR BORRADO EXPEDIENTE
      ================================================== */}

      <Dialog
        open={confirmDeleteExp}
        onClose={() =>
          setConfirmDeleteExp(false)
        }
      >

        <DialogTitle>
          ¿Seguro que quieres borrar este expediente?
        </DialogTitle>

        <DialogActions>

          <Button
            onClick={() =>
              setConfirmDeleteExp(false)
            }
          >
            Cancelar
          </Button>

          <Button
            onClick={
              confirmDeleteExpediente
            }
            color="error"
            variant="contained"
          >
            Borrar
          </Button>

        </DialogActions>

      </Dialog>

    </Paper>
  );
}