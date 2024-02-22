import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { getThemeProps } from '@material-ui/styles';
import servicioDtc from '../../../../services/dtc'

const MobileAutocomplete = (props) => {
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

  return (
    <div>
      <Autocomplete
        options={props.chicos}
        getOptionLabel={(option) => option.nombre +option.apellido }
        renderInput={(params) => (
          <TextField {...params} label="Selecciona una opción" variant="outlined" />
        )}
        onChange={handleSelection}
      />

      <Button variant="contained" color="primary" onClick={handleBackendCall}>
        Poner/Quitar presente
      </Button>
    </div>
  );
};

export default MobileAutocomplete;
