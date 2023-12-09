"use client";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { useEthers } from "../app/hook/ethersProvider";
import contractAbi from "../app/admanager/AdvertisableCoin.json";

import { ethers } from "ethers";

type Props = {};

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function AdManager() {
  const address = useAddress();
  const signer = useEthers();
  const contract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  );

  const [budget, setBudget] = useState("");
  const [reward, setReward] = useState("");
  const [campaignPeriod, setCampaignPeriod] = useState("");
  const [startTimestamp, setStartTimestamp] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [chnageBudgetVal, setchnageBudgetVal] = useState("");
  const [changeRewardVal, setchangeRewardVal] = useState("");
  const [changeCampaignPeriodVal, setChangeCampaignPeriodVal] = useState("");
  const [isCampaignActive, setIsCampaignActive] = useState("");

  // Load initial state from contract
  useEffect(() => {
    async function getInitialState() {
      const budget = await contract.budget();
      const reward = await contract.reward();
      const campaignPeriod = await contract.campaignPeriod(); // in seconds
      const campaignPeriodInDays = campaignPeriod / 60 / 60 / 24;
      const startTimestamp =
        (await contract.startTimestamp()).toNumber() * 1000; // in milliseconds
      const startDate = new Date(startTimestamp);

      setBudget(parseInt(budget).toString());
      setReward(parseInt(reward).toString());
      setCampaignPeriod(campaignPeriodInDays.toString());
      setStartTimestamp(startTimestamp);
      setStartDate(startDate);
    }
    getInitialState();
  }, [contract]);

  const checkIsCampaignActive = async () => {
    try {
      const res = await contract.isCampaignActive();
      console.log("iscampaign = ", res);
      if (res) setIsCampaignActive("Yes");
      else setIsCampaignActive("No");
    } catch (error) {
      console.error("Error checking status of campaign");
    }
  };

  const toggleCampaignActive = async () => {
    try {
      await contract.toggleCampaign();
      // console.log('iscampaign = ', res);
      if (await contract.status()) setIsCampaignActive("Yes");
      else setIsCampaignActive("No");
    } catch (error) {
      console.error("Error toggling campaign");
    }
  };

  useEffect(() => {
    async function checkCampaign() {
      checkIsCampaignActive();
    }
    checkCampaign();
  }, []);

  const handleBudgetChange = (e: any) => {
    setchnageBudgetVal(e.target.value);
  };

  const handleRewardChange = (e: any) => {
    setchangeRewardVal(e.target.value);
  };

  const handleCampaignPeriodChange = (e: any) => {
    setChangeCampaignPeriodVal(e.target.value);
  };

  const handleChangeBudget = async () => {
    try {
      const amount = parseInt(chnageBudgetVal);
      if (isNaN(amount)) {
        throw new Error("Please enter a valid number for the budget.");
      }
      if (amount > 0) {
        await increaseBudget(amount);
      }
      if (amount < 0) {
        console.log("amount here = ", amount);
        await decreaseBudget(-1 * amount);
      }
    } catch (error) {}
  };

  const handleChangeReward = async () => {
    try {
      const amount = parseInt(changeRewardVal);
      if (isNaN(amount)) {
        throw new Error("Please enter a valid number for the Reward.");
      }
      if (amount > 0) {
        await changeReward(amount);
      }
    } catch (error) {}
  };

  const handleChangeCampaignPeriod = async () => {
    try {
      const amount = parseInt(changeCampaignPeriodVal);
      if (isNaN(amount)) {
        throw new Error("Please enter a valid number for the budget.");
      }
      if (amount > 0) {
        await increaseCampaignPeriod(amount);
      }
      if (amount < 0) {
        console.log("amount here = ", amount);
        await decreaseCampaignPeriod(-1 * amount);
      }
    } catch (error) {}
  };

  const changeReward = async (amount: any) => {
    try {
      await contract.changeDefaultFee(amount);
      const newReward = await contract.reward();

      setReward(parseInt(newReward).toString());
    } catch (error) {
      console.error("Error increasing Reward");
    }
  };

  const increaseBudget = async (amount: any) => {
    try {
      await contract.increaseBudget(amount);
      const newBudget = await contract.budget();

      setBudget(parseInt(newBudget).toString());
    } catch (error) {
      console.error("Error increasing budget");
    }
  };

  const decreaseBudget = async (amount: any) => {
    try {
      await contract.decreaseBudget(amount);
      const newBudget = await contract.budget();

      setBudget(parseInt(newBudget).toString());
    } catch (error) {
      console.error("Error decreasing budget");
    }
  };

  const increaseCampaignPeriod = async (amount: any) => {
    try {
      await contract.increaseCampaignPeriod(amount);
      const newCampaignPeriod = await contract.campaignPeriod();

      setCampaignPeriod(parseInt(newCampaignPeriod).toString());
    } catch (error) {
      console.error("Error increasing budget");
    }
  };

  const decreaseCampaignPeriod = async (amount: any) => {
    try {
      await contract.decreaseCampaignPeriod(amount);
      const newCampaignPeriod = await contract.campaignPeriod();

      setCampaignPeriod(parseInt(newCampaignPeriod).toString());
    } catch (error) {
      console.error("Error decreasing budget");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-3/6 mt-36">
        <div className="flex">
          <h1 className="flex-1 text-2xl font-bold mb-4 text-slate-500">
            Ad Manager
          </h1>
          <button
            onClick={toggleCampaignActive}
            className="bg-slate-500 text-white p-2 rounded hover:bg-slate-600 flex-1 ml-96"
          >
            Toggle Campaign
          </button>
        </div>

        {/* First Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Budget
            </h2>
            <p className="text-gray-500">{budget.toString()} wei</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Users Aquired
            </h2>
            <p className="text-gray-500">7</p>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Campaign Period
            </h2>
            <p className="text-gray-600">{campaignPeriod.toString()} days</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Ad Impressions
            </h2>
            <p className="text-gray-600">2433</p>
          </div>
        </div>

        {/* third Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Reward
            </h2>
            <p className="text-gray-600">{reward.toString()} wei</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Top Reffer
            </h2>
            <p className="text-gray-600">Binance</p>
          </div>
        </div>

        {/* forth Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              start Day
            </h2>
            <p className="text-gray-600">{startDate.toLocaleString()}</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Cost to Aquire User
            </h2>
            <p className="text-gray-600">4 wei</p>
          </div>
        </div>

        {/* forth Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">
              Is campaign Active?
            </h2>
            <p className="text-gray-600">{isCampaignActive.toString()}</p>
          </div>
        </div>

        <div className="border-t my-5"></div>

        {/* Fifth Row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <input
              className="border rounded p-2 w-full mb-2 text-black"
              type="text"
              value={chnageBudgetVal}
              placeholder="eg: 80, -50"
              onChange={handleBudgetChange}
            />
            <button
              onClick={handleChangeBudget}
              className="bg-slate-500 text-white p-2 rounded hover:bg-slate-600 h-16"
            >
              Change Budget By
            </button>
            <p>change budget value = {budget}</p>
          </div>

          <div className="col-span-1">
            <input
              className="border rounded p-2 w-full mb-2 text-black"
              type="text"
              value={changeRewardVal}
              placeholder="eg: 20"
              onChange={handleRewardChange}
            />
            <button
              onClick={handleChangeReward}
              className="bg-slate-500 text-white p-2 rounded hover:bg-slate-600 h-16"
            >
              Change Reward To
            </button>
          </div>
          <div className="col-span-1">
            <input
              className="border rounded p-2 w-full mb-2 text-black"
              type="text"
              value={changeCampaignPeriodVal}
              placeholder="eg: 10, -4"
              onChange={handleCampaignPeriodChange}
            />
            <button
              onClick={handleChangeCampaignPeriod}
              className="bg-slate-500 text-white p-2 rounded hover:bg-slate-600"
            >
              Change Campaign Period By
            </button>
          </div>
          {/* <div className="col-span-1">
            <button  
              onClick={toggleCampaignActive} 
              className="bg-slate-500 text-white p-2 rounded hover:bg-slate-600 h-16 mt-12">
              Toggle Campaign
            </button>  */}
          {/* {isCampaignActive ? <p className='text-black'>Active currently</p> : <p>Inactive currently</p>} */}
          {/* <p className='text-black'>{isCampaignActive.toString()} currently</p> */}

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
