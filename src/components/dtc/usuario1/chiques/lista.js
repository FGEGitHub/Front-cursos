import servicioDtc from '../../../../services/dtc'
import ModaNueva from './nuevo'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from "react-router-dom"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Modificar from '../../usuario/modificar'
import {

    makeStyles,
    useMediaQuery,
    useTheme,
    Button
} from '@material-ui/core';
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
    const [chicos, setchicos] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const [datos, setDatos] = useState()
    const navigate = useNavigate();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();

    let params = useParams()
    let id = params.id
    useEffect(() => {
        traer()



    }, [])

    
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
    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
               
               //const novedades_aux = await servicioDtc.listachiques()
                const novedades_aux = await servicioDtc.listachiquesmomentaneo()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }

        } catch (error) {

        }

    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      let usuario = null;
  
      if (loggedUserJSON) {
          usuario = JSON.parse(loggedUserJSON);
      }
  
      const handleNavigation = () => {
          const userPath = usuario?.nivel === 22 
              ? `/dtc/cocina/usuario/${chicos[dataIndex]['id']}` 
              : `/dtc/usuario1/usuario/${chicos[dataIndex]['id']}`;
          
          navigate(userPath);
      };
  
      return (
          <div>
            
                  <Button onClick={handleNavigation} variant="outlined" sx={{ color: "#5d4037", borderColor: "#5d4037", fontSize: "0.65rem" }} >
                     <b>Ver</b> 
                  </Button>
                  <Modificar
                  id={chicos[dataIndex].id}
    nombre={chicos[dataIndex].nombre}
    apellido={chicos[dataIndex].apellido}
    fecha_nacimiento={chicos[dataIndex].fecha_nacimiento}
    observaciones={chicos[dataIndex].observaciones}
    primer_contacto={chicos[dataIndex].primer_contacto}
    primer_ingreso={chicos[dataIndex].primer_ingreso}
    admision={chicos[dataIndex].admision}
    dni={chicos[dataIndex].dni}
    domicilio={chicos[dataIndex].domicilio}
    telefono={chicos[dataIndex].telefono}
    autorizacion_imagen={chicos[dataIndex].autorizacion_imagen}
    fotoc_dni={chicos[dataIndex].fotoc_dni}
    fotoc_responsable={chicos[dataIndex].fotoc_responsable}
    tel_responsable={chicos[dataIndex].tel_responsable}
    visita_social={chicos[dataIndex].visita_social}
    egreso={chicos[dataIndex].egreso}
    aut_retirar={chicos[dataIndex].aut_retirar}
    dato_escolar={chicos[dataIndex].dato_escolar}
    kid={chicos[dataIndex].kid}
     obra_social={chicos[dataIndex].obra_social}
      obra_social_cual={chicos[dataIndex].obra_social_cual}
    escuela={chicos[dataIndex].escuela}
    grado={chicos[dataIndex].grado}
    fines={chicos[dataIndex].fines}
    hora_merienda={chicos[dataIndex].hora_merienda}
    traer={ async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON)

                setUsuario(usuario)
               
               //const novedades_aux = await servicioDtc.listachiques()
                const novedades_aux = await servicioDtc.listachiquesmomentaneo()
                setchicos(novedades_aux[0])
                setDatos(novedades_aux[1])
            }

        } catch (error) {

        }

    }}
                  />
              
          </div>
      );
  }
  




    // definimos las columnas
 /*    const columns = [
      {
        name: "kid",
        label: "kid",

    },
        {
            name: "apellido",
            label: "apellido",

        },
        {
            name: "nombre",
            label: "nombre",

        },
        {
          name: "dni",
          label: "dni",
      },
    
        {
            name: "fecha_nacimiento",
            label: "Fecha de nacimiento",

        },
        
        {
          name: "edad",
          label: "edad",

      },
        {
            name: "falta",
            label: "falta",

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
        {
          name: "tel_responsable",
          label: "responsable",
      },
      {
        name: "tel",
        label: "tel",
    },


    ]; */
    const columns = [
      
      {
        name: "id",
        label: "id",

    },
    {
      name: "dni",
      label: "dni",

  },
     
        {
            name: "apellido",
            label: "apellido",

        },
        {
            name: "nombre",
            label: "nombre",

        },
       
 
   {
            name: "escuela",
            label: "escuela",

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
  
{datos ? (
  <>
    <h1>
      <b>
        Actualmente {datos.total} usuarios a talleres + {datos.psicologa} personas en tratamiento psicológico,
        total {datos.total + datos.psicologa} usuarios
      </b>
    </h1>

    <h3 style={{ marginTop: "10px" }}>
      <b>📊 Obra social:</b> {datos.promedio_obra_social} de los usuarios poseen cobertura médica (Esto implica solo usuarios del dispositivo)
    </h3>
  </>
) : (
  <></>
)}

            <h2>Lista de chicos</h2>
            {chicos ? <>
                <div>


                    <ModaNueva
                        id_turno={id}
                        traer={async () => {
                          try {
                              const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
                              if (loggedUserJSON) {
                                  const usuario = JSON.parse(loggedUserJSON)
                  
                                  setUsuario(usuario)
                  
                              //    const novedades_aux = await servicioDtc.listachiques()
                                  const novedades_aux = await servicioDtc.listachiquesmomentaneo()
                                  
                                  setchicos(novedades_aux[0])
                                  setDatos(novedades_aux[1])
                              }
                  
                          } catch (error) {
                  
                          }
                  
                      }}
                    />
                    {chicos.length > 0 ? <>


                        {isMatch ?
                            <>

                                <TableContainer>
                                    {!chicos ? <Skeleton /> : <>
                                        <h1>Lista de usuarios </h1>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>Nombre</b> <b /></TableCell>
                                                    <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Dni</b></TableCell>
                                                   <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>Ver</b></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {chicos.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">{row.apellido} {row.nombre}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row"> <b>{row.dni} </b> </StyledTableCell>
                                                        <StyledTableCell component="th" scope="row">  <AccountBoxIcon onClick={() => navigate('/dtc/usuario1/usuario/' + row.id)} /> </StyledTableCell>




                                                    </StyledTableRow>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </>}

                                </TableContainer>
                            </> : <><>
                      
               
                                <MUIDataTable

                                    title={"Lista de chicos"}
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

                    </> : <> <h2>El curso aun no tiene chicos</h2></>}



                </div>
            </> : <></>}
        </div>
    )
}
export default TablaNotificaciones