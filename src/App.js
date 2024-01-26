// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Total from './components/Total';
import { AppProvider } from './AppContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

const App = () => {
  const [isLogicCompleted, setIsLogicCompleted] = useState(false);

  const handleLogicCompleted = () => {
    setIsLogicCompleted(true);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="relative">
        <AppProvider>
          <LanguageSwitcher className="top-8 right-8" /> {/* Ajusta las clases de posición según tus necesidades */}

          <Header />
          <Form onLogicCompleted={handleLogicCompleted} />
          {isLogicCompleted && <Total />}
        </AppProvider>
      </div>
    </I18nextProvider>
  );
};

export default App;
