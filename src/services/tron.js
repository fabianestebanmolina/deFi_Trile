// src/services/tron.js
import TronWeb from 'tronweb';

const tronWeb = window.tronWeb && window.tronWeb.ready
  ? window.tronWeb
  : null;

export default tronWeb;