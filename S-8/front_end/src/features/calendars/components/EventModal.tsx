import React from "react";
import EventForm from "../../events/components/EventForm";
import { EventModalProps } from "../../events/types/calendarTypes";



const EventModal: React.FC<EventModalProps> = ({
  isEditing,
  eventId,
  defaultDate,
  mapsData,
  createMapEvent,
  onClose,
  onSuccess,
  setIsEditing,
}) => {
  const getEventById = (id: string) => {
    const event = mapsData.find((event) => event._id === id);
    if (event) {
      return {
        _id: event._id,
        title: event.title,
        subtitle: event.subtitle || "",
        start: event.start,
        end: event.end,
        description: event.description || "",
        lat: event.lat,
        lng: event.lng,
      };
    }
    return undefined;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isEditing ? "Edit Event" : "Create Event"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <EventForm
          handleClick={getEventById}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          eventId={eventId}
          onSuccess={onSuccess}
          defaultDate={defaultDate}
          createMapEvent={createMapEvent}
        />
      </div>
    </div>
  );
};

export default EventModal;