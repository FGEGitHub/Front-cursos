import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Box,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import servicioDtc from "../../../../services/dtc";
import { Autocomplete } from "@mui/material";
const sectionStyle = {
  border: "1px solid #c62828",
  borderRadius: 1,
  mb: 3,
};


const opcionesViolencia = [
  "Física - Ejerce",
  "Física - Es víctima",
  "Psicológica - Ejerce",
  "Psicológica - Es víctima",
  "Sexual - Ejerce",
  "Sexual - Es víctima",
  "Económica y patrimonial - Ejerce",
  "Económica y patrimonial - Es víctima",
  "Simbólica - Ejerce",
  "Simbólica - Es víctima",
  "Explotación Sexual - Ejerce",
  "Explotación Sexual - Es víctima",
  "Explotación Laboral - Ejerce",
  "Explotación Laboral - Es víctima",

];

const opcionesModalidad= [
  
  // MODALIDAD
  "Doméstica / Familiar - Ejerce",
  "Doméstica / Familiar - Es víctima",
  "Institucional - Ejerce",
  "Institucional - Es víctima",
  "Laboral (Modalidad) - Ejerce",
  "Laboral (Modalidad) - Es víctima",
  "Comunitaria - Ejerce",
  "Comunitaria - Es víctima",
  "Autoinfligida - Ejerce",
  "Autoinfligida - Es víctima",
  "Género - Ejerce",
  "Género - Es víctima",
  "Trata - Ejerce",
  "Trata - Es víctima"
];
const opcionesBeneficiario = [
  "Asignación Universal por hijo",
  "Asignación por embarazo para protección social",
  "Pensión por discapacidad/invalidez",
  "Pensión a adultos mayores",
  "Pensión por madre de 7 o más hijos",
  "Pensión por fallecimiento del trabajador",
  "Retiro por invalidez",
  "Jubilación",
  "Seguro de desempleo",
  "Subsidio habitacional",
  "Programa PROGRESAR",
  "Seguro de capacitación y empleo",
  "Asignación provincial",
  "Asignación municipal",
  "Otros"
];
const opcionesDiscapacidad = [
  "Auditiva",
  "Visual",
  "Motriz",
  "Mental",
  "Del habla",
  "No presenta dificultad permanente",
  "Otro"
];

const sectionHeader = {
  backgroundColor: "#22ab10",
  px: 2,
  py: 0.5,
  fontWeight: "bold",
  fontSize: 14,
  color: "#fff",
};

const sectionBody = {
  p: 2,
};

const NuevoUsuarioDTC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    sexo: "",
    estadocivil: "",
    fecha_nacimiento: "",

    telefono: "",
    tel_responsable: "",
    domicilio: "",
presenta_violencia: "",
    país: "",
    provincia: "",

    primer_contacto: "",
    primer_ingreso: "",
    admision: "",

    presentacion_dispositivo: "",
    modo_acceso: "",
    derivado_institucion: "",
    cual_institucion: "",
    se_articulo: "",
    motivo_consulta: "",

    tiene_hijos: false,
    cantidad_hijos: "",

    con_quien_vive: "",

    sabe_leer: "",
    nivel_educativo: "",
    completo_nivel: "",

    situacion_laboral: "",
    modalidad_trabajo: "",

    obra_social: "",
    obra_social_cual: "",

    autorizacion_imagen: "",
    fotoc_dni: "",
    fotoc_responsable: "",
    visita_social: "",

    egreso: "",
    egresoconquien: "",

    responsable_inscripcion: "",
situacion_habitacional: "",
    aut_retirar: "",
    hora_merienda: "",
    escuela: "",
    grado: "",
    fines: "",
    talle: "",

    observaciones: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "obra_social" && value !== "Si" ? { obra_social_cual: "" } : {}),
      ...(name === "tiene_hijos" && !checked ? { cantidad_hijos: "" } : {})
    });
  };

const handleGuardar = async () => {
  try {
    const rta = await servicioDtc.nuevochique(form);
    alert(rta);

    if (rta === "Agregado") {
      navigate(-1);
    }

  } catch (error) {
    console.error(error);
    alert("Error al guardar");
  }
};
  return (
    <Card sx={{ maxWidth: 1200, margin: "auto", mt: 4 }}>
      <CardContent>

        <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
          FICHA DTC
        </Typography>
<Grid container spacing={2} sx={{ mb: 2 }}>
  <Grid item xs={12}>
    <TextField
      label="Responsable de inscripción"
      name="responsable_inscripcion"
      fullWidth
      size="small"
      value={form.responsable_inscripcion}
      onChange={handleChange}
       helperText="* Nombre de la persona que completó el formulario"
    />
  </Grid>
</Grid>
        {/* DATOS PERSONALES */}
        <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>DATOS PERSONALES</Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>

              <Grid item xs={6}>
                <TextField label="Nombre" name="nombre" fullWidth size="small" value={form.nombre} onChange={handleChange}/>
              </Grid>

              <Grid item xs={6}>
                <TextField label="Apellido" name="apellido" fullWidth size="small" value={form.apellido} onChange={handleChange}/>
              </Grid>

              <Grid item xs={4}>
                <TextField label="DNI" name="dni" fullWidth size="small" value={form.dni} onChange={handleChange}/>
              </Grid>

              <Grid item xs={4}>
                <TextField select label="Sexo" name="sexo" fullWidth size="small" value={form.sexo} onChange={handleChange}>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Trans">Trans</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField type="date" label="Nacimiento" name="fecha_nacimiento"
                  InputLabelProps={{ shrink: true }}
                  fullWidth size="small"
                  value={form.fecha_nacimiento}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
 <TextField select label="Estado civil" name="estadocivil" fullWidth size="small" value={form.estadocivil} onChange={handleChange}>
                  <MenuItem value="Soltero">Soltero</MenuItem>
                  <MenuItem value="Casado">Casado</MenuItem>
                  <MenuItem value="Divorciado">Divorciado</MenuItem>
                  <MenuItem value="Viudo">Viudo</MenuItem>
                </TextField>              </Grid>

              <Grid item xs={6}>
                <TextField label="País" name="país" fullWidth size="small" value={form.país} onChange={handleChange}/>
              </Grid>

              <Grid item xs={6}>
                <TextField label="Provincia" name="provincia" fullWidth size="small" value={form.provincia} onChange={handleChange}/>
              </Grid>
<Grid item xs={12} sm={6}>
  <TextField
    select
    label="Situación habitacional"
    name="situacion_habitacional"
    fullWidth
    size="small"
    value={form.situacion_habitacional || ""}
    onChange={handleChange}
  >
    <MenuItem value="Vivienda digna">Vivienda digna</MenuItem>
    <MenuItem value="Situación de calle">Situación de calle</MenuItem>
    <MenuItem value="Hacinamiento">Hacinamiento</MenuItem>
    <MenuItem value="Vivienda precaria">Vivienda precaria</MenuItem>
    <MenuItem value="Hogar">Hogar</MenuItem>
    <MenuItem value="Parador">Parador</MenuItem>
    <MenuItem value="Hospital de noche">Hospital de noche</MenuItem>
    <MenuItem value="Hospital general">Hospital gral.</MenuItem>
    <MenuItem value="Unidad Penal">Unidad Penal</MenuItem>
    <MenuItem value="Centro de contención">Centro de contención</MenuItem>
  </TextField>
</Grid>
            </Grid>
          </Box>
        </Box>

        {/* CONTACTO */}
        <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>CONTACTO</Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Teléfono" name="telefono" fullWidth size="small" value={form.telefono} onChange={handleChange}/>
              </Grid>

              <Grid item xs={6}>
                <TextField label="Tel. responsable" name="tel_responsable" fullWidth size="small" value={form.tel_responsable} onChange={handleChange}/>
              </Grid>

              <Grid item xs={12}>
                <TextField label="Domicilio" name="domicilio" fullWidth size="small" value={form.domicilio} onChange={handleChange}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Barrio" name="barrio" fullWidth size="small" value={form.barrio} onChange={handleChange}/>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* PRIMER CONTACTO */}
        <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>PRIMER CONTACTO</Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>

              <Grid item xs={4}>
                <TextField type="date" label="Presentacion al dispositivo" name="primer_contacto"
                  InputLabelProps={{ shrink: true }}
                  fullWidth size="small"
                  value={form.primer_contacto}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField select label="Presentación" name="presentacion_dispositivo"
                  fullWidth size="small"
                  value={form.presentacion_dispositivo}
                  onChange={handleChange}
                >
                  <MenuItem value="Solo">Solo</MenuItem>
                  <MenuItem value="Acompañado">Acompañado</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>
            
         <TextField
  select
  label="Modo acceso"
  name="modo_acceso"
  fullWidth
  size="small"
  value={form.modo_acceso}
  onChange={handleChange}
>
  <MenuItem value="Presencia en el barrio">
    Conocía el dispositivo por su presencia en el barrio
  </MenuItem>

  <MenuItem value="Referente afectivo">
    Se lo recomendó un referente afectivo
  </MenuItem>

  <MenuItem value="Otra institución">
    Lo orientó otra institución
  </MenuItem>

  <MenuItem value="Otro dispositivo">
    Lo orientó otro dispositivo
  </MenuItem>

  <MenuItem value="Oficio judicial">
    Oficio Judicial
  </MenuItem>

  <MenuItem value="Otro">
    Otro 
  </MenuItem>
</TextField>
            {form.modo_acceso === "Otro" && (
  <TextField
    label="Especificar"
    name="modo_acceso_otro"
    fullWidth
    size="small"
    value={form.modo_acceso_otro || ""}
    onChange={handleChange}
    sx={{ mt: 2 }}
  />
)}
              </Grid>


              <Grid item xs={6}>
                 <TextField select label="Presentación" name="derivado_institucion"
                  fullWidth size="small"
                  value={form.derivado_institucion}
                  onChange={handleChange}
                >
                  <MenuItem value="Si">Si</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              
              </Grid>

              <Grid item xs={6}>
                <TextField label="Cuál institución" name="cual_institucion" fullWidth size="small" value={form.cual_institucion} onChange={handleChange}/>
              </Grid>

              <Grid item xs={6}>
                <TextField label="Se articuló" name="se_articulo" fullWidth size="small" value={form.se_articulo} onChange={handleChange}/>
              </Grid>

              <Grid item xs={6}>
<Autocomplete
  multiple
  freeSolo
  options={[
    "Apoyo económico",
    "Orientación laboral",
    "Orientación educativa",
    "Orientación a la niñez",
    "Orientación en problemas comunitarios"
  ]}
  value={form.motivo_consulta || []}
  onChange={(e, newValue) =>
    setForm({ ...form, motivo_consulta: newValue })
  }
  renderInput={(params) => (
    <TextField {...params} label="Motivo consulta" size="small" />
  )}
/>              </Grid>

            </Grid>
          </Box>
        </Box>

        {/* RELACIONES */}
        <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>RELACIONES</Box>
          <Box sx={sectionBody}>

            <FormControlLabel
              control={<Checkbox checked={form.tiene_hijos} onChange={handleChange} name="tiene_hijos" />}
              label="Tiene hijos"
            />

            {form.tiene_hijos && (
              <TextField
                label="Cantidad hijos"
                name="cantidad_hijos"
                type="number"
                fullWidth
                size="small"
                value={form.cantidad_hijos}
                onChange={handleChange}
              />
            )}

            <TextField
              label="Con quién vive"
              name="con_quien_vive"
              fullWidth
              size="small"
              value={form.con_quien_vive}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        {/* EDUCACIÓN */}
        <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>EDUCACIÓN</Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>

              <Grid item xs={4}>
                <TextField select label="¿Sabe leer?" name="sabe_leer" fullWidth size="small" value={form.sabe_leer} onChange={handleChange}>
                  <MenuItem value="Si">Sí</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
               <Grid item xs={4}>
<TextField
  select
  label="Asistencia al colegio"
  name="asistencia_colegio"
  fullWidth
  size="small"
  value={form.asistencia_colegio || ""}
  onChange={handleChange}
>
  <MenuItem value="Asistió alguna vez">
    Asistió alguna vez
  </MenuItem>

  <MenuItem value="Nunca asistió">
    Nunca asistió
  </MenuItem>

  <MenuItem value="Asiste actualmente">
    Asiste actualmente
  </MenuItem>
</TextField></Grid>
              <Grid item xs={4}>
                <TextField label="Nivel educativo" name="nivel_educativo" fullWidth size="small" value={form.nivel_educativo} onChange={handleChange}/>
              </Grid>

              <Grid item xs={4}>
                <TextField label="Completó nivel" name="completo_nivel" fullWidth size="small" value={form.completo_nivel} onChange={handleChange}/>
              </Grid>
    <Grid item xs={4}>
<TextField
  select
  label="¿Asiste a otra institución?"
  name="asiste_institucion"
  fullWidth
  size="small"
  value={form.asiste_institucion || ""}
  onChange={handleChange}
>
  <MenuItem value="Si">Sí</MenuItem>
  <MenuItem value="No">No</MenuItem>
</TextField></Grid>
            </Grid>
          </Box>
        </Box>

        {/* TRABAJO */}
        <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>TRABAJO</Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
<TextField
  select
  label="Situación laboral"
  name="situacion_laboral"
  fullWidth
  size="small"
  value={form.situacion_laboral || ""}
  onChange={handleChange}
>
  <MenuItem value="Con empleo">Con Empleo</MenuItem>
  <MenuItem value="Sin empleo">Sin Empleo</MenuItem>
  <MenuItem value="Ama de casa">Ama de casa</MenuItem>
</TextField>              </Grid>

              <Grid item xs={6}>
{form.situacion_laboral === "Con empleo" && (
  <TextField
    select
    label="Modalidad de trabajo"
    name="modalidad_trabajo"
    fullWidth
    size="small"
    value={form.modalidad_trabajo || ""}
    onChange={handleChange}
    sx={{ mt: 2 }}
  >
    <MenuItem value="Registrado">Registrado</MenuItem>
    <MenuItem value="No registrado">No Registrado</MenuItem>
  </TextField>
)}              </Grid>
<Grid item xs={6}>
{form.situacion_laboral === "Sin empleo" && (
  <TextField
    select
    label="¿Busca trabajo?"
    name="busca_trabajo"
    fullWidth
    size="small"
    value={form.busca_trabajo || ""}
    onChange={handleChange}
    sx={{ mt: 2 }}
  >
    <MenuItem value="Busca trabajo">Busca trabajo</MenuItem>
    <MenuItem value="No busca trabajo">No busca trabajo</MenuItem>
  </TextField>
)}</Grid>
<Grid item xs={6}>
<TextField
  select
  label="Es beneficiario de"
  name="beneficiario"
  fullWidth
  size="small"
  SelectProps={{ multiple: true }}
  value={form.beneficiario || []}
  onChange={handleChange}
>
  {opcionesBeneficiario.map((op) => (
    <MenuItem key={op} value={op}>
      {op}
    </MenuItem>
  ))}
</TextField></Grid>
            </Grid>
          </Box>
        </Box>
  <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>CONDICIONES DEL PRIMER CONTACTO </Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
<TextField
  select
  label="¿Tiene cobertura de salud?"
  name="obra_social"
  fullWidth
  size="small"
  value={form.obra_social || ""}
  onChange={handleChange}
>
  <MenuItem value="Si">Sí</MenuItem>
  <MenuItem value="No">No</MenuItem>
</TextField></Grid>


{form.obra_social === "Si" && (
  <Grid item xs={6}>
  <TextField
    label="¿Cuál cobertura?"
    name="obra_social_cual"
    fullWidth
    size="small"
    value={form.obra_social_cual || ""}
    onChange={handleChange}
    sx={{ mt: 2 }}
  /></Grid>
)}
            </Grid>

               </Box>
        </Box>
          <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>DISCAPACIDAD</Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>
  <Grid item xs={6}>

<TextField
  select
  label="Discapacidad"
  name="discapacidad"
  value={form.discapacidad || []}
  fullWidth
  size="small"
  SelectProps={{ multiple: true }}
 
  onChange={handleChange}
>
  {opcionesDiscapacidad.map((op) => (
    <MenuItem key={op} value={op}>
      {op}
    </MenuItem>
  ))}
</TextField>
  </Grid>

    <Grid item xs={6}>

    {form.discapacidad?.includes("Otro") && (
  <TextField
    label="Otro ¿Cuál?"
    name="discapacidad_otro"
    fullWidth
    size="small"
    value={form.discapacidad_otro || ""}
    onChange={handleChange}
    sx={{ mt: 2 }}
  />
)}
  </Grid>

    <Grid item xs={6}>

    <TextField
  select
  label="¿Tiene CUD?"
  name="cud"
  fullWidth
  size="small"
  value={form.cud || ""}
  onChange={handleChange}
>
  <MenuItem value="Si">Sí</MenuItem>
  <MenuItem value="No">No</MenuItem>
  <MenuItem value="En tramite">En trámite</MenuItem>
</TextField>
  </Grid>
<Grid item xs={6}>
                  <TextField label="Recibe tratamiento?" name="tratamiento_cud"  fullWidth size="small" value={form.tratamiento_cud} onChange={handleChange}/>
</Grid>
            </Grid>

               </Box>
        </Box>








          <Box sx={sectionStyle}>
          <Box sx={sectionHeader}>VIOLENCIA</Box>
          <Box sx={sectionBody}>
            <Grid container spacing={2}>
  <Grid item xs={6}>
 <TextField
  select
  label="¿Presenta situacion de violencia?"
  name="presenta_violencia"
  fullWidth
  size="small"
  value={form.presenta_violencia || ""}
  onChange={handleChange}
>
  <MenuItem value="Si">Sí</MenuItem>
  <MenuItem value="No">No</MenuItem>
</TextField>
  </Grid>
  <Grid item xs={6}>
  <TextField
    select
    label="Tipo  de violencia"
    name="tipo_violencia"
    fullWidth
    size="small"
   // SelectProps={{ multiple: true }}
    value={form.tipo_violencia || []}
    onChange={handleChange}
    helperText="Seleccionar todas las opciones que correspondan (Ejerce / Es víctima)"
  >
    {opcionesViolencia.map((op) => (
      <MenuItem key={op} value={op}>
        {op}
      </MenuItem>
    ))}
  </TextField>
    
  </Grid>
<Grid item xs={6}>

 <TextField
    select
    label="Modalidad de violencia"
    name="modalidad_violencia"
    fullWidth
    size="small"
  //  SelectProps={{ multiple: true }}
    value={form.modalidad_violencia || []}
    onChange={handleChange}
    helperText="Seleccionar todas las opciones que correspondan (Ejerce / Es víctima)"
  >
    {opcionesModalidad.map((op) => (
      <MenuItem key={op} value={op}>
        {op}
      </MenuItem>
    ))}
  </TextField>
</Grid>

  </Grid>

  </Box>
   </Box>
        {/* BOTONES */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleGuardar}>
            Guardar
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
};

export default NuevoUsuarioDTC;