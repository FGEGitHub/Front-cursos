import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logocoalicion.png";
import Typography from '@mui/material/Typography';
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerNav from "./DrawerNav";
import servicioPErsonas from '../services/personas'


const Navbar = (props) => {
  

  
  const [user, setUser] = useState(null)
  const [cargado, setCargado] = useState(false)

  const [value, setValue] = useState();
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const islogo = {
                  width: "130px",                  
                  };
  const navigate = useNavigate();

  useEffect(() => {
    traer()
}, [])
const traer = async () => {


  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    const user = JSON.parse(loggedUserJSON)
 
  const notis = await servicioPErsonas.traerusuario(user.id)
  console.log(notis)
  setUser(notis)
  setCargado(true)


  /* if (notificaciones>0) {
    document.title= 'Santa Catalina ('+notificaciones+')'
 
  }   */
}

  const handleClick = () => {
    navigate("/loginn");
  };
  const hanleLogout = () => {
    /* console.log('click')
     setUser(null)
     servicioUsuario.setToken(user.token) 
        //  navigate('/login')
     */
   
  
     window.localStorage.removeItem('loggedNoteAppUser')
   
     navigate("/loginn")
   } 

  const inicio = () => {
    navigate("/loginn")
    

  }
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#Primary" }}>
        <Toolbar>
           <img style={islogo} src={logo} alt="logo" /> 
          {isMatch ? (
            <>
              <DrawerNav />
            </>
          ) : (
            <>
              
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="Secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
              <Tab label= '' />

         
                {cargado ? <div> 
                {user.length > 0? <>
                  <Tab label= {`hola  ${user[0].nombre} !`}/>
                  </>:<>
                  <Tab />
</>}

      </div>:<div></div>}


              {user? <>
              <Button onClick={hanleLogout} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label= {`Cerrar sesion`}/>
              </Button>
              </>:<>
              <Button sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label= {`Iniciar sesion`}/>
              </Button></>}
              </Tabs>
             


             

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
