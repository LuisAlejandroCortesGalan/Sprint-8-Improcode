import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core";
import { useMapContext } from "../mapContext/MapContext"; // Importa tu contexto

const Calendar: React.FC = () => {
  // Usar el contexto de mapas
  const { mapsData, loading, error, createMapEvent } = useMapContext();
  const [monthTitle, setMonthTitle] = React.useState(""); 
  const calendarRef = useRef<FullCalendar | null>(null);

  // Convierte los eventos del mapa al formato de FullCalendar
  const mapEventsToCalendarEvents = () => {
    return mapsData.map(event => ({
      id: event._id,
      title: event.title,
      start: event.start,
      end: event.end,
      extendedProps: {
        subtitle: event.subtitle,
        description: event.description,
        lat: event.lat,
        lng: event.lng
      }
    }));
  };

  

  const handleDateClick = (arg: DateClickArg) => {
    const title = prompt("Ingrese el nombre del evento:");
    if (!title) return;
    
    const subtitle = prompt("Ingrese el subtítulo:") || "";
    const description = prompt("Ingrese la descripción:") || "";
    const endDate = prompt("Fecha de finalización (YYYY-MM-DD):", arg.dateStr) || arg.dateStr;
    
    // Valores por defecto para lat/lng o solicitar al usuario
    const lat = parseFloat(prompt("Latitud:", "0") || "0");
    const lng = parseFloat(prompt("Longitud:", "0") || "0");
    
    // Crear nuevo evento usando la función del contexto
    createMapEvent({
      title,
      subtitle,
      start: arg.dateStr,
      end: endDate,
      description,
      lat,
      lng
    });
  };

  // Renderizado personalizado de los eventos
  const renderEventContent = (eventInfo: EventContentArg) => {
    const evento = eventInfo.event;
    const customProps = evento.extendedProps as {
      subtitle?: string;
      description?: string;
      lat?: number;
      lng?: number;
    };
    
    return (
      <div className="p-1 rounded bg-purple-800 text-white text-xs md:text-sm w-full">
        <div className="font-bold">{evento.title}</div>
        {customProps.subtitle && (
          <div className="text-xs italic">{customProps.subtitle}</div>
        )}
        {customProps.description && (
          <div className="text-xs truncate" title={customProps.description}>
            {customProps.description.length > 20 
              ? customProps.description.substring(0, 18) + "..." 
              : customProps.description}
          </div>
        )}
        {(customProps.lat !== undefined && customProps.lng !== undefined) && (
          <div className="text-xs opacity-75">
            📍 {customProps.lat.toFixed(2)}, {customProps.lng.toFixed(2)}
          </div>
        )}
      </div>
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

  if (loading) return <div className="text-center p-4">Cargando eventos...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen pt-20 md:pt-15">
      <div className="flex flex-col md:w-1/5 bg-purple-800 text-white p-3 rounded-lg">
        <h2 className="text-lg md:text-xl font-bold text-center">{monthTitle}</h2>
        <div className="grid grid-cols-3 md:flex md:flex-col gap-2 mt-3">
          <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => changeMonth("prev")}>
            Anterior
          </button>
          <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => changeMonth("next")}>
            Siguiente
          </button>
          <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-green-500 rounded hover:bg-green-600"
            onClick={() => changeMonth("today")}>
            Hoy
          </button>
          <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => changeView("dayGridMonth")}>
            Mes
          </button>
          <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => changeView("dayGridWeek")}>
            Semana
          </button>
          <button className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => changeView("dayGridDay")}>
            Día
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
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
    </div>
  );
};

export default Calendar;