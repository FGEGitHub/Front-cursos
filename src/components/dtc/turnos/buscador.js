import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { getThemeProps } from '@material-ui/styles';
import servicioDtc from '../../../services/dtc'
import Ficha from '../usuario1/personapsic.js/ficha'
import { useNavigate } from "react-router-dom";
const MobileAutocomplete = (props) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState();
  const [form, setForm] = useState({})
  const today = new Date().toISOString().split("T")[0]
  const handleSelection = async (event, value) => {
    // Aquí puedes realizar alguna acción cuando se selecciona un valor
    console.log('Valor seleccionado:', value);
   await setSelectedValue();
   await setSelectedValue({id:value.id});
  
   
    // También puedes hacer un llamado al backend con el valor seleccionado
    // Ejemplo: hacerLlamadoAlBackend(value);
  };

  const handleChange = (e) => {
    props.traer({fecha:e.target.value}) 

    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBackendCall = async () => {
    // Lógica para hacer un llamado al backend con el valor seleccionado
    if (selectedValue) {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      console.log(form.fecha) 
        const mergedJSON = {
            ...selectedValue,
            ...{fecha:form.fecha,
             }
          };
          console.log(mergedJSON) 
     const ta = await servicioDtc.agendarturno(mergedJSON)
     alert(ta)
      // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
      // Ejemplo: axios.post('/api/backend', { selectedValue });
   
      props.traer({fecha:form.fecha})
    }
  };
  const ir = async () => {
    // Lógica para hacer un llamado al backend con el valor seleccionado

    navigate('/dtc/usuario1/usuario/'+selectedValue.id)
      // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
      // Ejemplo: axios.post('/api/backend', { selectedValue });

  };

  return (
    <div>
 <TextField
      onChange={handleChange}
      name="fecha"
      id="date"
      label="Fecha"
      type="date"
      defaultValue={today} // Establece el valor por defecto como la fecha actual
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
     
     
    {selectedValue ? <><Ficha id={selectedValue.id}/></> :<></>}
    </div>
  );
};

export default MobileAutocomplete;
