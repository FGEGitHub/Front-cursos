import * as React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/fiscalizacion/usuarios')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < PeopleAltIcon fontSize="large"/></i>
                    <h5 onClick={ir}>Usuarios y encargados</h5>
                   <p>Menu para agregar/modificar/borrar usuarios (Administradores y Aliados)</p>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;