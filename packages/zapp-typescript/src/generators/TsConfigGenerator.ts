import { IGenerator, generate } from '@zappjs/core';
import { JsonEngine } from '@zappjs/json';

import { ITsConfigSpec } from '../interfaces';
import { TsConfigSchema } from '../schemas';

export const TsConfigGenerator: IGenerator<ITsConfigSpec> = (spec) => generate({
  engine: JsonEngine,
  schema: TsConfigSchema,
  spec
});
