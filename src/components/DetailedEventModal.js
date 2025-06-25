import React from 'react';
import { eventTypeIcons } from '../constants/eventIcons';
import { FaClock } from 'react-icons/fa';
import {
  X, Sun, Moon, Settings, HelpCircle, CheckSquare
} from 'lucide-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import dayjs from 'dayjs';

export default function DetailedView({
  hours,
  events,
  eventColors,
  darkMode,
  toggleSidebar,
  sidebarOpen,
  setDarkMode,
  selectedEventTypes,
  toggleEventType,
  getEventsForHour,
}) {
  const formatTime = (hour) => {
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const getWeekDates = () => {
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    return [...Array(7)].map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates();

  return (
    <div className={`relative min-h-screen flex flex-col p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-white to-blue-50 text-gray-900'}`}>
      <div
        className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 transform z-40 shadow-2xl rounded-r-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md">
                C
              </div>
              <span className="ml-3 font-extrabold text-lg tracking-wide">CalendarPro</span>
            </div>
            <button onClick={toggleSidebar}>
              <X className="hover:text-red-500" />
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-sm tracking-wider">Filter Events</h3>
            {Object.keys(selectedEventTypes).map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer mb-2">
                <div
                  className={`w-4 h-4 rounded-full shadow-sm ring-2 ring-white ${
                    selectedEventTypes[type]
                      ? eventColors[type]
                      : darkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-300'
                  }`}
                ></div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedEventTypes[type]}
                  onChange={() => toggleEventType(type)}
                />
                <span className="capitalize text-sm">{type}</span>
              </label>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-300 dark:border-gray-700">
            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition">
              <CheckSquare size={18} className="mr-2" />
              To-Do List
            </button>
            <button
              className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
              Toggle Theme
            </button>
            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition">
              <Settings size={18} className="mr-2" />
              Settings
            </button>
            <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition">
              <HelpCircle size={18} className="mr-2" />
              Help
            </button>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-7xl mx-auto rounded-xl shadow-xl overflow-hidden border transition duration-300 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="grid grid-cols-8">
          <div className="bg-transparent border-r border-gray-300 dark:border-gray-700"></div>
          {weekDates.map((date, i) => (
            <div
              key={i}
              className={`p-4 text-center text-sm font-semibold uppercase tracking-wide ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-blue-100 text-blue-900'}`}
            >
              {dayjs(date).format('ddd, MMM D')}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
         
          <div className="border-r border-gray-300 dark:border-gray-700 text-sm text-right">
            {hours.map((hour) => (
              <div key={hour} className="h-20 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                {formatTime(hour)}
              </div>
            ))}
          </div>

       
          {weekDates.map((date, dayIndex) => (
            <div key={dayIndex} className="border-r border-gray-200 dark:border-gray-700 relative">
              {hours.map((hour) => {
                const hourEvents = getEventsForHour(date, hour);
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className="h-20 border-b border-gray-200 dark:border-gray-700 relative p-1"
                  >
                    {hourEvents
  .filter(event => new Date(event.start).getHours() === hour)
  .map((event, index, allEvents) => {
    const startHour = new Date(event.start).getHours();
    const endHour = new Date(event.end).getHours();
    const duration = Math.max(1, endHour - startHour);

    const overlapIndex = index; 
    const offset = overlapIndex * 8; 

    return (
      <Tippy
        key={event.id}
        content={
          <div className="text-sm font-medium">
            <div>{event.title}</div>
            <div className="text-xs text-gray-400">
              ⏰ {event.startTime} - {event.endTime}
            </div>
            <div className="text-xs">📂 Type: {event.type}</div>
            {event.description && <div className="text-xs mt-1 italic">{event.description}</div>}
          </div>
        }
        placement="top"
        animation="shift-away"
        theme="light-border"
      >
        <div
          className={`absolute left-1 right-1 rounded-lg shadow-md px-3 py-1 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02] ${eventColors[event.type] || eventColors.default}`}
          style={{
            height: `${duration * 5}rem`,
            top: `${offset + 4}px`,
            zIndex: 10 + overlapIndex, 
          }}
        >
          <div className="flex items-center gap-1 truncate">
            {eventTypeIcons[event.type] || <FaClock className="text-xs" />}
            <span>{event.title}</span>
          </div>
          <div className="text-[0.65rem] opacity-90 flex items-center gap-1">
            <FaClock className="text-[0.65rem]" />
            {event.startTime} - {event.endTime}
          </div>
        </div>
      </Tippy>
    );
  })}

                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
