import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import "./Widget.scss";

const Widget = (props) => {
 
  let data;
  let amount = props.cantidad;
  
/*   switch (props.type) {
    case "condenuncia":
       amount = 5;
       console.log(props.cantidad)
        break;
    case "sindenuncua":
        amount = 5;
        break;
        case "enproceso":
              amount = 0;
            break;
    default:
       amount = 0;
        break;
} */
//  const amount = 1000;
  const porcentaje = props.porcentaje;

  switch (props.type) {
    case "total Presentes":
      data = {
        title: "Presentes",
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        )
      };
      break;
    case "total ausentes":
      data = {
        title: "ausentes",
        isMoney: false,
        link: "Ver Detalles",
        icon: (

          <AppsSharpIcon
          className="icon"
          style={{
            color: "green",
            backgroundColor: "rgba(255, 0, 0, 0.2)"
          }}
        />
         
        )
      };
      break;
    case "sindenuncua":
      data = {
        title: "Sin Denuncia",
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <AppsSharpIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(218, 165, 32, 0.2)"
            }}
          />
        )
      };
      break;
    case "enproceso":
      data = {
        title: "En Proceso",
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <ErrorOutlineIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(128, 0, 128, 0.2)"
            }}
          />
        )
      };
      break;
      case "Pendientes":
      data = {
        title: "Pendiente",
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <ErrorOutlineIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        )
      };
      break;
      case "total":
      data = {
        title: "Total",
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <AppsSharpIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        )
      };
      break;
      case "Aprobadas":
      data = {
        title: "Aprobadas",
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <DoneOutlineIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        )
      };
      break;
      case "Rechazadas":
      data = {
        title: "Rechazadas",
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <GppBadOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        )
      };
      break;

    default:
      data = {
        title: props.type,
        isMoney: false,
        link: "Ver Detalles",
        icon: (
          <GppBadOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        )
      };
      break;
  }

  return (
    <div>
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {porcentaje}%
        </div>
        {data.icon}
      </div>
    </div>
    
    
    
    </div>
  );
};

export default Widget;