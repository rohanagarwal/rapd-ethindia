import Head from "next/head";
import React from "react";
import { Send } from "lucide-react";
import { init } from "@airstack/airstack-react";
import { useQuery } from "@airstack/airstack-react";
import XmtpAirstack from "@/components/XmtpAirstack";


init("1bbb7ff8739434ceba402c6e565fac0f4");

const XMTP1 = "0xe825A0c62Cd0c88D43F522bD17E91f4ADD3E9ff9"
const XMTP2 = "0x203EEca028C99f48F2De4F070AbF245beB58CA4D"

type Props = {};

const page = (props: Props) => {
  return (
    <XmtpAirstack />
  )
};

export default page;
