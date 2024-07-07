import { IGenerator, generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

import { ITsConfigSpec } from '../interfaces';
import { TsConfigSchema } from '../schemas';

export const TsConfigGenerator: IGenerator<ITsConfigSpec> = (spec) =>
  generate({
    engine: JsonEngine,
    schema: TsConfigSchema,
    spec,
  });
