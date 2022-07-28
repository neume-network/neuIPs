import { Buffer } from "buffer";

import { Keccak } from "sha3";
import BN from "bn.js";

import assert from "assert";

const rowLengthBytes = 64;
const metadataOffsetBytes = rowLengthBytes;
const maxRowNumber = 2;

const tokenIdByteSize = 32;
const tokenIdEndian = "be"; // see: https://github.com/ethereum/solidity-examples/issues/54#issuecomment-630708548

const outputSizeBits = 256;
const hash = new Keccak(outputSizeBits);

export function removePrefix(address) {
  return address.substring(2, address.length);
}

export function addressAndTokenIdToInput(address, tokenId /* instanceOf BN */) {
  const rawAddress = removePrefix(address);
  const addressBuf = Buffer.from(rawAddress, "hex");
  const tokenIdBuf = tokenId.toBuffer(tokenIdEndian, tokenIdByteSize);
  return Buffer.concat([addressBuf, tokenIdBuf]);
}
