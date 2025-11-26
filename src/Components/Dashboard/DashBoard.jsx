import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function DashBoard() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // ---------------------
    // Fix Leaflet icon paths
    // ---------------------
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
    });

    // ---------------------
    // Initialize map
    // ---------------------
    const map = L.map(mapRef.current).setView([0, 0], 2); // world view initially

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // ---------------------
    // User location marker
    // ---------------------
    let marker = null;
    let circle = null;
    let zoomed = false;

    function success(pos) {
      const { latitude, longitude, accuracy } = pos.coords;

      if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }

      marker = L.marker([latitude, longitude]).addTo(map);
      circle = L.circle([latitude, longitude], { radius: accuracy }).addTo(map);

      if (!zoomed) {
        zoomed = true;
        map.flyTo([latitude, longitude], 17); // zoom to user location
      }
    }

    function error(err) {
      console.log("Geolocation error:", err);
      alert(
        err.code === 1
          ? "Please allow location access"
          : "Unable to get your location"
      );
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }

    // Cleanup map on unmount
    return () => map.remove();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Map User Location</h1>
      <div
        ref={mapRef}
        style={{
          height: "400px",
          width: "800px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      ></div>
    </div>
  );
}

export default DashBoard;
