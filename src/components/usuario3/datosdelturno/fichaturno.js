import React, { useEffect, useState, } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useParams } from "react-router-dom"
import InputAdornment from "@mui/material/InputAdornment";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Avatar from "@mui/material/Avatar";
import Container from '@mui/material/Container';
import servicioTurnos from '../../../services/turnos';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../../usaurio2/Cursos/profile.css";


const FichaAxios = (props) => {
  const navigate = useNavigate();
    const [turno, setTurno] = useState()
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  let params = useParams()
  let id = params.id
  const [editMode, setEditMode] = useState(false);
  function submitFormHandler(event) {
    event.preventDefault();
  }
  useEffect(() => {
      
    traer()
    
}, []) 

  const traer = async() => {
       
   
     const  datosturno = await servicioTurnos.detalledelcurso(id)
      console.log(datosturno)
     setTurno(datosturno[0])
  
     
  
      ;
    };  
 
    
    

  return (<>    
    
   
    <div className="profile">
      <Grid Container style={{ direction: "column", alignItems:"center", justifyContent: "center", display: "flex"}}>
        <Grid item xs={8} style={{ direction: "column", justifyContent: "center", display: "flex" }}>
        <Avatar sx={{ width: 170, height: 140 }}> <AccountCircle fontSize="large"/> </Avatar>
        </Grid>
        <Grid item xs={8}style={{ }}>
        { turno ? <>
            <Container>
            <Box>
            <h5>
            Datos del curso:
            </h5>
                
            </Box>
       
              <Box>
              <TextField
                  label="Nombre"
                  id="cuil"
                 // defaultValue="CUIL"
                  value= {turno[0].descripcion}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: !editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  label="Encargado"
                  id="Nombre"
                  value= {turno[0].encargado}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              <Box>
              <TextField
                  label="Coordinador"
                  id="cuil"
                 // defaultValue="CUIL"
                  value= {turno[0].coordinador}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: !editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  label="Cupo"
                  id="Nombre"
                  value= {turno[0].nombrecurso}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
                   

            </Container>
            </>:<></>}
        </Grid>

        <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>


        </Grid>
      </Grid>
    </div>
  </>);
}

export default FichaAxios;