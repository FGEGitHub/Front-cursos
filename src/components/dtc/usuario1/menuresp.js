import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
export default function SimpleBottomNavigation(props) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <><Navbar/>
    <Box sx={{ width: 500 }}>
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction
          label="Menu"
          icon={<RestoreIcon />}
          onClick={() => handleClick('/dtc/usuario1/menu')}
        />
        <BottomNavigationAction
          label="Usuarios"
          icon={<FavoriteIcon />}
          onClick={() => handleClick('/dtc/usuario1/usuarios')}
        />
        <BottomNavigationAction
          label="Chiques"
          icon={<LocationOnIcon />}
          onClick={() => handleClick('/dtc/usuario1/chiques')}
        />
        <BottomNavigationAction
          label="Personal"
          icon={<LocationOnIcon />}
          onClick={() => handleClick('/dtc/usuario1/personal')}
        />
      </BottomNavigation>
    </Box></>
  );
}
