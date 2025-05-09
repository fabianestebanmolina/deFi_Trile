// src/hooks/useWallet.js
import { isEmail, isURL, isFloat /*etc*/ } from 'validator'
import { useEffect, useState } from 'react';

export function useTronWallet() {
  const [address, setAddress] = useState(null);
  const [tronWebReady, setTronWebReady] = useState(false);

  const checkConnection = async () => {
    if (window.tronWeb && window.tronWeb.ready) {
      setTronWebReady(true);
      setAddress(window.tronWeb.defaultAddress.base58);
    } else {
      setTronWebReady(false);
      setAddress(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { address, tronWebReady };
}
