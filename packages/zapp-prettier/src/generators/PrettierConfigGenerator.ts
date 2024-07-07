import { IGenerator, generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

import { IPrettierConfigSpec } from '../interfaces';
import { PrettierConfigSchema } from '../schemas';

export const PrettierConfigGenerator: IGenerator<IPrettierConfigSpec> = (spec) =>
  generate({
    engine: JsonEngine,
    schema: PrettierConfigSchema,
    spec,
  });
