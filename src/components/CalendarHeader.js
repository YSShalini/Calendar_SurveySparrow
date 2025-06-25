import React, { useState } from 'react';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MonthYearPicker } from './MonthYearPicker';
import profilephoto from '../assets/aboutphoto2.jpg';
export default function CalendarHeader({
  currentDate,
  nextMonth,
  prevMonth,
  darkMode,
  viewMode,
  setViewMode,
  setCurrentDate,
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleDateChange = (newDate) => {
    const jsDate = dayjs(newDate);
    setCurrentDate(jsDate);
  };

  const modeColors = {
    day: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    week: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    month: 'bg-gradient-to-r from-green-500 to-lime-500 text-white',
    year: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
  };

  return (
    <>

      <div className="flex items-center justify-between px-4 sm:px-6 -mt-16 mb-7 pt-1">
  {/* Left: Sidebar Menu Icon Placeholder */}
  <div className="w-8 h-8"></div>

  {/* Center: App Name with calligraphic font */}
  <h1
    className="text-4xl font-handwritten tracking-wider text-center"
    style={{
      fontFamily: 'Pacifico, cursive',
      color: darkMode ? '#f0e6ff' : '#3b0764',
      marginTop: '6px',
    }}
  >
    KairoPlan
  </h1>

  {/* Right: Profile Picture */}
  <img
    src={profilephoto}
    alt="Profile"
    className="w-10 h-10 rounded-full shadow-lg ring-2 ring-purple-400 mt-1"
  />
</div>


      <div className="mb-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-center mb-4 gap-6">
          <button
            onClick={prevMonth}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-white hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <ChevronLeft />
          </button>

          <h2
  className={`text-3xl font-extrabold tracking-tight cursor-pointer
    transition-transform hover:scale-105 hover:underline
    bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500
    bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x
    ${darkMode ? '' : ''}
  `}
  onClick={() => setPickerOpen(true)}
>
  {currentDate.format('MMMM YYYY')}
</h2>
          <button
            onClick={nextMonth}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-white hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <ChevronRight />
          </button>
        </div>

        {/* View Modes + Search */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {['day', 'week', 'month', 'year'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold shadow transition-transform duration-200 hover:scale-105 ${
                  viewMode === mode
                    ? modeColors[mode]
                    : darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-opacity-40 backdrop-blur-md rounded-lg px-3 py-2 transition-all duration-300 shadow-inner border border-gray-300 dark:border-gray-600">
            <input
              type="text"
              placeholder="Search events..."
              className={`bg-transparent outline-none w-40 sm:w-64 text-sm placeholder-gray-400 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            />
            <svg
              className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Month-Year Picker Modal */}
      <MonthYearPicker
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        currentDate={currentDate.toDate()}
        onDateChange={handleDateChange}
      />
    </>
  );
}
