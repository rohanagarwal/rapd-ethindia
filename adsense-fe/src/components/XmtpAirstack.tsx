'use client'
import React, { useEffect, useState } from 'react'
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";
import { useEthers } from '../app/hook/ethersProvider';
import { Client } from "@xmtp/xmtp-js";
import contractAbi from "../app/admanager/AdvertisableCoin.json"
import {ethers} from "ethers";
import { useAddress } from '@thirdweb-dev/react';
import { CHECK_ADDRESS_XMTP_ENABLED, GET_NFT_HOLDERS_XMTP_ENABLED, GET_SOCIAL_USERS_XMTP_ENABLED } from '@/sdk/airstack';

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

const builtInRecipientAddress = "0x3F11b27F323b62B159D2642964fa27C46C841897"
const XMTP1 = "0xe825A0c62Cd0c88D43F522bD17E91f4ADD3E9ff9"
const XMTP2 = "0x203EEca028C99f48F2De4F070AbF245beB58CA4D"

export default function XmtpAirstack() {
  const signer = useEthers()
  const address = useAddress()
  const [addressToInvite, setAddressToInvite] = useState(XMTP1);

  // Social followers query
  const { data: data1, loading: loading1, error: error1 } = useQuery(GET_SOCIAL_USERS_XMTP_ENABLED, {"address": address ?? XMTP2}, { cache: false });
  
  // NFT query
  const { data: data2, loading: loading2, error: error2 } = useQuery(GET_NFT_HOLDERS_XMTP_ENABLED, {"address": "0xc0f95066899efd7c0540b9474f81355a83e6f578"}, { cache: false });

  // Check specific address query
  const { data, loading, error } = useQuery(CHECK_ADDRESS_XMTP_ENABLED, {"address": addressToInvite}, { cache: false });
  console.log("data", data)


  async function sendBulkMessage(message: string, data: any) {
    const xmtp = await Client.create(signer, { env: "production" });

    for (let i = 0; i < data.TokenBalances?.TokenBalance.length; i++) {
      const holder = data.TokenBalances?.TokenBalance[i]
      const recipientAddress = holder.owner.addresses[0]
      try {
        const conversation = await xmtp.conversations.newConversation(
          recipientAddress,
        )
        await conversation.send(message);
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function sendMessage(message: string, recipientAddress: string) {
    const xmtp = await Client.create(signer, { env: "production" });
    const conversation = await xmtp.conversations.newConversation(
      recipientAddress,
    )
    await conversation.send(message);
  }


  return (
    <>
      {
        data1 ? (
          <div>
             <p>
              <br/>
              Total number of followers: {data1.SocialFollowers?.Follower.length ?? 0} 
            </p>
            <p>
              {data1.SocialFollowers?.Follower.map((follower: any, i: any) => {
                return (
                  <div key={i}>
                    <p>
                      {JSON.stringify(follower.followerAddress)}
                      Is XMTP Enabled: {follower.isXMTPEnabled}
                    </p>
                  </div>
                )
              })}
            </p>
            {data1.SocialFollowers?.Follower.length ?? 0 > 0 ? (
              <p>
                <br/>
                Invite all the followers to join the DAO!
              </p>
            ) : (
              <p>
                You have no followers to invite to the DAO.
              </p>
            )}
          </div>
        ) : (
          <div>
            <p>
              {loading1 ? `Loading social followers information for signed in user` : "Error"}
            </p>
            <p>
              {error1 ? error1.message : ""}
            </p>
          </div>
        )
      }
      {
        data2 ? (
          <div>
             <p>
              <br/>
              Total number of NFT holders for Project Venkman Celebrity NFTs: {data2.TokenBalances?.TokenBalance.length ?? 0} 
              <br/>
            </p>
              
            <p>
              {data2.TokenBalances?.TokenBalance.map((holder: any, i: any) => {
                return (
                  <div key={i}>
                    <p>
                      {"Owner address: " + holder.owner.addresses[0] + " has XMTP enabled"}
                    </p>
                  </div>
                )
              })}
            </p>
            <p>
            {data2.TokenBalances?.TokenBalance.length ?? 0 > 0 ? (
              <p>
                <br/>
                <button onClick={() => sendBulkMessage(`You should also consider joining this DAO! Click here to join: localhost:3000/dapp?referrer=${address ?? XMTP2}`, data2)}>Invite NFT holders to join the DAO!</button>
              </p>
            ) : (
              <p>
                You have no NFT holders to invite to the DAO.
              </p>
            )}
            </p>
          </div>
        ) : (
          <div>
            <p>
              {loading2 ? `Loading NFT holders information for Project Venkman` : "Error"}
            </p>
            <p>
              {error2 ? error2.message : ""}
            </p>
          </div>
        )
      }
      <br/>
      <br/>
      <input type="text" placeholder={XMTP1} color={"#000000"} onChange={e => setAddressToInvite(e.target.value)} />
      {data ? (
        <div>
            <p>
              {data.XMTPs?.XMTP[0].isXMTPEnabled ? (
                <p>
                  {addressToInvite} has XMTP enabled!
                  <br/>
                  <button onClick={() => sendMessage(`You should also consider joining this DAO! Click here to join: localhost:3000/dapp?referrer=${address ?? XMTP2}`, addressToInvite)}>Invite friend to join DAO!</button>
                </p>
              ) : (
                <p>
                  {addressToInvite ? 
                    <p>
                      <br/>
                      {addressToInvite} does not have XMTP enabled.
                    </p>
                  : "Set an address to check if they have XMTP"
                  }
                </p>
              )}
            </p>
        </div>
      ) : (
        <div>
            <p>
                {loading ? "Loading info for address to invite..." : "Error"}
            </p>
            <p>
                {error ? error.message : ""}
            </p>
        </div>
        )
      } 
    </>
  )
}
