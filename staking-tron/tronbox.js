const port = process.env.HOST_PORT || 9090

module.exports = {
  networks: {
    shasta: {
      privateKey: "dfef07fb161227960b358cf9ce3228236b766b7676cdd8edc517900ff364f181dda7561cb9ac",
      consume_user_resource_percent: 30,
      fee_limit: 1_000_000_000,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '*',
      headers: { "TRON-PRO-API-KEY": "5d0b1d3a-15f0-49b0-b134-970b24b41d06" }
    }
  }
};
