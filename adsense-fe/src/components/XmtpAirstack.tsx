'use client'
import React, { useEffect, useState } from 'react'
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";
import { useEthers } from '../app/hook/ethersProvider';
import { Client } from "@xmtp/xmtp-js";
import contractAbi from "../app/admanager/AdvertisableCoin.json"
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

const builtInRecipientAddress = "0x3F11b27F323b62B159D2642964fa27C46C841897"
const XMTP1 = "0xe825A0c62Cd0c88D43F522bD17E91f4ADD3E9ff9"
const XMTP2 = "0x203EEca028C99f48F2De4F070AbF245beB58CA4D"

export default function XmtpAirstack() {
  const { data, loading, error } = useQuery(GET_VITALIK_LENS_FARCASTER_ENS, {"address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"}, { cache: false });
  const contractAddress = process.env.NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS
  const referrer = process.env.NEXT_PUBLIC_DEMO_REFERRER_ADDRESS
  if (!contractAddress) {
    throw new Error('Missing contract address')
  }
  if (!referrer) {
    throw new Error('Missing referrer address')
  }

  const signer = useEthers()

  async function sendMessage(message: string, recipientAddress: string) {
    const xmtp = await Client.create(signer, { env: "production" });
    const conversation = await xmtp.conversations.newConversation(
      recipientAddress,
    )
    await conversation.send(message);
  }

  // console.log("data", data)
  
  return (
    <>
        {/* Showing information for vitalik.eth
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
        )} */}
        <button onClick={() => sendMessage("You should also consider joining this DAO! Click here to join: localhost:3000/dapp?referrer=0x203EEca028C99f48F2De4F070AbF245beB58CA4D", XMTP1)}>Invite friend to join DAO!</button>
    </>
  )
}
