import * as React from 'react';

import BusinessIcon from '@mui/icons-material/Business';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/fiscalizacion/administracion/escuelas')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < BusinessIcon fontSize="large"/></i>
                    <h5 onClick={ir}>Ver Escuelas</h5>
                    <p>Ver lista de Escuelas</p>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;