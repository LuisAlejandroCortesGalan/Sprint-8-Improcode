import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import EventContent from "./EventContent";
import { MapEvent } from "../../events/types/mapEventTypes";

interface CalendarViewProps {
  calendarRef: React.RefObject<FullCalendar | null> ;
  mapsData: MapEvent[];
  handleDateClick: (arg: DateClickArg) => void;
  handleEditClick: (eventId: string) => void;
  deleteMapEvent: (id: string, title: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  calendarRef,
  mapsData,
  handleDateClick,
  handleEditClick,
  deleteMapEvent,
}) => {
  const mapEventsToCalendarEvents = () => {
    return mapsData.map((event) => ({
      id: event._id,
      title: event.title,
      start: event.start,
      end: event.end,
      extendedProps: {
        subtitle: event.subtitle,
        description: event.description,
        lat: event.lat,
        lng: event.lng,
      },
    }));
  };

  return (
    <div className="flex-1 p-4 m-4">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={mapEventsToCalendarEvents()}
        dateClick={handleDateClick}
        headerToolbar={false}
        height="auto"
        eventContent={(eventInfo) => (
          <EventContent
            eventInfo={eventInfo}
            handleEditClick={handleEditClick}
            deleteMapEvent={deleteMapEvent}
          />
        )}
      />
    </div>
  );
};

export default CalendarView;