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
import servicioUsuario1 from '../../../services/personas'
import Cargando from '../../CargaDeTabla'
import "./profile.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import KeyIcon from '@mui/icons-material/Key';
import { Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';


const ModificacionC = (props) => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState()
  const [modificaciones, setModificaciones] = useState([])
  const [pass, setPass] = useState([])

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;


  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    traer()


  }, [])

  const traer = async () => {
    const preba = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'))
    console.log(preba)


    const client = await servicioUsuario1.datosusuario(preba.usuario)
    console.log(client[0])
    console.log(client[0][0])

    setCliente(client[0])
 

    setModificaciones({
      usuario: client[0][0].usuario,
      nombre: client[0][0].nombre,
      mail: client[0][0].mail,
      provincia: client[0][0].provincia,
      tel: client[0][0].tel,
      ingresos: client[0][0].ingresos,
      direccion: client[0][0].direccion,
      razon_social: client[0][0].razon_social
    })
    setPass({
      cuil_cuit: cliente[0].cuil_cuit,
    })

  };


  const handleChange = (e) => {
    setModificaciones({ ...modificaciones, [e.target.name]: e.target.value })
   
  }
  const handleChangePass = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value })
    
  }
  const handleDeterminar = async (event) => {

    try {

      const rta = await servicioUsuario1.modificarCliente(modificaciones)

      traer()
    } catch (error) {
  
      console.log('Error algo sucedio')

    }

  };

  const handleDeterminarPass = async (event) => {

    try {

      const rta = await servicioUsuario1.modificarpass(pass)
      alert(rta)
      
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }

  };

  return (<>
    {cliente ? <div>


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
                      Modificacion de datos personales
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
                        readOnly: !editMode,
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
                      name="usuario"
                      defaultValue={modificaciones.usuario}
                      onChange={handleChange}
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
                  </Box>
                  <Box>
                    <TextField
                      label="Numero de Telefono"
                      id="numero de telefono"
                      name="tel"
                      defaultValue={modificaciones.tel}
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



                        <br/> <br/>

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
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Trabajo
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'accion',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'Pendiente'}>Sin especificar</option>
                                <option value={'Si'}>Si</option>
                                <option value={'No'}>No</option>

                            </NativeSelect>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Hijos
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'accion',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'Pendiente'}>Sin especificar</option>
                                <option value={'Si'}>Si</option>
                                <option value={'No'}>No</option>

                            </NativeSelect>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Edad
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'accion',
                                    id: 'uncontrolled-native',

                                }}
                            >   <option value={'Pendiente'}>Sin especificar</option>
                                <option value={'Si'}>Si</option>
                                <option value={'No'}>No</option>

                            </NativeSelect>


              </Paper>


                       
                         <br/>
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
                 <h2 style={{textAlign: "center"}}>Modificar contrseña</h2>
                <TextField
                  label="Contraseña anterior"
                  type= "password"
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
                  type= "password"
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
                  type= "password"
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

              
              {pass.newpass ===pass.rnewpass ? <><Button onClick={handleDeterminarPass} variant="contained">Cambiar</Button>  </>:<><Button  variant="contained">Cambiar</Button> <p style={{ color: 'crimson' }} >Contraseña nueva o coincide </p></>}

              </Paper>
              
            </Grid>

          </Grid>
        </div>
      ))}</div> : <div><Cargando /></div>}
      
      <br/> <br/> <br/>  <br/> <br/> <br/>  <br/> <br/> <br/>
      </>
      
      
      
      );


}

export default ModificacionC;