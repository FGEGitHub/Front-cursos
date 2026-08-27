import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Paginas() {
    const navigate = useNavigate();

    useEffect(() => {
        // Eliminar sesión
        window.localStorage.removeItem("loggedNoteAppUser");

        // Redirigir al login
        navigate("/login");
    }, [navigate]);

    return (
        <>
            hola
        </>
    );
}