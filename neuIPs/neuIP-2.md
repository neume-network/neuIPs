---
neuIP: 2
title: Ordered deterministic index of Ethereum NFT metadata
status: Draft
author: Tim Daubenschütz <@TimDaub>
created: 2022-07-25
---

## Abstract

We outline the structure of a deterministic, ordered index file format to
distribute Ethereum NFT metadata publicly accessibly through p2p networks as
IPFS.

## Motivation

The neume network currently distributes the indexer's result using the
github.com. Given two or more distributed neume network nodes, this makes
replicating the network's data prone to errors as its current replicating
factor is one.

An additional concern is that the small number of maintainers currently
controlling access to github.com/neume-network/data could decide to take the
page down and that by invoking their terms of service, Microsoft the controller
of GitHub, could limit the accessibility of the neume's index as they did with
with youtube-dl.

Hence, this document, aims to define neume network's index as a replicatable
data structure to make it available as a canonicalized application interface
through peer to peer networks like the IPFS.

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC-2119](https://www.ietf.org/rfc/rfc2119.txt).

The neume network NFT index is represented by an acyclic directed graph of IPFS
content IDs. Each node in the graph is represented by a graph and they must all
be formatted as canonical CSVs according to
[RFC-4180](https://datatracker.ietf.org/doc/html/rfc4180).

For each chain ID as is defined by
[CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md),
neume network defines a separate root file that introduces a deterministic
order for all contained EIP-721 assets.

For the Ethereum root file, the primary identifer is [a special version of
CAIP-19 including an Ethereum block's
number](https://github.com/qizhou/CAIPs/blob/patch-1/CAIPs/caip-19.md). It
serves to universally identify any possible invocation of EIP-721's `function tokenURI(uint256 tokenId)`.

To establish a canonical order of the index, upon completion of insertion of
all assets, a list is first ordered ascendingly by the numerical `block_number`
query tag. Split by block numbers, each sublist is then ordered ascendingly too
using treating the contract's address as an integer. Finally, the sublists are
split again into sublists by their contract's address. All are then sorted
ascendingly by the asset's token ID.

Below is an exemplary scenario:

```
// unordered
eip155:1/erc721:0x0000000000000000000000000000000000000000/0?block_number=0
eip155:1/erc721:0x0000000000000000000000000000000000000001/10?block_number=0
eip155:1/erc721:0x0000000000000000000000000000000000000001/0?block_number=2
eip155:1/erc721:0x0000000000000000000000000000000000000123/1234?block_number=60

// canonically ordered
eip155:1/erc721:0x0000000000000000000000000000000000000000/0?block_number=0
eip155:1/erc721:0x0000000000000000000000000000000000000001/10?block_number=0
eip155:1/erc721:0x0000000000000000000000000000000000000001/0?block_number=2
eip155:1/erc721:0x0000000000000000000000000000000000000123/1234?block_number=60
```
