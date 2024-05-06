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
label="Fecha de nacimiento"
type="date"
defaultValue="2023-03-01"
sx={{ width: 220 }}
InputLabelProps={{
  shrink: true,
}}
/>
      <Autocomplete 
        options={props.chicos}
        getOptionLabel={(option) => option.id_usuario == null ? option.nombre +" "+option.apellido :option.nombre +" "+option.apellido +"  Presente" }
        renderInput={(params) => (
          <TextField {...params} label="Selecciona una opción" variant="outlined" />
        )}
        onChange={handleSelection}
      />

      <button variant="outlined" color="primary" onClick={handleBackendCall}>
        Asignar turno
      </button>
     
    {selectedValue ? <><Ficha id={selectedValue.id}/></> :<></>}
    </div>
  );
};

export default MobileAutocomplete;