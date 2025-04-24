import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "../../Assets/logocuqui.webp"; // cambia esta ruta según tu imagen

const pagesdeslogueado = ["Iniciar sesión", "Nosotros", "Contacto"];

const DrawerNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const usuario = JSON.parse(loggedUserJSON);
      setUser(usuario);
    }
  }, []);

  const handleClick = () => navigate("/emprendedoras/login");
  const irNosotros = () => navigate("/usuario/nosotros");
  const irContacto = () => navigate("/usuario/contacto");
  const irProductos = () => navigate("/productos");
  const irMovimientos = () => navigate("/movimientos");
  const irStock = () => navigate("/stock");
  const irCaja = () => navigate("/caja");

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteAppUser");
    navigate("/emprendedoras/login");
  };

  const handleDeslogueadoClick = (index) => {
    if (index === 0) handleClick();
    else if (index === 1) irNosotros();
    else if (index === 2) irContacto();
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: "100vw",
            maxWidth: 320,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          {/* Imagen + Cerrar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
         <img
    src={Image}
    alt="logo"
    style={{ width: 40, height: 40, marginRight: 10 }}
  />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Menú
            </Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <ArrowBackIcon />
            </IconButton>
          </Box>

          {/* Contenido */}
          <List>
            {user ? (
              <>
                <Button
                  onClick={irProductos}
                  sx={{ margin: "10px", width: "calc(100% - 20px)" }}
                  variant="outlined"
                >
                  Productos
                </Button>
                <Button
                  onClick={irMovimientos}
                  sx={{ margin: "10px", width: "calc(100% - 20px)" }}
                  variant="outlined"
                >
                  Movimientos
                </Button>
                <Button
                  onClick={irStock}
                  sx={{ margin: "10px", width: "calc(100% - 20px)" }}
                  variant="outlined"
                >
                  Stock
                </Button>
                <Button
                  onClick={irCaja}
                  sx={{ margin: "10px", width: "calc(100% - 20px)" }}
                  variant="outlined"
                >
                  Caja
                </Button>
              </>
            ) : (
              pagesdeslogueado.map((page, index) => (
                <ListItemButton key={index} onClick={() => handleDeslogueadoClick(index)}>
                  <ListItemIcon>
                    <ListItemText primary={page} />
                  </ListItemIcon>
                </ListItemButton>
              ))
            )}
          </List>
        </Box>

        {/* Footer con Logout */}
        {user && (
          <Box sx={{ padding: 2, borderTop: "1px solid #ddd" }}>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              fullWidth
              startIcon={<LogoutIcon />}
            >
              Cerrar sesión
            </Button>
          </Box>
        )}
      </Drawer>

      {/* Botón de apertura */}
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(true)}
      >
        <MenuIcon sx={{ marginRight: "5px" }} />
        <Typography variant="button" sx={{ color: "white" }}>
          Menú
        </Typography>
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerNav;
