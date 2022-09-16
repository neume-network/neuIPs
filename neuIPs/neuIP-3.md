---
eip: 3
title: Music NFT Release Event
description: A minimal primitive to emit URI events for social media.
author: Kevin Neaton (@neatonk), Tim Daubenschütz (@TimDaub)
discussions-to: https://github.com/neume-network/neuIPs/issues/4
status: Draft
created: 2022-09-16
---

## Abstract

We introduce a minimal on-chain primitive to emit pointers to music NFTs using Ethereum's event log infrastructure.

## Motivation

The modern social network's base layer is distributing content behind Universal Resource Identifiers as defined by RFC 3986. Any web resource can be identified by an URI or a URL and so upgrading Ethereum with a standard way of distributing content is useful.

## Specification

```solidity
contract Feed {
  event NewTrack(address indexed curator, string indexed uri);
  function release(string calldata uri) external {
    emit NewTrack(msg.sender, uri);
  }
}
```

- We strongly recommend all implementers to expose an additional [EIP-165](./eip-165.md) interface.
- The input `string calldata uri` of `function release(...)` must be an URI as defined by RFC 3986.

### NFT identification

An NFT is identified by its compliance to [EIP-721](./eip-721.md), its address
and its `uint256 tokenId` and can be represented as an URI:

```
nft://erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769
```

## Rationale

- An `event NewTrack(...)` contains the two most vital components of a music NFT: `address curator` and a `string uri`.
- We deliberately refrain from forcing [EIP-165](./eip-165.md) feature detection but strongly recommend it as an addition to all implementers as an optional extension.

## Security Considerations

There are no security considerations related directly to the implementation of this standard.

## Copyright

Copyright and related rights waived via [CC0](../LICENSE.md).
