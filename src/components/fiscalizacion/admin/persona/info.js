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
import servicioFidei from '../../../../services/fiscalizacion'
import { Box } from "@mui/system";
import { useNavigate , useParams } from "react-router-dom";
import "./profile.css";
import Modificar from './modificar'
import DondeVota from './dondevota'

const FichaAxios = (props) => {
  const navigate = useNavigate();
    const [cliente, setCliente] = useState([])
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
       
   
      const  cliente = await servicioFidei.traerdatosdepersona(id)
      
      setCliente(cliente)
  
     
  
      ;
    };  
 


  return (<>    
    
   {cliente.map((client) =>( 
    <div className="profile">
      <Grid container style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
  <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
    <Avatar sx={{ width: 170, height: 140 }}>
      <AccountCircle fontSize="large" />
    </Avatar>
  </Grid>
  <Grid item xs={12}>
    <Container>
      <Box>
        <h5>Datos Personales del Cliente</h5>
        <Modificar
          id={client.id}
          dni={client.dni}
          nombre={client.nombre}
          apellido={client.apellido}
          vegano={client.vegano}
          movilidad={client.movilidad}
          celiaco={client.celiaco}
          telefono={client.telefono}
          telefono2={client.telefono2}
          direccion={client.domicilio}
          traer={async () => {
            const cliente = await servicioFidei.traerdatosdepersona(id);
            setCliente(cliente);
          }}
        />
       <DondeVota
          id={client.id}
          traer={async () => {
            const cliente = await servicioFidei.traerdatosdepersona(id);
            setCliente(cliente);
          }}
        /> 
     
      </Box>
      <Box>
        <TextField
          label="DNI"
          id="dni"
          value={client.dni}
          name="dni"
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Nombre"
          id="Nombre"
          value={client.nombre}
          name="nombre"
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <TextField
          label="Apellido"
          id="email"
          value={client.apellido}
          name="nombre"
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Domicilio"
          id="Localidad"
          value={client.domicilio}
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <HomeWorkIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <TextField
          label="Numero de Telefono"
          id="numero de telefono"
          value={client.telefono}
          name="telefono"
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Numero de Telefono"
          id="numero de telefono"
          value={client.telefono2}
          name="telefono2"
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <TextField
          label="Vegano"
          id="Razon"
          defaultValue=""
          value={client.vegano}
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Movilidad"
          id="dirección"
          defaultValue=""
          value={client.movilidad}
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <TextField
          label="Celiaco"
          id="Razon"
          defaultValue=""
          value={client.celiaco}
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Donde vota"
          id="dirección"
          defaultValue=""
          value={client.nombreescuela}
          variant="filled"
          sx={{ margin: "10px" }}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <Grid container justifyContent="center">
          {editMode ? (
            <Grid item xs={12} md={8}>
              <div className="profile-form-button">
                <Button variant="outlined" sx={{ marginRight: "10px" }} onClick={() => setEditMode(false)}>
                  Cancelar
                </Button>
                <Button variant="contained">Enviar</Button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <div className="profile-edit-button"></div>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  </Grid>

  <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
   
  {client.observaciones ? <><h3> Observaciones:  {client.observaciones}</h3></>:<></>}
  
  </Grid>
</Grid>

    </div>
    ))} </>);
}

export default FichaAxios;