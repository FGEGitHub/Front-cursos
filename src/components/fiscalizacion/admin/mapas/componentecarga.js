import { useState, useEffect, useRef } from "react";
import DialogComponent from './modalbosqueslogin';
import Tooltip from '@mui/material/Tooltip';
import NativeSelect from '@mui/material/NativeSelect';
import Barrios from './barrios';


import * as React from 'react';


import MuiAlert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import servicioDatos from '../../../../services/fiscalizacion'

import Button from '@mui/material/Button';
import './config.css'
//import Gps from "../../Assets/bosques.jpeg"
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Arg = () => {
  //configuracion de Hooks
  const dialogRef = useRef();
  const [info, setInfo] = React.useState();
  const [promedio, setPromedio] = React.useState(0);
  const [lotes, setLotes] = React.useState();
  const [seleccion, setSeleccion] = useState()
  const [imagenDeFondoActivada, setImagenDeFondoActivada] = useState(false);

  const getClients = async () => {

    const lotess = await servicioDatos.traerescuelas()


    setLotes(lotess)
    setPromedio(1/1)

  }

  useEffect(() => {
    getClients()
  }, [])

  const handleOpenDialog = async (p) => {
    console.log(p)
   await setInfo(p)
    console.log(info)
    // setForm({ mapa: p,fraccion:1,manzana:1,lote:1 })
    dialogRef.current.openDialog();


  };
  const handleChange = (e) => {
    console.log( e.target.value)
    setSeleccion(e.target.value)


}
  const toggleImagenDeFondo = () => {
    setImagenDeFondoActivada((prev) => !prev);
  };

  return (
    <>


      <div  >

     
            <React.Fragment>
             <Button
                onClick={toggleImagenDeFondo}
                variant="contained"
                color="primary"
                style={{ position: 'Sticky',width: "15%", zIndex: 2 }}

              >
                {imagenDeFondoActivada ? 'Desactivar' : 'Activar'} GPS
                </Button> 
          
              
              <NativeSelect
defaultValue={30}
onChange={handleChange}
style={{ position: 'Sticky', zIndex: 2,marginBottom: "20px" }}
inputProps={{
    name: 'anio',
    id: 'uncontrolled-native',

}}

> <option value={''}>Elegir</option>
<option value={'Verde'}>Verde</option>
<option value={'Amarillo'}>Amarillo</option>
<option value={'Rojo'}>Rojo</option>




</NativeSelect>
 
              
            </React.Fragment>
   

      </div>
      <DialogComponent ref={dialogRef} title=""
   
        info={info}
        mapa={'Bosques'}
        getClients={ async () => {

            const lotess = await servicioDatos.traerloteslogin()
        console.log(lotess[0])
            setLotes(lotess[0])
            setPromedio(lotess[1]/lotess[0].length)
        
          }}>

      </DialogComponent>


      
    </>


  )
}

export default Arg;