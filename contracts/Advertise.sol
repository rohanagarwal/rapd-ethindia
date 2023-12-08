//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

contract Advertise {
    mapping(address => uint256) public referrerRewards;
    uint reward;
    uint budget;

    constructor(uint _reward, uint _budget) {
        reward = _reward;
        budget = budget;
    }

    modifier advertise(address referrer) {
        referrerRewards[referrer] += reward;
        budget -= reward;
      _;
    }

    function claim(address referrer) public {
        referrerRewards[referrer] = 0;
        uint amount = referrerRewards[referrer];
        (bool success, ) = payable(referrer).call{value: amount}("");
    }
} 