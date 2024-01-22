import React, { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Total from './components/Total';

const App = () => {
  const [isLogicCompleted, setIsLogicCompleted] = useState(false);

  const handleLogicCompleted = () => {
    setIsLogicCompleted(true);
  };

  return (
    <div>
      <Header />
      <Form onLogicCompleted={handleLogicCompleted} />
      {isLogicCompleted && <Total />}
    </div>
  );
};

export default App;


