import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Box,
  Alert,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import servicioDtc from '../../../services/dtc';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  fontSize: 14,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#1de9b6",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ResponsiveTable = styled(Table)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTableCell-root': {
    whiteSpace: 'nowrap',
    padding: '8px 16px',
    textAlign: 'left',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTableCell-root': {
      display: 'block',
      position: 'relative',
      paddingLeft: '40%',
      '&::before': {
        content: 'attr(data-label)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
      },
    },
    '& .MuiTableHead-root': {
      display: 'none',
    },
    backgroundColor: "#f0f0f0",
  },
}));

export default function Ingresos(props) {
  const navigate = useNavigate();
  const [inscrip, setInscrip] = useState([]);
  const [datos, setDatos] = useState();
  const [raciones, setRaciones] = useState();
  const [premerienda, setPremerienda] = useState();
  const [nuevos, setNuevos] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const fecha = props.fecha || formattedDate;
      const id = props.idt || user.id;
      const historial = await servicioDtc.traerpresentes({ fecha, id });

      setInscrip(historial[0]);
      setDatos(historial[2]);
      setRaciones(historial[3]);
      setPremerienda(historial[4]);
      setCurrentDate(fecha);
    }
  };

  useEffect(() => {
    traer();
  }, [props.fecha, props.idt]);

  const checkede = async (id) => {
    await servicioDtc.restar1(id);
    traer();
  };

  const checkedep = async (id) => {
    await servicioDtc.restar1p(id);
    traer();
  };

  const checkedemasp = async (id) => {
    await servicioDtc.sumar1p(id);
    traer();
  };

  const checkedemas = async (id) => {
    await servicioDtc.sumar1(id);
    traer();
  };

  const revisto = async () => {
    await servicioDtc.revisto();
    traer();
  };

  const renderTable = (inscrip, title) => (
    <Box sx={{ overflowX: 'auto', marginBottom: '20px' }}>
      <h4>{title}</h4>
      <ResponsiveTable>
        <TableBody>
          {inscrip.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell data-label="Apellido y Nombre">
                {row.apellido} {row.nombre}
              </StyledTableCell>
              <StyledTableCell data-label="Premerienda">
                Restar
                <RemoveCircleRoundedIcon onClick={() => checkedep(row.id)} />
                <b> ({row.premerienda}) </b>
                <AddCircleRoundedIcon onClick={() => checkedemasp(row.id)} />
                Añadir
              </StyledTableCell>
              <StyledTableCell data-label="Merienda">
                Restar
                <RemoveCircleRoundedIcon onClick={() => checkede(row.id)} />
                <b> ({row.racion}) </b>
                <AddCircleRoundedIcon onClick={() => checkedemas(row.id)} />
                Añadir
              </StyledTableCell>
              <StyledTableCell data-label="Kid">{row.kid}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </ResponsiveTable>
    </Box>
  );

  const kid1Data = inscrip.filter((row) => row.kid === 'kid1');
  const kid2Data = inscrip.filter((row) => row.kid === 'kid2');
  const kid3Data = inscrip.filter((row) => row.kid === 'kid3');

  return (
    <Paper sx={{ padding: 2 }}>
      {nuevos > 0 && (
        <Alert variant="filled" severity="success">
          <Button onClick={revisto} variant="contained">Ya revisé</Button>
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <Button variant="contained" onClick={() => navigate('/dtc/cargaetapas')}>Ir a Etapas</Button>
        <Button variant="contained" onClick={() => navigate('/dtc/cocinaasis')}>Ir a Asistencia</Button>
        <Button variant="contained" onClick={() => navigate('/dtc/cocinastock')}>Ir a Stock</Button>
        <Button variant="contained" onClick={() => navigate('/dtc/cocinaraciones')}>Ir a Raciones</Button>
      </Box>

      {datos && (
        <>
          <h4>Lista de presentes ({inscrip.length})</h4>
          <h4>Cantidad de merienda: {raciones} - Horario extendido: {datos.horario}</h4>
          <h4>Cantidad de colación: {premerienda}</h4>
          <p>Kid1: {datos.kid1}, Kid2: {datos.kid2}, Adolescentes: {datos.kid3}</p>
        </>
      )}

      {renderTable(kid1Data, "Kid1")}
      {renderTable(kid2Data, "Kid2")}
      {renderTable(kid3Data, "Kid3")}
    </Paper>
  );
}
