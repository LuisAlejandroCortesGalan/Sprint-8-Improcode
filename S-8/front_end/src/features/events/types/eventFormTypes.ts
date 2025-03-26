import { MapEvent } from "./mapEventTypes";

export interface Position {
    lng: number;
    lat: number;
}

export interface EventFormData {
    _id: string;
    title: string;
    subtitle: string;
    start: string;
    end: string;
    description: string;
    lat: number;
    lng: number;
}

export interface FormErrors {
    title?: string;
    start?: string;
    end?: string;
    lat?: string;
    lng?: string;
    subtitle?: string;
    description?: string;
}

export interface EventFormProps {
    coordinates?: Position;
    handleClick: (id: string) => EventFormData | undefined;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    eventId?: string;
    onSuccess?: () => void;
    defaultDate?: string | undefined
    createMapEvent?: (eventData: Omit<MapEvent, "_id">) => Promise<void>
}


export interface UseEventFormHandlersProps {
    coordinates?: { lat: number; lng: number };
    handleClick: (eventId: string) => EventFormData | undefined;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    eventId?: string;
    defaultDate?: string;
    onSuccess?: () => void;
    createMapEvent: (data: EventFormData) => Promise<void>;
    updateMapEvent: (id: string, data: EventFormData) => Promise<void>;
    validate: () => boolean;
    setErrors: (errors: Partial<Record<string, string>>) => void;
}