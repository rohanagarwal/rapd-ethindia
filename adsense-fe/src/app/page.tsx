'use client'

import { useConnect, metamaskWallet, ConnectWallet } from "@thirdweb-dev/react";

const metamask = metamaskWallet();

export default function App() {
  const connect = useConnect();

  return (
    <div className='w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600'>
    <h1>Home page</h1>
   </div>
  );
}

