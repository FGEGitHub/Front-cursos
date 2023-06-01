import * as React from 'react';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/fiscalizacion/administracion/suplentes')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < ConnectWithoutContactIcon fontSize="large"/></i>
                    <h5 onClick={ir}>Ver Suplentes</h5>
                    <p>Los que entran cuando vo te vas</p>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;