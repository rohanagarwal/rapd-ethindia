import React from 'react'
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";
import XmtpAirstack from '@/components/XmtpAirstack';

type Props = {}

init("1bbb7ff8739434ceba402c6e565fac0f4");

interface QueryResponse {
  data: Data;
  loading: boolean;
  error: Error;
}

interface Data {
  Wallet: Wallet;
}

interface Error {
  message: string;
}

interface Wallet {
  socials: Social[];
  addresses: string[];
}

interface Social {
  dappName: "lens" | "farcaster";
  profileName: string;
}

const GET_VITALIK_LENS_FARCASTER_ENS = `
query MyQuery {
  Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}
`;

export default function Dapp(props: Props) {

  return (
    <div>
      <XmtpAirstack />
    </div>
  )
}