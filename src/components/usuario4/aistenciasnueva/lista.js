import servicioEncargados from '../../../services/encargados';
import React, { useEffect, useState } from "react";
import { Paper, Tooltip } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useParams } from 'react-router-dom';

import TableHead from '@mui/material/TableHead';
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TablaNotificaciones = (props) => {
    const [clases, setClases] = useState(['']);
    const [usuario, setUsuario] = useState(['']);
    const [vista, setVista] = useState(true);
    let id = useParams().id;
  
    useEffect(() => {
      traer();
    }, []);
  
    const traer = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON);
          setUsuario(usuario);
          const novedades_aux = await servicioEncargados.cursadoparaasistencia(id);
          setClases(novedades_aux[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleAsistencia = async (id, clase, valorActual) => {
      const nuevoValor = valorActual === 'Ausente' ? 'Presente' : 'Ausente';
      try {
        const rta = await servicioEncargados.actualizarasistencia({
          id,
          clase,
          asistencia: nuevoValor,
        });
        alert(rta);
        traer();
      } catch (error) {
        console.error("Error al actualizar la asistencia", error);
      }
    };

    const handleWhatsAppClick = (numero) => {
        const url = `https://wa.me/${numero}`;
        window.open(url, '_blank');
    };

    const renderCellWithTooltip = (id, clase, valorActual) => {
      const getColor = (valor) => {
        return valor === 'Presente' ? 'green' : 'red';
      };

      return (
        <Tooltip title="🖐️" arrow>
          <StyledTableCell
            onClick={() => handleAsistencia(id, clase, valorActual)}
            style={{
              cursor: 'pointer',
              backgroundColor: getColor(valorActual),
              color: 'white',
            }}
          >
            {valorActual}
          </StyledTableCell>
        </Tooltip>
      );
    };

    return (
      <div>
        {clases ? (
          <>
            <div>
              <h2>Puedes hacer clic en "Ausente" o "Presente" para tomar asistencia</h2>
              {vista ? (
                <>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: "20%", maxWidth: "1000%" }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>APELLIDO</StyledTableCell>
                          <StyledTableCell>NOMBRE</StyledTableCell>
                          <StyledTableCell>DNI</StyledTableCell>
                          <StyledTableCell>TEL</StyledTableCell>
                          <StyledTableCell>TEL 2</StyledTableCell>
                          <StyledTableCell>Clase 1</StyledTableCell>
                          <StyledTableCell>Clase 2</StyledTableCell>
                          <StyledTableCell>Clase 3</StyledTableCell>
                          <StyledTableCell>Clase 4</StyledTableCell>
                          <StyledTableCell>Clase 5</StyledTableCell>
                          <StyledTableCell>Clase 6</StyledTableCell>
                          <StyledTableCell>Clase 7</StyledTableCell>
                          <StyledTableCell>Clase 8</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {clases.map((row) => (
                          <StyledTableRow key={row.id}>
                            <StyledTableCell>{row.apellido}</StyledTableCell>
                            <StyledTableCell>{row.nombre}</StyledTableCell>
                            <StyledTableCell>{row.dni}</StyledTableCell>
                            <StyledTableCell
                              onClick={() => handleWhatsAppClick(row.tel)}
                              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                            >
                              {row.tel}
                            </StyledTableCell>
                            <StyledTableCell
                              onClick={() => handleWhatsAppClick(row.tel2)}
                              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                            >
                              {row.tel2}
                            </StyledTableCell>

                            {renderCellWithTooltip(row.id, 'clase1', row.clase1)}
                            {renderCellWithTooltip(row.id, 'clase2', row.clase2)}
                            {renderCellWithTooltip(row.id, 'clase3', row.clase3)}
                            {renderCellWithTooltip(row.id, 'clase4', row.clase4)}
                            {renderCellWithTooltip(row.id, 'clase5', row.clase5)}
                            {renderCellWithTooltip(row.id, 'clase6', row.clase6)}
                            {renderCellWithTooltip(row.id, 'clase7', row.clase7)}
                            {renderCellWithTooltip(row.id, 'clase8', row.clase8)}
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    );
};

export default TablaNotificaciones;
