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

The DAG's root node is segmented conceptually into "rows" and hence accessible
without memory overhead. A row is 64 bytes long. However, the first 64 bytes of
the file are reserved for metadata storage.

| Name               | Size     | Type      | Comment                                                                                                                                                                                                                                                               |
| ------------------ | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start Block Number | 32 bytes | `Integer` | The Start Block Number is the file's first block number. As a block number directly translates to the position in the file, its importance arises from now having to wastefully-reserve a lot of space when e.g. indexing the Ethereum blockchain from today onwards. |
| Reserved           | 32 bytes | Zeros     | Reserved to add more metadata at a later point in time                                                                                                                                                                                                                |

Block numbers are ordered from lowest to highest.

| Name         | Size     | Type                                                                                                |
| ------------ | -------- | --------------------------------------------------------------------------------------------------- |
| Block Number | 32 bytes | `Integer`                                                                                           |
| Child Node   | 32 bytes | `String` (e.g. [IPFS CIDv1](https://docs.ipfs.tech/concepts/content-addressing/#identifier-formats) |

The following JavaScript implementation translates from an Ethereum block number
to the offset of the row in the file:

```js
import assert from "assert";

const rowLength = 64;
const metadataOffsetBytes = rowLength;

export function blockNumberToOffset(startBlockNumber, blockNumber) {
  assert(
    startBlockNumber <= blockNumber,
    `startBlockNumber "${startBlockNumber}" must be less or equal than first block number "${blockNumber}"`
  );
  return metadataOffsetBytes + (blockNumber - startBlockNumber) * rowLength;
}
```

## Reference Implemenation

Reference implementations and test cases of the translation functions are
available in the `assets/neuIP-2` directory.
