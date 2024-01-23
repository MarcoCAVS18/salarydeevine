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

  const contextValue = {
    resetCounter,
    resetState,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
