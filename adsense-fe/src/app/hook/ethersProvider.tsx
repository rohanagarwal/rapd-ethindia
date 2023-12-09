'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers";

type EthersInstance = any;

const EthersInstance = createContext<EthersInstance | null>(null)

export const useEthers = (): EthersInstance | null => useContext(EthersInstance);

interface Props {
    children: React.ReactNode;
}

export const EthersProvider: React.FC<Props> = ({ children }) => {
    const [ethersInstance, setEthersInstance] = useState<EthersInstance | null>();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function initializeEthers() {
            try {
                const ethersInstance =new ethers.providers.Web3Provider(window.ethereum);
                setEthersInstance(ethersInstance.getSigner())
                setIsLoading(false)
            } catch(error) {
                console.log(error)
                setIsLoading(false)
            }
        }

        initializeEthers()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <EthersInstance.Provider value={ethersInstance}>
            {children}
        </EthersInstance.Provider>
    )
}