export interface MapEvent {
  _id: string;
  title: string;
  subtitle: string;
  start: string;
  end: string;
  description: string;
  lat: number;
  lng: number;
}

export interface MapContextData {
  mapsData: MapEvent[];
  loading: boolean;
  error: string | null;
  fetchMapEvents: () => Promise<void>;
  createMapEvent: (eventData: Omit<MapEvent, "_id">) => Promise<void>;
  deleteMapEvent: (id: string, title: string) => Promise<void>;
  updateMapEvent: (id: string, eventData: MapEvent) => Promise<void>;
}
