import { useState, useEffect } from "react";
import servicioPersonas from '../../services/personas';
import { Paper, CircularProgress, Typography, Box, TextField, InputLabel, Card, CardActions } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import * as React from 'react';
import Carga from './carga'
import MuiAlert from '@mui/material/Alert';
import Logoesme from '../../Assets/logoesme.webp';
import Logocuqui from '../../Assets/logocuqui.webp';
import Logoccari from '../../Assets/logoccari.webp';
import styled from 'styled-components';
const styles = {
    paperr: {
      cursor: 'pointer',
      background: '#ffffff',
      color: '#bdbdbd',
      border: '1px dashed #ccc',
      padding: 10,
      width: '100%',
      maxWidth: 600,
      margin: '20px auto', // Margen superior e inferior de 20px, centrado horizontalmente
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      alignItems: 'start',
    },
    '@media (maxWidth: 600px)': {
        paperr: { // Debes anidar los estilos bajo una clave específica
        padding: 5,
        maxWidth: '100%',
       
        margin: 0,
      }
    }
  };
  
  
  
const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

const Estracto = () => {
    const [cargando, setCargando] = useState(false);
    const [loading, setLoading] = useState(false);
    const [existe, setExiste] = useState([]);
    const [inscrip, setInscrip] = useState(['']);
    const [activo, setActivo] = useState(false);
    const navigate = useNavigate();

    const getClients = async (e) => {
       
        const clients = await servicioPersonas.traerpersona(e);
        console.log(clients)
        await setExiste(clients);
        //traerpersona
       
        console.log(existe.apellido)
     
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        // getClients();
    }, []);
    const islogo = {
        width: "40%",  
        height: "40%",  
        margin: 0,
        padding: 0,
        display: "flex",
                
        };
        const islogoc = {
            width: "50%",  
            height: "50%",   
            margin: 0,
            padding: 20,
            display: "flex",
        }
      
     
    const handleChange = (e) => {
        setInscrip({ ...inscrip, [e.target.name]: e.target.value });
    };
    const handleChange1 = (e) => {
        setInscrip({ ...inscrip, [e.target.name]: e.target.value });
        getClients(e.target.value)
    };

    const Inscribir = async (event) => {
        setCargando(true);
        const rta = await servicioPersonas.enviarinscripcion(inscrip);
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
       
        style={styles.paperr}
        >
            <Box className="logo-container">
            <img style={islogoc}   className="islogoc"   src={Logocuqui} alt="logo" /> 
            <img style={islogo} src={Logoccari} alt="logo" /> 
            </Box>
            <Box className="logo-container">
            <img style={islogo} src={Logoesme} alt="logo" /> 
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div" color="black">
                    <StyledParagraph>
                    Sumate a las Ferias de la Escuela de Mujeres
                        <br />

                        Equipo CC ARI Corrientes

                    </StyledParagraph>
                </Typography>
            </Box>
     
      
      <Box sx={{ textAlign: 'center',marginLeft: "2em",marginRight: "2em", }}>
            <TextField
                margin="dense"
                id="name"
                label="DNI (SIN PUNTOS)"
                name="dni"
                onChange={handleChange1}
                fullWidth
                type="number"
                variant="standard"
                fontFamily="Montserrat"
            />

      

            {existe.length > 0 ? <>
                {loading ? <>
                    <Carga/>
                    </>:<></>}
                    {loading ? <>
                        <Carga/>
                    </>:<>

               
                <TextField

                    defaultValue={existe[0].nombre}
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
                    defaultValue={existe[0].apellido}
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
                    defaultValue={existe[0].tel}
                    margin="dense"
                    id="name"
                    label="Telefono."
                    name="telefono"
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    variant="standard"
                />
                       <TextField
                    defaultValue={existe[0].mail}
                    margin="dense"
                    id="name"
                    label="Correo Electronico"
                    name="mail"
                    onChange={handleChange}
                    fullWidth
                    
                    variant="standard"
                />
                       <TextField
                    defaultValue={existe[0].barrio}
                    margin="dense"
                    id="name"
                    label="Barrio"
                    name="barrio"
                    onChange={handleChange}
                    fullWidth
                   
                    variant="standard"
                />
                
                </>}
            </> : <>

            {loading ? <>
                    <Carga/>
                    </>:<>
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
                    label="Correo Electronico"
                    name="mail"
                    onChange={handleChange}
                    fullWidth
                    
                    variant="standard"
                />
                       <TextField
                    
                    margin="dense"
                    id="name"
                    label="Barrio"
                    name="barrio"
                    onChange={handleChange}
                    fullWidth
                   
                    variant="standard"
                />
                </>}
            </>}

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
                        <b>Datos adicionales</b>
                    </StyledParagraph>
                </Typography>
            </InputLabel>
          
        
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                <Typography variant="h5" component="div" color="black">
                    <StyledParagraph>
                        Nivel educativo
                    </StyledParagraph>
                </Typography>
            </InputLabel>
            </Box>
            <Box sx={{ textAlign: 'center',marginLeft: "2em",marginRight: "2em", }}>
            <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                    name: 'nivel_secundario',
                    
                }}
                sx={ 'width:200px' }
            >
                <option value={'Sin determinar'}>Elegir</option>
                <option value={'Secundario'}>
                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                        Secundario
                    </Typography>
                </option>
                <option value={'Amigo'}>Universitario incompleto</option>
                <option value={'Amigo'}>Universitario completo</option>
                
            </NativeSelect>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                <Typography variant="h5" component="div" color="black">
                    <StyledParagraph>
                       Trabajas?
                    </StyledParagraph>
                </Typography>
            </InputLabel>
            <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                    name: 'trabajo',
                    id: 'uncontrolled-native',
                }}
                sx={ 'width:200px' }
            >
                <option value={'Sin determinar'} >Elegir</option>
                <option value={'si'}>
                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                       Si
                    </Typography>
                </option>
                <option value={'No'}>No</option>
             
            </NativeSelect>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                <Typography variant="h5" component="div" color="black">
                    <StyledParagraph>
                      Tipo de trabajo
                    </StyledParagraph>
                </Typography>
            </InputLabel>
            <NativeSelect
                defaultValue={30}
                onChange={handleChange}
                inputProps={{
                    name: 'tipo_trabajo',
                    id: 'uncontrolled-native',
                }}
                sx={ 'width:200px' }
            >
                <option value={'Sin determinar'}>Elegir</option>
                <option value={'Flyer'}>
                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                        Lo vi en un Flyer
                    </Typography>
                </option>
                <option value={'Pagina web'}>Formal</option>
                <option value={'Amigo'}>Informal</option>
               
            </NativeSelect>


            <br />

           

       

            <br />

            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                <Typography variant="p" component="div" color="black">
                    <StyledParagraph>
                       Tenes hijos
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
                sx={ 'width:200px' }
            >
                <option value={'Sin determinar'}>Elegir</option>

                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

            </NativeSelect>
          
            <br />
            </Box>
            <CardActions>
                {/* Acciones: */}
                {inscrip.nombre && inscrip.apellido && inscrip.dni && inscrip.telefono && inscrip.como_se_entero && inscrip.asignado_ant ?

                    <>  {inscrip.como_se_entero === "Amigo" ? <>

                        {inscrip.nombre_referido && inscrip.nombre_referido ? <> {/*Obligacion nobre ref */}{/* <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button> */} </> : <>{/* <Button variant='contained' disabled>Enviar Inscripcion</Button> */}</>}
                    </> : <>{/*  <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button> */} </>}

                    </> : <>{/* <Button variant='contained' disabled>Enviar Inscripcion</Button> */}</>}

            </CardActions>
        </Paper>


    );
};

export default Estracto;
