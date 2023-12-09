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

  const [budget, setBudget] = useState(0)
  const [reward, setReward] = useState(0)
  const [campaignPeriod, setCampaignPeriod] = useState(0)
  const [startTimestamp, setStartTimestamp] = useState(0)
  const [startDate, setStartDate] = useState(new Date())

  // Load initial state from contract
  useEffect(() => {
    async function getInitialState() {
      const budget = await contract.budget()
      const reward = await contract.reward()
      const campaignPeriod = await contract.campaignPeriod() // in seconds
      const campaignPeriodInDays = campaignPeriod / 60 / 60 / 24
      const startTimestamp = (await contract.startTimestamp()).toNumber() * 1000 // in milliseconds
      const startDate = new Date(startTimestamp)

      setBudget(budget)
      setReward(reward)
      setCampaignPeriod(campaignPeriodInDays)
      setStartTimestamp(startTimestamp)
      setStartDate(startDate)
    }
    getInitialState()
  }, [contract])

  async function increaseBudget(amount: number) {
    try {
    await contract.increaseBudget(amount)
    } catch (e) {
      console.log("e", e)
    }
    const newBudget = await contract.budget()
    console.log("newBudget", newBudget.toString())
    setBudget(newBudget)
  }

  return (
    <div>
      budget is {budget.toString()}
      <br />
      reward is {reward.toString()}
      <br />
      campaignPeriod in days is {campaignPeriod.toString()}
      <br />
      startingTimestamp is {startTimestamp.toString()}
      <br />
      startDate is {startDate.toString()}
      <br />
      <br />
      <button onClick={() => increaseBudget(100)}>Increase Budget</button>
    </div>
  )
}