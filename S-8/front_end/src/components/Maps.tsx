import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import EventForm from "./EventForm";
import { MapEvents } from "./MapEvents";
import { useMapContext } from "../mapContext/MapContext";
import { Position } from "../types/eventFormTypes";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;

const Maps = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [clickPosition, setClickPosition] = useState<Position | undefined>();
  const { mapsData } = useMapContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.154007, 41.390205],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      // Limpiar los marcadores existentes
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Añadir los marcadores para cada evento en mapsData
      mapsData.forEach((event) => {
        if (event.lat !== undefined && event.lng !== undefined) {
          const marker = new mapboxgl.Marker({ color: "#00FF00" })
            .setLngLat([event.lng, event.lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <h3 class="text-purple-950 text-lg">Title: <span class="text-sm">${
                  event.title
                }<span/></h3> 
                ${
                  event.subtitle
                    ? `<p class="text-purple-950 text-lg">Subtitle: <span class="text-sm">${event.subtitle}<span/></p>`
                    : ""
                }
                ${
                  event.description
                    ? `<p class="text-purple-950 text-lg">Description: <span class="text-sm">${event.description}<span/></p>`
                    : ""
                }
              `)
            )
            .addTo(map);
          markersRef.current.push(marker);
        }
      });
    });

    // Configurar el evento de click por separado
    map.on("click", (e) => {
      console.log("Mapa clickeado", e);
      const { lng, lat } = e.lngLat;
      const newPosition: Position = { lng, lat };
      setClickPosition(newPosition);

      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = new mapboxgl.Marker({ color: "#0000FF" })
        .setLngLat([lng, lat])
        .addTo(map);
      console.log("Posición clicada:", newPosition);
    });

    return () => {
      if (markerRef.current) markerRef.current.remove();
      markersRef.current.forEach((marker) => marker.remove());
      map.remove();
    };
  }, [mapsData]);

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
            <span className="text-5xl text-purple-700">
              {isEditing ? "edit" : "create"}
            </span>{" "}
            an Event!
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
