// src/App.jsx
import React from 'react';
import StakingDApp from './components/StakingDApp';

function App() {
  return (
    <div className="App">
      {/* Mantén tu header/logo/lo que quieras */}
      <header>
        <h1>Plataforma de Staking Multired</h1>
        {/* …otros datos de red, wallet… */}
      </header>

      {/* Aquí insertamos tu nueva DApp */}
      <StakingDApp />
    </div>
  );
}

export default App;
