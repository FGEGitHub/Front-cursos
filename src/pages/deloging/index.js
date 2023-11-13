



import Navbar from '../../components/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../components/Login'
import React, { useEffect, useState } from "react";


export default function Paginas() {
    const navigate = useNavigate();
    const [loginVisible, setLoginvisible] = useState(false)

    useEffect(() => {
      
        window.localStorage.removeItem('loggedNoteAppUser')
        navigate('/login')
      }, [])

    return (
        <>
        
        <Navbar/>
       
        </>
   
    );

}