import React from 'react';

const Total = ({ totalAmount, selectedDays, hasCalculatedTotal }) => {
  const daysCount = Array.isArray(selectedDays) ? selectedDays.length : 0;

  if (daysCount > 0 && hasCalculatedTotal) {
    if (daysCount === 1) {
      const day = selectedDays[0];
      const dayTotal = totalAmount && totalAmount[day] !== undefined ? totalAmount[day].toFixed(2) : 0;
      const tax = (dayTotal * 0.15).toFixed(2);
      const netTotal = (dayTotal - tax).toFixed(2);
      return (
        <div className="mt-4">
          <p className="text-white" dangerouslySetInnerHTML={{ __html: `Bruto: $${dayTotal} | TAX: $${tax} | <strong>Neto: $${netTotal}</strong>` }} />
        </div>


      );
    } else {
      const totalForSelectedDays = selectedDays.reduce((acc, day) => acc + (totalAmount[day] || 0), 0).toFixed(2);
      const tax = (totalForSelectedDays * 0.15).toFixed(2);
      const netTotal = (totalForSelectedDays - tax).toFixed(2);
      return (
        <div className="mt-4">
          <p className="text-white">{`Bruto: $${totalForSelectedDays} | TAX: $${tax} | Neto: $${netTotal}`}</p>
        </div>
      );
    }
  } else if (hasCalculatedTotal) {
    return <div className="mt-4"><p className="text-white">No se han seleccionado días</p></div>;
  } else {
    return null;
  }
};

export default Total;
