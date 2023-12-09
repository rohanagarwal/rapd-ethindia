'use client'
import React, { useEffect, useState } from 'react'
import { useEthers } from '../app/hook/ethersProvider';
import contractAbi from "../app/admanager/AdvertisableCoin.json"
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

  async function checkNewToken(to?: string) {
    if (!to) {
      return
    }
    try {
      const tx = await contract["transfer(address,uint256,address)"](to, 1, referrer)
      console.log(`transferred new token: ${tx.hash}`)
      
    } catch(e) {
      console.log("e: ", e)
    }
  }

  
  
  return (
    <>
        <div>
          Heyy checkout the new token launched:
        </div>
        <button onClick={() => checkNewToken(signerAddress)}>
          Check token
        </button>
    </>
  )
}
