import { StepButton, Stepper, Step, Stack, Button, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import VerEstadisticas from './estadisticas1'
import Ayuda from './ayuda'
import Tablaincrip from './Tablainscrip'



import Tablaasig from './TablaAsignados'
import Tablapaso2 from './Tablapaso2'
import Tablapaso4 from './tablapaso4'
import Tablapaso5 from './tablapaso5'
import { Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../../estadisticas/Home.scss'
import Widget from '../../Widget/Widget'
import servicioFisca from '../../../../services/fiscalizacion'
import StackK from '../../infoskack'
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate, useParams } from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
const SubirLegajo = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    let [steps, setSteps] = useState([3]);

    const [datos, setDatos] = useState()
   
    const [listo, setListo] = useState(false)

    useEffect(() => {


        traer()

    }, [])
    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
            }

    const traer = async () => {
       
        const dat = await servicioFisca.datosdemesas()
        setDatos(dat)
        setSteps([

            { label: 'Paso 4: Inscripciones agosto', completed:false },
            { label: 'Paso 5: Asignaciones agosto', completed:false },
            

        ])
        setListo(true)

    };

    const checkDisabled = () => {
        if (activeStep < steps.leght - 1) return false

    }
   

 

    return (
        <>
        <StackK/>
        <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
<Button variant="contained" color="success" onClick={volver}>Volver<KeyboardReturnIcon/></Button>
      <VerEstadisticas/>
      <Ayuda/>
    
    </ButtonGroup>
      <br/>
        {datos ? <>
        <div className="home">
        <Widget type="Escuelas"
                      cantidad={datos[3]}
                    />
        <Widget type="Cantidad de mesas "
                      cantidad={datos[0]}
                    />
                     <Widget type="Mesas asignadas"
                      cantidad={datos[1]}
                    />
                        <Widget type="Capacitados"
                      cantidad={datos[4]}
                    />
                     <Widget type="Cantidad faltante"
                      cantidad={datos[2]}
                    />

                    </div>
                    </>:<></>}
 
        <Container sx={{ my: 4 }}>

          {listo ?  <div>
            <Stack
                direction="row"
                sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
            >
                <Button

                    disabled={!activeStep}
                    onClick={() => setActiveStep(activeStep => activeStep - 1)}
                >
                 <ArrowBackIcon/>  Izquierda
                </Button>
                <Button
                    disabled={checkDisabled()}
                    onClick={() => setActiveStep(activeStep => activeStep + 1)}
                >
                    Derecha <ArrowForwardIcon/>
                </Button>



            </Stack>
                <Stepper
                    alternativeLabel
                    nonLinear
                    activeStep={activeStep}
                    sx={{ mb: 3 }}
                >
                    {steps.map((step, index) => (
                        <Step key={step.label} completed={step.completed}>
                            <StepButton onClick={() => setActiveStep(index)}>
                                {step.label}
                            </StepButton>
                        </Step>
                    ))}


                </Stepper>
         
                </div>: <div></div> }

         

            <Box>
                {{
                

                       0:  <Tablapaso4/>,
                        
                       1:  <Tablapaso5/>,


                }[activeStep]}
            </Box>
            <Stack
                direction="row"
                sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
            >
                <Button

                    disabled={!activeStep}
                    onClick={() => setActiveStep(activeStep => activeStep - 1)}
                >
                    Volver
                </Button>
                <Button
                    disabled={checkDisabled()}
                    onClick={() => setActiveStep(activeStep => activeStep + 1)}
                >
                    Siguiente
                </Button>



            </Stack>
        </Container>
      
        </>
    );
};

export default SubirLegajo;