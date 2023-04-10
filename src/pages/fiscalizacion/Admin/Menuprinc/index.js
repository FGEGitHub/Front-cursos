


import Navbar from '../../../../components/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../../../components/fiscalizacion/admin/menu/cards'
import React, { useEffect, useState } from "react";


export default function Paginas() {
    const navigate = useNavigate();


    

    return (
        <>
        <Navbar/>
        <br/>     <br/>     <br/>
        <Login/>
        </>
   
    );

}