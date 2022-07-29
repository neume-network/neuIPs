---
neuIP: 2
title: Non-interactive & deterministically creatable and temporal-ordered NFT index
status: Draft
author: Tim Daubenschütz <@TimDaub>
created: 2022-07-25
---

## Abstract

We outline the structure of an index that can be created deterministically
and without requiring network interaction.

## Motivation

Users working with NFTs e.g. on Ethereum require a temporally-sorted file of
all historic NFT minting events. For neume to become a network of peer to peer
nodes, a non-interactive and deterministically-runnable operation must be
specified that allows any node to generate a temporally-sorted index of NFT
minting events.

We require this action to be deterministically-creatable to ensure
replicability and comprehendability of an individual node's result. We require
it to not be dependent on network interaction to avoid having to deal with
inter-node synchronicity and dealing with state.

We do not require the file creation process to be consistent across individual
nodes of the network such that the outcome of to index operations yields the
same file - rather we're aiming for an outcome's equivalence.

Finally, we require the actual file's content to be laid out in the file such
that it is efficient to query them both via the network and on the file system.
It yields two requirements. The first is that some metadata of an NFT needs to
deterministically translate into a spacial position in the file. Secondly, it
means that this document has to find a trade-off between the total information
having to be downloaded for executing a query over it.

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC-2119](https://www.ietf.org/rfc/rfc2119.txt).

The index is represented by a directed acyclic graph. Content-addressing must
be used as the primary representation for connecting nodes in the graph, it
ensures the immutability and permanence of the data.

### Primitive Type Encoding into Binary

To create the index file we need to encode primitive types (e.g. `uint256`) in
binary representation. As we're defining the file format using fixed-length header
structures, a binary encoding of primitive types with fixed-length is helpful
as it allows us to define structures for direct data access (zero-copy) without
the need for parsing a file first.

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

### Root Node

The DAG's root node is segmented conceptually into "rows" and hence accessible
without memory overhead. A row is 64 bytes long. However, the first 64 bytes of
the file are reserved for metadata storage.

| Name               | Size     | Representation | Comment                                                                                                                                                                                                                                                               |
| ------------------ | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start Block Number | 32 bytes | `uint256`      | The Start Block Number is the file's first block number. As a block number directly translates to the position in the file, its importance arises from now having to wastefully-reserve a lot of space when e.g. indexing the Ethereum blockchain from today onwards. |
| Reserved           | 32 bytes | Zeros          | Reserved to add more metadata at a later point in time                                                                                                                                                                                                                |

Block numbers are ordered from lowest to highest.

| Name         | Size     | Representation                                                                              |
| ------------ | -------- | ------------------------------------------------------------------------------------------- |
| Block Number | 32 bytes | `uint256`                                                                                   |
| Child Node   | 32 bytes | TBD: A particular fixed-length multihash given that IPFS CIDs can be quasi arbitrarily long |

The following JavaScript implementation translates from an Ethereum block number
to the offset of the row in the file:

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

## Child Nodes

By retrieving the `Child Node` identifier from a Root Node through e.g. the
file system or a network, an equivalent row-based file format is implemented.
Each row is 64 bytes long. With the first row (64 bytes) being reserved for
metadata storage.

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
