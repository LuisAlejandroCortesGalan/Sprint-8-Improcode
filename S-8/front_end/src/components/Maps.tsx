import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import EventForm, { Position } from "./EventForm";
import { MapEvents } from "./MapEvents";
import { useMapContext } from "../mapContext/MapContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;

const Maps = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [clickPosition, setClickPosition] = useState<Position | undefined>();
  const { mapsData } = useMapContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Para almacenar los marcadores de mapsData

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.154007, 41.390205],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl());

    // Añadir marcadores para cada evento en mapsData
    map.on("load", () => {
      // Limpiar marcadores previos si existen
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Mapear los eventos de mapsData
      mapsData.forEach((event) => {
        if (event.lat !== undefined && event.lng !== undefined) {
          const marker = new mapboxgl.Marker({ color: "#00FF00" }) // Verde en lugar de rojo
            .setLngLat([event.lng, event.lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <h3>${event.title}</h3>
                ${event.subtitle ? `<p>${event.subtitle}</p>` : ""}
                ${event.description ? `<p>${event.description}</p>` : ""}
              `)
            )
            .addTo(map);
          markersRef.current.push(marker);
        }
      });

      // Manejar clics en el mapa para crear nuevos eventos
      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        const newPosition: Position = { lng, lat };
        setClickPosition(newPosition);

        if (markerRef.current) {
          markerRef.current.remove();
        }
        markerRef.current = new mapboxgl.Marker({ color: "#0000FF" }) // Azul para nuevos clics
          .setLngLat([lng, lat])
          .addTo(map);
        console.log("Posición clicada:", newPosition);
      });
    });

    // Limpiar al desmontar el componente
    return () => {
      if (markerRef.current) markerRef.current.remove();
      markersRef.current.forEach((marker) => marker.remove());
      map.remove();
    };
  }, [mapsData]); // Dependencia en mapsData para actualizar marcadores cuando cambie

  const handleClick = (id: string) => {
    const eventData = mapsData.find((data) => data._id === id);
    console.log("Event data found in Maps:", eventData);
    setSelectedEventId(id); 
    setIsEditing(true); 
    return eventData;
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row px-5 pt-20 md:pt-10 gap-4">
        <div className="w-full md:w-2/3 mb-5 md:mb-0">
          <h2 className="text-center text-4xl pb-4">
            Select the map and{" "}
            <span className="text-5xl text-purple-700">{isEditing ? "edit" : "create"}</span> an
            Event!
          </h2>
          <div
            ref={mapContainerRef}
            style={{ width: "100%", height: "400px" }}
            className="rounded-2xl shadow-lg shadow-purple-400"
          />
        </div>
        <div className="w-full md:w-1/3 max-w-full">
          <EventForm
            coordinates={clickPosition}
            handleClick={handleClick}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            eventId={selectedEventId}
          />
        </div>
      </div>
      <MapEvents handleClick={handleClick} />
    </>
  );
};

export default Maps;
