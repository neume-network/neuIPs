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
