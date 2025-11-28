import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./DashBoard.css";

// Fix default marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DashBoard() {
  const [position, setPosition] = useState(null);
  const mapRef = useRef(null);

  // ⬇️ Run only once
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      alert("Your browser does not support geolocation.");
      return;
    }

    const onSuccess = (pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setPosition(coords);

      // ⬇️ Force map recenter when location updates
      if (mapRef.current) {
        mapRef.current.setView(coords, 17, { animate: true });
      }
    };

    const onError = (err) => {
      console.warn("Geo Error:", err);
    };

    // Get location once
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    // Then watch location continuously
    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <>
      <div className="map-title"><h1>Map User Location</h1></div>

      <div className="dashboard-container">
        <MapContainer
          center={[14.7699169, 121.0784688]}
          zoom={15}
          className="map-container"
          whenCreated={(map) => {
            mapRef.current = map;
            setTimeout(() => map.invalidateSize(), 200);
          }}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {position && (
            <>
              <Marker position={position} />
              <Circle center={position} radius={400} />
            </>
          )}
        </MapContainer>
      </div>
    </>
  );
}

export default DashBoard;
