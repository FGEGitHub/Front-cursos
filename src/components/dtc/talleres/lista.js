import React, { useEffect, useState } from "react";
import { Paper, Tooltip } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/material/styles';
import servicioDtc from '../../../services/dtc';
import ModaNueva from './ModalNuevaclase';
import Button from '@mui/material/Button';
//import Modificar from './modificar'
import ModalBorrar from './borrarclase';


const TablaNotificaciones = (props) => {
    const [clases, setClases] = useState([]);
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const traer = async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                setUsuario(usuario);
                const novedades_aux = await servicioDtc.traerclasestaller2(usuario.id);
                console.log(novedades_aux)
                setClases(novedades_aux);
            }
        };
        traer();
    }, []);

    const CutomButtonsRenderer = (dataIndex) => {
        return (
            <><ModalBorrar

            id={clases[dataIndex]['id']}
            traer={async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                setUsuario(usuario);
                const novedades_aux = await servicioDtc.traerclasestaller2(usuario.id);
                console.log(novedades_aux)
                setClases(novedades_aux);
            }
        }}
             />
             <Tooltip title="ASISTENCIA">
                <button variant="contained" onClick={() => navigate('/dtc/tallerasistencia/' + clases[dataIndex]['id'])} >Asistencia </button>
            </Tooltip>
           
            </>
           
        );
    };
    const CutomButtonsRenderer2 = (dataIndex) => {
        return (
           <>

           {clases[dataIndex]['dia']}- {clases[dataIndex]['hora']}
          
            </>
           
        );
    };
    const columns = [
        {
            name: "fecha",
            label: "Fecha",
        },
        {
            name: "titulo",
            label: "Título",
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

    const options = {
        responsive: "standard",
        selectableRows: 'none',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
        textLabels: {
            body: {
                noMatch: "No se encontraron clases",
            },
        },
    };

    return (
        <div>
            <h2>Clases del Taller</h2>
            <ModaNueva
                id_tallerista={usuario.id}
                traer={async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                setUsuario(usuario);
                const novedades_aux = await servicioDtc.traerclasestaller2(usuario.id);
                console.log(novedades_aux)
                setClases(novedades_aux);
            }
        }}
            />
            <Paper>
                <MUIDataTable
                    title={"Clase del Taller"}
                    data={clases}
                    columns={columns}
                    options={options}
                />
            </Paper>
        </div>
    );
};

export default TablaNotificaciones;
