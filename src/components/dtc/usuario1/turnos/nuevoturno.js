import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  Button,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
  InputLabel
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import servicioDtc from '../../../../services/dtc';
import Tooltip from '@material-ui/core/Tooltip';

import React, { useState } from "react";
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

const horariosDisponibles = [
  "08:20",
  "09:00",
  "09:40",
  "10:20",
  "11:00",
  "11:40",
  "14:00",
  "14:40",
  "15:20",
  "16:00",
  "16:40",
  "17:20"
];

export default function SelectTextFields(props) {

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    fecha: props.fecha,
    horario: "",
    profesional: ""
  });

  const [usuario, setUsuario] = useState();

  const [profesionales, setProfesionales] = useState(false);

  const [idPsicoSeleccionado, setIdPsicoSeleccionado] = useState(null);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "profesional") {
      setIdPsicoSeleccionado(value);
    }
  };


  const traerprof = async () => {

    try {

      const loggedUserJSON =
        window.localStorage.getItem('loggedNoteAppUser');

      const user = JSON.parse(loggedUserJSON);

      setUsuario(user);

      console.log("USUARIO:", user);
      console.log("NIVEL:", user.nivel);

      if (user.nivel == 40) {

        const nov = await servicioDtc.traerprofesionales();

        setProfesionales(nov[0]);

      } else if (user.nivel == 20 || user.nivel == 28) {

        const nov = await servicioDtc.traerpsicologos();

        console.log("PSICOLOGOS:", nov[0]);

        setProfesionales(nov[0]);
      }

    } catch (error) {

      console.error("Error trayendo profesionales:", error);

    }
  };


  const handleClickOpen = () => {

    setForm({
      fecha: props.fecha,
      horario: "",
      profesional: ""
    });

    setIdPsicoSeleccionado(null);

    setOpen(true);

    traerprof();
  };


  const handleClose = () => {
    setOpen(false);
  };


  const handleDeterminar = async (event) => {

    event.preventDefault();

    try {

      const loggedUserJSON =
        window.localStorage.getItem('loggedNoteAppUser');

      const user = JSON.parse(loggedUserJSON);

      setUsuario(user);


      /*
       * IMPORTANTE:
       *
       * Para nivel 20 y 28 el profesional seleccionado
       * está en form.profesional.
       *
       * Para nivel 24 se usa el propio usuario.
       *
       * La fecha SIEMPRE sale de form.fecha.
       */

      const mergedJSON = {
        fecha: form.fecha,
        horario: form.horario,
        id_psic: user.nivel === 24
          ? user.id
          : form.profesional
      };


      console.log("=================================");
      console.log("NIVEL:", user.nivel);
      console.log("FECHA:", form.fecha);
      console.log("HORARIO:", form.horario);
      console.log("PROFESIONAL:", form.profesional);
      console.log("JSON FINAL:", mergedJSON);
      console.log("=================================");


      /*
       * Nivel 40 y 41 usan la función especial.
       *
       * Nivel 20 y 28 usan exactamente
       * la misma función: agregarturno.
       */

      if (user.nivel === 41 || user.nivel === 40) {

        const nov =
          await servicioDtc.agregarturnocadia(mergedJSON);

        alert(nov);

      } else {

        const nov =
          await servicioDtc.agregarturno(mergedJSON);

        alert(nov);
      }


      /*
       * Actualizamos la lista usando la misma fecha
       * con la que acabamos de crear el turno.
       */

      if (props.traer) {
        props.traer(form.fecha);
      }

      setOpen(false);

    } catch (error) {

      console.error("ERROR CREANDO TURNO:", error);

      if (props.traer) {
        props.traer(form.fecha);
      }

      setOpen(false);
    }
  };


  /*
   * Para nivel 24 usamos el ID del usuario.
   *
   * Para niveles 20 y 28 usamos el profesional
   * seleccionado.
   */

  const idPsico =
    usuario?.nivel == 24
      ? usuario.id
      : idPsicoSeleccionado;


  const turnosDelProfesional =
    props.turnosdeldia?.filter(
      turno => turno.id_psico == idPsico
    ) || [];


  const horariosOcupados =
    turnosDelProfesional.map(
      turno => turno.detalle
    );


  return (

    <Box
      sx={{
        '& .MuiTextField-root': {
          m: 1,
          width: '25ch'
        }
      }}
      noValidate
      autoComplete="off"
    >

      <Tooltip title="Nuevo turno">

        <Button
          variant="contained"
          onClick={handleClickOpen}
        >
          Nuevo
        </Button>

      </Tooltip>


      <Dialog
        open={open}
        onClose={handleClose}
      >

        <DialogContent>

          <h3>
            <b>NUEVO TURNO</b>
          </h3>


          {usuario && usuario.nivel}


          {(usuario &&
            (
              usuario.nivel == 23 ||
              usuario.nivel == 20 ||
              usuario.nivel == 24 ||
              usuario.nivel == 28
            )
          ) && (

            <>

              <br />

              {profesionales ? (

                <>

                  <InputLabel>
                    Profesional
                  </InputLabel>


                  <FormControl>

                    <RadioGroup
                      name="profesional"
                      value={form.profesional}
                      onChange={handleChange}
                    >

                      {profesionales.map((row) => (

                        <FormControlLabel
                          key={row.id}
                          value={row.id}
                          control={<Radio />}
                          label={row.nombre}
                        />

                      ))}

                    </RadioGroup>

                  </FormControl>

                </>

              ) : (

                <>Cargando...</>

              )}


              <InputLabel>
                Horario
              </InputLabel>


              <Select
                name="horario"
                value={form.horario}
                onChange={handleChange}
                fullWidth
              >

                {horariosDisponibles.map((horario) => (

                  <MenuItem
                    key={horario}
                    value={horario}
                    disabled={horariosOcupados.includes(horario)}
                  >

                    {horariosOcupados.includes(horario)
                      ? `${horario} - Ya tiene`
                      : horario
                    }

                  </MenuItem>

                ))}

              </Select>

            </>

          )}


          {idPsico &&
            turnosDelProfesional.length > 0 && (

              <div>

                <Typography variant="h6">
                  Turnos del día:
                </Typography>

                <ul>

                  {turnosDelProfesional.map(
                    (turno, index) => (

                      <li key={index}>
                        {turno.detalle}
                      </li>

                    )
                  )}

                </ul>

              </div>

            )}


          <DialogActions>

            {form.horario ? (

              <Button
                variant="contained"
                color="primary"
                onClick={handleDeterminar}
              >
                Crear
              </Button>

            ) : (

              <>
                Completar los datos
              </>

            )}


            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: "auto" }}
              onClick={handleClose}
            >
              Cancelar
            </Button>

          </DialogActions>


        </DialogContent>

      </Dialog>

    </Box>
  );
}