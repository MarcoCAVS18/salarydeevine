// DaySelects.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from './ConfirmationModal';

const DaySelects = ({ selectedDays, onSelectDay }) => {
  const [showDays, setShowDays] = useState(false);
  const [pendingDay, setPendingDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const toggleShowDays = () => {
    setShowDays(!showDays);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayClick = (day) => {
    if (selectedDays.length < 7) {
      if (selectedDays.length === 6) {
        setPendingDay(day);
        setShowModal(true); // Mostrar el modal cuando se alcance el límite de días seleccionados
      } else {
        onSelectDay(day);
      }
    }
  };

  const handleConfirmation = (confirm) => {
    setShowModal(false); // Ocultar el modal
    if (confirm) {
      onSelectDay(pendingDay);
    }
    setPendingDay(null);
  };

  return (
    <div className="mt-4 flex items-center justify-center flex-col">
      <div className="cursor-pointer flex items-center" onClick={toggleShowDays}>
        <p className="font-bold text-white">{t('selectDays')}</p>
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
                className={`mr-1 ${selectedDays.length === 7 && !selectedDays.includes(day) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={selectedDays.length === 7 && !selectedDays.includes(day)}
              />
              <span className="text-white">{t(day)}</span>
            </div>
          ))}
        </form>
      )}
      {showModal && (
        <ConfirmationModal
          message={t('modalText')}
          onConfirm={() => handleConfirmation(true)}
          onCancel={() => handleConfirmation(false)}
          buttonYesText={t('modalButtonYes')} // Traducción del botón Yes
          buttonNoText={t('modalButtonNo')} // Traducción del botón No
        />
      )}
    </div>
  );
};

export default DaySelects;
