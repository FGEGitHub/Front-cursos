import { useState, useEffect } from "react";
import servicioPersonas from '../../services/personas';

import { Paper, CircularProgress, Typography, Box, TextField, InputLabel, Card, CardActions } from '@mui/material';
import {
    useMediaQuery,
    useTheme,
} from "@mui/material";
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
import Progreso from './progress'
import { height } from "@mui/system";
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
const styles2 = {
    paperr: {
        cursor: 'pointer',
        background: '#ffffff',
        color: '#bdbdbd',
        border: '1px dashed #ccc',
        padding: 10,
        width: '100%',
        maxWidth: 400,
        margin: '20px auto', // Margen superior e inferior de 20px, centrado horizontalmente
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        alignItems: 'start',
        padding: 5,
        transform: 'scale(0.95)', /* Esto escalará el contenido al 50% del tamaño original */
       // transform-origin: top left; 

    },





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
    const theme = useTheme();
    const [zoomLevel, setZoomLevel] = useState(0.5);
    const navigate = useNavigate();

    const getClients = async (e) => {
        if (e != '') {
            setLoading(true)
            const clients = await servicioPersonas.traerpersona(e);
            console.log(clients)
            await setExiste(clients);
            if (clients.length > 0) {
                setInscrip({ ...inscrip, dni: clients[0].dni, nombre: clients[0].nombre, apellido: clients[0].apellido, barrio: clients[0].barrio, direccion: clients[0].direccion, tel: clients[0].tel, mail: clients[0].mail });
            }

            //traerpersona
            setLoading(false)
        }


    };
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
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
    const islogo2 = {
        width: "50%",
        height: "50%",
        margin: 0,
        padding: 0,
        display: "flex",

    };
    const islogoc2 = {
        width: "50%",
        height: "50%",
        margin: 0,
        padding: 20,
        display: "flex",
    }


    const handleChange = (e) => {
        setInscrip({ ...inscrip, [e.target.name]: e.target.value });
        console.log(inscrip)
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
        <>
            {isMatch ? (
                <div >
                    <Paper
                        
                        className="aparecer-desde-abajo"
                        style={styles2.paperr}
                    >
                        <Box className="logo-container">
                            <img style={islogoc2} className="islogoc" src={Logocuqui} alt="logo" />
                            <img style={islogo2} src={Logoccari} alt="logo" />
                        </Box>
                        <Box className="logo-container">
                            <img style={islogo} src={Logoesme} alt="logo" />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" component="div" color="black">
                                <StyledParagraph>
                                    Sumate a las Ferias de la Escuela de Mujeres
                                    <br />

                                    Equipo CC ARI Corrientes

                                </StyledParagraph>
                            </Typography>
                        </Box>


                        <Box sx={{ textAlign: 'center', marginLeft: "2em", marginRight: "2em", }}>
                            <Typography variant="body2" color="textSecondary">
                                Por favor, ingresa tu DNI sin puntos.
                            </Typography>
                            <TextField
                                margin="dense"
                                id="name"
                                label="DNI (Sin puntos)"
                                name="dni"
                                onChange={handleChange1}

                                type="number"
                                variant="outlined"
                                style={{ width: '250px' }}

                            />



                            {existe.length > 0 ? <>
                                {loading ? <>
                                    <Carga />
                                </> : <></>}
                                {loading ? <>
                                    <Carga />
                                </> : <>


                                    <TextField

                                        defaultValue={existe[0].nombre}
                                        margin="dense"
                                        id="name"
                                        label="Nombre"
                                        name="nombre"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                        style={{ width: '250px' }}
                                    />

                                    <TextField
                                        defaultValue={existe[0].apellido}
                                        margin="dense"
                                        id="name"
                                        label="Apellido"
                                        name="apellido"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                        style={{ width: '250px' }}
                                    />



                                    <TextField
                                        defaultValue={existe[0].tel}
                                        margin="dense"
                                        id="name"
                                        label="Telefono."
                                        name="tel"
                                        onChange={handleChange}
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                        style={{ width: '250px' }}
                                    />
                                    <TextField
                                        defaultValue={existe[0].mail}
                                        margin="dense"
                                        id="name"
                                        label="Correo Electronico"
                                        name="mail"
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ width: '250px' }}
                                        variant="outlined"
                                    />
                                    <TextField

                                        defaultValue={existe[0].direccion}
                                        margin="dense"
                                        id="name"
                                        label="Domicilio"
                                        name="direccion"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                        style={{ width: '250px' }}
                                    />
                                    <TextField
                                        defaultValue={existe[0].barrio}
                                        margin="dense"
                                        id="name"
                                        label="Barrio"
                                        name="barrio"
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ width: '250px' }}
                                        variant="outlined"
                                    />

                                </>}
                            </> : <>

                                {loading ? <>
                                    <Carga />
                                </> : <>

                                    <TextField
                                        style={{ width: '250px' }}

                                        margin="dense"
                                        id="name"
                                        label="Nombre"
                                        name="nombre"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                    />
                                    {inscrip.nombre ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Nombre
                                    </Typography></>}
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Apellido"
                                        name="apellido"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                        style={{ width: '250px' }}
                                    />
                                    {inscrip.apellido ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Apellido
                                    </Typography></>}


                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Telefono"
                                        name="tel"
                                        onChange={handleChange}
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                        style={{ width: '250px' }}
                                    />
                                    {inscrip.apellido ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu telefono
                                    </Typography></>}
                                    <TextField

                                        margin="dense"
                                        id="name"
                                        label="Correo Electronico"
                                        name="mail"
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ width: '250px' }}
                                        variant="outlined"
                                    />
                                    {inscrip.mail ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Correo electronico
                                    </Typography>
                                    </>}
                                    <TextField


                                        margin="dense"
                                        id="name"
                                        label="Domicilio"
                                        name="direccion"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                        style={{ width: '250px' }}
                                    />
                                    {inscrip.direccion ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Direccion
                                    </Typography>
                                    </>}


                                    <TextField
                                        style={{ width: '250px' }}
                                        margin="dense"
                                        id="name"
                                        label="Barrio"
                                        name="barrio"
                                        onChange={handleChange}
                                        fullWidth

                                        variant="outlined"
                                    />
                                </>}
                            </>}

                            <TextField
                                style={{ width: '250px' }}
                                margin="dense"
                                id="name"
                                label="Telefono alternativo"
                                name="tel2"
                                onChange={handleChange}
                                fullWidth
                                type="number"
                                variant="outlined"
                            />

                            <br />

                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        <b>Datos adicionales que nos <br />
                                            interesaria saber de vos  </b>
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>


                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Nivel educativo alcanzado
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                        </Box>
                        <Box sx={{ textAlign: 'center', marginLeft: "1em", marginRight: "1em", }}>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'nivel_secundario',

                                }}
                                sx={'width:250px'}
                            >

<option value={'Sin determinar'} >Elegir</option>
                                <option value={'Universitario incompleto'}>Primario incompleto</option>
                                <option value={'Secundario completo'}>Secundario completo</option>
                                <option value={'Secundario incompleto'}>Secundario incompleto</option>
                                <option value={'Terciario completo'}>Terciario completo</option>
                                <option value={'Tericario incompleto'}>Tericario incompleto</option>
                                <option value={'Universitario incompleto'}>Universitario incompleto</option>
                                <option value={'Universitario completo'}>Universitario completo</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Actualmente se encuentra trabajando?
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
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Si'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                        Si
                                    </Typography>
                                </option>
                                <option value={'No'}>No</option>

                            </NativeSelect>
                            {inscrip.trabajo == "Si" ? <>
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            ¿Qué tipo de empleo posee?
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>
                                <InputLabel variant="outlined" >
                                    Formal se refiere a un empleo en relación <br />
                                    de dependencia, registrado o  <br />
                                    monotributista con acceso a  <br />
                                    seguridad social
                                </InputLabel>
                                <br />
                                <NativeSelect
                                    defaultValue={30}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'tipo_trabajo',
                                        id: 'uncontrolled-native',
                                    }}
                                    sx={'width:250px'}
                                >
                                    <option value={'Sin determinar'}>Elegir</option>



                                    <option value={'Formal'}>Formal</option>
                                    <option value={'Informal'}>Informal</option>

                                </NativeSelect>

                                <br />
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            ¿Qué tipo de empleo posee?
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>

                                <NativeSelect
                                    defaultValue={30}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'tipo_empleo',
                                        id: 'uncontrolled-native',
                                    }}
                                    sx={'width:250px'}
                                >
                                    <option value={'Sin determinar'}>Elegir</option>



                                    <option value={'Monotributista/cuenta propista'}>Monotributista/cuenta propista</option>
                                    <option value={'En relación de dependencia'}>En relación de dependencia</option>
                                    <option value={'Ambos'}>Ambos</option>
                                </NativeSelect>

                                <br />

                            </> : <></>}

                            Tipo de empleo
                            Monotributista/cuenta propista
                            En relación de dependencia
                            Ambos

                            <br />

                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
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
                                    name: 'hijos',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={'Si'}>Si</option>
                                <option value={'No'}>No</option>

                            </NativeSelect>

                            {inscrip.hijos == "Si" ? <>
                                <TextField
                                    style={{ width: '250px' }}
                                    margin="dense"
                                    id="name"
                                    label="Cantidad de hijos"
                                    name="cantidad_hijos"
                                    onChange={handleChange}
                                    fullWidth
                                    type="number"
                                    variant="outlined"
                                />
                            </> : <></>}

                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Participaste de algún curso de la <br />
                                        Escuela de Mujeres Emprendedoras<br />
                                        anteriormente?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'participante_anterior',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={'Si'}>Si</option>
                                <option value={'No'}>No</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Por qué elegiste tomar este curso?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'motivacion',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                 <option value={'Sin determinar'} >Elegir</option>

                                <option value={'Para iniciar mi propio emprendimiento o negocio'}>Para iniciar mi propio emprendimiento o negocio</option>
                                <option value={'Para potenciar mi idea de negocio o emprendimiento en curso'}>Para potenciar mi idea de negocio o emprendimiento en curso</option>
                                <option value={'Para continuar mi formación personal y agregar mas conocimientos'}>Para continuar mi formación personal y agregar mas conocimientos</option>
                                <option value={'Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral'}>Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral</option>
                                <option value={'Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó'}>Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó</option>

                            </NativeSelect>

                            <br />
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Seleccionar prioridad 1
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'prioridad1',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={132}>Elaboración de mesa de dulces para eventos</option>
                                <option value={133}>Maquillaje y peinado para eventos</option>
                                <option value={134}>Diseño de lenceria femenina</option>
                                <option value={135}>Textiles y accesorios para el verano</option>
                                <option value={136}>Refacción integral para el hogar</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Seleccionar prioridad 2
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'prioridad2',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={132}>Elaboración de mesa de dulces para eventos</option>
                                <option value={133}>Maquillaje y peinado para eventos</option>
                                <option value={134}>Diseño de lenceria femenina</option>
                                <option value={135}>Textiles y accesorios para el verano</option>
                                <option value={136}>Refacción integral para el hogar</option>

                            </NativeSelect>

                        </Box>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            {cargando ? <> <Progreso /> </> : <>
                                {inscrip.nombre && inscrip.apellido && inscrip.dni && inscrip.tipo_empleo && inscrip.tel && inscrip.tel2 && inscrip.direccion && inscrip.trabajo && inscrip.mail && inscrip.nivel_secundario && inscrip.prioridad1 && inscrip.prioridad2 ?
                                    <>
                                        {inscrip.trabajo === 'Si' ? <>

                                            {inscrip.tipo_empleo && inscrip.tipo_trabajo ? <>
                                                {/*  Caso que sea trabajo si  y completo le tipo  */}

                                                {inscrip.hijos === 'Si' ? <>

                                                    {inscrip.cantidad_hijos ? <>
                                                        {/*  Caso que sea hijos si y selecciono cuantos  */}


                                                        <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button>

                                                    </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                                </> : <>
                                                    {/*  Caso que sea hijos no */}
                                                    <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button>  </>}
                                              

                                            </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                        </> : <>
                                            {/*  Caso que sea trabajo no */}
                                            <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button>  </>}
                                    </>
                                    : <> <Button variant='contained' disabled>Enviar Inscripcion</Button> <br /><p>Completar todos los datos</p></>}
                            </>}

                        </CardActions>
                    </Paper>
                </div>
            ) : (

                <div >
                    <Paper
                        className="aparecer-desde-abajo"
                        style={styles.paperr}
                    >
                        <Box className="logo-container">
                            <img style={islogoc} className="islogoc" src={Logocuqui} alt="logo" />
                            <img style={islogo} src={Logoccari} alt="logo" />
                        </Box>
                        <Box className="logo-container">
                            <img style={islogo} src={Logoesme} alt="logo" />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="p" component="div" color="black">
                                <StyledParagraph>
                                    Sumate a las Ferias de la Escuela de Mujeres
                                    <br />

                                    Equipo CC ARI Corrientes

                                </StyledParagraph>
                            </Typography>
                        </Box>


                        <Box sx={{ textAlign: 'left', marginLeft: "1em", marginRight: "1em", }}>
                            <Typography variant="body2" color="textSecondary">
                                Por favor, ingresa tu DNI sin puntos
                            </Typography>
                            <TextField
                                margin="dense"
                                id="name"
                                label="DNI (SIN PUNTOS)"
                                name="dni"
                                onChange={handleChange1}
                                fullWidth
                                type="number"
                                variant="outlined"
                                fontFamily="Montserrat"
                            />



                            {existe.length > 0 ? <>
                                {loading ? <>
                                    <Carga />
                                </> : <></>}
                                {loading ? <>
                                    <Carga />
                                </> : <>


                                    <TextField

                                        defaultValue={existe[0].nombre}
                                        margin="dense"
                                        id="name"
                                        label="Nombre"
                                        name="nombre"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
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
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                    />



                                    <TextField
                                        defaultValue={existe[0].tel}
                                        margin="dense"
                                        id="name"
                                        label="Telefono."
                                        name="tel"
                                        onChange={handleChange}
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                    />
                                    <TextField
                                        defaultValue={existe[0].mail}
                                        margin="dense"
                                        id="name"
                                        label="Correo Electronico"
                                        name="mail"
                                        onChange={handleChange}
                                        fullWidth

                                        variant="outlined"
                                    />
                                    <TextField
                                        defaultValue={existe[0].barrio}
                                        margin="dense"
                                        id="name"
                                        label="Barrio"
                                        name="barrio"
                                        onChange={handleChange}
                                        fullWidth

                                        variant="outlined"
                                    />

                                </>}
                            </> : <>

                                {loading ? <>
                                    <Carga />
                                </> : <>
                                    <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Nombre
                                    </Typography>
                                    <TextField


                                        margin="dense"
                                        id="name"
                                        label="Nombre"
                                        name="nombre"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                    />
                                    {inscrip.nombre ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Nombre
                                    </Typography></>}

                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Apellido"
                                        name="apellido"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                    />

                                    {inscrip.apellido ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Apellido
                                    </Typography></>}

                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Telefono"
                                        name="tel"
                                        onChange={handleChange}
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                    />
                                    {inscrip.apellido ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu telefono
                                    </Typography></>}
                                    <TextField

                                        margin="dense"
                                        id="name"
                                        label="Correo Electronico"
                                        name="mail"
                                        onChange={handleChange}
                                        fullWidth

                                        variant="outlined"
                                    />
                                    {inscrip.direccion ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Direccion de Email
                                    </Typography>
                                    </>}
                                    <TextField


                                        margin="dense"
                                        id="name"
                                        label="Domicilio"
                                        name="direccion"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        fontFamily="Montserrat"
                                        style={{ width: '250px' }}
                                    />
                                    {inscrip.direccion ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Direccion
                                    </Typography>
                                    </>}
                                    <TextField

                                        margin="dense"
                                        id="name"
                                        label="Barrio"
                                        name="barrio"
                                        onChange={handleChange}
                                        fullWidth

                                        variant="outlined"
                                    />
                                    {inscrip.barrio ? <></> : <>  <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu Barrio
                                    </Typography>
                                    </>}
                                </>}
                            </>}

                            <TextField

                                margin="dense"
                                id="name"
                                label="Telefono alternativo"
                                name="tel2"
                                onChange={handleChange}
                                fullWidth
                                type="number"
                                variant="outlined"
                            />

                            <br />

                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        <b>Datos adicionales que nos interesaria saber de vos</b>
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                        </Box>
                        <Box sx={{ textAlign: 'center', marginLeft: "1em", marginRight: "1em", }}>

                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="h5" component="div" color="black">
                                    <StyledParagraph>
                                        Nivel educativo alcanzado
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                        </Box>
                        <Box sx={{ textAlign: 'center', marginLeft: "1em", marginRight: "1em", }}>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'nivel_secundario',

                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>
                                <option value={'Universitario incompleto'}>Primario incompleto</option>
                                <option value={'Secundario completo'}>Secundario completo</option>
                                <option value={'Secundario incompleto'}>Secundario incompleto</option>
                                <option value={'Terciario completo'}>Terciario completo</option>
                                <option value={'Tericario incompleto'}>Tericario incompleto</option>
                                <option value={'Universitario incompleto'}>Universitario incompleto</option>
                                <option value={'Universitario completo'}>Universitario completo</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="h5" component="div" color="black">
                                    <StyledParagraph>
                                        ¿Actualmente se encuentra trabajando?
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
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Si'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                        Si
                                    </Typography>
                                </option>
                                <option value={'No'}>No</option>

                            </NativeSelect>

                            {inscrip.trabajo == "Si" ? <>
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="h5" component="div" color="black">
                                        <StyledParagraph>
                                            ¿Qué tipo de empleo posee?
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>
                                <InputLabel variant="outlined" >
                                    Formal se refiere a un empleo en relación de dependencia,<br />
                                    registrado o monotributista con acceso a seguridad social
                                </InputLabel>
                                <br />
                                <NativeSelect
                                    defaultValue={30}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'tipo_trabajo',
                                        id: 'uncontrolled-native',
                                    }}
                                    sx={'width:250px'}
                                >
                                    <option value={'Sin determinar'}>Elegir</option>

                                    <option value={'Formal'}>Formal</option>
                                    <option value={'Informal'}>Informal</option>

                                </NativeSelect>
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            ¿Qué tipo de empleo posee?
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>

                                <NativeSelect
                                    defaultValue={30}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'tipo_empleo',
                                        id: 'uncontrolled-native',
                                    }}
                                    sx={'width:250px'}
                                >
                                    <option value={'Sin determinar'}>Elegir</option>



                                    <option value={'Monotributista/cuenta propista'}>Monotributista/cuenta propista</option>
                                    <option value={'En relación de dependencia'}>En relación de dependencia</option>
                                    <option value={'Ambos'}>Ambos</option>
                                </NativeSelect>
                            </> : <></>}

                            <br />





                            <br />
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
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
                                    name: 'hijos',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'} >Elegir</option>
                                <option value={'Si'}>
                                    <Typography variant="body1" component="div" color="black" fontFamily="Montserrat" >
                                        Si
                                    </Typography>
                                </option>
                                <option value={'No'}>No</option>

                            </NativeSelect>

                               
                            {inscrip.hijos == "Si" ? <>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Cuantos hijos?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>
                        
                                <TextField
                                    style={{ width: '250px' }}
                                    margin="dense"
                                    id="name"
                                    label="Cantidad de hijos"
                                    name="cantidad_hijos"
                                    onChange={handleChange}
                                    fullWidth
                                    type="number"
                                    variant="outlined"
                                />
                            </> : <></>}


                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Participaste de algún curso de la <br />
                                        Escuela de Mujeres Emprendedoras<br />
                                        anteriormente?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'participante_anterior',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={'Si'}>Si</option>
                                <option value={'No'}>No</option>

                            </NativeSelect>
                            <br />

                            <br />
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Por qué elegiste tomar este curso?
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'motivacion',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={'Para iniciar mi propio emprendimiento o negocio'}>Para iniciar mi propio emprendimiento o negocio</option>
                                <option value={'Para potenciar mi idea de negocio o emprendimiento en curso'}>Para potenciar mi idea de negocio o emprendimiento en curso</option>
                                <option value={'Para continuar mi formación personal y agregar mas conocimientos'}>Para continuar mi formación personal y agregar mas conocimientos</option>
                                <option value={'Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral'}>Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral</option>
                                <option value={'Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó'}>Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Seleccionar prioridad 1
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'prioridad1',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={132}>Elaboración de mesa de dulces para eventos</option>
                                <option value={133}>Maquillaje y peinado para eventos</option>
                                <option value={134}>Diseño de lenceria femenina</option>
                                <option value={135}>Textiles y accesorios para el verano</option>
                                <option value={136}>Refacción integral para el hogar</option>

                            </NativeSelect>
                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                <Typography variant="p" component="div" color="black">
                                    <StyledParagraph>
                                        Seleccionar prioridad 2
                                    </StyledParagraph>
                                </Typography>
                            </InputLabel>

                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'prioridad2',
                                    id: 'uncontrolled-native',
                                }}
                                sx={'width:250px'}
                            >
                                <option value={'Sin determinar'}>Elegir</option>

                                <option value={132}>Elaboración de mesa de dulces para eventos</option>
                                <option value={133}>Maquillaje y peinado para eventos</option>
                                <option value={134}>Diseño de lenceria femenina</option>
                                <option value={135}>Textiles y accesorios para el verano</option>
                                <option value={136}>Refacción integral para el hogar</option>

                            </NativeSelect>

                        </Box>
                        <br />
                        <CardActions sx={{ justifyContent: 'center' }}>
                            {cargando ? <> <Progreso /> </> : <>
                                {inscrip.nombre && inscrip.apellido && inscrip.dni && inscrip.tipo_empleo && inscrip.tel && inscrip.tel2 && inscrip.direccion && inscrip.trabajo && inscrip.mail && inscrip.nivel_secundario && inscrip.prioridad1 && inscrip.prioridad2 ?
                                    <>
                                        {inscrip.trabajo === 'Si' ? <>

                                            {inscrip.tipo_empleo && inscrip.tipo_trabajo ? <>
                                                {/*  Caso que sea trabajo si  y completo le tipo  */}

                                                {inscrip.hijos === 'Si' ? <>

                                                    {inscrip.cantidad_hijos ? <>
                                                        {/*  Caso que sea hijos si y selecciono cuantos  */}


                                                        <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button>

                                                    </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                                </> : <>
                                                    {/*  Caso que sea hijos no */}
                                                    <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button>  </>}
                                                

                                            </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                        </> : <>
                                            {/*  Caso que sea trabajo no */}
                                            <Button variant='contained' onClick={Inscribir}>Enviar Inscripcion</Button>  </>}
                                    </>
                                    : <> <Button variant='contained' disabled>Enviar Inscripcion</Button> <br /><p>Completar todos los datos</p></>}
                            </>}

                        </CardActions>
                    </Paper>
                </div>)
            }
        </>
    );
};

export default Estracto;
