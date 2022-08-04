import { Marker } from '@react-google-maps/api';
import { useState } from 'react';


export default function Pin(props){
    const {coord,name,id} = props;
    const [visible,setVisible] = useState(false);

    return(
        <>
            <Marker label={{ text: "\ue8d1", fontFamily: "Material Icons", color: "#ffffff", fontSize: "18px" }}
                key={id} 
                title={name} 
                position={ {lat:coord.lat,lng:coord.lng} }
                onClick={()=>setVisible(!visible)}
            />
        </>
    )
}
