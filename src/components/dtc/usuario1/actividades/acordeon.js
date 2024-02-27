import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AccordionExpandIcon(props) {
  return (
    <div>
      {props.actividades.length>0 ? <>
        {props.actividades.map((row) => (
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{row.nombre} - {row.titulo}  </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          { row.detalle}
          </Typography>
        </AccordionDetails>
      </Accordion>
     ) )}
      </>:<>No hay actividades en el dia</>}
    </div>
  );
}