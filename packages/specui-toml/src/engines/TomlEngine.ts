import { IEngine } from '@specui/core';
import { stringify } from '@iarna/toml';

export const TomlEngine: IEngine = async (spec) => {
  return stringify(spec);
};
