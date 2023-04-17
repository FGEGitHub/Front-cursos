import { StepButton, Stepper, Step, Stack, Button, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import Tablaincrip from './Tablainscrip'
import Tablaasig from './TablaAsignados'
import { Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../../estadisticas/Home.scss'
import Widget from '../../Widget/Widget'
import servicioFisca from '../../../../services/fiscalizacion'
import StackK from '../../infoskack'
const SubirLegajo = () => {
    const [activeStep, setActiveStep] = useState(0);
    let [steps, setSteps] = useState([
    


    ]);

    const [datos, setDatos] = useState()
   
    const [completo, setCompleto] = useState()
    const [listo, setListo] = useState(false)

    useEffect(() => {


        traer()

    }, [])


    const traer = async () => {
       
        const dat = await servicioFisca.datosdemesas()
        setDatos(dat)
        setSteps([
            { label: 'Lista', completed: false },
            { label: 'Asignados', completed: false },
            { label: 'confirmados', completed:false },
            

        ])
        setListo(true)

    };

    const checkDisabled = () => {
        if (activeStep < steps.leght - 1) return false

    }
   



    return (
        <>
        <StackK/>
        {datos ? <>
        <div className="home">

        <Widget type="Cantidad de mesas "
                      cantidad={datos[0]}
                    />
                     <Widget type="Mesas asignadas"
                      cantidad={datos[1]}
                    />
                        <Widget type="Cantidad confirmadas"
                      cantidad={'Sin determ'}
                    />
                     <Widget type="Cantidad mesas que nadie se inscribio"
                      cantidad={datos[2]}
                    />

                    </div>
                    </>:<></>}
        <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
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
                    0: <Tablaincrip
                  
                        />,
                    1: <Tablaasig/>,
                        2:  <h2>dos</h2>,

                  




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
        </Paper>
        </>
    );
};

export default SubirLegajo;