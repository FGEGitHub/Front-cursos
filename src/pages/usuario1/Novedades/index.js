import React, { useEffect, useState } from "react";
import Novedades from '../../../components/usuario1/botonesmovimeitnos/componente';
import MenuUsuario from '../../../components/usuario1/Navbar1';
import { useNavigate } from "react-router-dom";

export default function Transferencias() {
  const [usuarioo, setUsuarioo] = useState(['']);
  const navigate = useNavigate();
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (!user) {
        window.localStorage.removeItem('loggedNoteAppUser');
        navigate('/login');
      } else {
        setLogueado(true);
      }
    }
  }, []);

  return (
    <>
      {logueado && (
        <div style={styles.fondo}>
          <MenuUsuario />
          <br /> <br /> <br />
          <Novedades />
        </div>
      )}
    </>
  );
}

const styles = {
  fondo: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #d4f4d2, #ffffff)", // Verde suave a blanco
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "2rem",
  },
};
