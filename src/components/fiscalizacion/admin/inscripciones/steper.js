import { StepButton, Stepper, Step, Stack, Button, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import Tablaincrip from './Tablainscrip'
import { Paper } from '@mui/material';
const SubirLegajo = () => {
    const [activeStep, setActiveStep] = useState(0);
    let [steps, setSteps] = useState([
    


    ]);

    const [user, setUser] = useState([''])
    const [completo, setCompleto] = useState()
    const [listo, setListo] = useState(false)

    useEffect(() => {


        traer()

    }, [])


    const traer = async () => {
       
        setSteps([
            { label: 'Lista', completed: false },
            { label: 'isncripto', completed: false },
            { label: 'confirmado', completed:false },
            

        ])
        setListo(true)

    };

    const checkDisabled = () => {
        if (activeStep < steps.leght - 1) return false

    }
   



    return (
        <>
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
                    1: <h2>hola</h2>,
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