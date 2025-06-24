import React from 'react';
import { Plus } from 'lucide-react';
import dayjs from 'dayjs';

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

const eventTypeColors = {
  meeting: 'bg-blue-500',
  birthday: 'bg-pink-500',
  deadline: 'bg-red-500',
  work: 'bg-green-500',
  holiday: 'bg-purple-500',
  family: 'bg-orange-500',
};

export default function DayView({ currentDate, events, onAddEvent, darkMode }) {
  const dateStr = currentDate.format('YYYY-MM-DD');

  const dayEvents = events.filter(event =>
    dayjs(event.start).format('YYYY-MM-DD') === dateStr
  );

  const getEventForTimeSlot = (time) => {
    return dayEvents.find((event) => {
      if (!event.start || !event.end) return false;

      const startHour = new Date(event.start).getHours();
      const endHour = new Date(event.end).getHours();
      const slotHour = parseInt(time.split(":")[0], 10);

      return slotHour >= startHour && slotHour < endHour;
    });
  };

  const currentHour = new Date().getHours();
  const isToday = dayjs().isSame(currentDate, 'day');

  return (
    <div
      className={`rounded-2xl shadow-2xl p-6 transition duration-300 ${
        darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-white via-blue-50 to-white text-black'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {currentDate.format('dddd, MMMM D')}
        </h3>
        <button
          onClick={() => onAddEvent(currentDate)}
          className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-blue-500 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-xl font-medium shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      {/* Time Grid */}
      <div className="space-y-3">
        {timeSlots.map((time, idx) => {
          const event = getEventForTimeSlot(time);
          const isNowRow = isToday && idx === currentHour;

          return (
            <div
              key={time}
              className={`relative flex items-center gap-4 border-l-4 py-2 pl-3 pr-2 rounded-lg transition duration-200 ${
                isNowRow
                  ? 'border-pink-500 bg-pink-100/10 shadow-inner'
                  : darkMode
                  ? 'border-gray-700'
                  : 'border-gray-200'
              }`}
            >
              {/* Time Label */}
              <div className={`w-20 text-sm font-semibold tracking-wide ${darkMode ? 'text-indigo-300' : 'text-gray-500'}`}>
                {time}
              </div>

              {/* Event Block */}
              <div className="flex-1">
                {event ? (
                  <div
                    className={`relative overflow-hidden px-4 py-2 rounded-lg shadow text-white flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                      eventTypeColors[event.type] || 'bg-gray-400'
                    }`}
                  >
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-xs opacity-90">
                      {dayjs(event.start).format('HH:mm')} - {dayjs(event.end).format('HH:mm')}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`h-12 rounded-lg border-2 flex items-center justify-center text-sm italic opacity-70 cursor-pointer hover:opacity-100 hover:border-blue-400 transition duration-300 ${
                      darkMode
                        ? 'border-gray-600 text-white hover:bg-gray-700'
                        : 'border-gray-300 text-gray-600 hover:bg-blue-50'
                    }`}
                    onClick={() => onAddEvent(currentDate)}
                  >
                    Click to add event
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
