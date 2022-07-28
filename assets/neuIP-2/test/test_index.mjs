import test from "ava";

import { blockNumberToOffset } from "../src/index.mjs";

test("if blockNumberToOffset fails if startBlockNumber is too low", (t) => {
  const startBlockNumber = 1;
  const blockNumber = 0;

  t.throws(() => blockNumberToOffset(startBlockNumber, blockNumber));
});

test("if blockNumberToOffset yields correct offset for file", (t) => {
  const startBlockNumber = 1;
  const blockNumber = 1;

  const offset = blockNumberToOffset(startBlockNumber, blockNumber);
  t.is(offset, 64);
});

test("if blockNumberToOffset yields correct offset for file 2", (t) => {
  const startBlockNumber = 1;
  const blockNumber = 100;

  const offset = blockNumberToOffset(startBlockNumber, blockNumber);
  t.is(offset, 6400);
});

test("if blockNumberToOffset yields correct offset for file 3", (t) => {
  const startBlockNumber = 50;
  const blockNumber = 100;

  const offset = blockNumberToOffset(startBlockNumber, blockNumber);
  t.is(offset, 6400 / 2 + 64);
});
