import React, { useState, useEffect } from 'react';
import DaySelects from './DaySelects';
import ShiftSelects from './ShiftSelects';
import TotalButton from './TotalButton';
import Total from './Total';

const Form = ({ onLogicCompleted }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedShift, setSelectedShift] = useState('');
  const [hours, setHours] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [hasCalculatedTotal, setHasCalculatedTotal] = useState(false);

  const tarifas = {
    'Day Shift': {
      Lunes: [28.66, 34.40, 45.86],
      Martes: [28.66, 34.40, 45.86],
      Miercoles: [28.66, 34.40, 45.86],
      Jueves: [28.66, 34.40, 45.86],
      Viernes: [28.66, 34.40, 45.86],
      Sabado: [32.10, 45.86],
      Domingo: [51.89],
    },
    'Afternoon Shift': {
      Lunes: [32.10, 34.40, 45.86],
      Martes: [32.10, 34.40, 45.86],
      Miercoles: [32.10, 34.40, 45.86],
      Jueves: [32.10, 34.40, 45.86],
      Viernes: [32.10, 34.40, 45.86],
      Sabado: [32.10, 45.86],
      Domingo: [51.89],
    },
  };

  const handleSelectDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSelectShift = (shift) => {
    setSelectedShift(selectedShift === shift ? '' : shift);
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const calculateTotal = () => {
    setShowLoader(true);
    setHasCalculatedTotal(true);
    
    setTimeout(() => {
      let totalAmountPerDay = {};
  
      for (let day of selectedDays) {
        const selectedShiftTarifas = tarifas[selectedShift];
  
        if (!selectedShiftTarifas || !selectedShiftTarifas[day]) {
          console.log(`No tarifas defined for ${day} or selected shift.`);
          continue;
        }
  
        const totalHours = parseFloat(hours) || 0;
        let totalAmountDay = 0;
  
        console.log(`Calculating total for ${day}...`);
  
        for (let i = 0; i < totalHours; i++) {
          let currentTarifa;
  
          // Si es Viernes, ajusta la tarifa dependiendo de la hora
          if (day === 'Viernes') {
            if (i < 6) {
              currentTarifa = selectedShiftTarifas[day][0];
            } else if (i < 10) {
              currentTarifa = selectedShiftTarifas[day][1];
            } else {
              currentTarifa = selectedShiftTarifas[day][2];
            }
          } else {
            // Si es Sábado, las primeras dos horas tienen la primera tarifa, las demás tienen la segunda
            if (day === 'Sabado' && i < 2) {
              currentTarifa = selectedShiftTarifas[day][0];
            } else {
              // Si hay menos de 8 horas, usa la primera tarifa
              // Si hay menos de 10 horas, usa la segunda tarifa
              // De lo contrario, usa la última tarifa disponible
              if (i + 1 <= 8) {
                currentTarifa = selectedShiftTarifas[day][0];
              } else if (i + 1 <= 10) {
                currentTarifa = selectedShiftTarifas[day][1];
              } else {
                const lastTarifaIndex = selectedShiftTarifas[day].length - 1;
                currentTarifa = selectedShiftTarifas[day][lastTarifaIndex];
              }
            }
          }
  
          totalAmountDay += currentTarifa;
  
          console.log(`Hour ${i + 1}: ${currentTarifa}`);
        }
  
        totalAmountPerDay[day] = totalAmountDay;
        console.log(`Total for ${day}: ${totalAmountDay}`);
      }
  
      setTotalAmount(totalAmountPerDay);
      setShowLoader(false);
  
      // Llamamos a la función para indicar que la lógica ha sido completada
      onLogicCompleted();
    }, 4000);
  };
  
  
  
  

  useEffect(() => {
    setTotalAmount(0);
    setHasCalculatedTotal(false);
  }, [selectedDays, hours]);

  const isButtonDisabled = !hours || selectedDays.length === 0;

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <DaySelects selectedDays={selectedDays} onSelectDay={handleSelectDay} />

      <form className="flex flex-col items-center mt-4">
        <label className="sr-only">Horas a trabajar:</label>
        <input
          type="number"
          value={hours}
          onChange={handleHoursChange}
          placeholder="Ingrese la cantidad de horas"
          className="p-2 border border-white rounded text-white bg-transparent text-center"
        />

        <ShiftSelects selectedShift={selectedShift} onSelectShift={handleSelectShift} />

        <TotalButton onClick={calculateTotal} isDisabled={isButtonDisabled} />
      </form>

      {showLoader && (
        <div className="flex items-center justify-center mt-4">
          <div className="custom-loader"></div>
        </div>
      )}

      {Object.keys(totalAmount).length > 0 && (
        <Total totalAmount={totalAmount} selectedDays={selectedDays} hasCalculatedTotal={hasCalculatedTotal} />
      )}
    </div>
  );
};

export default Form;
