import React from 'react';

const ShiftSelects = ({ selectedShift, onSelectShift }) => {
  const shifts = ['Day Shift', 'Afternoon Shift'];

  const handleShiftClick = (shift) => {
    // Asegurémonos de que selectedShift sea un string vacío en lugar de undefined
    onSelectShift(selectedShift === shift ? '' : shift);
  };

  return (
    <div className="flex items-center justify-center m-2">
      {shifts.map((shift) => (
        <div key={shift} className="mr-4 flex items-center cursor-pointer" onClick={() => handleShiftClick(shift)}>
          <div
            className={`w-4 h-4 border border-white rounded-full mr-2 ${selectedShift === shift ? 'bg-blue-500' : 'bg-transparent'}`}
          ></div>
          <label className={`text-white ${selectedShift === shift ? 'font-bold' : ''}`}>{shift}</label>
        </div>
      ))}
    </div>
  );
};

export default ShiftSelects;

