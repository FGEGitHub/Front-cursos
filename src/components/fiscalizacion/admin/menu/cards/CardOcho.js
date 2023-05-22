import * as React from 'react';
import PhoneCallbackTwoToneIcon from '@mui/icons-material/PhoneCallbackTwoTone';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/fiscalizacion/administracion/aliados')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < PhoneCallbackTwoToneIcon fontSize="large"/></i>
                    <h5 onClick={ir}>Ver Aliados</h5>
                    <p>Seguimiento de aliados</p>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;