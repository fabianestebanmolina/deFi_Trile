
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Staking {
    address public owner;
    IERC20 public stableToken; // USDT o USDD
    IERC20 public siteToken;   // Token del sitio (para pagar comisiones con descuento)
    uint256 public rewardRate = 10; // 10% de recompensa
    uint256 public feeRate = 100;   // 1% de comisión (100 = 1%, 50 = 0.5%)
    uint256 public discountRate = 50; // 50% de descuento si se paga con token del sitio
    uint256 public tokenPrice = 1e5; // Placeholder: precio ficticio del token en 6 decimales (ej: 0.10 USDT = 100000)

    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => StakeInfo) public stakes;

    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }

    constructor(address _stableToken, address _siteToken) {
        owner = msg.sender;
        stableToken = IERC20(_stableToken);
        siteToken = IERC20(_siteToken);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Nada para stakear");
        stableToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] = StakeInfo(amount, block.timestamp);
    }

    function unstake(bool payWithSiteToken) external {
        StakeInfo storage user = stakes[msg.sender];
        require(user.amount > 0, "Nada para retirar");

        uint256 reward = (user.amount * rewardRate) / 100;
        uint256 grossAmount = user.amount + reward;

        // Comisión
        uint256 fee = (grossAmount * feeRate) / 10000; // feeRate de 100 = 1%
        uint256 netAmount = grossAmount - fee;

        // Aplicar descuento si paga con token del sitio
        if (payWithSiteToken) {
            uint256 discountedFee = (fee * discountRate) / 100; // Aplica descuento
            uint256 siteTokenAmount = (discountedFee * 1e6) / tokenPrice; // Suponiendo 6 decimales en tokenPrice
            require(siteToken.balanceOf(msg.sender) >= siteTokenAmount, "Saldo insuficiente en token del sitio");
            siteToken.transferFrom(msg.sender, owner, siteTokenAmount);
        } else {
            stableToken.transfer(owner, fee); // El fee va al owner
        }

        // Reset y envío
        stakes[msg.sender] = StakeInfo(0, 0);
        stableToken.transfer(msg.sender, netAmount);
    }

    function updateFeeRate(uint256 _feeRate) external onlyOwner {
        feeRate = _feeRate;
    }

    function updateDiscountRate(uint256 _discountRate) external onlyOwner {
        discountRate = _discountRate;
    }

    function updateTokenPrice(uint256 _tokenPrice) external onlyOwner {
        tokenPrice = _tokenPrice;
    }

    function getStake(address user) external view returns (uint256, uint256) {
        StakeInfo memory s = stakes[user];
        return (s.amount, s.timestamp);
    }
}
