import React from 'react';
import dayjs from 'dayjs';
import { eventTypeIcons } from '../constants/eventIcons'; // ✅ Import from your provided file
import { FaClock } from 'react-icons/fa';
const eventTypeColors = {
  meeting: "bg-blue-500",
  birthday: "bg-pink-500",
  deadline: "bg-red-500",
  work: "bg-green-500",
  holiday: "bg-purple-500",
  family: "bg-orange-500",
  personal: "bg-yellow-500",
};

export default function WeekView({
  currentDate,
  events,
  onAddEvent,
  onDateClick,
  darkMode,
}) {
  const weekStart = currentDate.startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    weekStart.add(i, 'day')
  );

  const getEventsForDate = (date) =>
    events.filter((e) => dayjs(e.start).isSame(date, 'day'));

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 transition-all duration-300 ${
        darkMode ? 'text-white' : 'text-black'
      }`}
    >
      {weekDays.map((day, idx) => {
        const dayEvents = getEventsForDate(day);
        const isToday = day.isSame(dayjs(), 'day');

        return (
          <div
            key={idx}
            className={`
              space-y-2 p-4 rounded-2xl border transition duration-300 shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer
              ${
                isToday
                  ? darkMode
                    ? 'bg-gradient-to-br from-yellow-700 to-yellow-600 text-white'
                    : 'bg-yellow-100 border-yellow-400 text-black'
                  : darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }
            `}
          >
            <div
              className={`text-center font-semibold text-base ${
                darkMode ? 'text-indigo-300' : 'text-indigo-700'
              }`}
            >
              {day.format('ddd')}{' '}
              <span className="text-lg font-bold">{day.date()}</span>
            </div>

            <div className="space-y-2">
              {dayEvents.map((e) => (
                <div
                  key={e.id}
                  className={`${eventTypeColors[e.type]} ${
                    darkMode ? 'text-white' : 'text-white'
                  } p-2 rounded-lg shadow-sm hover:brightness-110 transition-all`}
                  onClick={() => onDateClick(day)}
                >
                  <div className="truncate font-semibold flex items-center gap-1">
                    {eventTypeIcons[e.type] || <FaClock className="text-xs" />}
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {e.title}
                    </span>
                  </div>
                  <div className="text-xs opacity-90">
                    {dayjs(e.start).format('HH:mm')}
                  </div>
                </div>
              ))}

              <button
                onClick={() => onAddEvent(day)}
                className={`w-full h-9 border-2 border-dashed font-medium text-xs rounded-md transition-all duration-200
                  ${
                    darkMode
                      ? 'text-indigo-300 border-gray-500 hover:border-blue-400 hover:text-white'
                      : 'text-indigo-600 border-gray-300 hover:border-blue-400 hover:text-indigo-800'
                  }
                `}
              >
                + Add Event
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
