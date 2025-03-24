import { EventContentArg } from "@fullcalendar/core/index.js";
import { Dispatch, SetStateAction } from "react";

// Tipo para tus eventos de calendario
export interface CalendarEvent {
  _id: string;
  title: string;
  subtitle?: string;
  start: string;
  end?: string;
  description?: string;
  lat: number;
  lng: number;
}

export interface EventContentProps {
  eventInfo: EventContentArg;
  handleEditClick: (eventId: string) => void;
  deleteMapEvent: (id: string, title: string) => void;
}

export interface EventModalProps {
  isEditing: boolean;
  eventId?: string;
  defaultDate?: string;
  mapsData: CalendarEvent[]; // Tipo específico en lugar de any[]
  createMapEvent: (eventData: Omit<CalendarEvent, "_id">) => Promise<void>; // Tipo correcto
  onClose: () => void;
  onSuccess: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export interface CalendarControlsProps {
  monthTitle: string;
  changeMonth: (action: "prev" | "next" | "today") => void;
  changeView: (view: "dayGridMonth" | "dayGridWeek" | "dayGridDay") => void;
}