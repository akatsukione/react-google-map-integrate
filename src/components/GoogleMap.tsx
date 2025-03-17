import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 48.8566, // Paris, France latitude
    lng: 2.3522, // Paris, France longitude
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        mapTypeId="satellite" // This sets the map to satellite view
      ></GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
