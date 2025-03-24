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

export interface MapsProps {
    handleClick: (id: string) => void;
}
