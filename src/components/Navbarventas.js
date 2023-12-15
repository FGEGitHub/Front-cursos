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
import DrawerNav from "./Drawernav2";
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

 

  const handleClick = () => {
    navigate("/login");
  };
  const hanleLogout = () => {
    /* console.log('click')
     setUser(null)
     servicioUsuario.setToken(user.token) 
        //  navigate('/login')
     */
   
  
     window.localStorage.removeItem('loggedNoteAppUser')
   
     navigate("/")
   } 

  const inicio = () => {
    navigate("/")
    

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



            
              </Tabs>
             


             

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
