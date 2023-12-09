'use client'
import { useAddress } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import { useEthers } from '../hook/ethersProvider';
import contractAbi from "./AdvertisableCoin.json"
import { ethers } from "ethers";

type Props = {}

const page = (props: Props) => {

  const address = useAddress();
  const provider = useEthers()
  const [budget, setBudget] = useState(0)
  console.log("address = ", address);
  const [contract, setContract] = useState<ethers.Contract>()

  useEffect(() => {
    async function fetchData() {
      let AdvertisableContract = new ethers.Contract("0x5fbdb2315678afecb367f032d93f642f64180aa3", contractAbi.abi, provider)
      setContract(AdvertisableContract)
    }

    fetchData()
  })

  function increaseBudget() {
    contract?.increaseBudget(10).then(
      (res: any) => {
        console.log("increaseBudget res = ", res);
      }
    )
  }


  return (
    <div>
    
    budget is {budget}

    </div>
  )
}

export default page