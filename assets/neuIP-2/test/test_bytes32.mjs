import { Buffer } from "buffer";

import test from "ava";
import { CID } from "multiformats/cid";

import { encode, decode } from "../src/bytes32.mjs";

test("outputs fixed length encoding", (t) => {
  const value = "ffff";
  const buf = encode(value);
  t.is(buf.length, 32);
});

test("if encode and decode throws when string is too long", (t) => {
  const value =
    "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  t.throws(() => encode(value));
  t.throws(() => decode(Buffer.from(value)));
});
