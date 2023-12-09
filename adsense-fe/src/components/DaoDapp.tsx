'use client'
import React, { useEffect, useState } from 'react'
import { useEthers } from '../app/hook/ethersProvider';
import contractAbi from "../app/publisher/AdvertisableCoin.json"
import {ethers} from "ethers";
import { useAddress } from '@thirdweb-dev/react';





export default function DaoDapp() {
  const contractAddress = process.env.NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS
  const referrer = process.env.NEXT_PUBLIC_DEMO_REFERRER_ADDRESS
  if (!contractAddress) {
    throw new Error('Missing contract address')
  }
  if (!referrer) {
    throw new Error('Missing referrer address')
  }

  const signer = useEthers()
  const signerAddress = useAddress()
  const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
  const [referrerReward, setReferrerReward] = useState(0)

  useEffect(() => {
    async function fetchReferrerReward() {
      let reward = await contract.getReferrerReward(referrer)
      setReferrerReward(parseInt(reward))
    }

    fetchReferrerReward()
  }, [contract])

  async function checkNewToken(to?: string) {
    if (!to) {
      return
    }
    let referral = referrerReward
    try {
      const tx = await contract["transfer(address,uint256,address)"](to, 1, referrer)
      console.log(`transferred new token: ${tx.hash}`)
      
    } catch(e) {
      console.log("e: ", e)
    }
    let ref = await contract.getReferrerReward(referrer)
    referral = parseInt(ref)
    setReferrerReward(referral)
  }

  async function claimReward(referrer: string) {
    try {
      let tx = {
        to: contractAddress,
        value: ethers.utils.parseEther('2')
      };
      await signer.sendTransaction(tx)
    } catch(e) {
      console.log("e: ", e)
    }

    const reward = await contract.claim(referrer)
    setReferrerReward(parseInt(reward))
  }
  
  return (
    <>
        <div>
          Referrer rewards for referrer dapp is: {referrerReward}
        </div>
        <div>
          Heyy checkout the new token launched:
        </div>
        <button onClick={() => checkNewToken(signerAddress)}>
          Check token
        </button>
        <div>
          Claim reward button for dapp side
        </div>
        <button onClick={() => claimReward(referrer)}>
          claim reward
        </button>
    </>
  )
}
