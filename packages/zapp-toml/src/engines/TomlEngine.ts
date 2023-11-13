import { IEngine } from '@zappjs/core';
import { stringify } from 'smol-toml';

export const TomlEngine: IEngine = async (spec) => {
  return stringify(spec);
};
