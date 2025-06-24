"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Button = ({
  children,
  onClick,
  className = '',
  variant = 'outline',
  size = 'md',
  ...props
}) => {
  const base = 'px-3 py-2 rounded-md text-sm font-medium transition';
  const variants = {
    default: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md',
    outline: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
    ghost: 'bg-transparent text-gray-500 hover:text-gray-700',
  };
  const sizes = {
    icon: 'w-9 h-9 p-0 flex items-center justify-center',
    md: '',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function MonthYearPicker({ isOpen, onClose, currentDate, onDateChange, darkMode }) {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const handleApply = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    onDateChange(newDate);
    onClose();
  };

  if (!isOpen) return null;

  const bg = darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const card = `rounded-2xl p-6 shadow-2xl border ${darkMode ? "border-gray-700" : "border-gray-200"} ${bg}`;
  const overlay = "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50";

  return (
    <div className={overlay}>
      <div className={`w-full max-w-md mx-4 animate-fade-in ${card}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Select Month & Year</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Year Selector */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedYear(selectedYear - 1)}
          >
            <ChevronLeft />
          </Button>
          <span className="text-2xl font-bold w-20 text-center">
            {selectedYear}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedYear(selectedYear + 1)}
          >
            <ChevronRight />
          </Button>
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {monthNames.map((month, index) => {
            const isSelected = selectedMonth === index;
            const base = "rounded-lg py-2 text-sm font-medium transition cursor-pointer";
            const selectedStyle = darkMode
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg";

            const unselectedStyle = darkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200";

            return (
              <div
                key={index}
                onClick={() => setSelectedMonth(index)}
                className={`${base} ${isSelected ? selectedStyle : unselectedStyle} text-center`}
              >
                {month.slice(0, 3)}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className={`flex-1 ${darkMode ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700" : ""}`}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
