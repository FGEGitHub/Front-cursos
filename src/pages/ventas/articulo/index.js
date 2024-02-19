
import MenuUsuario4 from '../../../components/Navbarventas'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from '../../../components/vendedora'
 
export default function Paginas() {

    const [logueado, setLogueado] = useState(false) 
    const navigate = useNavigate();
   
    
    


    return (
 
<>

<MenuUsuario4/>
<br/><br/><br/><br/>
    <Menu/>





   </> );

}