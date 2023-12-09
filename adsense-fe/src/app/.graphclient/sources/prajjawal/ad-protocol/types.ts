// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace PrajjawalAdProtocolTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CampaignEvent = {
  id: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  contractAddress: Scalars['Bytes'];
  reward: Scalars['BigInt'];
  budget: Scalars['BigInt'];
  startTimestamp: Scalars['BigInt'];
  campaignPeriod: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type CampaignEvent_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddress?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  reward?: InputMaybe<Scalars['BigInt']>;
  reward_not?: InputMaybe<Scalars['BigInt']>;
  reward_gt?: InputMaybe<Scalars['BigInt']>;
  reward_lt?: InputMaybe<Scalars['BigInt']>;
  reward_gte?: InputMaybe<Scalars['BigInt']>;
  reward_lte?: InputMaybe<Scalars['BigInt']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  budget?: InputMaybe<Scalars['BigInt']>;
  budget_not?: InputMaybe<Scalars['BigInt']>;
  budget_gt?: InputMaybe<Scalars['BigInt']>;
  budget_lt?: InputMaybe<Scalars['BigInt']>;
  budget_gte?: InputMaybe<Scalars['BigInt']>;
  budget_lte?: InputMaybe<Scalars['BigInt']>;
  budget_in?: InputMaybe<Array<Scalars['BigInt']>>;
  budget_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  campaignPeriod?: InputMaybe<Scalars['BigInt']>;
  campaignPeriod_not?: InputMaybe<Scalars['BigInt']>;
  campaignPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  campaignPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  campaignPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  campaignPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  campaignPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  campaignPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CampaignEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CampaignEvent_filter>>>;
};

export type CampaignEvent_orderBy =
  | 'id'
  | 'owner'
  | 'contractAddress'
  | 'reward'
  | 'budget'
  | 'startTimestamp'
  | 'campaignPeriod'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  campaignEvent?: Maybe<CampaignEvent>;
  campaignEvents: Array<CampaignEvent>;
  referralEvent?: Maybe<ReferralEvent>;
  referralEvents: Array<ReferralEvent>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerycampaignEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycampaignEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CampaignEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CampaignEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreferralEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreferralEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReferralEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReferralEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type ReferralEvent = {
  id: Scalars['Bytes'];
  referrer: Scalars['Bytes'];
  contractAddress: Scalars['Bytes'];
  reward: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ReferralEvent_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  referrer?: InputMaybe<Scalars['Bytes']>;
  referrer_not?: InputMaybe<Scalars['Bytes']>;
  referrer_gt?: InputMaybe<Scalars['Bytes']>;
  referrer_lt?: InputMaybe<Scalars['Bytes']>;
  referrer_gte?: InputMaybe<Scalars['Bytes']>;
  referrer_lte?: InputMaybe<Scalars['Bytes']>;
  referrer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  referrer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  referrer_contains?: InputMaybe<Scalars['Bytes']>;
  referrer_not_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddress?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  reward?: InputMaybe<Scalars['BigInt']>;
  reward_not?: InputMaybe<Scalars['BigInt']>;
  reward_gt?: InputMaybe<Scalars['BigInt']>;
  reward_lt?: InputMaybe<Scalars['BigInt']>;
  reward_gte?: InputMaybe<Scalars['BigInt']>;
  reward_lte?: InputMaybe<Scalars['BigInt']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ReferralEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ReferralEvent_filter>>>;
};

export type ReferralEvent_orderBy =
  | 'id'
  | 'referrer'
  | 'contractAddress'
  | 'reward'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  campaignEvent?: Maybe<CampaignEvent>;
  campaignEvents: Array<CampaignEvent>;
  referralEvent?: Maybe<ReferralEvent>;
  referralEvents: Array<ReferralEvent>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptioncampaignEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncampaignEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CampaignEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CampaignEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreferralEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreferralEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReferralEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReferralEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  campaignEvent: InContextSdkMethod<Query['campaignEvent'], QuerycampaignEventArgs, MeshContext>,
  /** null **/
  campaignEvents: InContextSdkMethod<Query['campaignEvents'], QuerycampaignEventsArgs, MeshContext>,
  /** null **/
  referralEvent: InContextSdkMethod<Query['referralEvent'], QueryreferralEventArgs, MeshContext>,
  /** null **/
  referralEvents: InContextSdkMethod<Query['referralEvents'], QueryreferralEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  campaignEvent: InContextSdkMethod<Subscription['campaignEvent'], SubscriptioncampaignEventArgs, MeshContext>,
  /** null **/
  campaignEvents: InContextSdkMethod<Subscription['campaignEvents'], SubscriptioncampaignEventsArgs, MeshContext>,
  /** null **/
  referralEvent: InContextSdkMethod<Subscription['referralEvent'], SubscriptionreferralEventArgs, MeshContext>,
  /** null **/
  referralEvents: InContextSdkMethod<Subscription['referralEvents'], SubscriptionreferralEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["prajjawal/ad-protocol"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
