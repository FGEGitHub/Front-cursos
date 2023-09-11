import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import servicioinscrip from '../../services/inscripciones'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const SimplePage = () => {
  const [form, setForm] = useState({edicion:"junio"});
  const [resultados, setResultados] = useState('');

  const handleChange = (e) =>
  setForm({ ...form, [e.target.name]: e.target.value });


  const columns = [
    {
      name: "Inscripto",
      options: {
          customBodyRenderLite: (dataIndex, rowIndex) =>
              inscripto(
                  dataIndex,
                  rowIndex,
                  // overbookingData,
                  // handleEditOpen
              )
      }
  
  },
  {
    name: "Nombre",
    options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
            inscriptonombre(
                dataIndex,
                rowIndex,
                // overbookingData,
                // handleEditOpen
            )
    }

},
    {
        name: "dni",
        label: "dni",
    },

    
    
    {
      name: "Fecha",
      options: {
          customBodyRenderLite: (dataIndex, rowIndex) =>
              fecha(
                  dataIndex,
                  rowIndex,
                  // overbookingData,
                  // handleEditOpen
              )
      }
  
  },




    
  


];
function fecha(dataIndex, rowIndex, data, onClick) {
    return (
        <>
            {resultados[dataIndex].fecha != null ? <>{resultados[dataIndex].fecha}</>:<>11/09/2023</>} 


        </>

    );
}





function fiscalizofuncion(dataIndex, rowIndex, data, onClick) {
    return (
        <>
            {resultados[dataIndex].nombreesc  !=null ?  <>{resultados[dataIndex].nombreesc} </>: <>No</> }


        </>

    );
}



function mesafuncion(dataIndex, rowIndex, data, onClick) {
    return (
        <>
            {resultados[dataIndex].numero !=null ?  <>{resultados[dataIndex].numero}</>: <>Sin definir</> }


        </>

    );
}




function inscriptonombre(dataIndex, rowIndex, data, onClick) {
  return (
      <>
         <>{resultados[dataIndex].nombre} {resultados[dataIndex].apellido}</>


      </>

  );
}

function inscripto(dataIndex, rowIndex, data, onClick) {
  return (
      <>
          <>Si</>


      </>

  );
}
  const handleDeterminarpordni = async (event) => {
    event.preventDefault();
    try {

     const rta = await servicioinscrip.buscarestadopordni(form)
     console.log(rta)
     setResultados(rta)
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }

  };
  
  const handleDeterminarpornombre = async (event) => {
    event.preventDefault();
    try {

      const rta = await servicioinscrip.buscarestadopornombre(form)
      setResultados(rta)
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }

  };
  
  return (
    <Container maxWidth="sm">
  {/*             <FormControl component="fieldset">
        <FormLabel component="legend">Edición</FormLabel>
        <RadioGroup name="edicion" value={form.edicion} onChange={handleChange}>
          <FormControlLabel value="junio" control={<Radio />} label="junio" />
          <FormControlLabel value="agosto" control={<Radio />} label="agosto" />
 
        </RadioGroup>
      </FormControl> */}
      <Grid container spacing={2} alignItems="center" justifyContent="center" marginTop={2}>
        <Grid item xs={12}>
          <TextField
            label="Buscar por dni"
            variant="outlined"
            fullWidth
            name="dni"
         
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        {form.dni ? <> <Button variant="contained" color="primary" fullWidth onClick={handleDeterminarpordni}>
            Buscar por DNI
          </Button></> : <><Button variant="contained" color="primary" fullWidth disabled>
            Buscar porDNI
          </Button></> }
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Buscar por Nombre o Apellido"
            variant="outlined"
            fullWidth
            name="nombre"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {form.nombre ? <> <Button variant="contained" color="primary" fullWidth onClick={handleDeterminarpornombre}>
            Buscar por nombre o apellido
          </Button></> : <><Button variant="contained" color="primary" fullWidth disabled>
            Buscar por nombre o apellido
          </Button></> }
        
        </Grid>
      </Grid>
{resultados &&
<div className="mobile-table-container">
      <MUIDataTable
        title="Resultados"
        data={resultados}
        columns={columns}
        options={{
          responsive: 'simple',
          selectableRows: 'none',
          search: false,
          print: false,
          download: false,
          filter: false,
          viewColumns: false,
          pagination: false,
        }}
      />
      </div>
      }
    </Container>
  );
};

export default SimplePage;
