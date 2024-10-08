import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css"; 
import L from "leaflet"; 

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


function Map(props) {
    const ChangeView = ({ center, zoom }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    };

    if (!props.response && props.error) {
        return (
            <div className='map-container map-container__error'>
                <div className='error-container'>
                    <h2>Error</h2>
                    <p>Please enter a valid IP Address, Domain Name or Email Address.</p>
                    <p>If this is a server error, please try again later.</p>
                </div>
            </div>
        )
    }

    if (!props.response && !props.error) {
        return (
            <div className='map-container map-container__error'>
                <div className='loading-container'>
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }
    
    return (
        <div className='map-container'>
            {
                props.response &&
                <MapContainer center={[props.response.latitude, props.response.longitude]} zoom={15} style={{height: "100%", width: "100%"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[props.response.latitude, props.response.longitude]} icon={customIcon}>
                    <Popup>
                    Latitude: {props.response.latitude} <br></br> Longitude: {props.response.longitude}
                    </Popup>
                </Marker>
                <ChangeView center={[props.response.latitude, props.response.longitude]} zoom={15} />
                </MapContainer>
            }
        </div>
    )
}

export default Map; 