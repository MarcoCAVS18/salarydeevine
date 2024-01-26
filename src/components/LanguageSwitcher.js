// LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={`absolute top-4 left-4 ${className}`}>
      <select
        id="language"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-transparent text-white border-white outline-none cursor-pointer"
      >
        <option value="es">SPN</option>
        <option value="en">EN</option>
        <option value="it">ITA</option>
        <option value="fr">FRN</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;


