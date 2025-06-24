import React from 'react';
import dayjs from 'dayjs';
import {
  CalendarCheck,
  Gift,
  AlertCircle,
  Briefcase,
  Plane,
  Users
} from 'lucide-react';

export default function EventCard({ event, eventsOnDay, darkMode }) {
  const isConflict = eventsOnDay.filter(e => e.time === event.time).length > 1;

  const eventTypeColors = {
    meeting: darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-200 text-blue-900',
    birthday: darkMode ? 'bg-pink-600 text-pink-100' : 'bg-pink-200 text-pink-900',
    deadline: darkMode ? 'bg-red-600 text-red-100' : 'bg-red-200 text-red-900',
    work: darkMode ? 'bg-green-600 text-green-100' : 'bg-green-200 text-green-900',
    holiday: darkMode ? 'bg-purple-600 text-purple-100' : 'bg-purple-200 text-purple-900',
    family: darkMode ? 'bg-orange-600 text-orange-100' : 'bg-orange-200 text-orange-900',
    default: darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800',
  };

  const eventIcons = {
    meeting: <CalendarCheck size={14} />,
    birthday: <Gift size={14} />,
    deadline: <AlertCircle size={14} />,
    work: <Briefcase size={14} />,
    holiday: <Plane size={14} />,
    family: <Users size={14} />,
  };

  const colorClass = eventTypeColors[event.type] || eventTypeColors.default;
  const icon = eventIcons[event.type] || null;

  return (
    <div
      title={`${event.title} at ${event.time} for ${event.duration}`}
      className={`relative group p-2 pr-3 rounded-lg flex items-center justify-between gap-2 text-xs font-medium shadow-sm transition-all duration-300 ${
        colorClass
      } ${isConflict ? 'animate-pulse ring-2 ring-red-400/50' : ''}`}
    >
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span className="truncate">{event.title}</span>
      </div>
      <span className="text-[11px] opacity-90">{event.time}</span>
    </div>
  );
}
