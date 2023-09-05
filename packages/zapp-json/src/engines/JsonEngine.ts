import { IEngine } from '@zappjs/core';

export const JsonEngine: IEngine = async (spec) => {
  return JSON.stringify(spec, null, '  ');
}
