"use client";
import React, { useEffect, useState } from "react";
import { useEthers } from "../app/hook/ethersProvider";
import contractAbi from "../app/admanager/AdvertisableCoin.json";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";

export default function DaoDapp() {
  const contractAddress = process.env.NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS;
  const referrer = process.env.NEXT_PUBLIC_DEMO_REFERRER_ADDRESS;
  if (!contractAddress) {
    throw new Error("Missing contract address");
  }
  if (!referrer) {
    throw new Error("Missing referrer address");
  }

  const signer = useEthers();
  const signerAddress = useAddress();
  const contract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  );

  async function checkNewToken(to?: string) {
    if (!to) {
      return;
    }
    try {
      const tx = await contract["transfer(address,uint256,address)"](
        to,
        1,
        referrer
      );
      console.log(`transferred new token: ${tx.hash}`);
    } catch (e) {
      console.log("e: ", e);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96 mt-36">
          <h1 className="text-3xl font-bold mb-4 text-indigo-700">
            DeFi Lending Platform
          </h1>

          <p className="text-gray-600 mb-4">
            Explore and participate in decentralized finance with our DeFi
            lending platform.
          </p>

          <div className="mt-4">
            <p className="text-gray-600">Key Features:</p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Seamless lending and borrowing of digital assets.</li>
              <li>Earn interest on deposited assets.</li>
              <li>
                Decentralized governance for proposing and voting on protocol
                changes.
              </li>
            </ul>
          </div>

          <div>
            <div className="bg-white bg-opacity-30 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-lg w-[300px]">
              <p className="text-gray-800 text-base font-semibold">
                Check out!
              </p>

              <button
                onClick={() => checkNewToken(signerAddress)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
              >
                Check Zk Token
              </button>

              <button
                onClick={() => checkNewToken(signerAddress)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
              >
                Join AlphaX DAO
              </button>
            

              <div className="absolute top-0 right-0 p-2 text-xs bg-slate-100 text-slate-400">
                Advertised
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 w-3/6 mt-36">
          <h1 className="text-2xl font-bold mb-4 text-slate-500">Dapp</h1>
        </div>
      </div> */}

      {/* <div>
          Heyy checkout the new token launched:
        </div>
        <button onClick={() => checkNewToken(signerAddress)}>
          Check token
        </button> */}
    </>
  );
}
