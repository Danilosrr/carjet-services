import { Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';


export default function Pin(props){
    const {type,coord,name,id} = props;
    const navigate = useNavigate();
    const icon = (type === "branch"? "\ue8d1" : "\uebcb")

    return(
        <>
            <Marker label={{ text: icon, fontFamily: "Material Icons", color: "#ffffff", fontSize: "18px" }}
                key={id} 
                title={name} 
                position={ {lat:coord.lat,lng:coord.lng} }
                onClick={()=>{navigate(`/app/stock/${id}`)}}
            />
        </>
    )
}
