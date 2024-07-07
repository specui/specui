import { IGenerator, generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

import { INpmLockSpec } from '../interfaces';

export const NpmLockGenerator: IGenerator<INpmLockSpec> = (spec) => {
  return generate({
    engine: JsonEngine,
    spec,
  });
};
