import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core";
import { useMapContext } from "../mapContext/MapContext";
import EventForm from "../components/EventForm";

const Calendar: React.FC = () => {
  const { mapsData, loading, error, createMapEvent, deleteMapEvent } =
    useMapContext();

  const [monthTitle, setMonthTitle] = React.useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

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

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setIsEditing(false);
    setSelectedEventId(undefined);
    setShowModal(true);
  };

  const handleEditClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsEditing(true);
    setShowModal(true);
  };

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

  const renderEventContent = (eventInfo: EventContentArg) => {
    const evento = eventInfo.event;
    const customProps = evento.extendedProps as {
      subtitle?: string;
      description?: string;
      lat?: number;
      lng?: number;
    };

    return (
      <>
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
            </p>{" "}
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
          <div className="font-bold flex justify-between">
            Title: {evento.title}
          </div>
          {customProps.subtitle && (
            <div className="text-xs italic">
              Subtitle {customProps.subtitle}
            </div>
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
      </>
    );
  };

  const updateMonthTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      setMonthTitle(calendarApi.view.title);
    }
  };

  const changeView = (view: "dayGridMonth" | "dayGridWeek" | "dayGridDay") => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
      updateMonthTitle();
    }
  };

  const changeMonth = (action: "prev" | "next" | "today") => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      if (action === "prev") calendarApi.prev();
      else if (action === "next") calendarApi.next();
      else calendarApi.today();
      updateMonthTitle();
    }
  };
  

  useEffect(() => {
    updateMonthTitle();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedEventId(undefined);
    setSelectedDate(undefined);
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSuccess = () => {
    closeModal();
    setSuccessMessage(isEditing ? "¡Evento actualizado correctamente!" : "¡Evento creado correctamente!");
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  if (loading)
    return <div className="text-center p-4">Cargando eventos...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row w-screen pt-20 md:pt-15">
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col md:w-1/5 bg-purple-800 text-white p-3 rounded-lg m-4">
        <h2 className="text-5xl md:text-5xl font-bold text-center">
          {monthTitle}
        </h2>
        <div className="grid grid-cols-3 md:flex md:flex-col gap-2 mt-3">
          <button
            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => changeMonth("prev")}
          >
            Anterior
          </button>
          <button
            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => changeMonth("next")}
          >
            Siguiente
          </button>
          <button
            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-green-500 rounded hover:bg-green-600"
            onClick={() => changeMonth("today")}
          >
            Hoy
          </button>
          <button
            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => changeView("dayGridMonth")}
          >
            Mes
          </button>
          <button
            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => changeView("dayGridWeek")}
          >
            Semana
          </button>
          <button
            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => changeView("dayGridDay")}
          >
            Día
          </button>
        </div>
      </div>

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
          eventContent={renderEventContent}
        />
      </div>

      {/* Modal para crear o editar evento */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Event" : "Create Event"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <EventForm
              handleClick={getEventById}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              eventId={selectedEventId}
              onSuccess={handleFormSuccess}
              defaultDate={selectedDate} 
              createMapEvent={createMapEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
};


export default Calendar;