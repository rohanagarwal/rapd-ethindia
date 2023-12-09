// 'use client'
import React, { useEffect, useState } from 'react';
import { CampaignQueryDocument, CampaignQueryQuery, ReferralEvent, ReferralQueryDocument, ReferralQueryQuery, execute } from '../.graphclient';
import Table from '@/components/Table';

// Define the Analytics component
export default function Analytics() {
  const [campaign, setCampaign] = useState<CampaignQueryQuery>();
  const [referral, setReferral] = useState<ReferralQueryQuery>();

  useEffect(() => {
    execute(CampaignQueryDocument, {}).then((result: any) => {
      setCampaign(result?.data);
    });

    execute(ReferralQueryDocument, {}).then((result: any) => {
      setReferral(result?.data);
    });
  }, [setCampaign]);


  // Function to truncate string and add "..."
  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    }
    return str;
  };

  // Prepare refined data
  let referrerReferralMap: { [x: string]: ReferralEvent[] } = {};

  if (referral && referral.referralEvents.length > 0) {
    referral.referralEvents.forEach((event) => {
      if (!referrerReferralMap[event.referrer]) {
        referrerReferralMap[event.referrer] = [];
      }
      referrerReferralMap[event.referrer].push(event);
    });
  }

  const data = Object.keys(referrerReferralMap).map((referrer) => {
    const events = referrerReferralMap[referrer];
    const totalRewards = events.reduce((sum, event) => sum + event.reward, 0);
    const totalReferrals = events.length;

    return {
      referrer: truncateString(referrer, 20),
      rewards: totalRewards + "eth",
      totalReferrals,
      campaignAddress: truncateString(events.length > 0 ? events[0].contractAddress : "", 20),
    };
  });

  // Hardcore dummy data for the first 5 rows
  const hardcoreDummyData = [
    { referrer: truncateString("0xffwekr45n75wjfbew4ce6ab8827279cffr423266", 25), rewards: "2.3eth", totalReferrals: 5, campaignAddress: truncateString("0x5fbdb2315678afecb367f032d93f642f64180aa3", 25) },
    { referrer: truncateString("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", 25), rewards: "1.8eth", totalReferrals: 3, campaignAddress: truncateString("0x726as3e6qs237tq7238h6ab8827279cfffb92266", 25) },
    { referrer: truncateString("0xf76g45rg4go43gb77878hffyb827279cffa92266", 25), rewards: "3.2eth", totalReferrals: 7, campaignAddress: truncateString("0x7623nqdo7hq47q3qndq78ab8827279cfffb92266", 25) },
    { referrer: truncateString("0xf67o32yufhrfbqfgyf7486ab882727cfffb92266", 25), rewards: "0.5eth", totalReferrals: 2, campaignAddress: truncateString("0x89apae98jdq89qnq9qaddda8827279cfffb92266", 25) },
    { referrer: truncateString("0xf76t34qgrad33du9sd0djnf88ljknqcfffb92266", 25), rewards: "2.1eth", totalReferrals: 4, campaignAddress: truncateString("0x9kdsa8f849q3junndn8q6ab8827279cfffb92266", 25) },
  ];
  

  // Render the component
  return (
    <div className="flex items-center justify-center h-hit mb-52">
      <div className="text-center">
        <div className="flex justify-center">
          <Table data={[...hardcoreDummyData, ...data]} />
        </div>
        <div className='mt-8'>
          <div className='m-2'><span className='text-slate-800'>Total reward distributed:</span> <span className='text-green-800'>11.927 eth</span></div>
          <div className='m-2'><span className='text-slate-800'>Total referrals given:</span> <span className='text-green-800'>48</span></div>
          <div className='m-2'><span className='text-slate-800'>Highest referral:</span> <span className='text-green-800'>7 referrals</span></div>
        </div>

      </div>
    </div>
  );
}
