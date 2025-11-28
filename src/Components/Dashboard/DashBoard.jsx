import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./DashBoard.css";

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DashBoard() {
  const [position, setPosition] = useState(null); // [lat, lng]
  const [initialCenter] = useState([14.7699169, 121.0784688]);
  const mapRef = useRef(null);
  const watchIdRef = useRef(null);

  // Helper: set view on map when we have both map + position
  useEffect(() => {
    if (!mapRef.current || !position) return;
    try {
      // ensure map layout is correct then set view
      mapRef.current.invalidateSize();
      mapRef.current.setView(position, 17, { animate: true });
    } catch (err) {
      console.error("Error setting map view:", err);
    }
  }, [position]);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setPosition(coords);
    };

    const handleError = (err) => {
      console.warn("Geolocation error:", err);
      if (err.code === 1) {
        // Permission denied
        alert("Please allow location access for this feature to work.");
      }
    };

    // 1) Try getCurrentPosition immediately (useful right after user clicks Allow)
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 7000,
    });

    // 2) Start watchPosition for continuous updates
    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 7000,
      }
    );

    // 3) If Permissions API exists, listen for changes (user may toggle permission)
    let permissionAbort = null;
    if (navigator.permissions && navigator.permissions.query) {
      let mounted = true;
      navigator.permissions.query({ name: "geolocation" }).then((status) => {
        if (!mounted) return;
        // if state becomes 'granted', request a fresh position
        const onChange = () => {
          if (status.state === "granted") {
            // force a fresh read
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
              enableHighAccuracy: true,
              timeout: 7000,
            });
          }
        };
        status.addEventListener?.("change", onChange);
        // cleanup closure
        permissionAbort = () => status.removeEventListener?.("change", onChange);
      }).catch(() => {
        permissionAbort = null;
      });

      return () => {
        mounted = false;
        if (permissionAbort) permissionAbort();
        if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      };
    }

    // cleanup if Permissions API not used
    return () => {
      if (permissionAbort) permissionAbort();
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  return (
    <>
      <div className="map-title">
        <h1>Map User Location</h1>
      </div>

      <div className="dashboard-container">
        <MapContainer
          center={initialCenter}
          zoom={16}
          className="map-container"
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
            // Invalidate size to prevent tile cut-off when map is inside flex/hidden containers
            setTimeout(() => mapInstance.invalidateSize(), 300);
          }}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {position && (
            <>
              <Marker position={position} />
              <Circle center={position} radius={450} />
            </>
          )}
        </MapContainer>
      </div>
    </>
  );
}

export default DashBoard;
