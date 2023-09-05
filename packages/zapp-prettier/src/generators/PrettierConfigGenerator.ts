import { IGenerator, generate } from '@zappjs/core';
import { JsonEngine } from '@zappjs/json';

import { IPrettierConfigSpec } from '../interfaces';
import { PrettierConfigSchema } from '../schemas';

export const PrettierConfigGenerator: IGenerator<IPrettierConfigSpec> = (spec) => generate({
  engine: JsonEngine,
  schema: PrettierConfigSchema,
  spec
});
