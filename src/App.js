import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import { EventModal } from './components/EventModal';
import Sidebar from './components/Sidebar';
import DayView from './components/DayView';
import WeekView from './components/WeekView';
import YearView from './components/YearView';
import DetailedView from './components/DetailedEventModal';
import { nanoid } from 'nanoid';
import staticEvents from './data/events.json';
import { FaPlus } from 'react-icons/fa';


export default function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTypes, setFilterTypes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('month');
  const [showDetailedView, setShowDetailedView] = useState(false);

  const [selectedEventTypes, setSelectedEventTypes] = useState({
    meeting: true,
    birthday: true,
    deadline: true,
    work: true,
    holiday: true,
    family: true,
    personal: true,
  });


useEffect(() => {
  const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

  const parsedStoredEvents = storedEvents.map(e => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end),
  }));

  const parsedStaticEvents = staticEvents.map(e => {
    const startDateTime = dayjs(`${e.date} ${e.time}`);
    const durationValue = parseInt(e.duration);
    const durationType = e.duration.includes('h') ? 'hour' : 'minute';
    const endDateTime = startDateTime.add(durationValue, durationType);

    return {
      id: e.id || nanoid(),
      title: e.title,
      type: e.type || 'personal',
      date: e.date,
      time: e.time,
      duration: e.duration,
      startTime: startDateTime.format('HH:mm'),
      endTime: endDateTime.format('HH:mm'),
      start: startDateTime.toDate(),
      end: endDateTime.toDate(),
      static: true
    };
  });

  const merged = [...parsedStaticEvents, ...parsedStoredEvents];
  setEvents(merged);

  // ✅ Move console.log here
  console.log("All Events:", merged);
}, []);



  useEffect(() => {
    const staticEventIds = new Set(staticEvents.map(e => e.id));
    const dynamicEvents = events.filter(e => !staticEventIds.has(e.id));
    const serializable = dynamicEvents.map(e => ({
      ...e,
      start: e.start.toISOString(),
      end: e.end.toISOString(),
    }));
    localStorage.setItem('calendarEvents', JSON.stringify(serializable));
  }, [events]);

  const addEvent = (event) => {
    const startDate = dayjs(event.start);
    const endDate = dayjs(event.end);
    const newEvent = {
      id: nanoid(),
      ...event,
      date: startDate.format('YYYY-MM-DD'),
      startTime: startDate.format('HH:mm'),
      endTime: endDate.format('HH:mm'),
      time: startDate.format('HH:mm'),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const toggleFilterType = (type) => {
    setFilterTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredEvents = events.filter(
    (e) =>
      (filterTypes.length === 0 || filterTypes.includes(e.type)) &&
      selectedEventTypes[e.type]
  );

  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode
      ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white'
      : 'bg-gradient-to-tr from-blue-50 via-white to-blue-100 text-black'}`}>

      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          filterTypes={filterTypes}
          toggleFilterType={toggleFilterType}
          selectedEventTypes={selectedEventTypes}
          setSelectedEventTypes={setSelectedEventTypes}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {/* Page Padding */}
      <div className="p-4">
        {/* Sidebar Toggle */}
        <button
          className={`text-2xl mb-4 transition-transform hover:scale-110 ${darkMode ? 'text-yellow-300' : 'text-blue-600'}`}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        {/* Main Section */}
        <div className="max-w-[95vw] sm:max-w-6xl mx-auto">
          <div className="relative">
  {/* Calendar Header (centered title + profile) */}
  <CalendarHeader
    currentDate={currentDate}
    nextMonth={nextMonth}
    prevMonth={prevMonth}
    darkMode={darkMode}
    viewMode={viewMode}
    setViewMode={setViewMode}
    setCurrentDate={setCurrentDate}
     events={filteredEvents}
  />

  {/* Detailed View Button - positioned separately */}
  <div className="absolute right-0 top-[100px] z-20">
    <button
      className={`rounded-md px-4 py-2 transition-all font-medium text-sm ${
        darkMode
          ? 'bg-gray-700 text-white hover:bg-blue-600'
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      }`}
      onClick={() => setShowDetailedView(prev => !prev)}
    >
      {showDetailedView ? 'Calendar View' : 'Detailed View'}
    </button>
  </div>
</div>


          {!showDetailedView ? (
            <div className={`border-2 rounded-xl shadow-2xl p-6 transition-all duration-300 backdrop-blur-xl ${darkMode 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 text-white' 
              : 'bg-gradient-to-br from-white via-gray-100 to-white border-gray-200 text-black'
            }`}>
              {viewMode === 'month' && (
                <CalendarGrid
                  currentDate={currentDate}
                  events={filteredEvents}
                  onDateClick={(date) => { setSelectedDate(date); setIsModalOpen(true); }}
                  onDeleteEvent={deleteEvent}
                  viewMode={viewMode}
                  darkMode={darkMode}
                />
              )}

              {viewMode === 'day' && (
                <DayView
                  currentDate={currentDate}
                  events={filteredEvents}
                  onAddEvent={(date) => { setSelectedDate(date); setIsModalOpen(true); }}
                  darkMode={darkMode}
                />
              )}

              {viewMode === 'week' && (
                <WeekView
                  currentDate={currentDate}
                  events={filteredEvents}
                  onAddEvent={(date) => { setSelectedDate(date); setIsModalOpen(true); }}
                  onDateClick={(date) => { setSelectedDate(date); setIsModalOpen(true); }}
                  darkMode={darkMode}
                />
              )}

              {viewMode === 'year' && (
                <YearView
                  currentDate={currentDate}
                  events={filteredEvents}
                  onMonthClick={(month) => setCurrentDate(currentDate.month(month))}
                  onDateClick={(date) => { setSelectedDate(date); setIsModalOpen(true); }}
                  darkMode={darkMode}
                />
              )}
            </div>
          ) : (
            <DetailedView
              hours={[...Array(24)].map((_, i) => i)}
              events={filteredEvents}
              eventColors={{
                meeting: 'bg-blue-500',
                birthday: 'bg-pink-500',
                deadline: 'bg-red-500',
                work: 'bg-green-500',
                holiday: 'bg-yellow-500',
                family: 'bg-purple-500',
              }}
              darkMode={darkMode}
              toggleSidebar={() => setSidebarOpen(prev => !prev)}
              sidebarOpen={sidebarOpen}
              setDarkMode={setDarkMode}
              selectedEventTypes={selectedEventTypes}
              toggleEventType={(type) =>
                setSelectedEventTypes(prev => ({
                  ...prev,
                  [type]: !prev[type],
                }))
              }
              getEventsForHour={(date, hour) =>
                filteredEvents.filter((event) => {
                  if (!event.start || !event.end) return false;
                  const eventStart = new Date(event.start);
                  const eventEnd = new Date(event.end);
                  const sameDay = eventStart.toDateString() === new Date(date).toDateString();
                  const inHourRange = eventStart.getHours() <= hour && eventEnd.getHours() > hour;
                  return sameDay && inHourRange;
                })
              }
            />
          )}
        </div>

        {/* Add Event FAB */}
        <button
          onClick={() => {
            setSelectedDate(dayjs().toDate());
            setIsModalOpen(true);
          }}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-glow"
        >
          <FaPlus /> Add Event
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddEvent={addEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
