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
  XMTPs: XMTP;
}

interface Error {
  message: string;
}

interface XMTP {
  isXmtpEnabled: boolean
}[]


const GET_VITALIK_LENS_FARCASTER_ENS = `
query MyQuery($address: Identity!) {
    XMTPs(input: { blockchain: ALL, filter: { owner: { _eq: $address } } }) {
      XMTP {
        isXMTPEnabled
      }
    }
  }
`;


export default function XmtpAirstack() {
  const { data, loading, error } = useQuery(GET_VITALIK_LENS_FARCASTER_ENS, {"address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"}, { cache: false });

  console.log("data", data)
  
  return (
    <>
        Showing information for vitalik.eth
       {data ? (
        <div>
            <p>
                Is XMTP Enabled: {JSON.stringify(data.XMTPs.XMTP[0].isXMTPEnabled)}
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
