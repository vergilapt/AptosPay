export { Base64 } from './base64.ts';
export type { decode, encode } from './base64.ts';
export { concatUint8Arrays, hexToByteArray, splitToUint8Arrays, toHexString } from './binary.ts';

export function isNode(): boolean {
  return !!process?.versions?.node;
}

