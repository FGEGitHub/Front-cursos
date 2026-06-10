import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import servicioDtc from '../../../../services/dtc'
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Buscador from './buscador'
import Retiro from './retiro'
import Retorno from './retorno'
import Skeleton from '@mui/material/Skeleton';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Alert,
  Box
} from "@mui/material";
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const MobileFriendlyTable = (props) => {
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const [usuario, setUsuario] = useState();
  const [openHorarios, setOpenHorarios] = useState(false);
const [horarios, setHorarios] = useState([]);
const [chicoSeleccionado, setChicoSeleccionado] = useState(null);

  useEffect(() => {
      

    const fetchCurrentDate = () => {
 
const today = new Date();

const formattedDate = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
   
      props.fecha == undefined ? setCurrentDate(formattedDate) : setCurrentDate(props.fecha)
    };

    fetchCurrentDate(); 
     traer()
  }, []);
  const verHorarios = async (row) => {
  setChicoSeleccionado(row);

  try {
    const resp = await servicioDtc.traerhorariosusuario({
      id_usuario: row.id_usuario
    });

    console.log("Horarios:", resp);

    setHorarios(resp || []);
    setOpenHorarios(true);
  } catch (error) {
    console.error(error);
  }
};

  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    const user = JSON.parse(loggedUserJSON)
    setUsuario(user)

const today = new Date();

const formattedDate = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    props.fecha == undefined ? setCurrentDate(formattedDate) : setCurrentDate(props.fecha)
          console.log(props.fecha)
                console.log(formattedDate)
    const historial = await servicioDtc.traerpresentes(props.fecha == undefined ? { fecha: formattedDate, id: props.idt == undefined ? user.id : props.idt } : { fecha: props.fecha, id: props.idt == undefined ? user.id : props.idt })

    console.log(historial)
    setDatos(historial)
    // 

  };

  const ausente = async (row) => {
    console.log(row)
    const ta = await servicioDtc.ponerpresente({ fecha: row.fecha, id: row.id_usuario, id_tallerista: usuario.id })
    console.log(ta)
    // Aquí puedes realizar la llamada al backend utilizando algún servicio o librería
    // Ejemplo: axios.post('/api/backend', { selectedValue });
    traer()
  }
  return (
    <div>
      {datos ? <>
        <Typography variant="p" gutterBottom>
          Fecha: {currentDate} - {datos[0].length} presentes
        </Typography>
        {usuario ? <>
          {usuario.nivel == 21 || usuario.nivel == 20 || usuario.nivel == 31? <>
            <Buscador
              chicos={datos[1]}
              fecha={currentDate}
              usuario={usuario}
              traer={async () => {
           
const today = new Date();

const formattedDate = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;



props.fecha == undefined ? setCurrentDate(formattedDate) : setCurrentDate(props.fecha)
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

                const user = JSON.parse(loggedUserJSON)
                setUsuario(user)
      
                const historial = await servicioDtc.traerpresentes(props.fecha == undefined ? { fecha: formattedDate, id: props.idt == undefined ? user.id : props.idt } : { fecha: props.fecha, id: props.idt == undefined ? user.id : props.idt })


                setDatos(historial)
                // 

              }
            }
            traer2={props.traer}
            /></> : <></>}</> : <></>}
        <TableContainer>
          {!datos[0] ? <Skeleton /> : <>
      
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>horarios</b></TableCell>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Hora</b></TableCell>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Retiro/Retorno</b></TableCell>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Anunciar retiro</b></TableCell>
                  <TableCell style={{ backgroundColor: "#37474f", color: 'white' }}><b>Quitar</b></TableCell>


                </TableRow>
              </TableHead>
              <TableBody>



                {datos[0].map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">{row.apellido}  {row.nombre}</StyledTableCell>
            <StyledTableCell component="th" scope="row">
  <Button
    variant="contained"
    size="small"
    sx={{
      minWidth: "32px",
      padding: "2px 4px",
      fontSize: "0.65rem"
    }}
    onClick={() => verHorarios(row)}
  >
    Ver horario
  </Button>
</StyledTableCell>
       
                    <StyledTableCell component="th" scope="row"> <b>{row.hora} </b> </StyledTableCell>
                    <StyledTableCell component="th" scope="row"> <b> {row.retiro !="No" ? <>{row.retiro}{row.retorno !="Sin determinar" ?<>-{row.retorno}</>:<>- Sin regreso</> }</>:<>{row.retiro}</>}     </b> </StyledTableCell>
                    <StyledTableCell component="th" scope="row">


                      {row.retiro == "No" ? <>
                        <Retiro id={row.id} 
                        nombre={row.nombre}
                        apellido={row.apellido}
                        traer={async () => {
                          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

                          const user = JSON.parse(loggedUserJSON)
                          setUsuario(user)

                 
const today = new Date();

const formattedDate = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


props.fecha == undefined ? setCurrentDate(formattedDate) : setCurrentDate(props.fecha)

                          const historial = await servicioDtc.traerpresentes(props.fecha == undefined ? { fecha: formattedDate, id: props.idt == undefined ? user.id : props.idt } : { fecha: props.fecha, id: props.idt == undefined ? user.id : props.idt })

                          console.log(historial)
                          setDatos(historial)
                          // 

                        }} />

                      </> : <>


                        <Retorno id={row.id} traer={async () => {
                          const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

                          const user = JSON.parse(loggedUserJSON)
                          setUsuario(user)

                          const today = new Date();
                          const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                          props.fecha == undefined ? setCurrentDate(formattedDate) : setCurrentDate(props.fecha)

                          const historial = await servicioDtc.traerpresentes(props.fecha == undefined ? { fecha: formattedDate, id: props.idt == undefined ? user.id : props.idt } : { fecha: props.fecha, id: props.idt == undefined ? user.id : props.idt })

                          console.log(historial)
                          setDatos(historial)
                          // 

                        }} />


                      </>}





                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row"> <b><button onClick={() => ausente(row)}>Quitar</button> </b> </StyledTableCell>



                  </StyledTableRow>
                ))}




              </TableBody>
            </Table>
          </>}

        </TableContainer>
      </> : <></>}
<Dialog
  open={openHorarios}
  onClose={() => setOpenHorarios(false)}
  fullWidth
  maxWidth="xs"
>
  <DialogTitle>
    Horarios de {chicoSeleccionado?.apellido} {chicoSeleccionado?.nombre}
  </DialogTitle>

  <DialogContent>
    {!horarios || Object.keys(horarios).length === 0 ? (
      <Alert severity="info">
        No posee horarios asignados
      </Alert>
    ) : (
      Object.entries(horarios).map(([dia, lista]) => (
        <Paper
          key={dia}
          elevation={2}
          sx={{
            p: 1,
            mb: 2,
            borderRadius: 2
          }}
        >
          <b style={{ fontSize: 18 }}>{dia}</b>

          {lista.map((item, i) => (
            <Box
              key={i}
              sx={{
                mt: 1,
                p: 1,
                background: "#f5f5f5",
                borderRadius: 1
              }}
            >
              <div>
                <b>{item.hora}</b>
              </div>

              <div>
                {item.detalle}     {item.hora}
              </div>
            </Box>
          ))}
        </Paper>
      ))
    )}
  </DialogContent>
</Dialog>
      <br />  <br />  <br /></div>
  );
};

export default MobileFriendlyTable;
