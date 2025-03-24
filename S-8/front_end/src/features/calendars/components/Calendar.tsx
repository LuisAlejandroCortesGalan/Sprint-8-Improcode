import React, { useState, useEffect, useRef } from "react";
import { useMapContext } from "../../events/context/MapContext";
import CalendarView from "./CalendarView";
import CalendarControls from "./CalendarControls";
import EventModal from "./EventModal";
import SuccessMessage from "./SuccessMessage";
import FullCalendar from "@fullcalendar/react";
import { DateClickArg } from "@fullcalendar/interaction/index.js";

const CalendarContainer: React.FC = () => {
  const { mapsData, loading, error, createMapEvent, deleteMapEvent } = useMapContext();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [monthTitle, setMonthTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const updateMonthTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) setMonthTitle(calendarApi.view.title);
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

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedEventId(undefined);
    setSelectedDate(undefined);
  };

  const handleFormSuccess = () => {
    closeModal();
    setSuccessMessage(isEditing ? "¡Evento actualizado correctamente!" : "¡Evento creado correctamente!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  useEffect(() => {
    updateMonthTitle();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando eventos...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row w-screen pt-20 md:pt-15">
      <SuccessMessage message={successMessage} show={showSuccessMessage} />
      <CalendarControls monthTitle={monthTitle} changeMonth={changeMonth} changeView={changeView} />
      <CalendarView
        calendarRef={calendarRef}
        mapsData={mapsData}
        handleDateClick={handleDateClick}
        handleEditClick={handleEditClick}
        deleteMapEvent={deleteMapEvent}
      />
      {showModal && (
        <EventModal
          isEditing={isEditing}
          eventId={selectedEventId}
          defaultDate={selectedDate}
          mapsData={mapsData}
          createMapEvent={createMapEvent}
          onClose={closeModal}
          onSuccess={handleFormSuccess}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default CalendarContainer;