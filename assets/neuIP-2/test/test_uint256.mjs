import { Buffer } from "buffer";

import BN from "bn.js";
import test from "ava";

import { encode, decode } from "../src/uint256.mjs";

test("throws on overflow", (t) => {
  const uint256MaxPlusOne =
    "115792089237316195423570985008687907853269984665640564039457584007913129639936";
  t.throws(() => encode(uint256MaxPlusOne));
});

test("throws on underflow", (t) => {
  const value = "-1";
  t.throws(() => encode(value));
});

test("encoding and decoding uint256 max value", (t) => {
  const uint256Max =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  const uint256MaxBuf = encode(uint256Max);
  t.is(uint256MaxBuf.length, 32);
  const expected = Buffer.from(
    "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "hex"
  );
  t.is(expected.compare(uint256MaxBuf), 0);

  const decodeRes = decode(uint256MaxBuf);
  t.is(decodeRes, uint256Max);
});

test("encoding and decoding uint256 min value", (t) => {
  const uint256Min = "0";
  const uint256MinBuf = encode(uint256Min);
  t.is(uint256MinBuf.length, 32);
  const expected = Buffer.from(
    "0000000000000000000000000000000000000000000000000000000000000000",
    "hex"
  );
  t.is(expected.compare(uint256MinBuf), 0);

  const decodeRes = decode(uint256MinBuf);
  t.is(decodeRes, uint256Min);
});
