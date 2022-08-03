import { Marker } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";


export default function Pin(props){
    const {coord,name,id} = props
    const navigate = useNavigate();

    return(
        <Marker label={{ text: "\ue8d1", fontFamily: "Material Icons", color: "#ffffff", fontSize: "18px" }}
            key={id} 
            title={name} 
            position={ {lat:coord.lat,lng:coord.lng} }
            onClick={()=>navigate(`/filial/${coord.id}`)}
        />
    )
}
