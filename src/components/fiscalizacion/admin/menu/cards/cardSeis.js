import * as React from 'react';
import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';
import BusinessIcon from '@mui/icons-material/Business';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/fiscalizacion/administracion/personas')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < Face3Icon fontSize="large"/>< Face6Icon fontSize="large"/></i>
                    <h5 onClick={ir}>Ver Personas</h5>
                    <p>Ver lista de personas</p>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;