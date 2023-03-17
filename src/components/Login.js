import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loginService from '../services/login'
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    CircularProgress,
    Paper,
    Avatar,
    Link
  } from "@mui/material";
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
//import 'antd/dist/antd.css'
import servicioUsuario from '../services/usuarios'
import Registro from "./Registro"

const Login = () => {

    const [loginVisible, setLoginvisible] = useState(false)
  const [usuario, setUsuario] = useState({
    cuil_cuit: "",
    password: "",
  });
  const [user, setUser] = useState(null)


  const [loading, setLoading] = useState(false);
  //const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
     navigate('/usuario/menu')
    }
  }, [])


  const hanleLogout = () => {
    setUser(null)
    servicioUsuario.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const loginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log('user')
      const user = await loginService.login({
        usuario: usuario.usuario,
        password: usuario.password
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      servicioUsuario.setToken(user.token)
      console.log(user)
      setUser(user)

      setLoading(false);

      console.log(user.nivel)
      switch(user.nivel){
        case 1: navigate('/usuario/novedades')
        window.location.reload(true);
          break;
          case 2:navigate('/administracion/cursos')
                window.location.reload(true);
          break;
          case 3:navigate('/coordinadores/novedades')
          window.location.reload(true);
          break;
          case 4:navigate('/encargados/cursos')
          window.location.reload(true);
          break;
          case 10:navigate('/admin/usuarios')
          window.location.reload(true);
          break;

      }
    } catch (error) {
      console.error(error);
      console.log('error credenciales')
      window.location.reload(true);
      alert('error credenciales')
    
    }

  };


  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });



  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#2196f3' }
  const btnstyle = { margin: '8px 0' }

  const LoginReturn = () => (


    <div>
  
      <div>
        <Button></Button>
      </div>
    <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <h2>Ingresar</h2>
            </Grid>
            <form onSubmit={loginSubmit}>
              <TextField
                variant="outlined"
                label="Usuario"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="usuario"
                onChange={handleChange}
              
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
              />
              <TextField
                variant="outlined"
                label="Contraseña"
                type="password"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="password"
                onChange={handleChange}
                value={usuario.password}
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
              /*  disabled={!usuario.cuil_cuit || !usuario.password} */
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Ingresar"
                )}
              </Button>
            </form>
            <Typography >
              <Link href="#" >
               ¿Olvidaste la contraseña?
              </Link>
            </Typography>
            <Typography >¿No estas registrado?
                <Registro />
            </Typography>
          </Paper>
        </Grid>
      </div>


    </div>
  )

  /*   const onFinish = (values) => {
      enviarDatos(urll, values)
    }
  
  
  
  
   */
  return (

    <>

  
<br></br><br></br><br></br>
  
        {LoginReturn()}



        

    </>
  )
}

export default Login;