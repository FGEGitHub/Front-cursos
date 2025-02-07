import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button,FormControlLabel, FormControl, Radio, RadioGroup,Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../../services/dtc'
import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';


const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  const [form, setForm] = useState({
    fecha:props.fecha
  })
  const [usuario, setUsuario] = useState()
  const [profesionales, setProfesionales] = useState(false)







  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const traerprof = async (event) => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    const user = JSON.parse(loggedUserJSON)
    setUsuario(user)
    if (user.nivel == 40){
      const nov = await servicioDtc.traerprofesionales()
      console.log(nov)
      setProfesionales(nov[0])
    }
    if (user.nivel == 20 || user.nivel == 23){
      const nov = await servicioDtc.traerpsicologos() 
      console.log(nov)
      setProfesionales(nov[0])
    }

 
  };

  const handleClickOpen = () => {
setForm({fecha:props.fecha})
    setOpen(true);
    traerprof()


  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeterminar = async (event) => {

    try {
      event.preventDefault();
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

      const user = JSON.parse(loggedUserJSON)
      setUsuario(user)
      const mergedJSON = {
        ...form,
        ...{id_psic:user.id,
       }
      };
      if(user.nivel==41 || user.nivel==40 ){
        const nov = await servicioDtc.agregarturnocadia(mergedJSON)
        alert(nov)
      }else{
      const nov = await servicioDtc.agregarturno(mergedJSON)
      alert(nov)}
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')
      console.log(form.fecha)
props.traer(form.fecha)

    }
  
    props.traer()

    setOpen(false);
  };

  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (




    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      < Tooltip title="Nuevo turno">
        <Button variant="contained" onClick={handleClickOpen}> Nuevo  </Button>

      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

        
            <h3>
              <b> NUEVO TURNO</b></h3>
              <InputLabel variant="outlined" htmlFor="uncontrolled-native">

              <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                          horario
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="horario"
              name="horario"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />

{usuario ? <>

  {usuario.nivel==40 || usuario.nivel==20 || usuario.nivel==23  ? <>
<br/>
    {profesionales ? <>
      <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                        <Typography variant="h5" component="div" color="black">
                                            <StyledParagraph>
                                             Profesional
                                            </StyledParagraph>
                                        </Typography>
                                    </InputLabel>
                                            <FormControl>
                                                <RadioGroup name="profesional" onChange={handleChange}>



                                                    {profesionales.map((row) => (
                                                        <FormControlLabel value={row.id} control={<Radio />} label={row.nombre} />

                                                    ))}
                                                </RadioGroup>
                                            </FormControl> </> : <>Cargando</>}
  </>:<>
  
  </>}


</>:<></>}

            <DialogActions>


              <>
              {form.horario   ? <> <Button variant="contained" color="primary" onClick={handleDeterminar}> crear </Button></> :  <>Completar los datos</>}
             </>
              <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
            </DialogActions>


        </DialogContent>
      </Dialog>
    </Box >


  );
}