import React from 'react';
import { useTranslation } from 'react-i18next';


const History = ({ history }) => {
  const { t } = useTranslation(); // Función de traducción

  return (
    <div className="mt-4">
      <h3 className="text-gray-600">{t('calculationHistory')}</h3>
      {history && history.length > 0 ? (
        <ul className="list-disc pl-5">
          {history.map((item, index) => (
            <li key={index} className="text-gray-500">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">{t('noHistory')}</p>
      )}
    </div>
  );
};

export default History;
