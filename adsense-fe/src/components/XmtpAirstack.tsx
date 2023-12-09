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
    </>
  )
}
