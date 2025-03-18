import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import EventForm from "./EventForm";
import Confetti from "react-confetti";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;

export interface Position {
  lng: number;
  lat: number;
}

const Maps = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [clickPosition, setClickPosition] = useState<Position | undefined>();
  const [isConfettiVisible, setConfettiVisible] = useState(false);

  const handleSuccess = () => {
    setConfettiVisible(true);
    setTimeout(() => {
      setConfettiVisible(false);
    }, 5000);
  };

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
      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        const newPosition: Position = { lng, lat };
        setClickPosition(newPosition);

        if (markerRef.current) {
          markerRef.current.remove();
        }
        markerRef.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .addTo(map);
        console.log("Posición clicada:", newPosition);
      });
    });

    return () => {
      if (markerRef.current) markerRef.current.remove();
      map.remove();
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row p-5">
        <div className="w-full md:w-2/3 mb-5 md:mb-0">
          <div
            ref={mapContainerRef}
            style={{ width: "100%", height: "400px" }}
            className="rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/3 max-w-full">
          <EventForm coordinates={clickPosition} handleSuccess={handleSuccess} />
        </div>
      </div>

      {isConfettiVisible && (
        <div className="mt-5">
          <h3 className="text-center text-3xl md:text-6xl text-purple-700">
            Evento Guardado!!
          </h3>
          <Confetti />
        </div>
      )}
    </>
  );
};

export default Maps;
