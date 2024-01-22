// CalculationsContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

// Creamos el contexto
const CalculationsContext = createContext();

// Proveedor de contexto personalizado
export const CalculationsProvider = ({ children }) => {
  // Estado para almacenar los valores del contexto
  const [contextValues, setContextValues] = useState({
    selectedDays: [],
    selectedShift: 'day',
    hours: '',
    totalAmount: 0,
  });

  // Funciones para actualizar el contexto
  const setSelectedDays = useCallback((days) => {
    setContextValues((prevValues) => ({ ...prevValues, selectedDays: days }));
  }, []);

  const setSelectedShift = useCallback((shift) => {
    setContextValues((prevValues) => ({ ...prevValues, selectedShift: shift }));
  }, []);

  const setHours = useCallback((hours) => {
    setContextValues((prevValues) => ({ ...prevValues, hours: hours }));
  }, []);

  const setTotalAmount = useCallback((amount) => {
    setContextValues((prevValues) => ({ ...prevValues, totalAmount: amount }));
  }, []);

  // Objeto de valores y funciones que se compartirán con los componentes
  const context = {
    ...contextValues,
    setSelectedDays,
    setSelectedShift,
    setHours,
    setTotalAmount,
  };

  return <CalculationsContext.Provider value={context}>{children}</CalculationsContext.Provider>;
};

// Hook personalizado para acceder al contexto
export const useCalculations = () => {
  const context = useContext(CalculationsContext);

  if (!context) {
    throw new Error('useCalculations must be used within a CalculationsProvider');
  }

  return context;
};
