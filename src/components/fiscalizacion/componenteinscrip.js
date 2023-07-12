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
    const rta = await servicioFisca.enviarinscripcion(inscrip);
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
          ¡Sé parte activa de la democracia y sé fiscal de mesa el 13 de agosto! 
          Tu compromiso es esencial para garantizar un proceso electoral transparente y justo. 
          Demuestra tu responsabilidad cívica y protege la democracia desde adentro. 
        
            ¡Inscribite acá!

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

      {inscrip.como_se_entero === 'Amigo' && (
        <>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            ¿Cómo se llama ese amigo?
          </InputLabel>
          <TextField
            
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

      {['Amigo', 'Sin determinar', 'Flyer', 'Pagina web', null].indexOf(inscrip.como_se_entero) === -1 && (
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

      <br /> 
      <img style={{ width: '100%', maxWidth: '500px' }} src={folleto} alt="logo" />
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        <Typography variant="p" component="div" color="black">
          <StyledParagraph>
            <b>¿Fuiste fiscal en las elecciones del  11/06/2023?</b>
          </StyledParagraph>
        </Typography>
      </InputLabel> 
      
      <NativeSelect
        defaultValue={30}
        onChange={handleChange}
        inputProps={{
          name: 'asignado_ant',
          id: 'uncontrolled-native',
        }}
      >
        <option value={'Sin determinar'}>Elegir</option>
      
        <option value={'Si'}>Si</option>
        <option value={'No'}>No</option>
       
      </NativeSelect>
    <br/>
    
      <CardActions>
      {/* Acciones: */}
        {inscrip.nombre && inscrip.apellido && inscrip.dni && inscrip.telefono && inscrip.como_se_entero && inscrip.asignado_ant ? 

        <>  {inscrip.como_se_entero === "Amigo" ? <>  
        
        {inscrip.nombre_referido && inscrip.nombre_referido ? <> {/*Obligacion nobre ref */}<Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button> </>:<><Button variant='contained' disabled>Enviar Inscripcion</Button></> }
         </>:<> {/*Se entero por otro medio */}<Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button> </>} 
        
        </>:<><Button variant='contained' disabled>Enviar Inscripcion</Button></>}
      
      </CardActions>
    </Paper>

  
  );
};

export default Estracto;
