'use client'
import React, { useEffect, useState } from 'react'
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";
import { useEthers } from '../app/hook/ethersProvider';
import { Client } from "@xmtp/xmtp-js";
import { useAddress } from '@thirdweb-dev/react';
import { CHECK_ADDRESS_XMTP_ENABLED, GET_NFT_HOLDERS_XMTP_ENABLED, GET_SOCIAL_USERS_XMTP_ENABLED } from '@/sdk/airstack';
import { Send } from 'lucide-react';

init("1bbb7ff8739434ceba402c6e565fac0f4");

// XMTP2 will invite XTMP1 to join the DAO
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
      <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="h-full bg-white shadow-lg rounded-lg p-8 w-3/4 mt-36">
            <h1 className="text-3xl font-bold mb-3 text-indigo-700">
              AlphaX DAO
            </h1>
            <button className="bg-emerald-400 mb-2 p-1 rounded-lg">Joined</button>

            <p className="text-gray-600 mb-4">
              Fully community owned and operated, Yield Guild Games is a
              collective of like minded crypto gaming and NFT investors. Within
              the Yield Guild Games DAO, members can rent a wide variety of NFTs
              used in popular blockchain-based games like Axie Infinity, Sandbox
              and Splinterlands. The aim of the Yield Guild Games project is to
              give crypto gamers greater investment exposure to the industry while
              lowering the barrier to entry for enthusiasts.
            </p>

            <div className="mt-4">
              <p className="text-gray-600">ALL THE GAMES AND ALL THE PEOPLE.</p>
              <ul className="list-disc list-inside text-gray-400">
                <li>
                  Explore the best web3 games, meet people who love the same games
                  you do.
                </li>
                <li>
                  Play for free, go on adventures, and win rewards with your crew.
                </li>
                <p className="text-lg">ONE GUILD PLAYING TOGETHER</p>
              </ul>
            </div>

            <div>
              <div className="bg-white bg-opacity-30 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-lg w-[300px]">
                <p className="text-gray-800 text-base font-semibold">
                  Refer People and win NFTs!
                </p>

                <div className="bg-white text-slate-700 bg-opacity-10 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-2xl ">
                  <div className="flex shadow-md p-3 mb-3">
                    <Send /> <span className="ml-2">Invite your followers</span>
                  </div>
                  <div className="flex shadow-md p-3 mb-3">
                    <Send /> <span className="ml-2">Invite NFT mates</span>
                  </div>
                  <div className="flex shadow-md p-3">
                    <Send /> <span className="ml-2">Invite your friend</span>
                  </div>
                </div>
                
              </div>
            
            </div>
            
          </div>
        </div>
      </div>
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
