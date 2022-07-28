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
