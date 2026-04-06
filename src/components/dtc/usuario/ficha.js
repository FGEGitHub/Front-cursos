import React, { useEffect, useState, Fragment } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Avatar
} from "@mui/material";
import { useParams } from "react-router-dom";
import servicioDtc from "../../../services/dtc";
import Modificar from './modificar'//boton dialogo
import Modalperfil from './modaldeperfil'//boton dialogo
import Borrarusuaio from "./modalborrarusuario"//boton dialogo
import Vinculos from './modalvinculos'//componente, tabl
import Borrarhorarios from './eliminarhorairos'
import Agregarcurso from './modalinscribir'//boton dialogo
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const FichaPersona = (props) => {
  let params = useParams();
  let id = params.id;
  const [usuario, setUsuario] = useState()
  const [chico, setchico] = useState();
  const [foto, setfoto] = useState();
  const [turnos, setTurnos] = useState();
  const [horario, setHorario] = useState()
  const diasOrdenados = ["lunes", "martes", "miércoles", "jueves", "viernes"];
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [orden, setOrden] = useState({ columna: null, asc: true });
  const [vinculos, setVinculos] = useState()
  useEffect(() => {
    traer();
  }, []);
  const ordenarDatos = (a, b) => {
    const indiceA = diasOrdenados.indexOf(a.dia);
    const indiceB = diasOrdenados.indexOf(b.dia);
    return indiceA - indiceB;
  };
  const ordenarPor = (columna) => {
    const esAsc = orden.columna === columna ? !orden.asc : true;
    setOrden({ columna, asc: esAsc });
  };


  const traer = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON)
        setUsuario(usuario)

        const novedades_aux = await servicioDtc.datosdechique(
          id == undefined ? props.id : id
        )

        setfoto(novedades_aux[1])
        setchico(novedades_aux[0][0])
        setVinculos(novedades_aux[2])
        setHorario(novedades_aux[3])
        setTurnos(novedades_aux[4]) // 👈 ACA
        setForm(novedades_aux[0][0]);
      }
    } catch (error) { }
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardarCambios = async () => {
    try {
      const res = await servicioDtc.modificarusuario({
        ...form,
        id: chico.id
      });

      alert(res);
      setEditando(false);
      traer(); // refresca datos
    } catch (error) {
      console.log(error);
      alert("Error al guardar");
    }
  };
  const eliminarHorario = async (ido) => {
    try {

      const novedades_aux = await servicioDtc.eliminarhorario({ id: ido })
      alert(novedades_aux)
      traer()
    } catch (error) {

    }

  }
 const Campo = ({ label, name, xs = 3 }) => (
  <Grid item xs={xs}>
    <TextField
      label={label}
      name={name}
      value={form[name] ?? ""}
      onChange={handleChange}
      fullWidth
      size="small"
      InputProps={{ readOnly: !editando }}
    />
  </Grid>
);
  return (
    <>
      {chico ? (
        <Card sx={{ maxWidth: 1200, margin: "auto", mt: 4 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            {!editando ? (
              <button onClick={() => setEditando(true)}>
                ✏️ Editar
              </button>
            ) : (
              <>
                <button onClick={guardarCambios}>
                  💾 Guardar
                </button>
                <button onClick={() => {
                  setEditando(false);
                  setForm(chico); // vuelve a los datos originales
                }}>
                  ❌ Cancelar
                </button>
              </>
            )}
          </div>
          {/* FOTO */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Avatar sx={{ width: 150, height: 150 }}>
              {foto ? (
                <img
                  src={`data:image/jpeg;base64,${foto}`}
                  width="150"
                  height="150"
                />
              ) : (
                "Sin foto"
              )}
            </Avatar>
          </Grid>

          <CardContent>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              {chico.apellido} {chico.nombre}
            </Typography>

           <Grid container spacing={2}>

  {/* DATOS PERSONALES */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      DATOS PERSONALES
    </div>
  </Grid>

  <Campo label="DNI" name="dni" />
  <Campo label="Sexo" name="sexo" />
  <Campo label="Estado civil" name="estadocivil" />
  <Campo label="Nacimiento" name="fecha_nacimiento" />
  <Campo label="País" name="pais" />
  <Campo label="Provincia" name="provincia" />
  <Campo label="Situación habitacional" name="situacion_habitacional" />

  {/* CONTACTO */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      CONTACTO
    </div>
  </Grid>

  <Campo label="Teléfono" name="telefono" />
  <Campo label="Tel. responsable" name="tel_responsable" />
  <Campo label="Domicilio" name="domicilio" />
  <Campo label="Barrio" name="barrio" />

  {/* PRIMER CONTACTO */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      PRIMER CONTACTO
    </div>
  </Grid>

  <Campo label="Primer contacto" name="primer_contacto" />
  <Campo label="Presentación" name="presentacion_dispositivo" />
  <Campo label="Modo acceso" name="modo_acceso" />
  <Campo label="Institución" name="cual_institucion" />
  <Campo label="Se articuló" name="se_articulo" />

  <Grid item xs={6}>
    <TextField
      label="Motivo consulta"
      name="motivo_consulta"
      value={form.motivo_consulta ?? ""}
      onChange={handleChange}
      fullWidth
      size="small"
      InputProps={{ readOnly: !editando }}
    />
  </Grid>

  {/* RELACIONES */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      RELACIONES
    </div>
  </Grid>

  <Campo label="Tiene hijos" name="hijos" />
  <Campo label="Cantidad hijos" name="cantidad_hijos" />
  <Campo label="Con quién vive" name="con_quien_vive" xs={6} />

  {/* EDUCACIÓN */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      EDUCACIÓN
    </div>
  </Grid>

  <Campo label="Sabe leer" name="sabe_leer" />
  <Campo label="Asistencia colegio" name="asistencia_colegio" />
  <Campo label="Nivel educativo" name="nivel_educativo" />
  <Campo label="Completó nivel" name="completo_nivel" />
  <Campo label="Asiste institución" name="asiste_institucion" />

  {/* TRABAJO */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      TRABAJO
    </div>
  </Grid>

  <Campo label="Situación laboral" name="situacion_laboral" />
  <Campo label="Modalidad" name="modalidad_trabajo" />
  <Campo label="Busca trabajo" name="busca_trabajo" />

  <Grid item xs={6}>
    <TextField
      label="Beneficios"
      name="beneficiario"
      value={form.beneficiario ?? ""}
      onChange={handleChange}
      fullWidth
      size="small"
      InputProps={{ readOnly: !editando }}
    />
  </Grid>

  {/* SALUD */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      SALUD
    </div>
  </Grid>

  <Campo label="Obra social" name="obra_social" />
  <Campo label="Cuál" name="obra_social_cual" />

  {/* DISCAPACIDAD */}
  <Grid item xs={12}>
    <div style={{ background: "#2e7d32", color: "white", padding: "8px", borderRadius: "5px" }}>
      DISCAPACIDAD
    </div>
  </Grid>

  <Grid item xs={4}>
    <TextField
      label="Discapacidad"
      name="discapacidad"
      value={form.discapacidad ?? ""}
      onChange={handleChange}
      fullWidth
      size="small"
      InputProps={{ readOnly: !editando }}
    />
  </Grid>

  <Campo label="Otra" name="discapacidad_otro" />
  <Campo label="CUD" name="cud" />
  <Campo label="Tratamiento" name="tratamiento_cud" xs={6} />

</Grid>
          </CardContent>
          {chico && (
            <Fragment>
              {usuario ? <>
                {(usuario.nivel == 20 || usuario.nivel == 28) ? <>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Agregarcurso
                      traer={async () => {
                        try {
                          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                          if (loggedUserJSON) {
                            const usuario = JSON.parse(loggedUserJSON)
                            setUsuario(usuario)
                            const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
                            setfoto(novedades_aux[1])
                            setchico(novedades_aux[0][0])
                            setVinculos(novedades_aux[2])
                            setHorario(novedades_aux[3])
                          }
                        } catch (error) { }
                      }}
                    />
                    <Borrarusuaio id={chico.id} />
                    <Modificar
                      id={chico.id}
                      nombre={chico.nombre}
                      apellido={chico.apellido}
                      fecha_nacimiento={chico.fecha_nacimiento}
                      observaciones={chico.observaciones}
                      primer_contacto={chico.primer_contacto}
                      primer_ingreso={chico.primer_ingreso}
                      admision={chico.admision}
                      dni={chico.dni}
                      domicilio={chico.domicilio}
                      telefono={chico.telefono}
                      autorizacion_imagen={chico.autorizacion_imagen}
                      fotoc_dni={chico.fotoc_dni}
                      fotoc_responsable={chico.fotoc_responsable}
                      tel_responsable={chico.tel_responsable}
                      visita_social={chico.visita_social}
                      egreso={chico.egreso}
                      aut_retirar={chico.aut_retirar}
                      dato_escolar={chico.dato_escolar}
                      kid={chico.kid}
                      obra_social={chico.obra_social}
                      obra_social_cual={chico.obra_social_cual}
                      escuela={chico.escuela}
                      grado={chico.grado}
                      fines={chico.fines}
                      sexo={chico.sexo}
                      hijos={chico.hijos}
                      hora_merienda={chico.hora_merienda}
                      traer={async () => {
                        try {
                          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                          if (loggedUserJSON) {
                            const usuario = JSON.parse(loggedUserJSON)
                            setUsuario(usuario)
                            const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
                            setfoto(novedades_aux[1])
                            setchico(novedades_aux[0][0])
                            setVinculos(novedades_aux[2])
                            setHorario(novedades_aux[3])
                          }
                        } catch (error) { }
                      }}
                    />
                  </div>

                </> : <></>}
              </> : <></>}
              {/* Agrega más campos adicionales aquí */}
            </Fragment>
          )}
        </Card>
      ) : (
        <>Cargando...</>
      )}

      <Vinculos />

      {vinculos ? <>  {vinculos.length > 0 ? <>  {vinculos.map((ob) => <>
        {ob.nombre}, {ob.apellido} -- {ob.vinculoo}  -- {ob.nombree}, {ob.apellidoo} <br />
      </>)}  </> : <>Sin vinculos</>}     </> : <></>}
      {horario ? (
        <>
          <Borrarhorarios id={id}
            traer={async () => {
              try {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                if (loggedUserJSON) {
                  const usuario = JSON.parse(loggedUserJSON)

                  setUsuario(usuario)
                  const novedades_aux = await servicioDtc.datosdechique(id == undefined ? props.id : id)
                  setfoto(novedades_aux[1])
                  setchico(novedades_aux[0][0])
                  setVinculos(novedades_aux[2])
                  setHorario(novedades_aux[3])
                }

              } catch (error) {

              }

            }} />
          {horario.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th onClick={() => ordenarPor('taller')}>Taller</th>
                  <th onClick={() => ordenarPor('dia')}>Día</th>
                  <th onClick={() => ordenarPor('hora')}>Hora</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {horario.sort(ordenarDatos).map((ob, index) => (
                  <tr key={index}>
                    <td>{ob.mail}</td>
                    <td>{ob.dia}</td>
                    <td>{ob.hora}</td>
                    <td>
                      <button onClick={() => eliminarHorario(ob.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <><h1>No esta inscripto a talleres</h1></>
          )}
        </>
      ) : (
        <></>
      )}{turnos && turnos.length > 0 && (

        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Otorgado</TableCell>
                <TableCell>Agendado por</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Presente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {turnos.map((ob, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {ob.fecha} {ob.detalle ? `- ${ob.detalle}` : ""}
                  </TableCell>
                  <TableCell>{ob.hora}</TableCell>
                  <TableCell>{ob.agendadopor}</TableCell>
                  <TableCell>{ob.estado}</TableCell>
                  <TableCell>{ob.presente}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      )}
    </>
  );
};

export default FichaPersona;

