"use client";
import React, { useEffect, useState } from "react";
import { useEthers } from "../app/hook/ethersProvider";
import contractAbi from "../app/admanager/AdvertisableCoin.json";
import daoAbi from "../app/admanager/AdvertisableDao.json";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'


export default function DaoDapp() {

  const [transactionDone, setTransactionDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()



  useEffect(() => {
    if (transactionDone) {

      setLoading(true);

      const delay = 3000;
      const timeoutId = setTimeout(() => {
        setLoading(false);
        router.push('/daopage');
      }, delay);

      // Clean up the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);

    }
  }, [router, transactionDone]);


  const contractAddress = process.env.NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS;
  const daoContractAddress = process.env.NEXT_PUBLIC_DEMO_DAO_ADDRESS;
  const referrer = process.env.NEXT_PUBLIC_DEMO_REFERRER_ADDRESS;
  if (!contractAddress) {
    throw new Error("Missing contract address");
  }
  if (!referrer) {
    throw new Error("Missing referrer address");
  }
  if(!daoContractAddress) {
    throw new Error("Missing dao address");
  }

  const signer = useEthers();
  const signerAddress = useAddress();
  const contract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  );

  const daoContract = new ethers.Contract(
    daoContractAddress,
    daoAbi.abi,
    signer,
  )

  async function checkNewToken(to?: string) {
    if (!to) {
      return;
    }
    try {
      const tx = await contract.transfer(
        to,
        1,
        referrer
      );
      setTransactionDone(true);
      console.log(`transferred new token: ${tx.hash}`);
    } catch (e) {
      console.log("e: ", e);
    }
  }

  async function checkNewDao() {
    try {
      const tx = await daoContract.joinDao(referrer)
    } catch(e) {
      console.log("e: ", e)
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
                onClick={() => checkNewDao()}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
              >
                Join AlphaX DAO
              </button>
            

              <div className="absolute top-0 right-0 p-2 text-xs bg-slate-100 text-slate-400">
                Advertised
              </div>

            </div>

            {/* Loader */}
            {loading && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 text-white">
                Loading...
              </div>
            )}

          </div>
        </div>
      </div>

      



    </>
  );
}
