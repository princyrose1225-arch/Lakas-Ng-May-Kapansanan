import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Component to fly map to user's location
function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 17);
  }, [position, map]);
  return null;
}

function DashBoard() {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setAccuracy(pos.coords.accuracy);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert(
          err.code === 1
            ? "Please allow location access"
            : "Unable to get your location"
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Map User Location</h1>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{
          height: "50vh",
          width: "100vw",
          maxWidth: "800px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {position && (
          <>
            <Marker position={position} />
            <Circle center={position} radius={accuracy} />
            <FlyToLocation position={position} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default DashBoard;
