import React from "react";
import { EventContentProps } from "../../events/types/calendarTypes";


const EventContent: React.FC<EventContentProps> = ({
  eventInfo,
  handleEditClick,
  deleteMapEvent,
}) => {
  const evento = eventInfo.event;
  const customProps = evento.extendedProps as {
    subtitle?: string;
    description?: string;
    lat?: number;
    lng?: number;
  };

  return (
    <div className="p-1 rounded bg-purple-500 text-white text-xs md:text-sm w-full cursor-auto">
      <div className="flex flex-row-reverse gap-2">
        <p
          className="cursor-pointer bg-fuchsia-800 rounded-2xl p-1"
          onClick={(e) => {
            e.stopPropagation();
            deleteMapEvent(evento.id, evento.title);
          }}
          title="Delete"
        >
          ❌
        </p>
        <p
          className="cursor-pointer bg-fuchsia-800 rounded-2xl p-1"
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(evento.id);
          }}
          title="Edit"
        >
          ✏️
        </p>
      </div>
      <div className="font-bold flex justify-between">Title: {evento.title}</div>
      {customProps.subtitle && (
        <div className="text-xs italic">Subtitle {customProps.subtitle}</div>
      )}
      {customProps.description && (
        <div className="text-xs truncate" title={customProps.description}>
          Desc:{" "}
          {customProps.description.length > 20
            ? customProps.description.substring(0, 18) + "..."
            : customProps.description}
        </div>
      )}
      {customProps.lat !== undefined && customProps.lng !== undefined && (
        <div className="text-xs opacity-75">
          <p>📍lat: {customProps.lat.toFixed(2)}</p>
          <p>📍lng: {customProps.lng.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default EventContent;