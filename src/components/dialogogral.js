import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Logoesme from '../Assets/anuncio.webp';
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [respues, setResp] = React.useState();
  const [cargando, setCargando] = React.useState(false);


  const getClients =async (event) => {
    setCargando(true);
    console.log(props.inscrip)
 //  const rta = await servicioPersonas.enviarinscripcion(props.formulario);
 
    setCargando(false);
}




  const handleClickOpen = () => {
    setOpen(true);
    getClients()
  };

  const handleClose = () => {
  
    if (respues=='Inscripcion realizada, te pedimos que aguardes contacto'){
        window.location.reload();
    }
    setOpen(false);
  };
  const islogo = {
    width: "20%",
    height: "20%",
    margin: 0,
    padding: 0,
    display: "flex",

};
  return (
    <div>
   
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
  <div>
    {"Escuela de mujeres emprendedoras"}
  </div>
  <img style={islogo} src={Logoesme} alt="logo" />
</DialogTitle>
        <DialogContent>
      
          <DialogContentText id="alert-dialog-description">
         fsdf
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Entendido</Button>
          
           
          
        </DialogActions>
      </Dialog>
    </div>
  );
}