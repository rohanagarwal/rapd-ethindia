//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

/* 
TODO
- Add ownable 
- Add upgradeable proxy

*/

contract Advertise {
    mapping(address => uint256) public referrerRewards;
    uint public reward;
    uint public budget;
    uint public startTimestamp;
    uint public campaignPeriod;
    bool public status = true;

    event CampaignEvent (
        uint256 reward,
        uint256 budget,
        uint256 startTimestamp,
        uint256 campaignPeriod
    );
    
    event ReferralEvent (
        address indexed referrer,
        uint256 reward
    );

    constructor(uint _reward, uint _budget, uint _campaignPeriod) {
        reward = _reward;
        budget = _budget;
        startTimestamp = block.timestamp;
        campaignPeriod =  _campaignPeriod * 1 days;
        emit CampaignEvent(reward, budget, startTimestamp, campaignPeriod);
    }

    function isCampaignActive() public view returns (bool) {
        return (block.timestamp < startTimestamp + campaignPeriod && budget >= reward && status);
    }

    function increaseBudget(uint amount) public {
        budget += amount;
    }

    function decreaseBudget(uint amount) public {
        budget -= amount;
    }

    function increaseCampaignPeriod(uint numDays) public {
        campaignPeriod += (numDays * 1 days) ;
    }

    function decreaseCampaignPeriod(uint numDays) public {
        campaignPeriod -= (numDays * 1 days) ;
    }

    function toggleCampaign() public {
        status = !status;
    }

    function changeDefaultFee(uint newFee) public {
        reward = newFee;
    }

    modifier advertise(address referrer) {
        if (isCampaignActive()) {
            referrerRewards[referrer] += reward;
            budget -= reward;
            emit ReferralEvent(referrer, reward);
        } 
        _;
    }

    function claim(address referrer) public {
        uint amount = referrerRewards[referrer];
        referrerRewards[referrer] = 0;
        (bool success, ) = payable(referrer).call{value: amount}("");
        require(success, "Failed to send Ether");
    }
} 