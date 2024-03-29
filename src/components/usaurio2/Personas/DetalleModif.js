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
import servicioPersonas from '../../../services/personas'
import Cargando from '../../CargaDeTabla'
import Inscribir from './inscripcion'

import "./profile.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import KeyIcon from '@mui/icons-material/Key';
import { Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { useParams } from "react-router-dom"

const ModificacionC = (props) => {
  const navigate = useNavigate();
  let params = useParams()
  let id = params.id
  const [cliente, setCliente] = useState()
  const [modificaciones, setModificaciones] = useState([])
  const [modificacionesadicionales, setModificacionesadicionales] = useState([])
  const [pass, setPass] = useState([])

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;


  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    traer()


  }, [])

  const traer = async () => {
 
    

    const client = await servicioPersonas.datosdepersona(id)
 console.log(client)

    setCliente(client)


    setModificaciones({
      id: id,
      nombre: client[0].nombre,
      mail: client[0].mail,
      apellido: client[0].apellido,
      tel: client[0].tel,
      tel2: client[0].tel2,
     
      direccion: client[0].direccion,
      adicional_direccion: client[0].adicional_direccion,
      barrio: client[0].barrio,
      residencia: client[0].residencia,
      edad: client[0].edad
    })
 
    setModificacionesadicionales({
      id: id,
      hijos: client[0].hijos,
      trabajo: client[0].trabajo,
      anios: client[0].anios,
    })

  };
  

  const handleChange2 = (e) => {
    setModificacionesadicionales({ ...modificacionesadicionales, [e.target.name]: e.target.value })
console.log(modificacionesadicionales)
  }
  const handleChange = (e) => {
    console.log(modificaciones)
    setModificaciones({ ...modificaciones, [e.target.name]: e.target.value })

  }
  const handleChangePass = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value })

  }
  const handleDeterminar = async (event) => {

    try {

      const rta = await servicioPersonas.modificarpersona(modificaciones)

      traer()
    } catch (error) {

      console.log('Error algo sucedio')

    }

  };
  const handleDeterminaradic= async (event) => {

    try {
      console.log(modificacionesadicionales);
      const rta = await servicioPersonas.modificardatosadic(modificacionesadicionales)
   
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }

  };
  const handleDeterminarPass = async (event) => {

    try {

      const rta = await servicioPersonas.modificarpass(pass)
     
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }

  };

  return (<>  
  

    {cliente &&  modificaciones ? <div>
   
      {cliente.map((client) => (


        <div className="profile">
          <Grid Container>

            <Paper
              sx={{
                cursor: 'pointer',
                background: '#f5f5f5',
                color: '#bdbdbd',
                border: '1px dashed #ccc',
                '&:hover': { border: '1px solid #ccc' },
              }}
            >
              {/* <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
                <Avatar sx={{ width: 170, height: 140 }}>{(client.Nombre).substring(0, 1)}</Avatar>
              </Grid> */}
              <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>

                <Container>
                  <Box>
                    <h5>
                      Modificacion de datos personales de {modificaciones.nombre} {modificaciones.apellido}
                    </h5>

                  </Box>

                  <Box>
                    <TextField
                      label="Nombre"
                      id="cuil"
                      name="nombre"
                      // defaultValue="CUIL"
                      defaultValue={modificaciones.nombre}
                      onChange={handleChange}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: false,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                    />

                    <TextField
                      label="Usuario"
                      id="Nombre"
                      name="apellido"
                      defaultValue={modificaciones.apellido}
                      onChange={handleChange}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: false,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                    />
                

                    <TextField
                      label="Email"
                      id="email"
                      name="mail"
                      defaultValue={modificaciones.mail}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      onChange={handleChange}
                      InputProps={{
                        readOnly: false,
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        )
                      }}
                    />
  </Box>



<Box>
                    <TextField
                      label="Telefono"
                      id="Telefono"
                      name="tel"
                      onChange={handleChange}
                      defaultValue={modificaciones.tel}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: editMode,
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeWorkIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                 
                    <TextField
                      label="Numero de Telefono"
                      id="telefono 2"
                      name="tel2"
                      defaultValue={modificaciones.tel2}
                      onChange={handleChange}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: editMode,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPhoneIcon />
                          </InputAdornment>
                        )
                      }}
                    />



                    <TextField
                      label="Domicilio"
                      id="domicilio"
                      name="direccion"
                      defaultValue={modificaciones.direccion}
                      onChange={handleChange}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: editMode,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPhoneIcon />
                          </InputAdornment>
                        )
                      }}
                    />

</Box>
                  <Box>
                  <TextField
                      label="adicional direccion"
                      id="Telefono"
                      name="adicional_direccion"
                      onChange={handleChange}
                      defaultValue={modificaciones.adicional_direccion}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: editMode,
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeWorkIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                 
                    <TextField
                      label="Barrio"
                      id="telefono 2"
                      name="barrio"
                      defaultValue={modificaciones.barrio}
                      onChange={handleChange}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: editMode,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPhoneIcon />
                          </InputAdornment>
                        )
                      }}
                    />



                    <TextField
                      label="Residencia"
                      id="domicilio"
                      name="residencia"
                      defaultValue={modificaciones.residencia}
                      onChange={handleChange}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: editMode,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPhoneIcon />
                          </InputAdornment>
                        )
                      }}
                    />

                  </Box>
                  <Inscribir
      id={id}
      />

                  <Box>
                    <columns lg={8}>
                      {editMode ? (
                        <div className="profile-form-button">
                          <Button
                            variant="outlined"
                            sx={{ marginRight: "10px" }}
                            onClick={() => setEditMode(false)}
                          >
                            Cancelar
                          </Button>
                          <Button variant="contained">Enviar</Button>
                        </div>
                      ) : (
                        <div className="profile-edit-button">
                          <Button
                            variant="outlined"
                            onClick={handleDeterminar}

                          >
                            Guardar
                          </Button>
                        </div>
                      )}
                    </columns>
                  </Box>
                </Container>

              </Grid>




            </Paper>



            <br /> 
  
            <br />

            <Paper
              sx={{
                cursor: 'pointer',
                background: '#fafafa',
                color: '#bdbdbd',
                border: '1px dashed #ccc',
                '&:hover': { border: '1px solid #ccc' },
              }}
            >
              <h2>Informacion adicional</h2>  
              
                 {cliente ? <>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Trabajo
                
              </InputLabel>
              <NativeSelect
                defaultValue={cliente[0].trabajo}
                onChange={handleChange2}
                inputProps={{
                  name: 'trabajo',
                  id: 'uncontrolled-native',

                }}
              >   <option value={cliente[0].trabajo}>{cliente[0].trabajo}</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Hijos
               
                
              </InputLabel>
              <NativeSelect
                defaultValue={cliente[0].hijos}
                onChange={handleChange2}
                inputProps={{
                  name: 'hijos',
                  id: 'uncontrolled-native',

                }}
              >   <option value={cliente[0].trabajo}>{cliente[0].trabajo}</option>
                <option value={'Si'}>Si</option>
                <option value={'No'}>No</option>

              </NativeSelect>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Edad
              </InputLabel>
         
                <TextField
                  hiddenLabel
                  onChange={handleChange2}
                  type="number"
                  name = "anios"
                  id="filled-hidden-label-small"
                  defaultValue={cliente[0].anios}
                  variant="filled"
                  size="small"
                />
              </> : <></>}
<br/>

              <Button onClick={handleDeterminaradic} variant="contained">Guardar cambios</Button> 

            </Paper>




      <br />
            <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#fafafa',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  '&:hover': { border: '1px solid #ccc' },
                }}
              >
                <h2 style={{ textAlign: "center" }}>Modificar contrseña(no conectado)</h2>
                <TextField
                  label="Contraseña anterior"
                  type="password"
                  name="password"
                  variant="filled"
                  sx={{ margin: "10px" }}
                  onChange={handleChangePass}
                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  label="Nueva Contraseña"
                  id="email"
                  type="password"
                  name="newpass"
                  variant="filled"
                  sx={{ margin: "10px" }}
                  onChange={handleChangePass}
                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField

                  label="Repetir conraseña"
                  type="password"
                  id="email"
                  name="rnewpass"
                  variant="filled"
                  sx={{ margin: "10px" }}
                  onChange={handleChangePass}

                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />


                {pass.newpass === pass.rnewpass ? <><Button onClick={handleDeterminarPass} variant="contained">Cambiar</Button>  </> : <><Button variant="contained">Cambiar</Button> <p style={{ color: 'crimson' }} >Contraseña nueva o coincide </p></>}

              </Paper>

            </Grid>

          </Grid>
        </div>
      ))}</div> : <div><Cargando /></div>}

    <br /> <br /> <br />  <br /> <br /> <br />  <br /> <br /> <br />
  </>



  );


}

export default ModificacionC;