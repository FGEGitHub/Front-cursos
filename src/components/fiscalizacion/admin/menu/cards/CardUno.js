import * as React from 'react';

import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/fiscalizacion/administracion/mesas')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < TableRestaurantIcon fontSize="large"/></i>
                    <h5 onClick={ir}>Ver mesas</h5>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;