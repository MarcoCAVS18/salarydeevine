// Form.js
import React, { useState, useEffect } from 'react';
import DaySelects from './DaySelects';
import ShiftSelects from './ShiftSelects';
import TotalButton from './TotalButton';
import Total from './Total';
import ActionButton from './ActionButton';
import { useAppContext } from '../AppContext';
import History from './History';
import { useTranslation } from 'react-i18next';

const Form = ({ onLogicCompleted }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedShift, setSelectedShift] = useState('');
  const [hours, setHours] = useState('');
  const [totalAmount, setTotalAmount] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [hasCalculatedTotal, setHasCalculatedTotal] = useState(false);
  const { resetState, history: contextHistory } = useAppContext();
  const [history, setHistory] = useState(contextHistory || []);
  const { t } = useTranslation(); // Función de traducción

  const tarifas = {
    'Day Shift': {
      Monday: [28.66, 34.3950, 45.86],
      Tuesday: [28.66, 34.3950, 45.86],
      Wednesday: [28.66, 34.3950, 45.86],
      Thursday: [28.66, 34.3950, 45.86],
      Friday: [28.66, 34.3950, 45.86],
      Saturday: [32.10, 45.86],
      Sunday: [51.5925],
    },
    'Afternoon Shift': {
      Monday: [32.10, 34.3950, 45.86],
      Tuesday: [32.10, 34.3950, 45.86],
      Wednesday: [32.10, 34.3950, 45.86],
      Thursday: [32.10, 34.3950, 45.86],
      Friday: [32.10, 34.3950, 45.86],
      Saturday: [32.10, 45.86],
      Sunday: [51.5925],
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

  const handleReset = () => {
    setSelectedDays([]);
    setSelectedShift('');
    setHours('');
    setTotalAmount({});
    setShowLoader(false);
    setHasCalculatedTotal(false);
    resetState();
  };

  const calculateTotal = async () => {
    const resultParagraphs = [];
  
    setShowLoader(true);
    setHasCalculatedTotal(true);
  
    setTimeout(() => {
      let totalAmountPerDay = { ...totalAmount };
      let grandTotal = 0;
  
      for (let day of selectedDays) {
        const selectedShiftTarifas = tarifas[selectedShift];
  
        if (!selectedShiftTarifas || !selectedShiftTarifas[day]) {
          console.log(`No tarifas defined for ${day} or selected shift.`);
          continue;
        }
  
        const totalHours = parseFloat(hours) || 0; // Definir 0 si hours es NaN o undefined
        let totalAmountDay = totalAmountPerDay[day] || 0;
  
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
          } else if (day === 'Sabado') {
            // Si es Sábado, las primeras dos horas tienen la primera tarifa, las demás tienen la segunda
            if (i < 2) {
              currentTarifa = selectedShiftTarifas[day][0];
            } else {
              currentTarifa = 45.86;
            }
          } else if (day === 'Sunday') {
            // Si es Domingo, todas las horas tienen la misma tarifa
            currentTarifa = selectedShiftTarifas[day][0];
          } else {
            // Para todos los demás días, usa la tarifa correspondiente a la hora
            if (i < 8) {
              currentTarifa = selectedShiftTarifas[day][0];
            } else if (i < 10) {
              currentTarifa = selectedShiftTarifas[day][1];
            } else {
              const lastTarifaIndex = selectedShiftTarifas[day].length - 1;
              currentTarifa = selectedShiftTarifas[day][lastTarifaIndex];
            }
          }
  
          totalAmountDay += currentTarifa;

        console.log(`Hour ${i + 1}: ${currentTarifa}`);
      }

      console.log(`Total for ${day}: ${totalAmountDay}`);

      totalAmountPerDay[day] = totalAmountDay;
      grandTotal += totalAmountDay;

      // Asegúrate de que totalAmountPerDay[day] esté definido antes de usarlo
      if (totalAmountPerDay[day] !== undefined) {
        const resultParagraph = (
          <p key={day} className="text-white">
            {`Bruto: $${totalAmountPerDay[day].toFixed(2)} | TAX: $${(
              totalAmountPerDay[day] * 0.15
            ).toFixed(2)} | Neto: $${(totalAmountPerDay[day] * 0.85).toFixed(2)}`}
          </p>
        );
        resultParagraphs.push(resultParagraph);
      }
    }

    // Cuando calculas el total acumulado
    if (totalAmountPerDay[selectedDays[0]] !== undefined) {
      resultParagraphs.push(
        <p key="total" className="text-white">
          {`Total acumulado: $${grandTotal.toFixed(2)} | TAX: $${(grandTotal * 0.15).toFixed(2)} | Neto: $${(
            grandTotal * 0.85
          ).toFixed(2)}`}
        </p>
      );
    }

    setTotalAmount(totalAmountPerDay);
    setShowLoader(false);
    setHistory((currentHistory) => [...currentHistory, ...resultParagraphs]);
    console.log(resultParagraphs);

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
        <label className="sr-only">{t('hoursInputLabel')}</label>
        <input
          type="number"
          value={hours}
          onChange={handleHoursChange}
          placeholder={t('hoursInputPlaceholder')}
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
  <div className="mt-4 flex flex-col items-center justify-between w-full">
    <div className="flex flex-col items-center justify-between"> {/* Envuelve Total y ActionButton en un contenedor flex */}
      <Total totalAmount={totalAmount} selectedDays={selectedDays} hasCalculatedTotal={hasCalculatedTotal} />
      <ActionButton onClick={handleReset} />
    </div>
    <div className="flex items-center justify-between w-full ml-4">
      {history.length > 0 && <History history={history} />}
    </div>
  </div>
)}

    </div>
  );
};

export default Form;