'use client'
import React from 'react'
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";

init("1bbb7ff8739434ceba402c6e565fac0f4");

interface QueryResponse {
  data: Data | null;
  loading: boolean | null;
  error: Error | null;
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


export default function XmtpAirstack() {
  const { data, loading, error }: QueryResponse = useQuery(GET_VITALIK_LENS_FARCASTER_ENS, {}, { cache: false });

  return (
    <>
        Showing information for vitalik.eth
       {data ? (
        <div>
            <p>
                {data.Wallet.socials.map((social, i) => (
                    <div key={i}>
                        <p>
                            Dapp name: {social.dappName}
                        </p>
                        <p>
                            Profile name: {social.profileName}
                        </p>
                    </div>
                ))}
            </p>
        </div>
        ) : (
        <div>
            <p>
                {loading ? "Loading info for vitalik.eth..." : "Error"}
            </p>
            <p>
                {error ? error.message : ""}
            </p>
        </div>
        )}
    </>
  )
}
