'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { EthersProvider } from './hook/ethersProvider'
import { ethers } from "ethers";
import Navbar from '@/components/Navbar'


const inter = Inter({ subsets: ['latin'] })


const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       

          <ThirdwebProvider
            supportedWallets={[
              metamaskWallet(),
             
              
            ]}
            clientId="3bd53239bbc3fd8a5c8e32b574fd6b93"
          >
            <EthersProvider>
            <Navbar/>
            {children}

            </EthersProvider>
          </ThirdwebProvider>




      
        </body>
    </html>
  )
}
