// DialogComponent.js
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import servicioDatos from '../../../../services/fiscalizacion'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';


const DialogComponent = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  
  const [form, setForm] = useState()

 

  const handleChange = (e) => {
    console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const determinar = async () => {
    const mergedJSON = {
      ...form,
      ...{mapa1:props.info
      }
    };
    const rta = await servicioDatos.determinarmapa1bosques(mergedJSON)
    alert(rta)
    closeDialog();
  
    props.getClients()


  }

  // Función para abrir el diálogo
  const openDialog = async () => {
    setOpen(true);


  };

  // Función para cerrar el diálogo
  const closeDialog = () => {

    setOpen(false);
  };

  // Permite al componente padre llamar a openDialog desde el ref
  useImperativeHandle(ref, () => ({
    openDialog,
    closeDialog, // También puedes exponer la función closeDialog si es necesario
  }), []); // Asegura que esto se ejecute solo una vez


  const cerrar = () => {

  cerrar();
setForm()

  };


  return (
    <Dialog open={open} onClose={closeDialog} maxWidth={"110%"}>

<DialogTitle>Informacion</DialogTitle>
      

 
      {props.info}
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
     Sector
   </InputLabel>
   <NativeSelect
     defaultValue={'sin determnar'}
     onChange={handleChange}
     inputProps={{
       name: 'sector',
       id: 'uncontrolled-native',

     }}
   >  <option value={1}>Seleccionar</option>  
    <option value={"Bosques"}>Bosques</option>
     <option value={"Pinares"}>Pinares</option>
   
     
  

   </NativeSelect>

<InputLabel variant="standard" htmlFor="uncontrolled-native">
     Manzana
   </InputLabel>
   <NativeSelect
     defaultValue={'sin determnar'}
     onChange={handleChange}
     inputProps={{
       name: 'manzana',
       id: 'uncontrolled-native',

     }}
   >  <option value={1}>Seleccionar</option>  
    <option value={"A"}>A</option>
     <option value={"B"}>B</option>
     <option value={"C"}>C</option>
     <option value={"D"}>D</option>
     <option value={"E"}>E</option>
     <option value={"F"}>F</option>
     <option value={"G"}>G</option>
     
  

   </NativeSelect>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
     Lote
   </InputLabel>
   <NativeSelect
     defaultValue={'sin determnar'}
     onChange={handleChange}
     inputProps={{
       name: 'lote',
       id: 'uncontrolled-native',

     }}
   ><option value={1}>Seleccionar</option>  
    <option value={1}>1</option>
     <option value={2}>2</option>
     <option value={3}>3</option>
     <option value={4}>4</option>
     <option value={5}>5</option>
     <option value={6}>6</option>
     <option value={7}>7</option>
     <option value={8}>8</option>
     <option value={9}>9</option>
     <option value={10}>10</option>
     <option value={11}>11</option>
     <option value={12}>12</option>
     <option value={13}>13</option>
     <option value={14}>14</option>
     <option value={15}>15</option>
     <option value={16}>16</option>
     <option value={17}>17</option>
     <option value={18}>18</option>
     <option value={19}>19</option>
     <option value={20}>20</option>
     <option value={21}>21</option>
     <option value={22}>22</option>
     <option value={23}>23</option>
     <option value={24}>24</option>
     <option value={25}>25</option>
     <option value={26}>26</option>
     <option value={27}>27</option>
     <option value={28}>28</option>
     <option value={29}>29</option>
     <option value={30}>30</option>
     <option value={30}>31</option>
     

   </NativeSelect>
   <DialogActions>
     <Button onClick={determinar}>Determinar </Button>

     
     <Button onClick={cerrar}>Cerrar</Button>
     
   </DialogActions>
    </Dialog>
  );
});

export default DialogComponent;
