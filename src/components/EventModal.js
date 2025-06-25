"use client";

import { useState, useEffect } from "react";
import { X, CalendarPlus } from "lucide-react";

const eventTypes = [
  { id: "meeting", label: "Meeting", color: "bg-blue-500" },
  { id: "birthday", label: "Birthday", color: "bg-pink-500" },
  { id: "deadline", label: "Deadline", color: "bg-red-500" },
  { id: "work", label: "Work", color: "bg-green-500" },
  { id: "holiday", label: "Holiday", color: "bg-purple-500" },
  { id: "family", label: "Family", color: "bg-orange-500" },
];

export function EventModal({ isOpen, onClose, onAddEvent, selectedDate, darkMode }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("meeting");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  useEffect(() => {
    if (selectedDate) {
      const jsDate = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
      if (!isNaN(jsDate)) {
        const dateStr = `${jsDate.getFullYear()}-${String(jsDate.getMonth() + 1).padStart(2, "0")}-${String(jsDate.getDate()).padStart(2, "0")}`;
        setDate(dateStr);
      }
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && type && date && startTime && endTime) {
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);

      onAddEvent({ title, type, start, end });
      setTitle("");
      setType("meeting");
      setStartTime("09:00");
      setEndTime("10:00");
      onClose();
    }
  };

  if (!isOpen) return null;

  const bgColor = darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const borderColor = darkMode ? "border-gray-600" : "border-gray-300";
  const inputBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";
  const ringColor = darkMode ? "focus:ring-blue-400" : "focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className={`w-full max-w-lg mx-4 p-6 rounded-2xl shadow-2xl border ${bgColor} ${borderColor}`}>
    
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <CalendarPlus className="text-blue-500" />
            <h2 className="text-xl font-bold">Add New Event</h2>
          </div>
          <button onClick={onClose} className="hover:text-red-500 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

   
        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div>
            <label className="block mb-1 text-sm font-medium">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Team Standup"
              className={`w-full px-3 py-2 rounded-md border ${borderColor} ${inputBg} ${ringColor} focus:outline-none focus:ring-2`}
              required
            />
          </div>

        
          <div>
            <label className="block mb-1 text-sm font-medium">Event Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`w-full px-3 py-2 rounded-md border ${borderColor} ${inputBg} ${ringColor} focus:outline-none focus:ring-2`}
              required
            >
              {eventTypes.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
            <div className="flex mt-2 gap-2">
              {eventTypes.map(({ id, color }) => (
                <div
                  key={id}
                  className={`w-6 h-6 rounded-full ${color} border-2 ${type === id ? 'ring-2 ring-offset-2 ring-white' : ''}`}
                  title={id}
                />
              ))}
            </div>
          </div>

         
          <div>
            <label className="block mb-1 text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3 py-2 rounded-md border ${borderColor} ${inputBg} ${ringColor} focus:outline-none focus:ring-2`}
              required
            />
          </div>

         
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border ${borderColor} ${inputBg} ${ringColor} focus:outline-none focus:ring-2`}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border ${borderColor} ${inputBg} ${ringColor} focus:outline-none focus:ring-2`}
                required
              />
            </div>
          </div>

         
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2 rounded-md border ${borderColor} ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
