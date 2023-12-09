'use client'
import { useAddress } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import { useEthers } from '../app/hook/ethersProvider';
import contractAbi from "../app/admanager/AdvertisableCoin.json"

import { ethers } from "ethers";

type Props = {}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export default function AdManager() {
  const address = useAddress();
  const signer = useEthers()
  const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)

  const [budget, setBudget] = useState('')
  const [reward, setReward] = useState(0)
  const [campaignPeriod, setCampaignPeriod] = useState(0)
  const [startTimestamp, setStartTimestamp] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [increaseBudgetVal, setIncreaseBudgetVal] = useState('');

  // Load initial state from contract
  useEffect(() => {
    async function getInitialState() {
      const budget = await contract.budget()
      const reward = await contract.reward()
      const campaignPeriod = await contract.campaignPeriod() // in seconds
      const campaignPeriodInDays = campaignPeriod / 60 / 60 / 24
      const startTimestamp = (await contract.startTimestamp()).toNumber() * 1000 // in milliseconds
      const startDate = new Date(startTimestamp)

      setBudget(parseInt(budget).toString())
      setReward(parseInt(reward))
      setCampaignPeriod(campaignPeriodInDays)
      setStartTimestamp(startTimestamp)
      setStartDate(startDate)
    }
    getInitialState()
  }, [contract])


  const handleBudgetChange = (e: any) => {
    setIncreaseBudgetVal(e.target.value);
    // setBudget(e.target.value);
  };

  // async function increaseBudget(amount: number) {
  //   try {
  //   await contract.increaseBudget(amount)
  //   } catch (e) {
  //     console.log("e", e)
  //   }
  //   const newBudget = await contract.budget()
  //   console.log("newBudget", newBudget.toString())
  //   setBudget(newBudget)
  // }


  // Event handler for button click
  const handleIncreaseBudget = async () => {
    try {
      // Convert budget to a number before passing it to increaseBudget function
      // const amount = parseInt(budget);
      const amount = parseInt(increaseBudgetVal);
      console.log("increased budget amount = ", amount)
      if (isNaN(amount)) {
        throw new Error('Please enter a valid number for the budget.');
      }

      await increaseBudget(amount);
    } catch (error) {
    }
  };

  const increaseBudget = async (amount: any) => {
    try {
      await contract.increaseBudget(amount);
      const newBudget = await contract.budget();
      // console.log('New Budget:', newBudget.toString());
      setBudget(parseInt(newBudget).toString());
    } catch (error) {
      console.error('Error increasing budget');
    }
  };

  return (
  
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-3/6">
        <h1 className="text-2xl font-bold mb-4 text-slate-500">Ad Manager</h1>


        {/* First Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">Budget</h2>
            <p className="text-gray-500">{budget.toString()} wei</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">Users Aquired</h2>
            <p className="text-gray-500">7</p>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">Campaign Period</h2>
            <p className="text-gray-600">{campaignPeriod.toString()} days</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">Ad Impressions</h2>
            <p className="text-gray-600">2433</p>
          </div>
        </div>

        {/* third Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">Reward</h2>
            <p className="text-gray-600">{reward.toString()} wei</p>
          </div>
          {/* <div className="w-1/2 pl-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">Column 2</h2>
            <p className="text-gray-600">Details for Column 2</p>
          </div> */}
        </div>

        {/* forth Row */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-2">
            <h2 className="text-lg font-semibold mb-1 text-slate-600">startingTimestamp</h2>
            <p className="text-gray-600">{startTimestamp.toString()}</p>
          </div>
          
        </div>

        <div className="border-t my-5"></div>


         {/* Fifth Row */}
         <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-2">Column 1</h2>
            <input
              className="border rounded p-2 w-full mb-2 text-black"
              type="text"
              value={increaseBudgetVal}
              placeholder="Enter budget"
              onChange={handleBudgetChange}
              
            />
            <button  
              onClick={handleIncreaseBudget} 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Increase Budget By
            </button>
            <p>increased budget value = {budget}</p>
          </div>

          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-2">Column 2</h2>
            <p className="text-gray-600">Details for Column 2</p>
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-2">Column 3</h2>
            <p className="text-gray-600">Details for Column 3</p>
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-2">Column 4</h2>
            <p className="text-gray-600">Details for Column 4</p>
          </div>
        </div>

      </div>
    </div>
  )
}