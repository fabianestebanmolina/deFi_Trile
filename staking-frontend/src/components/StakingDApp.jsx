// src/components/StakingDApp.jsx
import React, { useEffect, useState } from 'react';
import TronWeb from 'tronweb';
import stakingABI from '../contracts/Staking.json';

// Reemplaza por la dirección real de tu contrato en Shasta
const CONTRACT_ADDRESS = 'TU_DIRECCION_DE_CONTRATO';

const StakingDApp = () => {
  const [tronWeb, setTronWeb] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [stakedAmount, setStakedAmount] = useState('0');
  const [inputAmount, setInputAmount] = useState('');

  // Inicializar TronWeb y contrato
  useEffect(() => {
    const init = async () => {
      if (window.tronWeb && window.tronWeb.ready) {
        const tw = window.tronWeb;
        setTronWeb(tw);
        setAccount(tw.defaultAddress.base58);
        const c = await tw.contract(stakingABI.abi, CONTRACT_ADDRESS);
        setContract(c);
      } else {
        console.warn('Instala y desbloquea TronLink');
      }
    };
    init();
  }, []);

  // Leer stake del usuario
  useEffect(() => {
    if (contract && account) {
      (async () => {
        const [amt] = await contract.getStake(account).call();
        setStakedAmount(tronWeb.fromSun(amt)); // convierte de Sun a TRX
      })();
    }
  }, [contract, account, tronWeb]);

  const handleStake = async () => {
    if (!inputAmount || isNaN(inputAmount)) return;
    const sun = tronWeb.toSun(inputAmount);
    await contract.stake(sun).send({
      feeLimit: 1_000_000, // ajusta según tu contrato
    });
    setInputAmount('');
    // refresca
    const [amt] = await contract.getStake(account).call();
    setStakedAmount(tronWeb.fromSun(amt));
  };

  const handleUnstake = async () => {
    // el bool payWithSiteToken lo dejamos en false por defecto
    await contract.unstake(false).send({ feeLimit: 1_000_000 });
    // refresca
    const [amt] = await contract.getStake(account).call();
    setStakedAmount(tronWeb.fromSun(amt));
  };

  return (
    <div className="container mt-4">
      <h2>Staking DApp</h2>
      <p><strong>Cuenta conectada:</strong> {account}</p>
      <p><strong>Staked:</strong> {stakedAmount} tokens</p>

      <div className="mb-3">
        <label className="form-label">Cantidad a stakear:</label>
        <input
          type="number"
          className="form-control"
          value={inputAmount}
          onChange={e => setInputAmount(e.target.value)}
        />
      </div>
      <button className="btn btn-primary me-2" onClick={handleStake}>
        Stake
      </button>
      <button className="btn btn-secondary" onClick={handleUnstake}>
        Unstake
      </button>
    </div>
  );
};

export default StakingDApp;
