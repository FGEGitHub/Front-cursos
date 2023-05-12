import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating(props) {




  function tipo_rating() {
//setValue({valor:props.valor, texto: props.texto}) 

    return (
     // {Math.floor()(props.valor/2)

      <>
   <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >

   
      <Typography component="legend">{props.texto} </Typography>
      <Rating name="read-only" value={props.valor+1} readOnly />
            
    </Box>
     
      </>

    );
  }










  return (<>
   {tipo_rating()}
  </>
   
  );
}