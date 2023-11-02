

import { useNavigate, useParams } from "react-router-dom";
import Formulario from '../../components/inscripcioncarnaval/formulario'
import React, { useEffect, useState } from "react";
import {
    Button,
 
  } from "@mui/material";
  import {
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Logoesme from '../../Assets/logoesme.webp';
import Logocuqui from '../../Assets/logocuqui.webp';
import Logoccari from '../../Assets/logoccari.webp';
import styled from 'styled-components';
import { Paper, CircularProgress, Typography, Box, TextField, InputLabel, Card, CardActions } from '@mui/material';


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



export default function Paginas() {
    const navigate = useNavigate();
const theme = useTheme();

    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
            }
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

            

            return (
                <>
                    {/*  {isMatch ? <>
              <div className="backgroundinscrmobile" >
        <br/>
                <Formulario/>
                
                </div>
                </>:<> <div className="backgroundinscr" >
        <br/>
                <Formulario/>
                
                </div></>} */}


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
                            <Typography variant="h7" component="div" color="black">
                                <StyledParagraph>
                                  
                                    <br />

                                    Equipo CC ARI Corrientes

                                </StyledParagraph>
                            </Typography>
                        </Box>
                        <h5>
                      Las inscripciones para el presente período han llegado a su fin.

Animamos a estar atentas a futuras convocatorias y eventos que puedan ofrecer oportunidades de participación.

Si tienen alguna consulta pueden ponerse en contacto con nuestro equipo a través la informacion proporcionada en www.cuquicalvano.com

¡Les enviamos un cordial saludo y las esperamos para las proximas ediciones!!
                                </h5>    
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
                            <Typography variant="p" component="div" color="black">
                                <StyledParagraph>
                       
                                    Equipo CC ARI Corrientes

                                </StyledParagraph>
                            </Typography>
                            <h5>
                            Las inscripciones para el presente período han llegado a su fin.

Animamos a estar atentas a futuras convocatorias y eventos que puedan ofrecer oportunidades de participación.

Si tienen alguna consulta pueden ponerse en contacto con nuestro equipo a través la informacion proporcionada en www.cuquicalvano.com

¡Les enviamos un cordial saludo y las esperamos para las proximas ediciones!!

                                </h5>    
                        </Box>


                    </Paper>
                </div>)
            }





                </>
           
            );
        
        }