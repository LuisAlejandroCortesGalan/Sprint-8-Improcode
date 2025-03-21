import { useMapContext } from "../mapContext/MapContext";

interface MapEvent {
  _id: string;
  title: string;
  subtitle: string;
  start: string;
  end: string;
  description: string;
  lat: number;
  lng: number;
}

export interface MapsProps {
  handleClick: (id: string) => void;
}

export const MapEvents = ({handleClick}: MapsProps) => {
  const { mapsData, loading, error, deleteMapEvent } = useMapContext();


  return (
    <div className="container mx-2 pr-4 pb-4">
      <h1 className="text-2xl font-bold mb-4 pl-4">Saved Events</h1>

      {loading && <p className="text-gray-500 pl-4">Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && mapsData.length === 0 && (
        <p className="text-gray-500">No events found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading &&
          mapsData.map((event: MapEvent) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg shadow-purple-400 transition-shadow relative"
            >
              <button
                onClick={() => deleteMapEvent(event._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                aria-label="Delete event"
              >
                ❌
              </button>
              <button
                onClick={() => handleClick(event._id)}
                className="absolute top-2 right-10 text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                aria-label="update event"
              >
                ✏️
              </button>

              <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
              <h3 className="text-md text-gray-600">{event.subtitle}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Start:</span> {event.start}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">End:</span> {event.end}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Description:</span> {event.description}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Location:</span> {event.lat}, {event.lng}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};