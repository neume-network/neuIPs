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
