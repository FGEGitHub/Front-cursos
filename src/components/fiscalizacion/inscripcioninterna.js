import { useState, useEffect } from "react";
import servicioFisca from '../../services/fiscalizacion';
import { Paper, CircularProgress, Typography, Box, TextField, InputLabel, Card, CardActions } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import * as React from 'react';
import logo from "../../Assets/boletah2.jpeg";
import folleto from "../../Assets/folleto.jpg.jpeg";
import MuiAlert from '@mui/material/Alert';
import './styles.css';
import styled from 'styled-components';
import './styles2.css';
const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

const Estracto = () => {
  const [cargando, setCargando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [escuelas, setEscuelas] = useState(['']);
  const [inscrip, setInscrip] = useState(['']);
  const [activo, setActivo] = useState(false);
  const navigate = useNavigate();

  const getClients = async () => {
    const clients = await servicioFisca.traerescuelas({});
    setEscuelas(clients);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getClients();
  }, []);

  const handleChange = (e) => {
    setInscrip({ ...inscrip, [e.target.name]: e.target.value });
  };

  const Inscribir = async (event) => {
    setCargando(true);
    const rta = await servicioFisca.enviarinscripcioninterna(inscrip);
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
      <Box className="logo-container">
          <img className="logo" src={logo} alt="logo" />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="div" color="black">
          <StyledParagraph>
          ¡Muchas gracias por tu interés en fiscalizar con nosotros! 

<br/>

<br/>
#HagamosElCambioDeNuestrasVidas
<br/>
Equipo CC ARI Corrientes

            </StyledParagraph>
        </Typography>
      </Box>
{/*       <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="div" color="black">
          <StyledParagraph>
          ¡Gracias por interesarte en fiscalizar con nosotros! <b>Ya completemos el cupo</b> en esta oportunidad. 
Por dudas o consultas podés comunicarte al 3795083694. <br/>
<b>#Lista47 #VamosConValdes</b>
          </StyledParagraph>
        </Typography>
      </Box> */}

      <TextField
        
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
        label="DNI (SIN PUNTOS)"
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
            <b>Que referente</b>
          </StyledParagraph>
        </Typography>
      </InputLabel>

      <NativeSelect
        defaultValue={30}
        onChange={handleChange}
        inputProps={{
          name: 'referente',
          id: 'uncontrolled-native',
        }}
      >
        <option value={'Sin determinar'}>Elegir</option>
  
        <option value={'Cruz'}>Cruz</option>
        <option value={'Rocio'}>Rocio</option>
        <option value={'Otra'}>Otra</option>
      </NativeSelect>

      <br />

     <InputLabel variant="standard" htmlFor="uncontrolled-native">
        <Typography variant="h5" component="div" color="black">
          <StyledParagraph>
            <b>Que funcion</b>
          </StyledParagraph>
        </Typography>
      </InputLabel>

      <NativeSelect
        defaultValue={30}
        onChange={handleChange}
        inputProps={{
          name: 'funcion',
          id: 'uncontrolled-native',
        }}
      >
        <option value={'Sin determinar'}>Elegir</option>
  
        <option value={'Fiscal de mesa'}>Fiscal de mesa</option>
        <option value={'Encargado de escuela'}>Encargado de escuela</option>
        <option value={'Logistica'}>Logistica</option>
      </NativeSelect>

      <br />


      <br /> 
     
      
    <br/> 
    
      <CardActions>
      {/* Acciones: */}
        {inscrip.nombre && inscrip.apellido && inscrip.dni && inscrip.telefono && inscrip.funcion && inscrip.referente ? 

        
      <>
         <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button> 
        </>:<>{/* <Button variant='contained' disabled>Enviar Inscripcion</Button> */}</>}
      
      </CardActions>
    </Paper>

  
  );
};

export default Estracto;
