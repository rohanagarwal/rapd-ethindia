"use client";

import { useConnect, metamaskWallet, ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

const metamask = metamaskWallet();

export default function App() {
  const connect = useConnect();

  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-500">
      <div className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Adquire</h1>
          </div>

          <p className="max-w-xl mt-1 font-medium text-xl text-slate-900">
            On-chain <u>advertising</u> standard for protocols
          </p>
          {/* <p>Add text here...</p> */}

          <div className="flex mb-3 mt-4 w-[100%]">
            <div className="w-1/3 pr-2">
              <Link href={"/admanager"}>
                <button className="p-2 rounded-md shadow-lg bg-slate-100 w-36">
                  Ads Manager
                </button>
              </Link>
            </div>
            <div className="w-1/3 pl-2">
              <Link href={"/dapp"}>
                <button className="p-2 rounded-md shadow-lg bg-slate-100 w-36">
                  Dapp
                </button>
              </Link>
            </div>
            <div className="w-1/3 pl-2">
              <Link href={"/dappadmin"}>
                <button className="p-2 rounded-md shadow-lg bg-slate-100 w-36">
                  Dapp Admin
                </button>
              </Link>
            </div>
          </div>

          <div className="flex bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-500 via-gray-200 to-gray-100 translate-y-14 rounded-lg shadow-lg">
            <div className="text-center justify-center shadow-lg rounded-lg p-8 w-[40vw]">
              <div className="bg-white bg-opacity-30 backdrop-blur-xl rounded-lg shadow-lg p-3 font-medium">
                web3 open standard for every protocol to <b>advertise</b> itself
                to every other protocol, dapp, and user in crypto
                </div>
                <div className="bg-white bg-opacity-30 backdrop-blur-xl rounded-lg shadow-lg mt-6 p-3 font-medium">
                  A highly composable EVM library that any smart contract can
                  use to advertise itself, with developer integration under{" "}
                  <u>3 minutes</u>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
