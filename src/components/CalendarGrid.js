import React from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import { eventTypeIcons } from '../constants/eventIcons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from 'react-icons/wi';

dayjs.extend(weekday);
dayjs.extend(isToday);

const getEventColor = (type, darkMode) => {
  const baseColors = {
    meeting: darkMode ? 'bg-blue-700 text-blue-100' : 'bg-blue-100 text-blue-900',
    deadline: darkMode ? 'bg-red-700 text-red-100' : 'bg-red-100 text-red-900',
    birthday: darkMode ? 'bg-pink-700 text-pink-100' : 'bg-pink-100 text-pink-900',
    holiday: darkMode ? 'bg-purple-700 text-purple-100' : 'bg-purple-100 text-purple-900',
    work: darkMode ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-900',
    family: darkMode ? 'bg-orange-700 text-orange-100' : 'bg-orange-100 text-orange-900',
    personal: darkMode ? 'bg-yellow-700 text-yellow-100' : 'bg-yellow-100 text-yellow-900',
    default: darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800',
  };
  return baseColors[type] || baseColors.default;
};

const getBrightBackground = (eventType = 'default') => {
  const brightMap = {
    meeting: 'bg-blue-200',
    deadline: 'bg-red-200',
    birthday: 'bg-pink-300',
    holiday: 'bg-purple-300',
    work: 'bg-green-300',
    family: 'bg-orange-300',
    personal: 'bg-yellow-300',
    default: 'bg-gray-200',
  };
  return brightMap[eventType] || brightMap.default;
};

const getWeatherIconForDay = (dateStr, darkMode) => {
  const index = dayjs(dateStr).date() % 6;
  const iconStyles = `text-4xl ${
    darkMode
      ? ['text-yellow-300', 'text-gray-300', 'text-blue-300', 'text-purple-300', 'text-blue-100', 'text-gray-300'][index]
      : ['text-yellow-500', 'text-gray-500', 'text-blue-500', 'text-purple-600', 'text-blue-300', 'text-gray-500'][index]
  }`;
  const IconComponents = [WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog];
  const Icon = IconComponents[index];
  return <Icon className={iconStyles} />;
};

export default function CalendarGrid({ currentDate, events, onDateClick, onDeleteEvent, darkMode }) {
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  let date = startDate.clone();
  const days = [];

  while (date.isBefore(endDate) || date.isSame(endDate, 'day')) {
    const isCurrentMonth = date.month() === currentDate.month();
    const isCurrentDay = date.isToday();

    const dayEvents = events.filter(e => dayjs(e.start).isSame(date, 'day'));

    const bgColor = isCurrentDay
      ? (darkMode
          ? 'bg-yellow-700 border-yellow-500 text-white ring-2 ring-yellow-400 shadow-xl animate-pulse'
          : 'bg-yellow-100 border-yellow-500 text-yellow-900 ring-2 ring-yellow-400 shadow-xl animate-pulse')
      : (isCurrentMonth
          ? (dayEvents.length > 0
              ? getBrightBackground(dayEvents[0]?.type || 'default')
              : (darkMode ? 'bg-gray-800' : 'bg-white'))
          : (darkMode ? 'bg-gray-900' : 'bg-gray-100'));

    days.push(
      <div
        key={date.format('DD-MM-YYYY')}
        className={`border h-40 p-2 rounded-xl shadow-md overflow-y-auto relative group transition-all duration-300 ease-in-out
          ${bgColor} hover:${darkMode ? 'bg-gray-700' : 'bg-indigo-50'} cursor-pointer`}
        onClick={() => isCurrentMonth && onDateClick(date)}
      >
        <div className={`text-sm font-bold mb-2 ${!isCurrentMonth ? 'invisible' : ''} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
  {date.format('D')}
</div>

{isCurrentMonth && (
  <div className="absolute top-1 right-1 text-4xl drop-shadow-lg">
    {getWeatherIconForDay(date, darkMode)}
  </div>
)}

{isCurrentMonth && (
  <div className="space-y-1">
    {dayEvents.map(event => {
      const isConflict = dayEvents.filter(e => e.time === event.time).length > 1;
      const colorClass = isConflict
        ? (darkMode ? 'bg-pink-700 text-pink-100' : 'bg-pink-300 text-pink-900')
        : getEventColor(event.type, darkMode);

      return (
        <Tippy
          key={event.id}
          content={
            <div className="text-sm font-medium">
              <div>{event.title}</div>
              <div className="text-xs text-gray-400">
                ⏰ {event.time} | ⏳ {event.duration}
              </div>
              {isConflict && (
                <div className="text-xs text-red-500 font-semibold mt-1">⚠ Conflict with another event</div>
              )}
            </div>
          }
          placement="top"
          animation="shift-away"
          theme="light-border"
        >
          <div
            className={`relative text-xs px-2 py-1 rounded-md flex justify-between items-center shadow-sm hover:shadow-md
              ${colorClass} transition-all duration-200 animate-fadeIn
              ${isConflict ? 'ring-2 ring-red-500 animate-pulse' : ''}
            `}
          >
            {isConflict && (
              <div className="absolute top-0 right-0 text-[10px] text-red-600 font-bold mr-[2px] mt-[1px]">⚠</div>
            )}
            <span className="truncate max-w-[100px] flex items-center gap-1">
              <span className="flex-shrink-0">{eventTypeIcons[event.type] || '📌'}</span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {event.title} ({event.time})
              </span>
            </span>
            {!event.static && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteEvent(event.id);
                }}
                className="ml-2 text-xs font-bold hover:text-red-500 transition"
              >
                ✕
              </button>
            )}
          </div>
        </Tippy>
      );
    })}
  </div>
)}

      </div>
    );
    date = date.add(1, 'day');
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <div className={`grid grid-cols-7 mb-3 text-center font-semibold text-sm uppercase tracking-wide ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
        {weekDays.map(day => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
}
