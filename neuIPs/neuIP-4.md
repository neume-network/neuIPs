---
eip: 4
title: Music NFT Ownersship
description: A primitive to identify music NFTs ownership on EVM chains.
author: Piérre Reimertz (@reimertz)
discussions-to:
status: Draft
created: 2022-11-09
---

## Abstract

musicOS has been experimenting with NFT ownership and relationship features by extending incoming neume data with a `owners` property. We are now confident how to ingest said properties and want to share learnings and support neume in implementing it.

## Motivation

One of the major features of on-chain data / NFTs is the tracability and relationship created between entitites.
This enables many use cases, but importantly, surfaces the relationship between an artist and their consumers / fans.

## Specification

IMO, the most obvious path to release this new feature is to split up the work into two phases; **Realtime Ownership Extraction** and **Historical Ownership Extraction**.

### Phase 1: Realtime Ownership Extraction

Similarly how we currently platform-specific extraction strategies to extract NFT metadata, we'd add another strategy that would exctract the current owner of a NFT for each platform.

As of now, all platforms is some form of a `ERC721` contract which allows us to call `ownerOf(uint256 _tokenId) external view returns (address);` extract the current owner.

Below is how we currenly extend incoming neume data with a `owners` attribute

```
owners: [{
  address: 'address'
  tokenId: 'number',
  contractAddress: 'address',
  nid: 'string' // internal UID for ingested neume tracks in the form of `chainId.contractAddress.tokenId `
}]
```

```
owners: [{

  // v0.0.1 of the strategy
  address: 'address',
  tokenId: 'number',
  contractAddress: 'address',


  // v0.1.0 of the strategy
  amount: 'number', // the price paid to buy the NFT
  blockNumber: 'number',
  timestamp: 'number',
  transactionHash: 'string',
}]
```


### Phase 2: Historical Ownership Extraction

This is has not been explored yet and is therefore intentionally left open for discussion.

* Extract and export the full ownership history separately
* Extract and bundle full ownership history together with each track


```
transactions: [{
  fromAddress: 'address',
  toAddress: 'addres',

  tokenId: 'number',
  contractAddress: 'address',

  amount: 'number', // the price paid to buy the NFT

  blockNumber: 'number',
  timestamp: 'number',
  transactionHash: 'string',
}]
```