import React from 'react';
import dayjs from 'dayjs';
import { eventTypeIcons } from '../constants/eventIcons';
import { FaClock } from 'react-icons/fa'; 
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function YearView({ currentDate, events, onDateClick, onMonthClick, darkMode }) {
  const year = currentDate.year();

  const getEventsForMonth = (month) =>
    events.filter(e => dayjs(e.start).year() === year && dayjs(e.start).month() === month);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 transition-all duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
      {monthNames.map((name, i) => {
        const monthEvents = getEventsForMonth(i);
        const highlight = monthEvents.length > 0;

        return (
          <div
            key={i}
            className={`
              p-4 rounded-2xl border shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.01]
              ${highlight
                ? darkMode
                  ? 'bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 border-indigo-500'
                  : 'bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 border-indigo-300'
                : darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }
            `}
          >
            {/* Month Title */}
            <button
              onClick={() => onMonthClick(i)}
              className={`text-xl font-bold mb-3 tracking-wide transition-colors duration-200 ${
                darkMode ? 'text-yellow-300 hover:underline' : 'text-indigo-700 hover:underline'
              }`}
            >
              {name}
            </button>

            {/* Month Events Preview */}
            <div className="space-y-2">
              {monthEvents.slice(0, 3).map((e) => (
                <div
                  key={e.id}
                  onClick={() => onDateClick(dayjs(e.start))}
                  className={`
                    rounded-lg px-3 py-2 text-xs cursor-pointer transition-all duration-200
                    ${darkMode
                      ? 'bg-black/20 hover:bg-black/30 text-white'
                      : 'bg-white border border-gray-300 hover:bg-indigo-50 text-gray-800'}
                  `}
                  title={e.title}
                >
                 <div className="flex items-center gap-1 font-semibold truncate">
  {eventTypeIcons[e.type] || <FaClock className="text-xs" />}
  <span>{e.title}</span>
</div>

                  <div className={`opacity-70`}>
                    {dayjs(e.start).format('MMM D, HH:mm')}
                  </div>
                </div>
              ))}

              {monthEvents.length > 3 && (
                <div className={`text-xs italic ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  +{monthEvents.length - 3} more event{monthEvents.length - 3 > 1 ? 's' : ''}
                </div>
              )}

              {monthEvents.length === 0 && (
                <div className={`text-sm text-center mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No events this month
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
