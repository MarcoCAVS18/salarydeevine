// Header.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../Mesa de trabajo 1.png';

const Header = () => {
  const { t } = useTranslation(); // Función de traducción

  return (
    <header className="text-white text-center py-4">
      <div className="container mx-auto flex items-center justify-center">
        <img src={logo} alt={t('logoAltText')} className="h-32" />
      </div>

      <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
    </header>
  );
};

export default Header;
