import React from "react";
import { CalendarControlsProps } from "../../events/types/calendarTypes";



const CalendarControls: React.FC<CalendarControlsProps> = ({
  monthTitle,
  changeMonth,
  changeView,
}) => {
  return (
    <div className="flex flex-col md:w-1/5 bg-purple-800 text-white p-3 rounded-lg m-4">
      <h2 className="text-5xl md:text-5xl font-bold text-center">{monthTitle}</h2>
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
  );
};

export default CalendarControls;