import React, { useState } from 'react';
import {
  CheckSquare,
  Moon,
  Sun,
  Settings,
  HelpCircle,
  X,
  LogOut,
  CalendarDays,
  Filter
} from 'lucide-react';
import kairo from '../assets/kairoplan-calendar.jpg';
import profilephoto from '../assets/aboutphoto2.jpg';
import dayjs from 'dayjs';

export default function Sidebar({
  onClose,
  toggleFilterType,
  selectedEventTypes,
  setSelectedEventTypes,
  darkMode,
  setDarkMode,
}) {
  const [filterOpen, setFilterOpen] = useState(true);
  const [search, setSearch] = useState('');

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
    <div
  className={`fixed top-0 left-0 h-full w-64 z-50 backdrop-blur-xl bg-opacity-80 border-r-2 transition-transform duration-300 ease-in-out transform rounded-r-2xl
    ${darkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white border-white-700 shadow-xl'
      : 'bg-gradient-to-br from-yellow-50 via-sky-100 to-blue-100 text-gray-900 border-blue-200 shadow-xl'}`}
>

     
      <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-md border-2 border-pink-400">
            <img src={kairo} alt="Kairo Logo" className="w-full h-full object-cover" />
          </div>
          <h1
            className="ml-3 text-2xl tracking-wider font-handwritten"
            style={{
              color: darkMode ? '#D1D5DB' : '#1F2937',
              fontFamily: 'Pacifico, cursive',
            }}
          >
            KairoPlan
          </h1>
        </div>
        <button onClick={onClose} className="hover:text-red-500 transition duration-150">
          <X size={24} />
        </button>
      </div>

     
      <div className="px-6 py-5">
        <div className={`flex items-center gap-3 p-3 rounded-xl shadow-md ${darkMode ? 'bg-gray-700/60' : 'bg-white/80'} border border-transparent`}>
          <img src={profilephoto} alt="Profile" className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500" />
          <div>
            <h3 className="font-semibold text-md">Shalini Y S</h3>
            <p className="text-sm opacity-80">Kongu Engineering College</p>
          </div>
        </div>
      </div>

     
      <div className="px-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold opacity-80 flex items-center gap-1">
            <CalendarDays size={16} /> This Month
          </h3>
        </div>
        <div className={`grid grid-cols-7 text-center text-xs font-medium gap-1`}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="opacity-70">{d}</div>
          ))}
          {[...Array(dayjs().daysInMonth())].map((_, i) => (
            <div
              key={i}
              className={`rounded-md py-1 ${i + 1 === dayjs().date() ? 'bg-blue-500 text-white font-bold' : 'hover:bg-blue-100 dark:hover:bg-gray-600 cursor-pointer'} transition`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

     
      <div className="px-6 mt-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold opacity-80 flex items-center gap-2">
            <Filter size={16} /> Event Types
          </h3>
          <button onClick={() => setFilterOpen(!filterOpen)} className="text-xs underline opacity-70 hover:opacity-100">
            {filterOpen ? 'Hide' : 'Show'}
          </button>
        </div>
        {filterOpen && (
          <div className="space-y-2">
            {Object.entries(eventColors).map(([type, gradient]) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full shadow-sm transition-all duration-200 ${selectedEventTypes[type] ? `${gradient}` : darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
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
        )}
      </div>

   
      <div className="px-6 mt-8 space-y-4">
      
<button className={`flex items-center w-full px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm hover:scale-[1.02] 
  ${darkMode ? 'hover:bg-blue-700 text-white' : 'hover:bg-blue-100 text-blue-800'}`}>
  <CheckSquare size={18} className="mr-3 text-blue-500" />
  To-Do List
</button>


<button onClick={() => setDarkMode(!darkMode)}
  className={`flex items-center w-full px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm hover:scale-[1.02]
  ${darkMode
    ? 'hover:bg-yellow-700 text-white'
    : 'hover:bg-blue-100 text-yellow-800'}`}>
  {darkMode ? <Sun size={18} className="mr-3 text-yellow-400" /> : <Moon size={18} className="mr-3 text-indigo-500" />}
  {darkMode ? 'Light Mode' : 'Dark Mode'}
</button>


<button className={`flex items-center w-full px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm hover:scale-[1.02] 
  ${darkMode ? 'hover:bg-emerald-700 text-white' : 'hover:bg-blue-100 text-emerald-800'}`}>
  <Settings size={18} className="mr-3 text-emerald-500" />
  Settings
</button>

<button className={`flex items-center w-full px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm hover:scale-[1.02]
  ${darkMode ? 'hover:bg-pink-700 text-white' : 'hover:bg-blue-100 text-pink-800'}`}>
  <HelpCircle size={18} className="mr-3 text-pink-500" />
  Help Center
</button>

<button className={`flex items-center w-full px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm hover:scale-[1.02]
  ${darkMode ? 'hover:bg-red-700 text-white' : 'hover:bg-red-100 text-red-800'}`}>
  <X size={18} className="mr-3 text-red-500" />
  Logout
</button>

      </div>
    </div>
  );
}
