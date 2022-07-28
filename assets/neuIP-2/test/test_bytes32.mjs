import { Buffer } from "buffer";

import test from "ava";
import { CID } from "multiformats/cid";

import { encode, decode } from "../src/bytes32.mjs";

test.skip("encoding a CIDv1 into a bytes32 binary type", (t) => {
  const cidv1 = CID.parse(
    "bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea"
  );
  t.log(cidv1.bytes.length);
});

test("outputs fixed length encoding", (t) => {
  const value = "hello world";
  const buf = encode(value);
  t.is(buf.length, 32);
});

test("if encode and decode throws when string is too long", (t) => {
  const value = "hello world how are you doing this string is too long";
  t.throws(() => encode(value));
  t.throws(() => decode(Buffer.from(value)));
});
