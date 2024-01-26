import React from 'react';
import History from './History';
import { useTranslation } from 'react-i18next';

const Total = ({ totalAmount, selectedDays, hasCalculatedTotal, history }) => {
  const daysCount = Array.isArray(selectedDays) ? selectedDays.length : 0;
  const { t } = useTranslation(); // Función de traducción

  if (daysCount > 0 && hasCalculatedTotal) {
    if (daysCount === 1) {
      const day = selectedDays[0];
      const dayTotal = totalAmount && totalAmount[day] !== undefined ? totalAmount[day].toFixed(2) : 0;
      const tax = (dayTotal * 0.15).toFixed(2);
      const netTotal = (dayTotal - tax).toFixed(2);
      return (
        <div className="mt-4">
          <p className="text-white" dangerouslySetInnerHTML={{ __html: t('totalForOneDay', { dayTotal, tax, netTotal }) }} />
        </div>
      );
    } else {
      const totalForSelectedDays = selectedDays.reduce((acc, day) => acc + (totalAmount[day] || 0), 0).toFixed(2);
      const tax = (totalForSelectedDays * 0.15).toFixed(2);
      const netTotal = (totalForSelectedDays - tax).toFixed(2);
      return (
        <div className="mt-4">
          <p className="text-white">{t('totalForMultipleDays', { totalForSelectedDays, tax, netTotal })}</p>
          <hr className="my-2 border-gray-400" />
          {history && history.length > 0 && <History history={history} />}
        </div>
      );
    }
  } else if (hasCalculatedTotal) {
    return <div className="mt-4"><p className="text-white">{t('noDaysSelected')}</p></div>;
  } else {
    return null;
  }
};

export default Total;
