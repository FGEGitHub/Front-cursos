import servicioDtc from '../../../../services/dtc'
import Asignar from '../../turnos/asignar';
import ModaNueva from './nuevoturno'
import React, { useEffect, useState, Fragment } from "react";
import Clasificar from'./clasific'
import MUIDataTable from "mui-datatables";
import Tarjetabuscar from './calendariobusqueda'
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Nuevo from './nuevoturno'
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import Modalimprimir from './modalimprimir'
import {

    makeStyles,
    useMediaQuery,
    useTheme,
    Button
} from '@material-ui/core';
import Borrar from './borrar'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';



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
const transparentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Ajusta el valor alfa según sea necesario
  };

  const useStyles = makeStyles({
    table: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    bodyCell: {
      color: 'blue',
    },
    selectCell: {
      headerCell: {
        backgroundColor: '#880e4f',
      },
      checkboxRoot: {
        color: 'green',
      },
    },
  });



const TablaNotificaciones = (props) => {
    const theme = useTheme();
    const [chicos, setchicos] = useState()
    const [usuario, setUsuario] = useState([''])
    const [datos, setDatos] = useState()
    const [form, setForm] = useState()
     const [fecha, setFecha] = useState();
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();

    let params = useParams()
    let id = params.id
   /*  useEffect(() => {
        traer()



    }, []) */

    
    const options = {
        setTableProps: () => {
            return {
              style: {
                backgroundColor: "#e3f2fd", // Cambia el color de fondo de la tabla
              },
            };
          },
          customHeadRender: (columnMeta, handleToggleColumn) => ({
            TableCell: {
              style: {
                backgroundColor: '#1565c0', // Cambia el color de fondo del encabezado
                color: 'white', // Cambia el color del texto del encabezado
              },
            },
          }),
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        responsive: 'scroll',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        print: true,
        filter: true,
        viewColumns: true,
        pagination: true,

        textLabels: {
          body: {
            noMatch: "No se encontraron registros",
            toolTip: "Ordenar",
          },
          pagination: {
            next: "Siguiente",
            previous: "Anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
          },
          toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver columnas",
            filterTable: "Filtrar tabla",
          },
          filter: {
            all: "Todos",
            title: "FILTROS",
            reset: "RESETEAR",
          },
          viewColumns: {
            title: "Mostrar columnas",
            titleAria: "Mostrar/ocultar columnas de la tabla",
          },
          selectedRows: {
            text: "fila(s) seleccionada(s)",
            delete: "Eliminar",
            deleteAria: "Eliminar filas seleccionadas",
          },
        },

      };
    
      const theme2 = createTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              color: '#1e88e5', // Cambia el color del texto en las celdas del cuerpo
            },
          },
          MUIDataTableSelectCell: {
            headerCell: {
              backgroundColor: '#3f51b5', // Cambia el color de fondo de las celdas de selección en el encabezado
            },
            checkboxRoot: {
              color: '#3f51b5', // Cambia el color del icono de la casilla de verificación de selección
            },
          },
        },
      });
    const traer = async (fecha) => {
        try {
          console.log(fecha)
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
                if(usuario.nivel==41){
                  const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia({fecha:fecha})
                  setchicos(novedades_aux[0])
                  setDatos(novedades_aux[1])
                }else{
                  const novedades_aux = await servicioDtc.traertodoslosturnosfecha({fecha:fecha})
                  setchicos(novedades_aux[0])
                  setDatos(novedades_aux[1])
                }
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

<Clasificar 
              id={chicos[dataIndex]['id']}
              traer={ async (fecha) => {
                try {
                  console.log(fecha)
               
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
              
                        setUsuario(usuario)
              
                        if(usuario.nivel==41){
                          const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }else{
                          const novedades_aux = await servicioDtc.traertodoslosturnosfecha(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }
                    }
              
                } catch (error) {
              
                }
              
              }}/>
           
              <Borrar 
              id={chicos[dataIndex]['id']}
              traer={ async (fecha) => {
                try {
                  console.log(fecha)
               
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
              
                        setUsuario(usuario)
              
                        if(usuario.nivel==41){
                          const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }else{
                          const novedades_aux = await servicioDtc.traertodoslosturnosfecha(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }
                    }
              
                } catch (error) {
              
                }
              
              }}/>
           

            </>
        );
    }


    function customdni(dataIndex, rowIndex, data, onClick) {
      return (
          <>

{chicos[dataIndex]['nombre'] ? <>{chicos[dataIndex]['dni']} </> :<>Disponible</>}

          </>
      );
  }

  function customnombre(dataIndex, rowIndex, data, onClick) {
    return (
        <>

{chicos[dataIndex]['nombre'] ? <>{chicos[dataIndex]['nombre']} </> :<>Disponible</>}

        </>
    );
}
function customaagendar(dataIndex, rowIndex, data, onClick) {
  return (
      <>

<Asignar id={datos[dataIndex].id} chicos={datos} traer={async () => {
                const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
                const user = JSON.parse(loggedUserJSON);
                setUsuario(user);
                if(user.nivel==40 || user.nivel==41 ){
                  const historial = await servicioDtc.traertodoslosturnosfechacadia(fecha);
                  setDatos(historial);
                  setFecha(fecha);
                }else{
                  const historial = await servicioDtc.traertodoslosturnosfecha(fecha);
                setDatos(historial);
                setFecha(fecha);
                }
              
              }} />
               { datos[dataIndex].estado == 'Agendado' ? <>   <Modalimprimir nombrepsic={datos[dataIndex].nombrepsiq}
                                                       fecha={datos[dataIndex].fecha}
                                                       detalle={datos[dataIndex].detalle}


                                                       /></>:<></>}
      </>
  );
}
    // definimos las columnas
    const columns = [
      
      {
        name: "Dni",
        options: {
            customBodyRenderLite: (dataIndex, rowIndex) =>
              customdni(
                    dataIndex,
                    rowIndex,
                    // overbookingData,
                    // handleEditOpen
                )
        }

    },

    {
      name: "nombre",
      options: {
          customBodyRenderLite: (dataIndex, rowIndex) =>
            customnombre(
                  dataIndex,
                  rowIndex,
                  // overbookingData,
                  // handleEditOpen
              )
      }

  },
       
        {
          name: "fecha",
          label: "fecha de cita",

      },
      {
        name: "detalle",
        label: "Horario",

    },
      {
      name: "agendar",
      options: {
          customBodyRenderLite: (dataIndex, rowIndex) =>
            customaagendar(
                  dataIndex,
                  rowIndex,
                  // overbookingData,
                  // handleEditOpen
              )
      }
  
  },
    
        {
          name: "estado",
          label: "estado",

      },
        
      {
        name: "presente",
        label: "asistencia",

    },
      

        {
            name: "Ver",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },


    ];

    // renderiza la data table
    return (
        <div sx={{
            cursor: 'pointer',
            backgroundImage: 'linear-gradient(90deg, #9775fa 0%, #69db7c 0%, #3bc9db 99%, #ec8c69 100%, #f783ac 100%, #ffa94d 100%, #ed6ea0 100%)',
            
            color: '#bdbdbd',
        
          }}
  >
   <Tarjetabuscar
   traer={ async (fecha) => {
    try {
      console.log(fecha)
      setForm({fecha:fecha})
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON)

            setUsuario(usuario)

            if(usuario.nivel==40 || usuario.nivel==41 ){

              const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia({fecha:fecha})
              setchicos(novedades_aux[0])
              setDatos(novedades_aux[1])

    

            }else{
              const novedades_aux = await servicioDtc.traertodoslosturnosfecha({fecha:fecha})
              setchicos(novedades_aux[0])
              setDatos(novedades_aux[1])
            }
        }

    } catch (error) {

    }

}
}/>
{form ? <><Nuevo fecha={form.fecha}
  traer={ async (fecha) => {
    try {
      console.log(fecha)
   
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const usuario = JSON.parse(loggedUserJSON)
  
            setUsuario(usuario)
  
            if(usuario.nivel==41){
              const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia(form)
              setchicos(novedades_aux[0])
              setDatos(novedades_aux[1])
            }else{
              const novedades_aux = await servicioDtc.traertodoslosturnosfecha(form)
              setchicos(novedades_aux[0])
              setDatos(novedades_aux[1])
            }
        }
  
    } catch (error) {
  
    }
  
  }}/></>:<></>}



            {chicos ? <>
                <div>


                   


                        {isMatch ?
                            <>

                                <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                        <h1>Lista  </h1>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Dni</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Fecha</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Agendar</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Estado</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Asistencia</b></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Psicologo/a</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {chicos.map((row) => (<>
                                                   {row.id_psico==usuario.id ? <>

                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.apellido ?<>{row.apellido}  {row.nombre}</>: <>Disponible</> }</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.fecha} a las {row.detalle}  </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>
                                                        <Asignar id={row.id}
                                                         chicos={datos} 
                                                         traer={ async (fecha) => {
                                                          try {
                                                            console.log(fecha)
                                                         
                                                              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                                                              if (loggedUserJSON) {
                                                                  const usuario = JSON.parse(loggedUserJSON)
                                                        
                                                                  setUsuario(usuario)
                                                        
                                                                  if(usuario.nivel==41){
                                                                    const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia(form)
                                                                    setchicos(novedades_aux[0])
                                                                    setDatos(novedades_aux[1])
                                                                  }else{
                                                                    const novedades_aux = await servicioDtc.traertodoslosturnosfecha(form)
                                                                    setchicos(novedades_aux[0])
                                                                    setDatos(novedades_aux[1])
                                                                  }
                                                              }
                                                        
                                                          } catch (error) {
                                                        
                                                          }
                                                        
                                                        }} />
                                                      
                                                       { row.estado == 'Agendado' ? <>   <Modalimprimir nombrepsic={row.nombrepsiq}
                                                       fecha={row.fecha}
                                                       detalle={row.detalle}


                                                       /></>:<></>}
                                                          </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.estado} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.presente == null ? <>Sin tomar</> :row.presente} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.nombrepsiq} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> 
<Clasificar 
              id={row.id}
              traer={ async (fecha) => {
                try {
                  console.log(fecha)
               
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
              
                        setUsuario(usuario)
              
                        if(usuario.nivel==41){
                          const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }else{
                          const novedades_aux = await servicioDtc.traertodoslosturnosfecha(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }
                    }
              
                } catch (error) {
              
                }
              
              }}/> <Borrar 
                                                        id={row.id}
              traer={ async (fecha) => {
                try {
                  console.log(fecha)
               
                    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                    if (loggedUserJSON) {
                        const usuario = JSON.parse(loggedUserJSON)
              
                        setUsuario(usuario)
              
                        if(usuario.nivel==41){
                          const novedades_aux = await servicioDtc.traertodoslosturnosfechacadia(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }else{
                          const novedades_aux = await servicioDtc.traertodoslosturnosfecha(form)
                          setchicos(novedades_aux[0])
                          setDatos(novedades_aux[1])
                        }
                    }
              
                } catch (error) {
              
                }
              
              }}/> </StyledTableCell>


 

                                                    </StyledTableRow>
                                                    </>:<></>}    </>  ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
                            </> : <><>
                      
               
                                <MUIDataTable

                                    title={"Lista de Turnos"}
                                    data={chicos}
                                    columns={columns}
                                    actions={[
                                        {
                                            icon: 'save',
                                            tooltip: 'Save User',
                                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                                        }
                                    ]}
                                    options={options}
                                    className={classes.table} // Aplica el estilo de la tabla
                                    classes={{
                                      bodyCell: classes.bodyCell, // Aplica el estilo del texto en las celdas del cuerpo
                                      selectCell: classes.selectCell, // Aplica el estilo de las celdas de selección
                                    }}

                                />

                            </></>}

                   



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones