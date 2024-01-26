import React from 'react';

const History = ({ history }) => {
  return (
    <div className="mt-4">
      <h3 className="text-gray-600">Historial de Cálculos</h3>
      {history && history.length > 0 ? (
        <ul className="list-disc pl-5">
          {history.map((item, index) => (
            <li key={index} className="text-gray-500">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay elementos en el historial.</p>
      )}
    </div>
  );
};

export default History;

