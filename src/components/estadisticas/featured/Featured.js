import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Featured.scss";

const Featured = (props) => {
  return (
    <div>
    <div className="featured">
        <div  style={{ display: "flex" }}>


            <div style={{ flex: 2 }} >
        <div className="top">
            <h1 className="title">Porcentaje {props.titulo1}</h1>
            <MoreVertIcon fontSize="small"/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={props.porcentaje1} text={props.porcentaje1+"%"} strokeWidth={5}/>
            </div>
            <p className="title">sin tomar en cuenta No tomados</p>
            <p className="amount">{props.titulo}</p>
     
        </div>
        </div>
        <div style={{ flex: 2 }} >
        <div className="top">
            <h1 className="title">Porcentaje {props.titulo2}</h1>
            <MoreVertIcon fontSize="small"/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={props.porcentaje2} text= {props.porcentaje2 == NaN ? <>{ props.porcentaje2+"%"} </>:<>0</>} strokeWidth={5}/>
            </div>
            <p className="title">Teniendo en cuenta que hay asistencias no tomadas</p>
            <p className="amount">{props.titulo}</p>
     
        </div>
        </div>


        </div>
    </div>






   
    </div>
  )
}

export default Featured;