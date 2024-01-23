// Dayselects.js

import React, { useState } from 'react';

const DaySelects = ({ selectedDays, onSelectDay }) => {
  const [showDays, setShowDays] = useState(false);

  const toggleShowDays = () => {
    setShowDays(!showDays);
  };

  const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  const handleDayClick = (day) => {
    if (selectedDays.length < 6 || selectedDays.includes(day)) {
      onSelectDay(day);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center flex-col">
      <div className="cursor-pointer flex items-center" onClick={toggleShowDays}>
        <p className="font-bold text-white">Seleccionar días</p>
        <span className="ml-1">{showDays ? '▼' : '►'}</span>
      </div>
      {showDays && (
        <form className="flex items-center justify-center flex-wrap mt-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="mx-2 my-1" onClick={() => handleDayClick(day)}>
              <input
                type="checkbox"
                value={day}
                checked={selectedDays.includes(day)}
                onChange={() => {}}
                className={`mr-1 ${selectedDays.length === 6 && !selectedDays.includes(day) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={selectedDays.length === 6 && !selectedDays.includes(day)}
              />
              <span className="text-white">{day}</span>
            </div>
          ))}
        </form>
      )}
    </div>
  );
};

export default DaySelects;
