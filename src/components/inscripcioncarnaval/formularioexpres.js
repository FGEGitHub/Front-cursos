import { useState } from "react";
import servicioPersonas from '../../services/personas';
import Dialogo from './dialogo'
import { Paper, Typography, Box, TextField, InputLabel, Select, CardActions } from '@mui/material';
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
//import Logoesme from '../../Assets/carnaval.png';
import Logoesme from '../../Assets/carnaval.png';
import Logocuqui from '../../Assets/logocuqui.webp';
import Logoccari from '../../Assets/logoccari.webp';
import styled from 'styled-components';
import Progreso from './progress'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
        //gridTemplateRows: 'auto 1fr',
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
    const [inscrip, setInscrip] = useState({ profesion: "No" });
    const theme = useTheme();
    const [zoomLevel, setZoomLevel] = useState(0.5);
    const navigate = useNavigate();
    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
    });

    const handleCheckboxChange = (option) => (event) => {
        setOptions({ ...options, [option]: event.target.checked });
    };
    const getClients = async (e) => {
        if (e != '') {
            setLoading(true)
            const clients = await servicioPersonas.traerpersona(e);
            console.log(clients)
            await setExiste(clients);
            if (clients.length > 0) {
                setInscrip({ ...inscrip, dni: clients[0].dni, nombre: clients[0].nombre, apellido: clients[0].apellido, barrio: clients[0].barrio, direccion: clients[0].direccion, localidad: clients[0].localidad, tel: clients[0].tel });
            }

            //traerpersona
            setLoading(false)
        }


    };
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

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
        const rta = await servicioPersonas.enviarinscripcioncarnaval(inscrip);
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

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body1" component="div" color="black">
                                <StyledParagraph>
                                    La Escuela de Mujeres Emprendedoras nace desde la Mesa de Género de la Coalición Cívica ARI - Corrientes, liderada por <b>Hugo "Cuqui" Calvano</b>, con el objetivo de ofrecer herramientas para lograr una rápida salida laboral. A través de este espacio brindaremos capacitaciones gratuitas (certificadas) para el empoderamiento de las mujeres, impulsando la formación y promoviendo la igualdad de oportunidades.      </StyledParagraph>
                                En esta oportunidad te ofrecemos dos talleres, el de <b>Catering para eventos y fotoproducto y redes sociales</b>

                                <StyledParagraph>
                                    ¿A quién está dirigido? <br />
                                    👩‍🎓  Mujeres que desean aprender más herramientas para su oficio.
                                    <br />
                                    28 y 29 de julio - Fotoproducto y redes sociales 16 a 18hs en pasaje Álvarez 838.<br />

                                    30 y 31 de julio - catering de eventos de 16 a 18hs en pasaje Álvarez 838.<br />

                                  

                                </StyledParagraph>
                            </Typography>

                        </Box>


                        <Box sx={{ textAlign: 'center', marginLeft: "2em", marginRight: "2em", }}>

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
                            <Typography variant="body2" color="textSecondary">
                                Por favor, ingresa tu DNI sin puntos.
                            </Typography>


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
                                label="Localidad"
                                name="localidad"
                                onChange={handleChange}
                                fullWidth

                                variant="outlined"
                            />

                            <br />
                            <br />
                            <TextField

                                onChange={handleChange}
                                name="fecha_nac"
                                id="date"
                                label="Fecha de Nacimiento"
                                type="date"
                                defaultValue="1990-01-01"
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            {/*  */}

       <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿A cual curso te gustaria anotarte?</Typography>
                            <Select
                                labelId="quiereEnsenar-label"

                                name="curso"

                                label="¿A cual curso te gustaria anotarte?"
                                onChange={handleChange}
                            >
                               {/*  <MenuItem value="Armado de peluche capibara">Armado de peluche capibara - 23 y 24 de julio </MenuItem> */}
                            <MenuItem value="Catering para eventos">Catering para eventos - 30 y 31 de julio </MenuItem>
                                <MenuItem value=" Fotoproducto y redes sociales"> Fotoproducto y redes sociales - 28 y 29 de julio </MenuItem>

                            </Select>

                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Fuiste alumna de la Escuela de Mujeres Emprendedoras?</Typography>
                            <Select
                                labelId="fueAlumna-label"
                                id="fueAlumna"
                                name="alumna_anterior"
                                style={{ width: '250px' }}

                                label="¿Fuiste alumna?"
                                onChange={handleChange}
                            >
                                <MenuItem value="si">Si</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>


                            {/* Profesión u oficio */}
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Tenes alguna profesion u Oficio?</Typography>
                            <Select
                                labelId="fueAlumna-label"
                                id="fueAlumna"
                                name="profesion"

                                label="¿Tenes alguna profesion u Oficio?"
                                onChange={handleChange}
                            >
                                <MenuItem value="Si">Sí</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>

                            {/* ¿Te gustaría enseñarlo? solo si hay profesión */}
                            {inscrip.profesion != 'No' && inscrip.profesion != '' && (
                                <>          <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Cual?</Typography>

                                    <TextField
                                        margin="dense"
                                        id="cursoDeseado"
                                        label="- ¿¿Cual?"
                                        name="profesion"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Te gustaría enseñarlo?</Typography>
                                    <Select
                                        labelId="quiereEnsenar-label"
                                        style={{ width: '250px' }}

                                        name="enseniar"

                                        label="¿Te gustaría enseñarlo?"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="si">Sí</MenuItem>
                                        <MenuItem value="no">No</MenuItem>
                                    </Select>
                                </>
                            )}

                            {/* ¿Tenés espacio para talleres? */}
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Tenes algún lugar y/o espacio para que realicemos algún taller?</Typography>
                            <Select
                                labelId="quiereEnsenar-label"

                                name="tiene_espacio"

                                label="¿Tenes algún lugar y/o espacio para que realicemos algún taller?"
                                onChange={handleChange}
                            >
                                <MenuItem value="si">Sí</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>

                            {/* ¿Qué otro curso te gustaría hacer? */}
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }} >¿Qué otro curso de te gustaría hacer?</Typography>
                            <TextField
                                style={{ width: '250px' }}
                                margin="dense"
                                id="cursoDeseado"
                                label="- ¿Qué otro curso de te gustaría hacer?"
                                name="curso_adic"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }} >¿ Te gustaria que te agreguemos a la comunidad whatsapp ?</Typography>


                            <Select
                                labelId="fueAlumna-label"
                                id="fueAlumna"
                                name="agregar_whatsap"

                                label="¿Tenes alguna profesion u Oficio?"
                                onChange={handleChange}
                            >
                                <MenuItem value="Si">Sí</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </Box>

                        <CardActions sx={{ justifyContent: 'center' }}>
                            {cargando ? <> <Progreso /> </> : <>
                                {inscrip.nombre &&
                                    inscrip.apellido &&
                                    inscrip.dni &&
                                     inscrip.curso &&
                                    inscrip.fecha_nac &&
                                    inscrip.tel &&
                                    inscrip.localidad &&
                                    inscrip.direccion &&
                                    inscrip.alumna_anterior &&
                                    inscrip.tiene_espacio &&
                                    inscrip.curso_adic &&
                                    inscrip.agregar_whatsap &&
                                    (
                                        inscrip.profesion === "No" ||
                                        (inscrip.profesion !== "" && inscrip.profesion !== "Si") ||
                                        (inscrip.profesion === "Si" && inscrip.enseniar)
                                    ) ?
                                    <>
                                        {inscrip.tel.length > 9 ? <>
                                            <Dialogo formulario={inscrip}
                                                opciones={options} />
                                        </> : <>Telefono no valido</>}
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

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body1" component="div" color="black">
                                <StyledParagraph>
                                    La Escuela de Mujeres Emprendedoras nace desde la Mesa de Género de la Coalición Cívica ARI - Corrientes, liderada por <b>Hugo "Cuqui" Calvano</b>, con el objetivo de ofrecer herramientas para lograr una rápida salida laboral. A través de este espacio brindaremos capacitaciones gratuitas (certificadas) para el empoderamiento de las mujeres, impulsando la formación y promoviendo la igualdad de oportunidades.      </StyledParagraph>
                                En esta oportunidad te ofrecemos dos talleres, el de <b>Catering para eventos y fotoproducto y redes sociales</b>
                                <StyledParagraph>
                                    ¿A quién está dirigido? <br />
                                    👩‍🎓  Mujeres que desean aprender más herramientas para su oficio.
                                    <br />
                                    28 y 29 de julio - Fotoproducto y redes sociales 16 a 18hs en pasaje Álvarez 838.<br />

                                    30 y 31 de julio - catering de eventos de 16 a 18hs en pasaje Álvarez 838.<br />

                                  

                                </StyledParagraph>
                            </Typography>  </Box>


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
                                style={{ width: '250px' }}
                                margin="dense"
                                id="name"
                                label="Localidad"
                                name="localidad"
                                onChange={handleChange}
                                fullWidth

                                variant="outlined"
                            />

                            <br />
                            <br />
                            <TextField

                                onChange={handleChange}
                                name="fecha_nac"
                                id="date"
                                label="Fecha de Nacimiento"
                                type="date"
                                defaultValue="1990-01-01"
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿A cual curso te gustaria anotarte?</Typography>
                            <Select
                                labelId="quiereEnsenar-label"

                                name="curso"

                                label="¿A cual curso te gustaria anotarte?"
                                onChange={handleChange}
                            >
                               {/*  <MenuItem value="Armado de peluche capibara">Armado de peluche capibara - 23 y 24 de julio </MenuItem> */}
                                <MenuItem value="Catering para eventos">Catering para eventos - 30 y 31 de julio </MenuItem>
                                <MenuItem value=" Fotoproducto y redes sociales"> Fotoproducto y redes sociales - 28 y 29 de julio </MenuItem>
                            </Select>
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Fuiste alumna de la Escuela de Mujeres Emprendedoras?</Typography>

                            <Select
                                labelId="fueAlumna-label"
                                id="fueAlumna"
                                name="alumna_anterior"
                                style={{ width: '250px' }}

                                label="¿Fuiste alumna?"
                                onChange={handleChange}
                            >
                                <MenuItem value="si">Si</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>


                            {/* Profesión u oficio */}
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Tenes alguna profesion u Oficio?</Typography>
                            <Select
                                labelId="fueAlumna-label"
                                id="fueAlumna"
                                name="profesion"

                                label="¿Tenes alguna profesion u Oficio?"
                                onChange={handleChange}
                            >
                                <MenuItem value="Si">Sí</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>

                            {/* ¿Te gustaría enseñarlo? solo si hay profesión */}
                            {inscrip.profesion != 'No' && inscrip.profesion != '' && (
                                <>          <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Cual?</Typography>

                                    <TextField
                                        margin="dense"
                                        id="cursoDeseado"
                                        label="- ¿¿Cual?"
                                        name="profesion"
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Te gustaría enseñarlo?</Typography>
                                    <Select
                                        labelId="quiereEnsenar-label"
                                        style={{ width: '250px' }}

                                        name="enseniar"

                                        label="¿Te gustaría enseñarlo?"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="si">Sí</MenuItem>
                                        <MenuItem value="no">No</MenuItem>
                                    </Select>
                                </>
                            )}

                            {/* ¿Tenés espacio para talleres? */}
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>¿Tenes algún lugar y/o espacio para que realicemos algún taller?</Typography>
                            <Select
                                labelId="quiereEnsenar-label"

                                name="tiene_espacio"

                                label="¿Tenes algún lugar y/o espacio para que realicemos algún taller?"
                                onChange={handleChange}
                            >
                                <MenuItem value="si">Sí</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>

                            {/* ¿Qué otro curso te gustaría hacer? */}
                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }} >¿Qué otro curso de te gustaría hacer?</Typography>
                            <TextField
                                style={{ width: '250px' }}
                                margin="dense"
                                id="cursoDeseado"
                                label="- ¿Qué otro curso de te gustaría hacer?"
                                name="curso_adic"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />

                            <Typography style={{ fontSize: '18px', color: 'black', fontWeight: 500 }} >¿ Te gustaria que te agreguemos a la comunidad whatsapp ?</Typography>


                            <Select
                                labelId="fueAlumna-label"
                                id="fueAlumna"
                                name="agregar_whatsap"

                                label="¿Tenes alguna profesion u Oficio?"
                                onChange={handleChange}
                            >
                                <MenuItem value="Si">Sí</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>

                        </Box>


                        <CardActions sx={{ justifyContent: 'center' }}>
                            {cargando ? <> <Progreso /> </> : <>
                                {inscrip.nombre &&
                                    inscrip.apellido &&
                                    inscrip.dni &&
                                     inscrip.curso &&
                                    inscrip.fecha_nac &&
                                    inscrip.tel &&
                                    inscrip.localidad &&
                                    inscrip.direccion &&
                                    inscrip.alumna_anterior &&
                                    inscrip.tiene_espacio &&
                                    inscrip.curso_adic &&
                                    inscrip.agregar_whatsap &&


                                    (
                                        inscrip.profesion === "No" ||
                                        (inscrip.profesion !== "" && inscrip.profesion !== "Si") ||
                                        (inscrip.profesion === "Si" && inscrip.enseniar)
                                    ) ?
                                    <>
                                        {inscrip.tel.length > 9 ? <>
                                            <Dialogo formulario={inscrip}
                                                opciones={options} />
                                        </> : <>Telefono no valido</>}
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