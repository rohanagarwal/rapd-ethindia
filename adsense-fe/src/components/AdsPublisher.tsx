'use client'
import { useAddress } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import { useEthers } from '../app/hook/ethersProvider';
import contractAbi from "../app/publisher/AdvertisableCoin.json"

import { ethers } from "ethers";

type Props = {}

const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"

export default function AdsPublisher() {
  const address = useAddress();
  const provider = useEthers()
  const contract = new ethers.Contract(contractAddress, contractAbi.abi, provider)

  const [budget, setBudget] = useState(0)
  const [reward, setReward] = useState(0)
  const [campaignPeriod, setCampaignPeriod] = useState(0)
  const [startTimestamp, setStartTimestamp] = useState(0)
  const [startDate, setStartDate] = useState(new Date())


  useEffect(() => {
    async function getBudget() {
      const budget = await contract.budget()
      const reward = await contract.reward()
      const campaignPeriod = await contract.campaignPeriod() // in seconds
      const campaignPeriodInDays = campaignPeriod / 60 / 60 / 24
      const startTimestamp = (await contract.startTimestamp()).toNumber() * 1000 // in milliseconds
      console.log("startTimestamp = ", startTimestamp)
      const startDate = new Date(startTimestamp)
      console.log("startDate = ", startDate)

      setBudget(budget)
      setReward(reward)
      setCampaignPeriod(campaignPeriodInDays)
      setStartTimestamp(startTimestamp)
      setStartDate(startDate)
    }
    getBudget()
  }, [])

  function increaseBudget() {
    contract?.increaseBudget(10).then(
      (res: any) => {
        console.log("increaseBudget res = ", res);
      }
    )
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
    </div>
  )
}