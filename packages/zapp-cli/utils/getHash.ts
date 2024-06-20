import { createHash } from 'node:crypto';

export function getHash(str: string) {
  return createHash('sha512').update(str).digest('hex');
}
