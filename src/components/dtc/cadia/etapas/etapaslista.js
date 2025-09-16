import servicioDtc from '../../../../services/dtc'
import ModaNueva from './nueva'
import React, { useEffect, useState } from "react";
import Actualizar from './modificarr';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import { useTheme, Button } from '@material-ui/core';
import Modalborrar from './borrar';

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

const TablaNotificaciones = () => {
  const theme = useTheme();
  const [chicos, setChicos] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [datos, setDatos] = useState(null);
  const [vistaCelular, setVistaCelular] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  let id = params.id;

  useEffect(() => {
    traer();
  }, []);

  const traer = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        setUsuario(usuario);
      }
      const novedades_aux = await servicioDtc.traeretapacocinacadia();
      setChicos(novedades_aux[0]);
      setDatos(novedades_aux[1]);
    } catch (error) {
      console.error("Error al traer datos", error);
    }
  };

  const toggleVista = () => {
    setVistaCelular(!vistaCelular);
  };

  return (
    <div
      style={{
        cursor: 'pointer',

      }}
    >
      {datos ? (
        <Alert variant="filled" severity="success"></Alert>
      ) : null}

      

      <h2>Lista de etapas</h2>

      <ModaNueva
        id_usuario={usuario?.id}
        traer={traer}
      />

      {!chicos ? (
        <p>Cargando...</p>
      ) : chicos.length === 0 ? (
        <h2>Aún no hay etapas</h2>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
            
                <TableCell>Proyecto / Etapa</TableCell>
                <TableCell>Estado </TableCell>
                <TableCell>Proyectar (Pipo)</TableCell>
                      <TableCell>Título</TableCell>
                <TableCell>Acciones</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {chicos.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.fecha}</TableCell>

                  <TableCell>{row.proyecto} {row.etapa}</TableCell>

                  <TableCell
                  
                  >
                    <b>
                      {row.fecha_fin === null
                        ? `Iniciado - Fecha: ${row.fecha}`
                        : `Finalizado - Fecha: ${row.fecha} - ${row.fecha_fin}`}
                    </b>
                  </TableCell>

                  <TableCell
                 
                  >
                    {row.proyectar}
                  </TableCell>

              
   <TableCell>{row.titulo}</TableCell>
                  <TableCell>
                    <Actualizar
                      id={row.id}
                      fecha={row.fecha}
                      estado={row.estado}
                      titulo={row.titulo}
                      descripcion={row.descripcion}
                      traer={traer}
                    />
                    <Modalborrar
                      id={row.id}
                      titulo={row.titulo}
                      fecha={row.fecha}
                      descripcion={row.descripcion}
                      fecha_fin={row.fecha_fin}
                      proyectar={row.proyectar}
                      estado={row.estado}
                      traer={traer}
                    />
                  </TableCell>
                                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TablaNotificaciones;
