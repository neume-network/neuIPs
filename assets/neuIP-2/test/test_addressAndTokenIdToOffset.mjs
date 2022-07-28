import test from "ava";
import BN from "bn.js";

import {
  removePrefix,
  addressAndTokenIdToInput,
} from "../src/addressAndTokenIdToOffset.mjs";

test("if an address's 0x prefix is removed", (t) => {
  const address = "0xabc";
  t.is(removePrefix(address), "abc");
});

test("if a the zero address and zero tokenId are laid out correctly as a canonical input buffer", (t) => {
  const address = "0x0000000000000000000000000000000000000000";
  const tokenId = new BN("0");
  const input = addressAndTokenIdToInput(address, tokenId);
  t.is(input.length, 52);
  const emptyBuffer = Buffer.alloc(52);
  t.is(input.compare(emptyBuffer), 0);
});
