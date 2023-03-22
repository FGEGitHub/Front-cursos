import React, { useEffect, useState, } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import InputAdornment from "@mui/material/InputAdornment";
import { useParams } from "react-router-dom"
import Avatar from "@mui/material/Avatar";
import Container from '@mui/material/Container';
import servicioCursos from '../../../services/Cursos';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../../usaurio2/Cursos/profile.css";


const FichaAxios = (props) => {
  const navigate = useNavigate();
    const [turno, setTurno] = useState([])
    const [carga, setCarga] = useState(false)
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
       
   
      const  tur = await servicioCursos.datosdelturno(id)
      console.log(tur)
      setTurno(tur)
      setCarga(true)
   //   setCliente(cliente)
  
     
  
      ;
    };  
 
    
    

  return (<>    
    
    { carga ? <>
    <div className="profile">
      <Grid Container style={{ direction: "column", alignItems:"center", justifyContent: "center", display: "flex"}}>
        <Grid item xs={8} style={{ direction: "column", justifyContent: "center", display: "flex" }}>
        <Avatar sx={{ width: 170, height: 140 }}> <AccountCircle fontSize="large"/> </Avatar>
        </Grid>
        <Grid item xs={8}style={{ }}>
  
            <Container>
            <Box>
            <h5>
            Datos del curso:
            </h5>
                
            </Box>
        {turno ? <>
              <Box>
               
              <TextField
                  label="Curso"
                  id="cuil"
                
                  value= {turno[0].nombrecurso}
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
                  value= {turno[2].encargado}
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
                 value= {turno[3].coordinador}
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
                  value= {turno[1].cantidad}
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
              </>:<></>}  

            </Container>
          
        </Grid>

        <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
         
         
        </Grid>
      </Grid>
    </div>

    </>:<></>}




  </>);
}

export default FichaAxios;