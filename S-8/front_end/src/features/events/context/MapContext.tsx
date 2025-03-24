import React, { createContext, useContext, useState, useEffect } from "react";
import { MapEvent } from "../types/mapEventTypes";
import { MapContextData } from "../types/mapContextTypes";


const MapContext = createContext<MapContextData | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mapsData, setMapsData] = useState<MapEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMapEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/maps", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error fetching maps: ${response.statusText}`);
      }

      const data = await response.json();
      setMapsData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching maps:", error);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const createMapEvent = async (eventData: Omit<MapEvent, "_id">) => {
    try {
      const response = await fetch("http://localhost:5000/api/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`Error creating map: ${response.statusText}`);
      }

      await fetchMapEvents();
    } catch (error) {
      console.error("Error creating map:", error);
      throw error;
    }
  };

  const updateMapEvent = async (id: string, formData: MapEvent) => {
    try {
      const response = await fetch(`http://localhost:5000/api/maps/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error updating map: ${response.statusText}`);
      }

      await fetchMapEvents();
    } catch (error) {
      console.error("Error updating map:", error);
      setError("Failed to update event");
    }
  };

  const deleteMapEvent = async (id: string, title: string) => {
    const confirmation = confirm(`Are you sure to delete the event ${title}?`)

    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:5000/api/maps/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          throw new Error(`Error deleting map: ${response.statusText}`);
        }
  
        await fetchMapEvents();
      } catch (error) {
        console.error("Error deleting map:", error);
        setError("Failed to delete event");
      }
    };
    }


  useEffect(() => {
    fetchMapEvents();
  }, []);

  const value = {
    mapsData,
    loading,
    error,
    fetchMapEvents,
    createMapEvent,
    deleteMapEvent,
    updateMapEvent,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
