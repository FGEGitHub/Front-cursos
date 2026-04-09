import React, { useState } from "react";
import {
  Box, TextField, MenuItem, Button, Dialog, DialogContent,
  DialogActions, Typography, Checkbox, FormControlLabel
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

          <Typography variant="h6">Modificar {form.nombre}</Typography>

          {/* RESPONSABLE */}
          <TextField label="Responsable inscripción" name="responsable_inscripcion"
            value={form.responsable_inscripcion || ""} onChange={handleChange} fullWidth />

          {/* DATOS PERSONALES */}
          <Typography sx={{ mt: 2 }}>Datos personales</Typography>

          <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} fullWidth />
          <TextField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} fullWidth />
          <TextField label="DNI" name="dni" value={form.dni} onChange={handleChange} fullWidth />

          <TextField select label="Sexo" name="sexo" value={form.sexo} onChange={handleChange} fullWidth>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
            <MenuItem value="Trans">Trans</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </TextField>

          <TextField type="date" name="fecha_nacimiento"
            value={form.fecha_nacimiento || ""} onChange={handleChange} fullWidth />

          <TextField select label="Estado civil" name="estadocivil"
            value={form.estadocivil || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Soltero">Soltero</MenuItem>
            <MenuItem value="Casado">Casado</MenuItem>
            <MenuItem value="Divorciado">Divorciado</MenuItem>
            <MenuItem value="Viudo">Viudo</MenuItem>
          </TextField>

          <TextField label="País" name="pais" value={form.pais || ""} onChange={handleChange} fullWidth />
          <TextField label="Provincia" name="provincia" value={form.provincia || ""} onChange={handleChange} fullWidth />

          <TextField select label="Situación habitacional" name="situacion_habitacional"
            value={form.situacion_habitacional || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Vivienda digna">Vivienda digna</MenuItem>
            <MenuItem value="Situación de calle">Situación de calle</MenuItem>
            <MenuItem value="Hacinamiento">Hacinamiento</MenuItem>
            <MenuItem value="Vivienda precaria">Vivienda precaria</MenuItem>
          </TextField>

          {/* CONTACTO */}
          <Typography sx={{ mt: 2 }}>Contacto</Typography>

          <TextField label="Teléfono" name="telefono" value={form.telefono || ""} onChange={handleChange} fullWidth />
          <TextField label="Tel. responsable" name="tel_responsable" value={form.tel_responsable || ""} onChange={handleChange} fullWidth />
          <TextField label="Domicilio" name="domicilio" value={form.domicilio || ""} onChange={handleChange} fullWidth />
          <TextField label="Barrio" name="barrio" value={form.barrio || ""} onChange={handleChange} fullWidth />

          {/* PRIMER CONTACTO */}
          <Typography sx={{ mt: 2 }}>Primer contacto</Typography>

          <TextField type="date" label="Primer contacto" name="primer_contacto"
            value={form.primer_contacto || ""} onChange={handleChange} fullWidth />

          <TextField select label="Presentación" name="presentacion_dispositivo"
            value={form.presentacion_dispositivo || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Solo">Solo</MenuItem>
            <MenuItem value="Acompañado">Acompañado</MenuItem>
          </TextField>

          <TextField select label="Modo acceso" name="modo_acceso"
            value={form.modo_acceso || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Presencia en el barrio">Presencia en el barrio</MenuItem>
            <MenuItem value="Referente afectivo">Referente afectivo</MenuItem>
            <MenuItem value="Otra institución">Otra institución</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </TextField>

          {/* MOTIVO */}
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={form.motivo_consulta}
            onChange={(e, val) => setForm({ ...form, motivo_consulta: val })}
            renderInput={(params) => <TextField {...params} label="Motivo consulta" />}
          />

          {/* RELACIONES */}
          <Typography sx={{ mt: 2 }}>Relaciones</Typography>

          <FormControlLabel
            control={<Checkbox checked={form.tiene_hijos} onChange={handleChange} name="tiene_hijos" />}
            label="Tiene hijos"
          />

          {form.tiene_hijos && (
            <TextField label="Cantidad hijos" name="cantidad_hijos"
              value={form.cantidad_hijos || ""} onChange={handleChange} fullWidth />
          )}

          <TextField label="Con quién vive" name="con_quien_vive"
            value={form.con_quien_vive || ""} onChange={handleChange} fullWidth />

          {/* EDUCACIÓN */}
          <Typography sx={{ mt: 2 }}>Educación</Typography>

          <TextField select label="¿Sabe leer?" name="sabe_leer"
            value={form.sabe_leer || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Si">Si</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>

          <TextField label="Nivel educativo" name="nivel_educativo"
            value={form.nivel_educativo || ""} onChange={handleChange} fullWidth />

          {/* TRABAJO */}
          <Typography sx={{ mt: 2 }}>Trabajo</Typography>

          <TextField select label="Situación laboral" name="situacion_laboral"
            value={form.situacion_laboral || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Con empleo">Con empleo</MenuItem>
            <MenuItem value="Sin empleo">Sin empleo</MenuItem>
          </TextField>

          <TextField
            select
            label="Beneficiario"
            name="beneficiario"
            SelectProps={{ multiple: true }}
            value={form.beneficiario}
            onChange={handleChange}
            fullWidth
          >
            {opcionesBeneficiario.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
          </TextField>

          {/* DISCAPACIDAD */}
          <Typography sx={{ mt: 2 }}>Discapacidad</Typography>

          <TextField select multiple label="Discapacidad" name="discapacidad"
            value={form.discapacidad} onChange={handleChange} fullWidth>
            {opcionesDiscapacidad.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
          </TextField>

          {/* VIOLENCIA */}
          <Typography sx={{ mt: 2 }}>Violencia</Typography>

          <TextField select label="¿Presenta violencia?" name="presenta_violencia"
            value={form.presenta_violencia || ""} onChange={handleChange} fullWidth>
            <MenuItem value="Si">Si</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>

          <TextField select label="Tipo violencia" name="tipo_violencia"
            value={form.tipo_violencia || ""} onChange={handleChange} fullWidth>
            {opcionesViolencia.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
          </TextField>

          <TextField select label="Modalidad violencia" name="modalidad_violencia"
            value={form.modalidad_violencia || ""} onChange={handleChange} fullWidth>
            {opcionesModalidad.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
          </TextField>

          {/* ESCOLAR */}
          <Typography sx={{ mt: 2 }}>Escolar</Typography>

          <TextField label="Escuela" name="escuela" value={form.escuela || ""} onChange={handleChange} fullWidth />
          <TextField label="Grado" name="grado" value={form.grado || ""} onChange={handleChange} fullWidth />
          <TextField label="Talle" name="talle" value={form.talle || ""} onChange={handleChange} fullWidth />

          {/* OBS */}
          <Typography sx={{ mt: 2 }}>Observaciones</Typography>

          <TextField
            multiline
            rows={3}
            name="observaciones"
            value={form.observaciones || ""}
            onChange={handleChange}
            fullWidth
          />

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