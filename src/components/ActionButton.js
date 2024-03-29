// ActionButton.js

import React from 'react';

const ActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-green-500 text-white p-2 text-sm ml-1 h-auto flex-shrink-0 border-none focus:outline-none flex items-center justify-center"
      style={{ width: '2em', height: '2em' }} // Aumenté el tamaño del botón
    >
      +
    </button>
  );
};

export default ActionButton;