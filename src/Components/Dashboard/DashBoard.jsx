import React, { useEffect, useRef } from 'react';
import leaflet from "leaflet";


export const DashBoard = () => {
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current = leaflet.map("map").setView([14.767723, 121.0771856], 17);
      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);
  },[]);
  
  return <div id="map" ref={mapRef}></div>;
}
