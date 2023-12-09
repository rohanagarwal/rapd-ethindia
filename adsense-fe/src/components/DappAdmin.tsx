"use client";
import React, { useEffect, useState } from "react";
import { useEthers } from "../app/hook/ethersProvider";
import contractAbi from "../app/admanager/AdvertisableCoin.json";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";

export default function DappAdmin() {
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

  const [referrerReward, setReferrerReward] = useState(0);

  useEffect(() => {
    async function fetchReferrerReward() {
      let reward = await contract.getReferrerReward(referrer);
      setReferrerReward(parseInt(reward));
    }

    fetchReferrerReward();
  }, [contract, referrer]);

  async function claimReward(referrer: string) {
    try {
      let tx = {
        to: contractAddress,
        value: ethers.utils.parseEther("2"),
      };
      await signer.sendTransaction(tx);
    } catch (e) {
      console.log("e: ", e);
    }

    const reward = await contract.claim(referrer);
    setReferrerReward(parseInt(reward));
  }

  return (
    <>
      <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 mt-36 text-center mx-auto">
            <h1 className="text-xl font-bold mb-4 text-slate-700">
              Referrer rewards for referrer dapp is: {referrerReward}
            </h1>

            <p className="text-gray-600 mb-4">
              Claim reward button for dapp side
            </p>

            <div className="ml-9">
              <div className="text-center bg-white bg-opacity-30 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-lg w-[300px]">
                {/* <p className="text-gray-800 text-base font-semibold">
                Check out!
              </p> */}

                <button
                  onClick={() => claimReward(referrer)}
                  className="bg-slate-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-slate-600 focus:outline-none focus:ring focus:border-indigo-300"
                >
                  claim reward
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
