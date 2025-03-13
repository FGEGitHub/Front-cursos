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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const pages = ["Inicio", "Cerrar Sesión"];
const pagesdeslogueado = ["Iniciar sesión", "Nosotros", "Contacto"];

const DrawerNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    cantidadnoti();
  }, []);

  const cantidadnoti = async () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      if (loggedUserJSON) {
        const usuario = JSON.parse(loggedUserJSON);
        setUser(usuario);
      }
    } catch (error) {}
  };

  const handleClick = () => navigate("/login");
  const irNosotros = () => navigate("/usuario/nosotros");
  const irContacto = () => navigate("/usuario/contacto");
  const irProductos = () => navigate("/productos");
  const irMovimientos = () => navigate("/movimientos");
  const irStock = () => navigate("/stock");
  const irCaja = () => navigate("/caja");

  const hanleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    navigate("/loginn");
  };

  const CutomButtonsRendererdesloqueado = (dataIndex, rowIndex) => {
    switch (rowIndex) {
      case 0:
        handleClick();
        break;
      case 1:
        hanleLogout();
        break;
      case 2:
        irContacto();
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <IconButton
            sx={{ color: "black", marginLeft: "10px", marginTop: "10px" }}
            onClick={() => setOpenDrawer(false)}
          >
            <ArrowBackIcon />
          </IconButton>

          {user ? (
            <>
              <Button
                onClick={irProductos}
                sx={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  width: "100%",
                }}
                variant="outlined"
              >
                Productos
              </Button>
              <Button
                onClick={irMovimientos}
                sx={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  width: "100%",
                }}
                variant="outlined"
              >
                Movimientos
              </Button>
              <Button
                onClick={irStock}
                sx={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  width: "100%",
                }}
                variant="outlined"
              >
                Stock
              </Button>
              <Button
                onClick={irCaja}
                sx={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  width: "100%",
                }}
                variant="outlined"
              >
                Caja
              </Button>
            </>
          ) : (
            <>
              {pagesdeslogueado.map((page, index) => (
                <ListItemButton key={index}>
                  <ListItemIcon>
                    <ListItemText
                      onClick={() => CutomButtonsRendererdesloqueado(page, index)}
                    >
                      {page}
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))}
            </>
          )}
        </List>
      </Drawer>

      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon sx={{ marginRight: "5px" }} />
        <Typography variant="button" sx={{ color: "white" }}>
          Menu
        </Typography>
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerNav;
