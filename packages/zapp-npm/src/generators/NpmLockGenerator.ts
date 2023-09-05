import { IGenerator, generate } from '@zappjs/core';
import { JsonEngine } from '@zappjs/json';

import { INpmLockSpec } from '../interfaces';

export const NpmLockGenerator: IGenerator<INpmLockSpec> = spec => {
  return generate({
    engine: JsonEngine,
    spec
  });
};
