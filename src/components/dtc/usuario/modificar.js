import React, { useState } from "react";
import {
  Box, TextField, MenuItem, Button, Dialog, DialogContent,
  DialogActions, Typography, Checkbox, FormControlLabel,   Grid,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import servicioDtc from "../../../services/dtc";

const opcionesViolencia = [
  "Física - Ejerce","Física - Es víctima","Psicológica - Ejerce","Psicológica - Es víctima",
  "Sexual - Ejerce","Sexual - Es víctima","Económica y patrimonial - Ejerce","Económica y patrimonial - Es víctima",
  "Simbólica - Ejerce","Simbólica - Es víctima","Explotación Sexual - Ejerce","Explotación Sexual - Es víctima",
  "Explotación Laboral - Ejerce","Explotación Laboral - Es víctima"
];

const opcionesModalidad = [
  "Doméstica / Familiar - Ejerce","Doméstica / Familiar - Es víctima",
  "Institucional - Ejerce","Institucional - Es víctima",
  "Laboral (Modalidad) - Ejerce","Laboral (Modalidad) - Es víctima",
  "Comunitaria - Ejerce","Comunitaria - Es víctima",
  "Autoinfligida - Ejerce","Autoinfligida - Es víctima",
  "Género - Ejerce","Género - Es víctima",
  "Trata - Ejerce","Trata - Es víctima"
];

const opcionesDiscapacidad = [
  "Auditiva","Visual","Motriz","Mental","Del habla","No presenta dificultad permanente","Otro"
];

const opcionesBeneficiario = [
  "Asignación Universal por hijo","Asignación por embarazo para protección social",
  "Pensión por discapacidad/invalidez","Pensión a adultos mayores",
  "Pensión por madre de 7 o más hijos","Pensión por fallecimiento del trabajador",
  "Retiro por invalidez","Jubilación","Seguro de desempleo",
  "Subsidio habitacional","Programa PROGRESAR",
  "Seguro de capacitación y empleo","Asignación provincial","Asignación municipal","Otros"
];

export default function ModificarUsuario(props) {

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    ...props,
    motivo_consulta: props.motivo_consulta || [],
    discapacidad: props.discapacidad || [],
    beneficiario: props.beneficiario || [],
    tiene_hijos: props.tiene_hijos || false
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
      await servicioDtc.modificarusuario(form);
      props.traer();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Modificar usuario
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
       <DialogContent dividers>

  <Typography variant="h6" sx={{ mb: 2 }}>
    Modificar {form.nombre}
  </Typography>

  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

    {/* RESPONSABLE */}
    <Box>
      <Typography variant="subtitle2">Responsable</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Responsable inscripción"
            name="responsable_inscripcion"
            value={form.responsable_inscripcion || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Dimensión"
            name="kid"
            value={form.kid || ""}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Sala Blanda">Sala Blanda</MenuItem>
            <MenuItem value="Dimension 1">Dimension 1</MenuItem>
            <MenuItem value="Dimension 2">Dimension 2</MenuItem>
            <MenuItem value="Jovenes">Jovenes</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>

    {/* DATOS PERSONALES */}
    <Box>
      <Typography variant="subtitle2">Datos personales</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="DNI" name="dni" value={form.dni} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField select label="Sexo" name="sexo" value={form.sexo} onChange={handleChange} fullWidth>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
            <MenuItem value="Trans">Trans</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField type="date" name="fecha_nacimiento" value={form.fecha_nacimiento || ""} onChange={handleChange} fullWidth />
        </Grid>
      </Grid>
    </Box>

    {/* CONTACTO */}
    <Box>
      <Typography variant="subtitle2">Contacto</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Teléfono" name="telefono" value={form.telefono || ""} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Tel. responsable" name="tel_responsable" value={form.tel_responsable || ""} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Domicilio" name="domicilio" value={form.domicilio || ""} onChange={handleChange} fullWidth />
        </Grid>
      </Grid>
    </Box>

    {/* RELACIONES */}
    <Box>
      <Typography variant="subtitle2">Relaciones</Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={form.tiene_hijos}
            onChange={handleChange}
            name="tiene_hijos"
          />
        }
        label="Tiene hijos"
      />

      {form.tiene_hijos && (
        <TextField
          label="Cantidad hijos"
          name="cantidad_hijos"
          value={form.cantidad_hijos || ""}
          onChange={handleChange}
          fullWidth
        />
      )}

      <TextField
        label="Con quién vive"
        name="con_quien_vive"
        value={form.con_quien_vive || ""}
        onChange={handleChange}
        fullWidth
      />
    </Box>

    {/* EDUCACIÓN */}
    <Box>
      <Typography variant="subtitle2">Educación</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField select label="¿Sabe leer?" name="sabe_leer" value={form.sabe_leer || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Si">Si</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Nivel educativo" name="nivel_educativo" value={form.nivel_educativo || ""} onChange={handleChange} fullWidth />
        </Grid>
      </Grid>
    </Box>

    {/* TRABAJO */}
    <Box>
      <Typography variant="subtitle2">Trabajo</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField select label="Situación laboral" name="situacion_laboral" value={form.situacion_laboral || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Con empleo">Con empleo</MenuItem>
            <MenuItem value="Sin empleo">Sin empleo</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            select
            label="Beneficiario"
            name="beneficiario"
            SelectProps={{ multiple: true }}
            value={form.beneficiario}
            onChange={handleChange}
            fullWidth
          >
            {opcionesBeneficiario.map(op => (
              <MenuItem key={op} value={op}>{op}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>

    {/* OBSERVACIONES */}
    <Box>
      <Typography variant="subtitle2">Observaciones</Typography>
      <TextField
        multiline
        rows={3}
        name="observaciones"
        value={form.observaciones || ""}
        onChange={handleChange}
        fullWidth
      />
    </Box>

  </Box>
</DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleGuardar}>
            Guardar
          </Button>
          <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}