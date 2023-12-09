"use client";
import React, { useEffect, useState } from "react";
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";
import { useEthers } from "../app/hook/ethersProvider";
import { Client } from "@xmtp/xmtp-js";
import { useAddress } from "@thirdweb-dev/react";
import {
  CHECK_ADDRESS_XMTP_ENABLED,
  GET_NFT_HOLDERS_XMTP_ENABLED,
  GET_SOCIAL_USERS_XMTP_ENABLED,
} from "@/sdk/airstack";
import { Send } from "lucide-react";
import { Copy } from "lucide-react";
init("1bbb7ff8739434ceba402c6e565fac0f4");

// XMTP2 will invite XTMP1 to join the DAO
const XMTP1 = "0xe825A0c62Cd0c88D43F522bD17E91f4ADD3E9ff9";
const XMTP2 = "0x203EEca028C99f48F2De4F070AbF245beB58CA4D";

export default function XmtpAirstack() {
  const signer = useEthers();
  const address = useAddress();
  const [addressToInvite, setAddressToInvite] = useState(XMTP1);

  // Social followers query
  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useQuery(
    GET_SOCIAL_USERS_XMTP_ENABLED,
    { address: address ?? XMTP2 },
    { cache: false }
  );

  // NFT query
  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useQuery(
    GET_NFT_HOLDERS_XMTP_ENABLED,
    { address: "0xc0f95066899efd7c0540b9474f81355a83e6f578" },
    { cache: false }
  );

  // Check specific address query
  const { data, loading, error } = useQuery(
    CHECK_ADDRESS_XMTP_ENABLED,
    { address: addressToInvite },
    { cache: false }
  );
  console.log("data", data);

  async function sendBulkMessage(message: string, data: any) {
    const xmtp = await Client.create(signer, { env: "production" });

    for (let i = 0; i < data.TokenBalances?.TokenBalance.length; i++) {
      const holder = data.TokenBalances?.TokenBalance[i];
      const recipientAddress = holder.owner.addresses[0];
      try {
        const conversation = await xmtp.conversations.newConversation(
          recipientAddress
        );
        await conversation.send(message);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function sendMessage(message: string, recipientAddress: string) {
    const xmtp = await Client.create(signer, { env: "production" });
    const conversation = await xmtp.conversations.newConversation(
      recipientAddress
    );
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
            <button className="bg-emerald-400 mb-2 p-1 rounded-lg">
              Joined
            </button>

            <p className="text-gray-600 mb-4">
              Fully community owned and operated, Yield Guild Games is a
              collective of like minded crypto gaming and NFT investors. Within
              the Yield Guild Games DAO, members can rent a wide variety of NFTs
              used in popular blockchain-based games like Axie Infinity, Sandbox
              and Splinterlands. The aim of the Yield Guild Games project is to
              give crypto gamers greater investment exposure to the industry
              while lowering the barrier to entry for enthusiasts.
            </p>

            <div className="mt-4">
              <p className="text-gray-600">ALL THE GAMES AND ALL THE PEOPLE.</p>
              <ul className="list-disc list-inside text-gray-400">
                <li>
                  Explore the best web3 games, meet people who love the same
                  games you do.
                </li>
                <li>
                  Play for free, go on adventures, and win rewards with your
                  crew.
                </li>
                <p className="text-lg">ONE GUILD PLAYING TOGETHER</p>
              </ul>
            </div>

            <div className="flex mb-3">
              <div className="w-1/2 pr-2">
                <div className="bg-white bg-opacity-30 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-lg w-[300px]">
                  <p className="text-gray-800 text-base font-semibold">
                    Refer People and win NFTs!
                  </p>

                  <div className="bg-white text-slate-700 bg-opacity-10 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-2xl ">
                    <div className="flex shadow-md p-3 mb-3">
                      <Send />{" "}
                      <span className="ml-2">Invite your followers</span>
                    </div>
                    <div className="flex shadow-md p-3 mb-3">
                      <Send /> <span className="ml-2">Invite NFT mates</span>
                    </div>
                    <div className="shadow-md p-3">

                      <input
                        type="text"
                        placeholder={XMTP1}
                        color={"#000000"}
                        onChange={(e) => setAddressToInvite(e.target.value)}
                      />

                      {data ? (
                        <div>
                          <p>
                            {data.XMTPs?.XMTP[0].isXMTPEnabled ? (
                              <p>
                                {/* {addressToInvite} has XMTP enabled! */}
                                {/* <br /> */}
                                <button
                                  className="bg-white text-slate-700 bg-opacity-10 backdrop-blur-xl p-4 rounded-lg shadow-2xl"
                                  onClick={() =>
                                    sendMessage(
                                      `You should also consider joining this DAO! Click here to join: localhost:3000/dapp?referrer=${
                                        address ?? XMTP2
                                      }`,
                                      addressToInvite
                                    )
                                  }
                                >
                                <div className="flex">
                                  <Send />  Invite friend to join DAO!
                                </div>
                                </button>
                              </p>
                            ) : (
                              <p>
                                {addressToInvite ? (
                                  <p>
                                    <br />
                                    {addressToInvite} does not have XMTP
                                    enabled.
                                  </p>
                                ) : (
                                  "Set an address to check if they have XMTP"
                                )}
                              </p>
                            )}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p>
                            {loading
                              ? "Loading info for address to invite..."
                              : "Error"}
                          </p>
                          <p>{error ? error.message : ""}</p>
                        </div>
                      )}



                     
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-2">
                <h1 className="-mb-2 text-slate-700 bg-slate-100 p-1 rounded-lg w-auto text-center">
                  You Referred:
                </h1>
                <div className="text-black h-72 overflow-y-auto border p-4 mt-4 rounded-lg shadow-lg bg-white bg-opacity-30 backdrop-blur-xl">
                  

                  {data2 &&
                    data2.TokenBalances?.TokenBalance.map(
                      (holder: any, i: any) => {
                        const address = holder.owner.addresses[0];
                        const truncatedAddress = address.substring(0, 30);

                        return (
                          <div
                            key={i}
                            className="flex p-2 bg-slate-100 m-0.5 rounded-lg"
                          >
                            <Copy className="mr-2 ml-2" />
                            <span>{truncatedAddress}..</span>
                            <span className="ml-auto">NFT mates</span>
                          </div>
                        );
                      }
                    )}

                    {data &&
                    data.TokenBalances?.TokenBalance.map(
                      (holder: any, i: any) => {
                        const address = holder.owner.addresses[0];
                        const truncatedAddress = address.substring(0, 30);

                        return (
                          <div
                            key={i}
                            className="flex p-2 bg-slate-100 m-0.5 rounded-lg"
                          >
                            <Copy className="mr-2 ml-2" />
                            <span>{truncatedAddress}..</span>
                            <span className="ml-auto">Friend</span>
                          </div>
                        );
                      }
                    )}

                  <div className="border-t my-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </>
  );
}
