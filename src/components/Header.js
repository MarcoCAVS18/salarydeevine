// Header.js

import React from 'react';
import logo from '../Mesa de trabajo 1.png';

const Header = () => {
  return (
    <header className="text-white text-center py-4">
      <div className="container mx-auto flex items-center justify-center">
        <img src={logo} alt="Logo de la aplicación" className="h-32" />
      </div>

      <h1 className="text-2xl font-bold">Calcula tu Salario!</h1>
    </header>
  );
};

export default Header;
