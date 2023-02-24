import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import logo from "../Assets/marcas.png";

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
import Typography from '@mui/material/Typography';

const Navbar = (props) => {
  

  
  const [user, setUser] = useState(null)
  const [cargado, setCargado] = useState(false)

  const [value, setValue] = useState();
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const islogo = {
                  width: "100px",                  
                  };
  const navigate = useNavigate();



  const handleClick = () => {
    navigate("/login");
  };
  const hanleLogout = () => {
    /* console.log('click')
     setUser(null)
     servicioUsuario.setToken(user.token) 
        //  navigate('/login')
     */
   
      window.location.reload();
     window.localStorage.removeItem('loggedNoteAppUser')
   

   } 

  const inicio = () => {
    navigate("/")
    

  }
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#Primary" }}>
        <Toolbar>
            {/* <img style={islogo} src={logo} alt="logo" /> */}
          {isMatch ? (
            <>
              <DrawerNav />
            </>
          ) : (
            <>
             <Typography variant="h6" sx={{ my: 2 }}>
            Menu Profesores
           </Typography>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="Secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
            
                {cargado ? <div> <Button onClick={inicio} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label= {`hola ${user.nombre}!`}/>
              </Button> </div>:<div></div>}
              <Button onClick={hanleLogout} sx={{ marginLeft: "10px" }} variant="Outlined">
                  <Tab label= {`Cerrar sesion`}/>
              </Button>
            
              </Tabs>
             


             

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;