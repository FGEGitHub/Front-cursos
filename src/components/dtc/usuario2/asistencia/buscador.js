import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { getThemeProps } from '@material-ui/styles';
import servicioDtc from '../../../../services/dtc'
import { useNavigate } from "react-router-dom";
const MobileAutocomplete = (props) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelection = (event, value) => {
    // Aquí puedes realizar alguna acción cuando se selecciona un valor
    console.log('Valor seleccionado:', value);
    setSelectedValue({id:value.id});
   
    // También puedes hacer un llamado al backend con el valor seleccionado
    // Ejemplo: hacerLlamadoAlBackend(value);
  };

  const handleBackendCall = async () => {
    // Lógica para hacer un llamado al backend con el valor seleccionado
    if (selectedValue) {
        const mergedJSON = {
            ...selectedValue,
            ...{fecha:props.fecha}
          };
      console.log(props.fecha)
      console.log(mergedJSON)
     const ta = await servicioDtc.ponerpresente(mergedJSON)
     console.log(ta)
      // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
      // Ejemplo: axios.post('/api/backend', { selectedValue });
      props.traer()
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
      <Autocomplete
        options={props.chicos}
        getOptionLabel={(option) => option.id_usuario == null ? option.nombre +" "+option.apellido :option.nombre +" "+option.apellido +"  Presente" }
        renderInput={(params) => (
          <TextField {...params} label="Selecciona una opción" variant="outlined" />
        )}
        onChange={handleSelection}
      />

      <Button variant="contained" color="primary" onClick={handleBackendCall}>
        Poner/Quitar presente
      </Button>
      <Button variant="contained" color="primary" onClick={ir}>
        Ver usuario
      </Button>
    </div>
  );
};

export default MobileAutocomplete;
