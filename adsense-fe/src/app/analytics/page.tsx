'use client'
import { useEffect, useState } from 'react'
import { CampaignQueryDocument, CampaignQueryQuery, ReferralEvent, ReferralQueryDocument, ReferralQueryQuery, execute } from '../.graphclient'

export default function Analytics() {
  const [campaign, setCampaign] = useState<CampaignQueryQuery>()
  const [referral, setReferral] = useState<ReferralQueryQuery>()

  useEffect(() => {
    execute(CampaignQueryDocument, {}).then((result: any) => {
      setCampaign(result?.data)
    })
    execute(ReferralQueryDocument, {}).then((result: any) => {
      setReferral(result?.data)
    })
  }, [setCampaign])

  let referrerReferralMap: { [x: string]: any } = {}
  const totalReferrals = referral?.referralEvents.length
  
  if(referral && referral.referralEvents.length > 0) {
    for(let i=0; i< referral.referralEvents.length; i++) {
      referrerReferralMap[referral.referralEvents[i].referrer].push(referral.referralEvents[i])
    }
  }
  
  referral?.referralEvents.map((i) => {
    referrerReferralMap[i.referrer].push(i)
  })

  if (referral?.referralEvents.length) {
    const referralItems = referrerReferralMap.forEach((element: any) => <li>
      <div>
        {element.referrer}
      </div>
      <div>
        {element.reward}
      </div>
      <div>
        {element.contractAddress}
      </div>
    </li>); 
    return (<>
      <div>
        Total Referrals is: {totalReferrals}
      </div>
      <div>
        <ul>Referrers</ul>
        {referralItems}
      </div>
      </>)
  }

  return (<>
    <div>
      Total Referrals is: {totalReferrals}
    </div>
    </>)
}