import React from 'react';
import {
  CheckSquare,
  Moon,
  Sun,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';

export default function Sidebar({
  onClose,
  toggleFilterType,
  selectedEventTypes,
  setSelectedEventTypes,
  darkMode,
  setDarkMode
}) {
  const eventColors = {
    meeting: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    birthday: 'bg-gradient-to-r from-pink-500 to-purple-500',
    deadline: 'bg-gradient-to-r from-red-500 to-orange-500',
    work: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    holiday: 'bg-gradient-to-r from-green-500 to-lime-400',
    family: 'bg-gradient-to-r from-rose-400 to-pink-500',
  };

  const toggleEventType = (type) => {
    setSelectedEventTypes({
      ...selectedEventTypes,
      [type]: !selectedEventTypes[type],
    });
  };

  return (
    <div className={`fixed top-0 left-0 h-full w-64 z-50 shadow-2xl transition-transform duration-300 ease-in-out transform rounded-r-2xl
      ${darkMode ? 'bg-[#1e293b] text-white' : 'bg-white text-gray-800'}`}>
      
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            C
          </div>
          <h1 className="ml-3 font-bold text-xl tracking-wide">CalendarPro</h1>
        </div>
        <button onClick={onClose} className="hover:text-red-500 transition duration-150">
          <X size={24} />
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-6 py-5">
        <div className={`flex items-center gap-3 p-3 rounded-xl shadow-md backdrop-blur-md bg-opacity-70
          ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
          />
          <div>
            <h3 className="font-semibold text-md">Shalini Y S</h3>
            <p className="text-sm opacity-80">Kongu Engineering College</p>
          </div>
        </div>
      </div>

      {/* Event Filters */}
      <div className="px-6">
        <h3 className="text-sm font-semibold mb-3 opacity-80">Filter by Event Type</h3>
        <div className="space-y-2">
          {Object.entries(eventColors).map(([type, gradient]) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full shadow-sm transition-all duration-200
                ${selectedEventTypes[type] ? `${gradient}` : darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
              </div>
              <span className="capitalize text-sm font-medium group-hover:scale-[1.02] transition">{type}</span>
              <input
                type="checkbox"
                checked={selectedEventTypes[type]}
                onChange={() => toggleEventType(type)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Sidebar Options */}
      <div className="px-6 mt-8 space-y-4">
        <button className={`flex items-center w-full px-4 py-2 rounded-lg font-medium
          transition hover:scale-[1.02] duration-200 shadow-sm
          ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <CheckSquare size={18} className="mr-3 text-blue-500" />
          To-Do List
        </button>

        <button
          className={`flex items-center w-full px-4 py-2 rounded-lg font-medium
          transition hover:scale-[1.02] duration-200 shadow-sm
          ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun size={18} className="mr-3 text-yellow-400" />
          ) : (
            <Moon size={18} className="mr-3 text-indigo-500" />
          )}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button className={`flex items-center w-full px-4 py-2 rounded-lg font-medium
          transition hover:scale-[1.02] duration-200 shadow-sm
          ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <Settings size={18} className="mr-3 text-emerald-500" />
          Settings
        </button>

        <button className={`flex items-center w-full px-4 py-2 rounded-lg font-medium
          transition hover:scale-[1.02] duration-200 shadow-sm
          ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <HelpCircle size={18} className="mr-3 text-pink-500" />
          Help Center
        </button>
      </div>
    </div>
  );
}
