import Head from "next/head";
import React from "react";
import { Send } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="h-full bg-white shadow-lg rounded-lg p-8 w-3/4 mt-36">
          <h1 className="text-3xl font-bold mb-3 text-indigo-700">
            AlphaX DAO
          </h1>
          <button className="bg-emerald-400 mb-2 p-1 rounded-lg">Joined</button>

          <p className="text-gray-600 mb-4">
            Fully community owned and operated, Yield Guild Games is a
            collective of like minded crypto gaming and NFT investors. Within
            the Yield Guild Games DAO, members can rent a wide variety of NFTs
            used in popular blockchain-based games like Axie Infinity, Sandbox
            and Splinterlands. The aim of the Yield Guild Games project is to
            give crypto gamers greater investment exposure to the industry while
            lowering the barrier to entry for enthusiasts.
          </p>

          <div className="mt-4">
            <p className="text-gray-600">ALL THE GAMES AND ALL THE PEOPLE.</p>
            <ul className="list-disc list-inside text-gray-400">
              <li>
                Explore the best web3 games, meet people who love the same games
                you do.
              </li>
              <li>
                Play for free, go on adventures, and win rewards with your crew.
              </li>
              <p className="text-lg">ONE GUILD PLAYING TOGETHER</p>
            </ul>
          </div>

          <div>
            <div className="bg-white bg-opacity-30 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-lg w-[300px]">
              <p className="text-gray-800 text-base font-semibold">
                Refer People and win NFTs!
              </p>

              <div className="bg-white text-slate-700 bg-opacity-10 backdrop-blur-xl p-4 mt-8 rounded-lg shadow-2xl ">
                <div className="flex shadow-md p-3 mb-3">
                  <Send /> <span className="ml-2">Invite your followers</span>
                </div>
                <div className="flex shadow-md p-3 mb-3">
                  <Send /> <span className="ml-2">Invite NFT mates</span>
                </div>
                <div className="flex shadow-md p-3">
                  <Send /> <span className="ml-2">Invite your friend</span>
                </div>
              </div>
              
            </div>
           
          </div>
          
        </div>

       


      </div>
    </div>
  );
};

export default page;
