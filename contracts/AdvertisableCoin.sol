//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;
import "./Advertise.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AdvertisableCoin is ERC20, Advertise {
    Advertise ad;

    constructor() ERC20("AdvertisableCoin", "AC") {
        ad = new Advertise(5, 100);
    }

    function transfer(address to, uint256 amount, address referrer) advertise(referrer)  public virtual returns (bool) {
        return super.transfer(to, amount);
    }
} 
