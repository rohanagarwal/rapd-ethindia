'use client'
import React, { useEffect, useState } from 'react'
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";
import { useEthers } from '../app/hook/ethersProvider';
import { Client } from "@xmtp/xmtp-js";
import contractAbi from "../app/publisher/AdvertisableCoin.json"
import {ethers} from "ethers";
import { useAddress } from '@thirdweb-dev/react';

init("1bbb7ff8739434ceba402c6e565fac0f4");

interface QueryResponse {
  data: Data | null;
  loading: boolean | null;
  error: Error | null;
}

interface Data {
  XMTPs: XMTP;
}

interface Error {
  message: string;
}

interface XMTP {
  isXmtpEnabled: boolean
}[]


const GET_VITALIK_LENS_FARCASTER_ENS = `
query MyQuery($address: Identity!) {
    XMTPs(input: { blockchain: ALL, filter: { owner: { _eq: $address } } }) {
      XMTP {
        isXMTPEnabled
      }
    }
  }
`;




export default function XmtpAirstack() {
  const { data, loading, error } = useQuery(GET_VITALIK_LENS_FARCASTER_ENS, {"address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"}, { cache: false });
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const signer = useEthers()
  const signerAddress = useAddress()
  const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
  const referrer = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  const [referrerReward, setReferrerReward] = useState(0)

  async function sendMessage(message: string) {
    const xmtp = await Client.create(signer, { env: "dev" });
    const conversation = await xmtp.conversations.newConversation(
        "0x3F11b27F323b62B159D2642964fa27C46C841897",
    )
    const messages = await conversation.messages();
    // print existing messages
    messages.forEach((message) => {
        console.log(message);
    })
    await conversation.send(message);
    const messagesNow = await conversation.messages();
    // print existing messages
    messagesNow.forEach((message) => {
        console.log(message);
    })
  }

  console.log("data", data)

  useEffect(() => {
    async function fetchReferrerReward() {
      let reward = await contract.getReferrerReward(referrer)
      setReferrerReward(parseInt(reward))
    }

    fetchReferrerReward()
  }, [contract])

  async function checkNewToken(to: string) {
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
        Showing information for vitalik.eth
       {data ? (
        <div>
            <p>
                Is XMTP Enabled: {JSON.stringify(data.XMTPs.XMTP[0].isXMTPEnabled)}
            </p>
        </div>
        ) : (
        <div>
            <p>
                {loading ? "Loading info for vitalik.eth..." : "Error"}
            </p>
            <p>
                {error ? error.message : ""}
            </p>
        </div>
        )}
        <button onClick={() => sendMessage("GM")}>Button to send GM message</button>
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
