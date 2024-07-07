import { IGenerator, generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

import { INpmPackageSpec } from '../interfaces';
import { NpmPackageSchema } from '../schemas';

export const NpmPackageGenerator: IGenerator<INpmPackageSpec> = (spec) => {
  return generate({
    engine: JsonEngine,
    schema: NpmPackageSchema,
    spec,
  });
};
