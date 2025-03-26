import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const [center, setCenter] = useState({
    lat: 48.8566, // Default latitude (you can change this)
    lng: 2.3522, // Default longitude (you can change this)
  });
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const mapStyles = {
    height: "700px",
    width: "100%",
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `postalcode=${postalCode}&` +
          `country=FR&` +
          `format=json`,
        {
          headers: {
            "User-Agent": "YourApp/1.0", // Replace with your app name
          },
        }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newCoordinates = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setCenter(newCoordinates);
        setCoordinates(newCoordinates);
        setError("");
      } else {
        setError("Location not found");
      }
    } catch (err) {
      setError("Error finding location");
      console.error(err);
    }
  };

  const handleAddressSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(address)}&` +
          `format=json`,
        {
          headers: {
            "User-Agent": "YourApp/1.0",
          },
        }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newCoordinates = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setCenter(newCoordinates);
        setCoordinates(newCoordinates);
        setError("");
      } else {
        setError("Location not found");
      }
    } catch (err) {
      setError("Error finding location");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="search-container">
        <div className="search-row">
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
            className="postal-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search by Postal Code
          </button>
        </div>

        <div className="search-row">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="postal-input"
          />
          <button onClick={handleAddressSearch} className="search-button">
            Search by Address
          </button>
        </div>

        {coordinates && (
          <p>
            Latitude: {coordinates.lat.toFixed(4)}, Longitude:{" "}
            {coordinates.lng.toFixed(4)}
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>

      <LoadScript googleMapsApiKey="AIzaSyAoeC-jhvkXaUUCYG8S4KiSzGCxCoiFAO0">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={60}
          center={center}
          mapTypeId="satellite"
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
