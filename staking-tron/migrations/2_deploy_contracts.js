const Staking = artifacts.require("Staking");

module.exports = function (deployer) {
  const stakingToken = "TFmQhGsQHMkj1jpakDcSUXTTuPow1LKUuU";
  const siteToken = "TFmQhGsQHMkj1jpakDcSUXTTuPow1LKUuU"; // puede ser temporal

  deployer.deploy(Staking, stakingToken, siteToken);
};
