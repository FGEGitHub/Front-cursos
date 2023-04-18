import * as React from 'react';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardUno = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/fiscalizacion/administracion/cargar')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                   <i onClick={ir}> < EventNoteTwoToneIcon fontSize="large"/></i>
                    <h5 onClick={ir}>Cargar excel</h5>
                    <p>Menu reservado para cargar los fiscales mediante EXCEL de google forms </p>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardUno;