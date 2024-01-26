// App.js

import React, { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Total from './components/Total';
import { AppProvider } from './AppContext';

const App = () => {
  const [isLogicCompleted, setIsLogicCompleted] = useState(false);

  const handleLogicCompleted = () => {
    setIsLogicCompleted(true);
  };

  return (
    <div>
      <AppProvider>
        <Header />
        <Form onLogicCompleted={handleLogicCompleted} />
        {isLogicCompleted && <Total />}
      </AppProvider>
    </div>
  );
};

export default App;
