import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  useState } from "react";
import servicioUsuario from '../services/usuarios'
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import RegIcon from "@mui/icons-material/HowToRegRounded";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 100,
		maxHeight: 500,
		width: 600,
		maxWidth: 900,
		borderRadius: 20,
		"-webkit-box-shadow":
			"0 24px 38px 3px rgba(0, 0, 0, 0.14),0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2)",
		"box-shadow":
			"0 24px 38px 3px rgba(0, 0, 0, 0.14),0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2)",
		"--softUIEffect-3": "inset 3px 3px 5px #b8b9be, inset -3px -3px 6px #fff"
	},
	field: {
		"box-shadow":
			"inset 3px 3px 6px #b8b9be, inset -3px -3px 6px rgb(253, 253, 253)"
	}
}));
const theme = createTheme();

export default function Ingresos() {
  const cardStyles = useStyles(theme);


  let params = useParams()
    let cuil_cuit = params.cuil_cuit
   
    const [open, setOpen] = React.useState(false);
    const [usuario, setUsuario] = useState({
      cuil_cuit: "",
      password: "",
});
  const handleChange = (e) =>{
    console.log(usuario)
    setUsuario({  ...usuario, [e.target.name]: e.target.value })}

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDeterminar = async (event) => {
    event.preventDefault()

    const rta=  await servicioUsuario.registro(
      usuario
     )
    
 
    

   setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
       Registrarme
      </Button>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <Paper
							sx={{
                px: 40,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
                alignContent: "center"
							}}
						>
							<Avatar
								sx={{
									m: 1,
									bgcolor: "darkblue",
									marginRight: 3
								}}
							>
								<AccountCircleRoundedIcon fontSize="large" />
							</Avatar>
							<Typography  component="h1" variant="h4">
								Registro
							</Typography>
						</Paper>
            <Paper>
            <Typography align='center' component="h1" variant="h6">Complete con todos sus Datos</Typography>

            </Paper>
        <DialogContent>

          <form  onSubmit={handleDeterminar}> 
          <TextField className={cardStyles.field}
								sx={{
                  mx: 3, width: '75%'
								}}
            autoFocus
            required
            margin="dense"
            id="name"
            label="Usuario"
            name="usuario"
            onChange={handleChange}
            size="small"
            variant="standard"
          />
          <TextField 								
            className={cardStyles.field}
            sx={{
              mx: 3, width: '75%'
								}}
            autoFocus
            required
            margin="normal"
            size="small"
            id="name"
            onChange={handleChange}
            type= "password"
            label="Contraseña"
            name="password"
            variant="standard"
          />
          <TextField
          className={cardStyles.field}
								sx={{
                  mx: 3, width: '75%'
								}}
            autoFocus
            required
            margin="dense"
            id="name"
            label="Nombre Completo"
            name="nombre"
            onChange={handleChange}
            size="small"
            variant="standard"
          />
          
          
          <TextField
          className={cardStyles.field}
								sx={{
                  mx: 3, width: '75%'
								}}
            autoFocus
            required
            margin="dense"
            id="name"
            label="Email"
            name="mail"
            onChange={handleChange}
            size="small"
            variant="standard"
          />
          <TextField
          className={cardStyles.field}
								sx={{
                  mx: 3, width: '75%'
								}}
            autoFocus
            required
            margin="dense"
            id="name"
            label="Numero de Telefono"
            name="tel"
            onChange={handleChange}
            size="small"
            variant="standard"
          />
        
          <DialogActions>
          <Button 
          
          onClick={handleClose}
          variant="contained"
								sx={{
									mt: 3,
									maxWidth: 130,
									borderRadius: 2,
									height: 30,
									fontWeight: 850,
									fontSize: 12
								}}
							>
								<span style={{ padding: 10 }}>Cancelar{"     "}</span> 
                
                </Button>
          <Button
                  onClick={handleDeterminar}
  								variant="contained"
								sx={{
									mt: 3,
									maxWidth: 130,
									borderRadius: 2,
									height: 30,
									fontWeight: 850,
									fontSize: 12
								}}
							>
								<span style={{ padding: 10 }}>Registrar{"     "}</span>
								<RegIcon fontSize="small" />
							</Button>
              
        </DialogActions>
        
           </form>
        </DialogContent>
      
        
        
      </Dialog>
    </div>
  );
}
