import { Buffer } from "buffer";

const encoding = "ascii";
const lengthBytes = 32;

export function encode(/* string: */ value) {
  const buf = Buffer.alloc(lengthBytes);
  const valueBuf = Buffer.from(value, encoding);

  if (valueBuf.length > lengthBytes) {
    throw new Error(`input is out of range (too long): ${valueBuf.length}`);
  }

  valueBuf.copy(buf, buf.length - valueBuf.length);
  return buf;
}

export function decode(/* Buffer: */ buf) {
  if (buf.length > lengthBytes) {
    throw new Error(`input is out of range (too long): ${buf.length}`);
  }
  return buf.toString(encoding);
}
