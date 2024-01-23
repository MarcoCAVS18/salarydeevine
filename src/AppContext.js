// AppContext.js

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [resetCounter, setResetCounter] = useState(0);

  const resetState = () => {
    setResetCounter((prevCounter) => prevCounter + 1);
  };

  const [history, setHistory] = useState([]);

  const addToHistory = (total) => {
    setHistory([...history, total]);
  };

  const contextValue = {
    resetCounter,
    resetState,
    selectedDays: [],
    selectedShift: 'day',
    hours: '',
    totalAmount: 0,
    history,
    addToHistory,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
