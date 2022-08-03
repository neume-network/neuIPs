---
neuIP: 2
title: Non-interactive & deterministically creatable and temporal-ordered NFT index
status: Draft
author: Tim Daubenschütz <@TimDaub>
created: 2022-07-25
---

## Abstract

We outline the structure of an index, allowing direct access to NFTs' metadata
that is created deterministically and without requiring network interaction.

## Motivation

Building an NFT explorer for Ethereum today requires a lot of special knowledge
and a costly time commitment.

To index and synchronize all respective NFT metadata (from EIP-721 and EIP-1155
compliant contracts), starting at a block height, all logs are downloaded, and
using EIP-165, a contract can be feature-tested for their interface support.
Once clear NFT support has been established, an order system has to be
determined for all NFT's `tokenId`. It is trivial in cases where an EIP-721
contract implements the ERC721Enumerable extension. If it doesn't, the set of
`tokenId`s has to be determined through event logs too. For each `tokenId` and
contract address, a developer then calls `function tokenURI(...)`, receiving
either an IPFS or HTTP URL that subsequently requires calling an additional
server or node on the network. So building such an indexer today isn't an easy
feat.

But orthogonal to those technical challenges is the problem of spending a lot
of time on a problem essentially already solved by the big NFT marketplaces.
For example, Zora and OpenSea's API provide gleaming API documentations with
all possible NFT metadata - almost indicative that only a fool would spend
hundreds of hours and thousands of dollars on building their own NFT indexer.

Instead, especially when wanting to focus on building dApps - which mostly
consist of front-end code - a marketplace provider's APIs fit well as they
allow requests from a fully-fledged operating system and a user's browser. But
not only that, they also keep their indexed data continuously up to date given
the latest block data available on-chain. Meanwhile, building an NFT indexer
that keeps synchronicity to (multiple) mainnet(s) is so challenging: None is
currently publicly available as free software.

It is why, feeling safely guarded by their indexer's moats, NFT marketplaces
like OpenSea have not only started to engage in content moderation (dare we
call it "censorship"!) - they're also adding proprietarily-generated curation
signals not originally included in the on-chain anchored NFT's metadata. For
anyone happily integrating with these "recentralizing" platforms today, this
brings the risk of those in power pulling the rug by "embracing, extending and
exstinguishing" integrators - or simply by eventually "dialing up
monetization," making an integrator's dApp dependent on the existence of a
functioning credit card on their billing dashboard and not on the decentralized
substrates that are Ethereum and IPFS.

Hence, developers working with NFTs on Ethereum require a
chronologically-sorted file of all historic NFT events that can be downloaded
freely and efficiently searched - without access to a full operating system: A
browser must suffice.

Instead of a vertically integrated monolithic backend, NFT developers require
an intrinsically-incentivized ecosystem of node operators always keeping the
chronological log of NFT metadata updated. Ideal, in such a permanent way that
regular HTTP `tokenURI`s get made immutable by the network.

Neume Network sets out to create just that - a permanent metadata record that
developers may use for building interoperable NFT curation protocols. It
achieves this by specifying and implementing a canonical and non-interactive
index generation mechanism that ensures its replicability over a network.

"Canonical" and "specified", such that many implementations are possible and to
create transparency around the public good's functionality. "Non-interactive,"
because dealing with node-dependent synchronicity and state increases
complexity.

Our vision is individual nodes publishing their indexing results publicly on
IPFS leveraging a CID's permanence and composability qualities. For the scope
of this specification, however, we're focusing on the first step towards
specifying and building this rather complex architecture: We're describing the
file format that underpins the Neume Network. Namely, that we require a file's
content to be laid out such that access to specific information is direct and
yields the following requirements:

- Any node must be able to publish a self-descriptive NFT index file with
  content-addressed integrity that comprehendably outlines a crawl's
  performance.
- Given an NFT's identifying metadata (e.g. contract address and `tokenId`,
  they must deterministically translate to an offset in the file where an NFT's
  full metadata resides.
- The index file itself must be laid out such that there's an acceptable
  trade-off between downloading one huge file or downloading many small files.
  Generally, a user must be able to access the NFT index on their browser with
  small restrictions.
- All files and all links pointing inside and outside the index structure must
  be permanent and ensure content-addressed file integrity.

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC-2119](https://www.ietf.org/rfc/rfc2119.txt).

The index is represented by a directed acyclic graph (short: DAG) of files.
Content-addressing is used to represent directional connections between files.
It also ensures immutability and permanence of the data.

### Primitive Type Encoding into Binary

To create the index file we need to encode primitive types (e.g. `uint256`) in
binary representation. As we're defining the file format using fixed-length
header structures, a binary encoding of primitive types with fixed-length is
helpful as it allows us to define structures for direct data access (zero-copy)
without the need for parsing a file first.

#### `uint256` Binary representation

To represent a `uint256` in binary, we use a Big-Endian order with a fixed
length of 32 bytes. Below are implementations for encoding and decoding:

```js
import BN from "bn.js";

const endian = "be"; // big-endian
const lengthBytes = 32;

export function encode(/* string: */ uint256) {
  const num = new BN(uint256);
  if (num.isNeg()) {
    throw new Error(`input is out of range (negative): ${uint256}`);
  }
  return num.toBuffer(endian, lengthBytes);
}

export function decode(/* Buffer: */ buf) {
  return new BN(buf).toString();
}
```

#### `bytes32` Binary representation

We represent hexadecimal byte arrays with fixed-length of 32 bytes as follows:

```js
import { Buffer } from "buffer";

const encoding = "hex";
const lengthBytes = 32;

export function encode(/* hex string: */ value) {
  const buf = Buffer.alloc(lengthBytes);
  const valueBuf = Buffer.from(value, encoding);

  if (valueBuf.length > lengthBytes) {
    throw new Error(`input is out of range (too long): ${valueBuf.length}`);
  }

  valueBuf.copy(buf, buf.length - valueBuf.length);
  return buf;
}

export function decode(/* Buffer: */ buf) {
  if (buf.length > lengthBytes) {
    throw new Error(`input is out of range (too long): ${buf.length}`);
  }
  return buf.toString(encoding);
}
```

### File Types and Structure

We differentiate between type of files:

1. An **index file** has a fixed-length double row structure and a column width
   of 32 bytes. An index file comes with an externally-defined mapping formula and
   header description that allows going from an externally-known key (e.g. a
   sequential block number) to a calculatable offset within the index file.
2. A **block file** is entirely instructured and contains raw binary data. An
   **index file** can be used to determine a concret piece of data in a **block
   file** as is outlined in the schema below:

```
index file
|     32 bytes     |    32 bytes    |
| 123              | 00000000000000 | schema: e.g. [uint256: StartBlockNumber, bytes32: Reserved]
| 0                | 8              | schema: e.g. [uint256: offset, uint256: length]
| 9                | 5              |─┐
| ...              | ...            | │
           ┼                          │
                                      │
                                      │
block file                            │
|abcdefghijklmn...|                   │
          │   │                       │
          └─▲─┘                       │
            │                         │
            └─────────────────────────┘
```

Here, the **index file** points to the data `jklmn` in the **block file** at
the `offset=9` with `length=5`. Critically, it also points to `abcdefghi` with
`offset=0` and `length=8` but we've omitted the arrow in the schema graphic.

### Root Node

The DAG's root node is segmented conceptually into an index and a block file.
The index file reserves 64 bytes (one row) for metadata and the following
schematic header is instructive for its interpretation and parsing:

| Name                 | Size     | Representation | Comment                                                                                                                                                                                                                                                                                                                 |
| -------------------- | -------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Start Block Number` | 32 bytes | `uint256`      | `Start Block Number` represents the's first block number in the index with the lowest `offset`. As a block number directly translates to a position in the index file, its importance arises from not having to wastefully-reserve a lot of sparse space when e.g. indexing the Ethereum blockchain from today onwards. |
| Reserved             | 32 bytes | Zeros          | Reserved to add more metadata at a later point in time                                                                                                                                                                                                                                                                  |

Following the calculation below, inferring the index file's byte row-based
offset is possible by plugging in `Start Block Number` and the searched-for `Block Number`:

```js
import assert from "assert";

const rowLengthBytes = 64;
const metadataOffsetBytes = rowLengthBytes;

export function blockNumberToOffset(startBlockNumber, blockNumber) {
  assert(
    startBlockNumber <= blockNumber,
    `startBlockNumber "${startBlockNumber}" must be less or equal than first block number "${blockNumber}"`
  );
  return (
    metadataOffsetBytes + (blockNumber - startBlockNumber) * rowLengthBytes
  );
}
```

At the calculated offset, a row is segmented into two a two-part pointer
consisting of the `offset` and `length` of a variable-length piece of data in
the block file. The type of this data is CIDv1 pointing to a **Child Node**.

| Name     | Size     | Representation |
| -------- | -------- | -------------- |
| `offset` | 32 bytes | `uint256`      |
| `length` | 32 bytes | `uint256`      |

## Child Nodes

Upon retrieving the child node from a network like IPFS, an similarily
structured index and block file system is observed.

In the index file, each row is 64 bytes long, with the first row being reserved
for metadata storage.

| Name           | Size     | Representation | Comment                                                |
| -------------- | -------- | -------------- | ------------------------------------------------------ |
| Max Row Number | 32 bytes | `uint256`      | The number of rows in the file                         |
| Reserved       | 32 bytes | Zeros          | Reserved to add more metadata at a later point in time |

As all identifiers related to NFT minting are order-neutral, we're suggesting
an externally-computable offset formula mapping from an NFT contract's
`address` and `tokenID` to a row in the Child Node. We're computing a 32 byte
Keccak-256 hash through the following canonical input:

| Name             | Size     | Representation | Comment                                                       |
| ---------------- | -------- | -------------- | ------------------------------------------------------------- |
| Contract address | 20 bytes | `bytes32`      | An EIP-721 compliant contract address without the `0x` prefix |
| token ID         | 32 bytes | `uint256`      | An EIP-721's token ID                                         |

## Reference Implemenation

Reference implementations and test cases of the translation functions are
available in the `assets/neuIP-2` directory.
