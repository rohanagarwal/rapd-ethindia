

export const CHECK_ADDRESS_XMTP_ENABLED = `
query MyQuery($address: Identity!) {
    XMTPs(input: { blockchain: ALL, filter: { owner: { _eq: $address } } }) {
      XMTP {
        isXMTPEnabled
      }
    }
  }
`;

// TODO - move limit into parameter
export const GET_NFT_HOLDERS_XMTP_ENABLED = `
query MyQuery($address: Address!) {
    TokenBalances(
      input: {
        filter: {
          tokenAddress: { _eq: $address }
        }
        blockchain: ethereum
        limit: 10
      }
    ) {
      TokenBalance {
        owner {
          xmtp {
            isXMTPEnabled
          }
          addresses
        }
      }
    }
  }
`

// TODO - move limit into parameter
export const GET_SOCIAL_USERS_XMTP_ENABLED = `
query MyQuery($address: Identity!) {
    SocialFollowers(
      input: {
        filter: {
          identity: {
            _eq: $address
          }
        }
        blockchain: ALL
        limit: 200
      }
    ) {
      Follower {
        followerAddress {
          addresses
          domains {
            name
            resolvedAddress
          }
          socials {
            profileName
            profileTokenId
            profileTokenIdHex
            userId
            userAssociatedAddresses
          }
          xmtp {
            isXMTPEnabled
          }
        }
        followerProfileId
        followerTokenId
        followingAddress {
          addresses
          domains {
            name
            resolvedAddress
          }
          socials {
            profileName
            profileTokenId
            profileTokenIdHex
            userId
            userAssociatedAddresses
          }
        }
        followingProfileId
      }
    }
  }
  `;


