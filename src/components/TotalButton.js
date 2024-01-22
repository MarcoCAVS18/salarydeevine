import React from 'react';

const TotalButton = ({ onClick, isDisabled }) => {
  return (
    <button
      type="button"
      className={`mx-auto my-auto p-2 ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
      onClick={onClick}
      disabled={isDisabled}
    >
      Calcular Total
    </button>
  );
};

export default TotalButton;
