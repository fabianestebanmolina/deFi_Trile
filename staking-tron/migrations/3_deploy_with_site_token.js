const Staking = artifacts.require("Staking");

module.exports = function (deployer) {
  // ⚠️ Reemplaza por las direcciones reales en Shasta
  const stableToken = "TFmQhGsQHMkj1jpakDcSUXTTuPow1LKUuU";
  const siteToken = "TFmQhGsQHMkj1jpakDcSUXTTuPow1LKUuU";
  deployer.deploy(Staking, stableToken, siteToken);
};
