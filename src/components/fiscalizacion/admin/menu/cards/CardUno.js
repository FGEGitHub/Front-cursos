import * as React from 'react';

import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/usuario/cuotas')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < EventNoteTwoToneIcon fontSize="large"/></i>
                    <h5 onClick={ir}>Cargar Excel</h5>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;