//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;
import "./Advertise.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AdvertisableDao is Advertise {
    address payable public owner;

    constructor() Advertise(5, 100, 7) payable {
      owner = payable(msg.sender);
    }

    // demo purposes only, which is why it's not implemented
    function joinDao(address referrer) advertise(referrer) public  {
    }

    fallback() external payable {}
    receive() external payable {}
}
