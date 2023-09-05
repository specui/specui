import { IGenerator, generate } from '@zappjs/core';
import { JsonEngine } from '@zappjs/json';

import { INpmPackageSpec } from '../interfaces';
import { NpmPackageSchema } from '../schemas';

export const NpmPackageGenerator: IGenerator<INpmPackageSpec> = spec => {
  return generate({
    engine: JsonEngine,
    schema: NpmPackageSchema,
    spec
  });
};
