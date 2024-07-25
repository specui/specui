import { IEngine } from '@specui/core';

export const JsonEngine: IEngine = async (spec) => {
  return JSON.stringify(spec, null, '  ');
};
