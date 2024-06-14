"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import clientTokenValidator from "@/app/action/clientTokenValidator";
import { notFound } from "next/navigation";
import getLive from "@/app/action/dashboard/live/getLive";

const icon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [70, 70],
  iconAnchor: [35.3, 68],
  popupAnchor: [1, -34],
});

const MapComponent = ({ tracking_id }) => {
  const [lat, setLat] = useState(0.1);
  const [long, setLong] = useState(100);
  const [accuracy, setAccuracy] = useState(4);

  const handleUpdate = async () => {
    for (let i = 0; i < 1; i) {
      await clientTokenValidator();
      const dataLocation = await getLive.getLive(tracking_id);
      setLat(dataLocation?.lat);
      setLong(dataLocation?.long);
      setAccuracy(dataLocation?.accuracy);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
    return;
  };

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    handleUpdate();
  }, []);

  return (
    <MapContainer
      center={[lat, long]}
      zoom={19}
      style={{ height: "86vh", width: "100%" }}
    >
      <MapUpdater lat={lat} long={long} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, long]} icon={icon}>
        <Popup>
          Latitude: {lat} <br /> Longitude: {long} <br /> Accuracy: {accuracy}{" "}
          meters
        </Popup>
      </Marker>
      <Circle
        center={[lat, long]}
        radius={accuracy || 0}
        pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.2 }}
      />
    </MapContainer>
  );
};

const MapUpdater = ({ lat, long }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat || 0, long || 0]);
  }, [lat, long, map]);

  return null;
};

export default MapComponent;
