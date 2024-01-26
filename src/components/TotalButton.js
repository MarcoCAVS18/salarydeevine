// TotalButton.js

import React from 'react';
import { useTranslation } from 'react-i18next';

const TotalButton = ({ onClick, isDisabled }) => {
  const { t } = useTranslation(); // Función de traducción

  return (
    <button
      type="button"
      className={`mx-auto my-auto p-2 ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {t('calculateTotal')}
    </button>
  );
};

export default TotalButton;
