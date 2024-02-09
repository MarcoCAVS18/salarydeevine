// ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel, buttonYesText, buttonNoText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg text-gray-800">{message}</p>
        <div className="mt-4 flex justify-end">
          <button className="mr-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={onConfirm}>
            {buttonYesText}
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>
            {buttonNoText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
