import React, { useEffect, useState, } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import InputAdornment from "@mui/material/InputAdornment";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Avatar from "@mui/material/Avatar";
import Container from '@mui/material/Container';
import servicioCliente from '../../../services/Cursos';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "./profile.css";


const FichaAxios = (props) => {
  const navigate = useNavigate();
    const [cliente, setCliente] = useState([])
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const [address, setAddress] = useState(null);
  const [editMode, setEditMode] = useState(false);
  function submitFormHandler(event) {
    event.preventDefault();
  }
  useEffect(() => {
      
    //traer()
    
}, []) 

  const traer = async() => {
       
   
     // const  cliente = await servicioCliente.cliente(props.cuil_cuit)
      
   //   setCliente(cliente)
  
     
  
      ;
    };  
 
    const enviarMail = async() => {
       
     const etc = {
        cuil_cuit:props.cuil_cuit
      }
       await servicioCliente.enviarmailprueba(etc)
      
      setCliente(cliente)
  
     
  
      ;
    }; 
    

  return (<>    
    
   
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
       
              <Box>
              <TextField
                  label="Nombre"
                  id="cuil"
                 // defaultValue="CUIL"
                  value= {props.nombre}
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
                  value= {props.encargado}
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
                  label="Fecha"
                  id="cuil"
                 // defaultValue="CUIL"
                  value= {props.fecha}
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
                  value= {props.inscriptosacepados +'/'+props.cupo}
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
          
        </Grid>

        <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
         
         
        </Grid>
      </Grid>
    </div>
  </>);
}

export default FichaAxios;