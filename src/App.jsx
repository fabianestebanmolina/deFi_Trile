import { useTronWallet } from './hooks/useWallet';

function App() {
  const { address, tronWebReady } = useTronWallet();

  const handleReconnect = () => {
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🪙 Plataforma de Staking Multired</h1>
      <p>Red actual: Tron</p>
      {tronWebReady ? (
        <p>Wallet conectada: {address}</p>
      ) : (
        <>
          <p>Conecta tu wallet TRON Link para comenzar</p>
          <button onClick={handleReconnect}>🔁 Reintentar conexión</button>
        </>
      )}
    </div>
  );
}

export default App;
