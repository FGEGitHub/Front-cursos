import { useState, useEffect, useRef } from "react";
import servicioPersonas from '../../services/personas';
import servicioTurnos from '../../services/turnos';
import Dialogo from './dialogo'
import { Paper, CircularProgress, Typography, Box, TextField, InputLabel, Card, CardActions, FormControlLabel, FormControl, Radio, RadioGroup } from '@mui/material';
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
        fontSize: '16px',
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
        transform: 'scale(0.90)', /* Esto escalará el contenido al 50% del tamaño original */
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
    const paperRef = useRef(null);
    const [cohortes, setCohorte] = useState();
    const [dni, setDni] = useState(''); // Guardar el valor de DNI
    const theme = useTheme();
    const [formVisible, setFormVisible] = useState(false); // Nuevo estado
  
    const getClients = async (dni) => {
        setLoading(true);
        const clients = await servicioPersonas.traerpersona(dni);
        console.log(clients);
        await setExiste(clients);
        if (clients.length > 0) {
            setInscrip({
                ...inscrip,
                dni: clients[0].dni,
                nombre: clients[0].nombre,
                apellido: clients[0].apellido,
                barrio: clients[0].barrio,
                direccion: clients[0].direccion,
                tel: clients[0].tel,
                mail: clients[0].mail,
                fecha_nac: clients[0].fecha_nac,
                tel2: clients[0].tel2
            });
        }else{
            setInscrip({
                ...inscrip,
                dni: dni,
               
            });
        }
        setLoading(false);
    };
    const handleChangeDni = (e) => {
        setDni(e.target.value); // Actualizar el valor del DNI
    };

    const confirmarDni = () => {
        if (dni !== '') {
            setFormVisible(true); // Mostrar el formulario si el DNI no está vacío
            getClients(dni); // Llamar a la función para obtener los datos del cliente (si es necesario)
        }
    };
    const getCursos = async (e) => {

        const clientss = await servicioTurnos.traerturnosparainscri();
        setCohorte(clientss)





    };
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
        window.scrollTo(0, 0);
        getCursos();
        if (paperRef.current) {
            paperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
        const value = e.target.value;
        setInscrip({ ...inscrip, [e.target.name]: value });

        if (value.length > 0) {
            setFormVisible(true); // Mostrar formulario cuando hay texto en DNI
        }

        getClients(value);
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
                    <div ref={paperRef}>

                    </div>

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
                                            Completá con tus datos este formulario para inscribirte a los cursos.
                                            <br />

                                            Equipo CC ARI Corrientes
                                            ¡Muy pronto nos estaremos comunicando con vos!
                                        </StyledParagraph>
                                    </Typography>
                                </Box>


                                <Box sx={{ textAlign: 'center', marginLeft: "2em", marginRight: "2em", }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Por favor, ingresa tu DNI sin puntos.
                                    </Typography>


                                    <TextField
                                        margin="dense"
                                        id="dni"
                                        label="DNI (Sin puntos)"
                                        name="dni"
                                        value={dni}
                                        onChange={handleChangeDni}
                                        type="number"
                                        variant="outlined"
                                        style={{ width: '250px', marginRight: '1em' }}
                                    /><br />
                                    <button variant="contained" onClick={confirmarDni}>
                                        Confirmar DNI
                                    </button>
<br/>


                                    {formVisible && ( // Condicional para mostrar el resto del formulario
                                        <>
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
                                            <br />
                                            <TextField

                                                onChange={handleChange}
                                                name="fecha_nac"
                                                id="date"
                                                label="Fecha de Nacimiento"
                                                type="date"
                                                defaultValue="2020-01-01"
                                                sx={{ width: 220 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            /> 
                                             <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                                Genero
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>
                           
                                    <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                        <RadioGroup name="genero" onChange={handleChange}>
                                            <FormControlLabel value="mujer" control={<Radio />} label="mujer" />
                                            <FormControlLabel value="transgenero" control={<Radio />} label="transgenero" />
                                            <FormControlLabel value="no-binario" control={<Radio />} label="no-binario" />
                                            <FormControlLabel value="otro" control={<Radio />} label="otro" />
                                      

                                            <TextField
                                                margin="dense"
                                                id="otroGenero"
                                                label="Especifique otro"
                                                name="otroGenero"
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                style={{ marginTop: '10px' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
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
                                     
                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                            <RadioGroup name="nivel_secundario" onChange={handleChange}>
                                                <FormControlLabel value="Primario incompleto" control={<Radio />} label="Primario incompleto" />
                                                <FormControlLabel value="Secundario completo" control={<Radio />} label="Secundario completo" />
                                                <FormControlLabel value="Secundario incompleto" control={<Radio />} label="Secundario incompleto" />
                                                <FormControlLabel value="Terciario completo" control={<Radio />} label="Terciario completo" />
                                                <FormControlLabel value="Tericario incompleto" control={<Radio />} label="Tericario incompleto" />
                                                <FormControlLabel value="Universitario incompleto" control={<Radio />} label="Universitario incompleto" />
                                                <FormControlLabel value="Universitario completo" control={<Radio />} label="Universitario completo" />
                                           



                                            </RadioGroup>
                                        </FormControl>
                                        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                            <Typography variant="p" component="div" color="black">
                                                <StyledParagraph>
                                                    Actualmente se encuentra trabajando?
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>
                                        
                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                            <RadioGroup name="trabajo" onChange={handleChange}>
                                                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />



                                            </RadioGroup>
                                        </FormControl>
                                        {inscrip.trabajo == "Si" ? <>
                                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                                <Typography variant="p" component="div" color="black">
                                                    <StyledParagraph>
                                                        ¿Qué tipo de trabajo posee?
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
                                          
                                            <FormControl component="fieldset" style={{ marginTop: '30px' }}>

<RadioGroup name="tipo_trabajo" onChange={handleChange}>
    <FormControlLabel value="Formal" control={<Radio />} label="Formal" />
    <FormControlLabel value="Informal" control={<Radio />} label="Informal" />



</RadioGroup>
</FormControl>
                                            <br />
                                            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                                <Typography variant="p" component="div" color="black">
                                                    <StyledParagraph>
                                                        ¿Qué tipo de empleo posee?
                                                    </StyledParagraph>
                                                </Typography>
                                            </InputLabel>

                                          
                                            <FormControl component="fieldset" style={{ marginTop: '30px' }}>

<RadioGroup name="tipo_empleo" onChange={handleChange}>
    <FormControlLabel value="Monotributista/cuenta propista" control={<Radio />} label="Monotributista/cuenta propista" />
    <FormControlLabel value="En relación de dependencia" control={<Radio />} label="En relación de dependencia" />
    <FormControlLabel value="Ambos" control={<Radio />} label="Ambos" />


</RadioGroup>
</FormControl>
                                            <br />

                                        </> : <></>}


                                        <br />

                                        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                            <Typography variant="p" component="div" color="black">
                                                <StyledParagraph>
                                                    Tenes hijos
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>

                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                            <RadioGroup name="hijos" onChange={handleChange}>
                                                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />



                                            </RadioGroup>
                                        </FormControl>

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
                                                    Participaste de nuestra  <br />
                                                    Feria de Mujeres Emprendedoras<br />

                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>
                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                            <RadioGroup name="participante_feria" onChange={handleChange}>
                                                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />



                                            </RadioGroup>
                                        </FormControl>
                                        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                            <Typography variant="p" component="div" color="black">
                                                <StyledParagraph>
                                                    Participaste de algún curso de la <br />
                                                    Escuela de Mujeres Emprendedoras<br />
                                                    anteriormente?
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>
                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                            <RadioGroup name="participante_anterior" onChange={handleChange}>
                                                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />



                                            </RadioGroup>
                                        </FormControl>
                                        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                            <Typography variant="p" component="div" color="black">
                                                <StyledParagraph>
                                                    Por qué elegiste tomar este curso?
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>

                                      
                                      
                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

<RadioGroup name="motivacion" onChange={handleChange}>
    <FormControlLabel value="Para iniciar mi propio emprendimiento o negocio" control={<Radio />} label="Para iniciar mi propio emprendimiento o negocio" />
    <FormControlLabel value="Para potenciar mi idea de negocio o emprendimiento en curso" control={<Radio />} label="Para potenciar mi idea de negocio o emprendimiento en curso" />
    <FormControlLabel value="Para continuar mi formación personal y agregar mas conocimientos" control={<Radio />} label="Para continuar mi formación personal y agregar mas conocimientos" />
    <FormControlLabel value="Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral" control={<Radio />} label="Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral" />
    <FormControlLabel value="Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó" control={<Radio />} label="Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó" />



</RadioGroup>
</FormControl>
                                        <br />
                                        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                            <Typography variant="p" component="div" color="black">
                                                <StyledParagraph>
                                                    Seleccionar prioridad 1
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>


                                        {cohortes ? <>
                                            <FormControl>
                                                <RadioGroup name="prioridad1" onChange={handleChange}>



                                                    {cohortes.map((row) => (
                                                        <FormControlLabel value={row.id} control={<Radio />} label={row.descripcion} />

                                                    ))}
                                                </RadioGroup>
                                            </FormControl> </> : <>Cargando</>}
                                        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                            <Typography variant="p" component="div" color="black">
                                                <StyledParagraph>
                                                  <b> Seleccionar prioridad 2</b> 
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>

                                        {cohortes ? <>
                                            <FormControl>
                                                <RadioGroup name="prioridad2" onChange={handleChange}>



                                                    {cohortes.map((row) => (
                                                        <FormControlLabel value={row.id} control={<Radio />} label={row.descripcion} />

                                                    ))}
                                                </RadioGroup>
                                            </FormControl> </> : <>Cargando</>}
                                        </>
                                        )}
                                    </Box>
                                    <CardActions sx={{ justifyContent: 'center' }}>
                                        {cargando ? <> <Progreso /> </> : <>
                                            {inscrip.nombre && inscrip.apellido && inscrip.dni && inscrip.fecha_nac && inscrip.tel && inscrip.tel2 && inscrip.direccion && inscrip.trabajo && inscrip.mail && inscrip.nivel_secundario && inscrip.prioridad1 && inscrip.prioridad2 ?
                                                <>
                                                    {inscrip.trabajo === 'Si' ? <>

                                                        {inscrip.tipo_empleo && inscrip.tipo_trabajo ? <>
                                                            {/*  Caso que sea trabajo si  y completo le tipo  */}

                                                            {inscrip.hijos === 'Si' ? <>

                                                                {inscrip.cantidad_hijos ? <>
                                                                    {/*  Caso que sea hijos si y selecciono cuantos  */}


                                                                    {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                                        <Dialogo formulario={inscrip} />
                                                                    </> : <>Telefono no valido</>}
                                                                </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                                            </> : <>
                                                                {/*  Caso que sea hijos no */}

                                                                {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                                    <Dialogo formulario={inscrip} />
                                                                </> : <>Telefono no valido</>}
                                                            </>}


                                                        </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                                    </> : <>
                                                        {/*  Caso que sea trabajo no */}
                                                        {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                            <Dialogo formulario={inscrip} />
                                                        </> : <>Telefono no valido</>}</>}
                                                </>
                                                : <> <Button variant='contained' disabled>Enviar Inscripcion</Button> <br /><p>Completar todos los datos</p></>}
                                        </>}

                                    </CardActions>
                            </Paper>
                        </div>
                    ) : (







                        //    FIN responsive  





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
                                            Sumate a la Escuela de Mujeres
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
                                        id="dni"
                                        label="DNI (Sin puntos)"
                                        name="dni"
                                        value={dni}
                                        onChange={handleChangeDni}
                                        type="number"
                                        variant="outlined"
                                        style={{ width: '250px', marginRight: '1em' }}
                                    /><br />
                                    <button variant="contained" onClick={confirmarDni}>
                                        Confirmar DNI
                                    </button>

                                    <br />
                                    {formVisible && ( // Condicional para mostrar el resto del formulario
                                        <>
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
                                    <br />
                                    <TextField

                                        onChange={handleChange}
                                        name="fecha_nac"
                                        id="date"
                                        label="Fecha de nacimiento"
                                        type="date"
                                        defaultValue="2000-01-01"
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                     <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                                Genero
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>
                           
                                    <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                        <RadioGroup name="genero" onChange={handleChange}>
                                            <FormControlLabel value="mujer" control={<Radio />} label="mujer" />
                                            <FormControlLabel value="transgenero" control={<Radio />} label="transgenero" />
                                            <FormControlLabel value="no-binario" control={<Radio />} label="no-binario" />
                                            <FormControlLabel value="otro" control={<Radio />} label="otro" />
                                      

                                            <TextField
                                                margin="dense"
                                                id="otroGenero"
                                                label="Especifique otro"
                                                name="otroGenero"
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                style={{ marginTop: '10px' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="p" component="div" color="black">
                                            <StyledParagraph>
                                                <b>Datos adicionales que nos interesaria saber de vos</b>
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel> 
                           
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                                Nivel educativo alcanzado
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel></>)}
                           
                                    <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                        <RadioGroup name="genero" onChange={handleChange}>
                                            <FormControlLabel value="mujer" control={<Radio />} label="Primario incompleto" />
                                            <FormControlLabel value="transgenero" control={<Radio />} label="Secundario completo" />
                                            <FormControlLabel value="no-binario" control={<Radio />} label="Secundario incompleto" />
                                            <FormControlLabel value="otro" control={<Radio />} label="Terciario completo" />
                                            <FormControlLabel value="otro" control={<Radio />} label="Tericario incompleto" />
                                            <FormControlLabel value="otro" control={<Radio />} label="Universitario incompleto" />
                                            <FormControlLabel value="otro" control={<Radio />} label="Universitario completo" />

                                            <TextField
                                                margin="dense"
                                                id="otroGenero"
                                                label="Especifique otro"
                                                name="otroGenero"
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                style={{ marginTop: '10px' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
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
                                                    ¿Qué tipo de bajo posee?
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>
                                        <InputLabel variant="outlined" >
                                            Formal se refiere a un empleo en relación de dependencia,<br />
                                            registrado o monotributista con acceso a seguridad social
                                        </InputLabel>
                                        <br />
                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                            <RadioGroup name="tipo_trabajo" onChange={handleChange}>
                                                <FormControlLabel value="Formal" control={<Radio />} label="Formal" />
                                                <FormControlLabel value="Informal" control={<Radio />} label="Informal" />



                                            </RadioGroup>
                                        </FormControl>
                                        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                            <Typography variant="h5" component="div" color="black">
                                                <StyledParagraph>
                                                    Tipo de empleo
                                                </StyledParagraph>
                                            </Typography>
                                        </InputLabel>

                                    </> : <></>}

                                    <br />





                                    <br />
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
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
                                            <Typography variant="h5" component="div" color="black">
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
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                                Participaste de algún curso de la <br />
                                                Escuela de Mujeres Emprendedoras<br />
                                                anteriormente?
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>

                                  
                                    <br />

                                    <br />
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                                Por qué elegiste tomar este curso?
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>

                                  
                                      
                                    <FormControl component="fieldset" style={{ marginTop: '30px' }}>

<RadioGroup name="motivacion" onChange={handleChange}>
    <FormControlLabel value="Para iniciar mi propio emprendimiento o negocio" control={<Radio />} label="Para iniciar mi propio emprendimiento o negocio" />
    <FormControlLabel value="Para potenciar mi idea de negocio o emprendimiento en curso" control={<Radio />} label="Para potenciar mi idea de negocio o emprendimiento en curso" />
    <FormControlLabel value="Para continuar mi formación personal y agregar mas conocimientos" control={<Radio />} label="Para continuar mi formación personal y agregar mas conocimientos" />
    <FormControlLabel value="Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral" control={<Radio />} label="Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral" />
    <FormControlLabel value="Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó" control={<Radio />} label="Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó" />



</RadioGroup>
</FormControl>
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
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
                                        {cohortes ? <>
                                            <option value={'1'}> Elegir</option>

                                            {cohortes.map((row) => (

                                                <option value={row.id}> {row.descripcion} </option>

                                            ))}
                                        </> : <>Cargando</>}

                                    </NativeSelect>
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                                Seleccionar prioridad 2
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>


                                    {cohortes ? <>
                                        <FormControl>
                                            <RadioGroup name="genero" onChange={handleChange}>



                                                {cohortes.map((row) => (
                                                    <FormControlLabel value={row.id} control={<Radio />} label={row.descripcion} />

                                                ))}
                                            </RadioGroup>
                                        </FormControl> </> : <>Cargando</>}

                                </Box>
                                <br />
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    {cargando ? <> <Progreso /> </> : <>
                                        {inscrip.nombre && inscrip.apellido && inscrip.fecha_nac && inscrip.dni && inscrip.tel && inscrip.tel2 && inscrip.direccion && inscrip.trabajo && inscrip.mail && inscrip.nivel_secundario && inscrip.prioridad1 && inscrip.prioridad2 ?
                                            <>
                                                {inscrip.trabajo === 'Si' ? <>

                                                    {inscrip.tipo_empleo && inscrip.tipo_trabajo ? <>
                                                        {/*  Caso que sea trabajo si  y completo le tipo  */}

                                                        {inscrip.hijos === 'Si' ? <>

                                                            {inscrip.cantidad_hijos ? <>
                                                                {/*  Caso que sea hijos si y selecciono cuantos  */}


                                                                {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                                    <Dialogo formulario={inscrip} />
                                                                </> : <>Telefono no valido</>}
                                                            </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                                        </> : <>
                                                            {/*  Caso que sea hijos no */}

                                                            {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                                <Dialogo formulario={inscrip} />
                                                            </> : <>Telefono no valido</>} </>}


                                                    </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                                </> : <>
                                                    {/*  Caso que sea trabajo no */}

                                                    {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                        <Dialogo formulario={inscrip} />
                                                    </> : <>Telefono no valido</>}</>}
                                            </>
                                            : <> <Button variant='contained' disabled>Enviar Inscripcion</Button> <br /><p>Completar todos los datos</p></>}
                                    </>}

                                </CardActions>
                            </Paper>
                        </div>)
                    }


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
                        
                                    <Typography variant="h7" component="div" color="black">
                                        <StyledParagraph>
                                            Completá con tus datos este formulario para inscribirte a los cursos.
                                            <br />

                                            Equipo CC ARI Corrientes
                                            ¡Muy pronto nos estaremos comunicando con vos!
                                        </StyledParagraph>
                                    </Typography>
                              
                            <Box sx={{ textAlign: 'center', marginLeft: "2em", marginRight: "2em", }}>
                                <Typography variant="body2" color="textSecondary">
                                    Por favor, ingresa tu DNI sin puntos.
                                </Typography>
                                <TextField
                                        margin="dense"
                                        id="dni"
                                        label="DNI (Sin puntos)"
                                        name="dni"
                                        value={dni}
                                        onChange={handleChangeDni}
                                        type="number"
                                        variant="outlined"
                                        style={{ width: '250px', marginRight: '1em' }}
                                    /><br />
                                    <button variant="contained" onClick={confirmarDni}>
                                        Confirmar DNI
                                    </button>
<br/>

                                    {formVisible && ( // Condicional para mostrar el resto del formulario
                                        <>
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
                                              <TextField
                                               defaultValue={existe[0].tel2}
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
                                <br />
                                <TextField

                                    onChange={handleChange}
                                    name="fecha_nac"
                                    id="date"
                                    label="Fecha de Nacimiento"
                                    type="date"
                                    defaultValue={existe[0].fecha_nac}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    </>}
                                </>}
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                                Genero
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>
                           
                                    <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                        <RadioGroup name="genero" onChange={handleChange}>
                                            <FormControlLabel value="mujer" control={<Radio />} label="mujer" />
                                            <FormControlLabel value="transgenero" control={<Radio />} label="transgenero" />
                                            <FormControlLabel value="no-binario" control={<Radio />} label="no-binario" />
                                            <FormControlLabel value="otro" control={<Radio />} label="otro" />
                                      

                                            <TextField
                                                margin="dense"
                                                id="otroGenero"
                                                label="Especifique otro"
                                                name="otroGenero"
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                style={{ marginTop: '10px' }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                           
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
                                <FormControl component="fieldset" style={{ marginTop: '30px' }}>

<RadioGroup name="nivel_secundario" onChange={handleChange}>
    <FormControlLabel value="Primario incompleto" control={<Radio />} label="Primario incompleto" />
    <FormControlLabel value="Secundario completo" control={<Radio />} label="Secundario completo" />
    <FormControlLabel value="Secundario incompleto" control={<Radio />} label="Secundario incompleto" />
    <FormControlLabel value="Terciario completo" control={<Radio />} label="Terciario completo" />
    <FormControlLabel value="Tericario incompleto" control={<Radio />} label="Tericario incompleto" />
    <FormControlLabel value="Universitario incompleto" control={<Radio />} label="Universitario incompleto" />
    <FormControlLabel value="Universitario completo" control={<Radio />} label="Universitario completo" />




</RadioGroup>
</FormControl>
                                {/*  <InputLabel variant="outlined" htmlFor="uncontrolled-native">
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

                            </NativeSelect> */}
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            Actualmente se encuentra trabajando?
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>
                                <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                    <RadioGroup name="trabajo" onChange={handleChange}>
                                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />



                                    </RadioGroup>
                                </FormControl>
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
                                   
                                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                            <RadioGroup name="tipo_trabajo" onChange={handleChange}>
                                                <FormControlLabel value="Formal" control={<Radio />} label="Formal" />
                                                <FormControlLabel value="Informal" control={<Radio />} label="Informal" />



                                            </RadioGroup>
                                        </FormControl>
                               

                                    <br />
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="p" component="div" color="black">
                                            <StyledParagraph>
                                                ¿Qué tipo de empleo posee?
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>
                                    <FormControl component="fieldset" style={{ marginTop: '30px' }}>



                                        <RadioGroup name="tipo_empleo" onChange={handleChange}>
                                            <FormControlLabel value="Monotributista/cuenta propista" control={<Radio />} label="Monotributista/cuenta propista" />
                                            <FormControlLabel value="En relación de dependencia" control={<Radio />} label="En relación de dependencia" />
                                            <FormControlLabel value="Ambos" control={<Radio />} label="Ambos" />


                                        </RadioGroup>
                                    </FormControl>
                                    <br />

                                </> : <></>}


                                <br />

                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            Tenes hijos
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>

                                <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                    <RadioGroup name="hijos" onChange={handleChange}>
                                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />



                                    </RadioGroup>
                                </FormControl>

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
                                            Participaste de nuestra  <br />
                                            Feria de Mujeres Emprendedoras<br />

                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>

                                <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                    <RadioGroup name="participante_feria" onChange={handleChange}>
                                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />



                                    </RadioGroup>
                                </FormControl>
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            Participaste de algún curso de la <br />
                                            Escuela de Mujeres Emprendedoras<br />
                                            anteriormente?
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>
                                <FormControl component="fieldset" style={{ marginTop: '30px' }}>

                                    <RadioGroup name="participante_anterior" onChange={handleChange}>
                                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />



                                    </RadioGroup>
                                </FormControl>
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            Por qué elegiste tomar este curso?
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>
                              
                                      
                                <FormControl component="fieldset" style={{ marginTop: '30px' }}>

<RadioGroup name="motivacion" onChange={handleChange}>
    <FormControlLabel value="Para iniciar mi propio emprendimiento o negocio" control={<Radio />} label="Para iniciar mi propio emprendimiento o negocio" />
    <FormControlLabel value="Para potenciar mi idea de negocio o emprendimiento en curso" control={<Radio />} label="Para potenciar mi idea de negocio o emprendimiento en curso" />
    <FormControlLabel value="Para continuar mi formación personal y agregar mas conocimientos" control={<Radio />} label="Para continuar mi formación personal y agregar mas conocimientos" />
    <FormControlLabel value="Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral" control={<Radio />} label="Para tener un curso mas que me pueda ayudar en mi curriculum y me ayude a obtener una mejor salida laboral" />
    <FormControlLabel value="Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó" control={<Radio />} label="Por que ya hice otros cursos con la Escuela de Mujeres Emprendedoras y me gustó" />



</RadioGroup>
</FormControl>


                                <br />
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            Seleccionar prioridad 1
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>

                                {cohortes ? <>
                                    <FormControl>
                                        <RadioGroup name="prioridad1" onChange={handleChange}>



                                            {cohortes.map((row) => (
                                                <FormControlLabel value={row.id} control={<Radio />} label={row.descripcion} />

                                            ))}
                                        </RadioGroup>
                                    </FormControl> </> : <>Cargando</>}



                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    <Typography variant="p" component="div" color="black">
                                        <StyledParagraph>
                                            Seleccionar prioridad 2
                                        </StyledParagraph>
                                    </Typography>
                                </InputLabel>


                                {cohortes ? <>
                                    <FormControl>
                                        <RadioGroup name="prioridad2" onChange={handleChange}>



                                            {cohortes.map((row) => (
                                                <FormControlLabel value={row.id} control={<Radio />} label={row.descripcion} />

                                            ))}
                                        </RadioGroup>
                                    </FormControl> </> : <>Cargando</>}</>)}
                            </Box>
                        </Box>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            {cargando ? <> <Progreso /> </> : <>
                                {inscrip.nombre && inscrip.apellido && inscrip.dni && inscrip.fecha_nac && inscrip.tel && inscrip.tel2 && inscrip.direccion && inscrip.trabajo && inscrip.mail && inscrip.nivel_secundario && inscrip.prioridad1 && inscrip.prioridad2 ?
                                    <>
                                        {inscrip.trabajo === 'Si' ? <>

                                            {inscrip.tipo_empleo && inscrip.tipo_trabajo ? <>
                                                {/*  Caso que sea trabajo si  y completo le tipo  */}

                                                {inscrip.hijos === 'Si' ? <>

                                                    {inscrip.cantidad_hijos ? <>
                                                        {/*  Caso que sea hijos si y selecciono cuantos  */}


                                                        {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                            <Dialogo formulario={inscrip} />
                                                        </> : <>Telefono no valido</>}
                                                    </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                                </> : <>
                                                    {/*  Caso que sea hijos no */}

                                                    {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                        <Dialogo formulario={inscrip} />
                                                    </> : <>Telefono no valido</>}
                                                </>}


                                            </> : <><Button variant='contained' disabled>Enviar Inscripcion</Button> </>}
                                        </> : <>
                                            {/*  Caso que sea trabajo no */}
                                            {inscrip.tel.length > 9 && inscrip.tel2.length > 9 ? <>
                                                <Dialogo formulario={inscrip} />
                                            </> : <>Telefono no valido</>}</>}
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
