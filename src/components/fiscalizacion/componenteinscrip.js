import { useState, useEffect } from "react";
import servicioFisca from '../../services/fiscalizacion';
import { Paper, CircularProgress, Typography, Box, TextField, InputLabel, Card, CardActions } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import * as React from 'react';
import logo from "../../Assets/encabezadoform.png";
import folleto from "../../Assets/folleto.jpg.jpeg";
import MuiAlert from '@mui/material/Alert';
import './styles.css';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

const Estracto = () => {
  const [cargando, setCargando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [escuelas, setEscuelas] = useState(['']);
  const [fecha, setFecha] = useState(['']);
  const [activo, setActivo] = useState(false);
  const navigate = useNavigate();

  const getClients = async () => {
    const clients = await servicioFisca.traerescuelas({});
    setEscuelas(clients);
    setLoading(false);
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleChange = (e) => {
    setFecha({ ...fecha, [e.target.name]: e.target.value });
  };

  const Inscribir = async (event) => {
    setCargando(true);
    const rta = await servicioFisca.enviarinscripcion(fecha);
    alert(rta);
    if (
      rta ===
      "inscripto correctamente, muchas gracias por completar, por favor aguarda en unos dias nos comunicaremos al numero de telefono registrado"
    ) {
      window.location.reload();
    }
    setCargando(false);
  };

  return (
    <Paper
      sx={{
        cursor: 'pointer',
        background: '#ffffff',
        color: '#bdbdbd',
        border: '1px dashed #ccc',
        '&:hover': { border: '1px solid #ccc' },
        padding: 10,
        width: '100%',
        maxWidth: 380,
        margin: '20px auto',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        alignItems: 'start',
        '@media (max-width: 600px)': {
          padding: 5,
          maxWidth: '100%',
          margin: 0,
        },
      }}
    >
      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        <img style={{ width: '100%', maxWidth: '500px' }} src={logo} alt="logo" />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="div" color="black">
          <StyledParagraph>
          ¡Gracias por interesarte en fiscalizar con nosotros! <b>Ya completemos el cupo</b> en esta oportunidad. 
Por dudas o consultas podés comunicarte al 3795083694. <br/>
<b>#Lista47 #VamosConValdes</b>
          </StyledParagraph>
        </Typography>
      </Box>
{/* 
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Nombre"
        name="nombre"
        onChange={handleChange}
        fullWidth
        variant="standard"
        fontFamily="Montserrat"
      />

      <TextField
        margin="dense"
        id="name"
        label="Apellido"
        name="apellido"
        onChange={handleChange}
        fullWidth
        variant="standard"
        fontFamily="Montserrat"
      />

      <TextField
        margin="dense"
        id="name"
        label="DNI"
        name="dni"
        onChange={handleChange}
        fullWidth
        type="number"
        variant="standard"
        fontFamily="Montserrat"
      />

      <TextField
        margin="dense"
        id="name"
        label="Telefono"
        name="telefono"
        onChange={handleChange}
        fullWidth
        type="number"
        variant="standard"
      />

      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Telefono alternativo"
        name="telefono2"
        onChange={handleChange}
        fullWidth
        type="number"
        variant="standard"
      />

      <br />

      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        <Typography variant="h5" component="div" color="black">
          <StyledParagraph>
            <b>¿Cómo te enteraste?</b>
          </StyledParagraph>
        </Typography>
      </InputLabel>

      <NativeSelect
        defaultValue={30}
        onChange={handleChange}
        inputProps={{
          name: 'como_se_entero',
          id: 'uncontrolled-native',
        }}
      >
        <option value={'Sin determinar'}>Elegir</option>
        <option value={'Flyer'}>
          <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" sans-serif>
            Lo vi en un Flyer
          </Typography>
        </option>
        <option value={'Pagina web'}>Por una Pagina web</option>
        <option value={'Amigo'}>Me comento un amigo</option>
        <option value={'Otra'}>Otra</option>
      </NativeSelect>

      <br />

      {fecha.como_se_entero === 'Amigo' && (
        <>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            ¿Cómo se llama ese amigo?
          </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Apellido amigo"
            name="apellido_referido"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Nombre amigo"
            name="nombre_referido"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </>
      )}

      {['Amigo', 'Sin determinar', 'Flyer', 'Pagina web', null].indexOf(fecha.como_se_entero) === -1 && (
        <TextField
          margin="dense"
          id="name"
          label="De qué otra manera?"
          name="como_se_entero"
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
      )}

      <br />*/}

      <CardActions>
      <img style={{ width: '100%', maxWidth: '500px' }} src={folleto} alt="logo" />
      </CardActions>
    </Paper>
  );
};

export default Estracto;
